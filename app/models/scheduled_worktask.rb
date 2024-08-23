# ************
# The role of ScheduledWorktasks is to track which worktasks need to be
# executed for a specific contact, and at what time. It also tracks if/when
# the worktask was completed. 
# ************
class ScheduledWorktask < ApplicationRecord
  belongs_to :contact
  belongs_to :worktask

  MAIL_ERRORS = [
    Net::SMTPAuthenticationError,
    Net::SMTPServerBusy,
    Net::SMTPSyntaxError,
    Net::SMTPFatalError,
    Net::SMTPUnknownError,
    Errno::ECONNREFUSED
  ]

  class << self
    def schedule_worktasks(contact, workflow_id)
      start_time = contact.created_at # time at which first task was triggered
      worktasks = Worktask.where(workflow_id: workflow_id).order(:order).to_a
  
      # if first task is email, send email immediately and add to table as completed (if success)
      # remove from worktask list
      run_first_worktask(worktasks, contact)
  
      delay_in_minutes = 0
      worktasks.each do |wt|
        if wt.worktask_type_id == WorktaskType::DELAY
          delay_in_minutes += convert_delay_to_minutes(wt)
        elsif wt.worktask_type_id == WorktaskType::EMAIL
          # schedule it with the accumulated delay
          scheduled_task = ScheduledWorktask.new(
            contact_id: contact.id, 
            worktask_id: wt.id, 
            trigger_at: start_time + delay_in_minutes.minutes
          )
          scheduled_task.save!
        end
      end
    end
  
    def reorder_worktask_schedule(workflow)
      worktasks = Worktask.where(workflow: workflow).order(:order)
      scheduled_tasks = ScheduledWorktask.joins(:worktask)
                                         .where(worktasks: { workflow: workflow })
                                         .order(:contact_id, :trigger_at)
                                         .to_a
      contact_ids = scheduled_tasks.map {|task| task.contact_id }.uniq
  
      contact_ids.each do |contact_id|
        reorder_worktask_schedule_for_contact(contact_id, scheduled_tasks, worktasks)
      end
    end
  
    def run_scheduled_tasks
      five_minutes_ago = Time.now - 5.minutes - 1.seconds # include 1 second to catch anything between runs
      tasks_to_run = ScheduledWorktask.where(:trigger_at => five_minutes_ago..Time.now, :completed_at => nil)
      
      tasks_to_run.each do |task|
        worktask = Worktask.find(task.worktask_id)
        if worktask.worktask_type_id == WorktaskType::EMAIL
          contact = Contact.find(task.contact_id)

          email_delivery_error = deliver_email(contact, worktask)

          if email_delivery_error.empty?
            task.update_attribute(:completed_at, Time.now)
          else 
            task.update_attribute(:email_delivery_error, email_delivery_error)
          end
        end
      end
    end
  
    private
  
    def reorder_worktask_schedule_for_contact(contact_id, scheduled_tasks, worktasks)
      contact_tasks = scheduled_tasks.select { |task| task.contact_id == contact_id }
      start_time = contact_tasks.first.created_at
  
      delay_in_minutes = 0
      worktasks.each_with_index do |wt, index|
        if wt.worktask_type_id == WorktaskType::DELAY
          delay_in_minutes += convert_delay_to_minutes(wt)
        elsif wt.worktask_type_id == WorktaskType::EMAIL
          scheduled_task = contact_tasks.find { |task| task.worktask_id == wt.id }
          if scheduled_task.nil?
            scheduled_task = ScheduledWorktask.new(
              contact_id: contact.id, 
              worktask_id: wt.id, 
              trigger_at: start_time + delay_in_minutes.minutes
            )
          else 
            scheduled_task.update_attribute(:trigger_at, start_time + delay_in_minutes.minutes)
          end
          scheduled_task.save!
        end
      end
    end

    def run_first_worktask(worktasks, contact)
      first_worktask = worktasks.first
      if first_worktask.worktask_type_id == WorktaskType::EMAIL
        email_delivery_error = deliver_email(contact, first_worktask)

        sign_up_task = ScheduledWorktask.new(
          contact_id: contact.id, 
          worktask_id: first_worktask.id, 
        )

        if email_delivery_error.empty?
          sign_up_task.completed_at = Time.now
        else 
          sign_up_task.email_delivery_error = email_delivery_error
        end

        sign_up_task.save!
        worktasks.shift
      end
    end

    def convert_delay_to_minutes(worktask)
      if worktask.unit_of_time == 'days'
        worktask.delay.days.in_minutes
      elsif worktask.unit_of_time == 'hours'
        worktask.delay.hours.in_minutes
      elsif worktask.unit_of_time == 'minutes'
        worktask.delay
      else
        0
      end
    end

    # returns email delivery error message if delivery fails (blank string if success)
    def deliver_email(contact, worktask)
      email_delivery_error = ''

      if worktask.from_email.blank? 
        email_delivery_error = no_from_email_error_text(worktask)
      else
        begin
          UserMailer.worktask_email(contact, worktask).deliver_now
        rescue *MAIL_ERRORS => e
          email_delivery_error = e.message
        end
      end

      email_delivery_error
    end

    def no_from_email_error_text(worktask)
      "No 'from' email specified on worktask id #{worktask.id}. Email not delivered."
    end
  end
end