
# Learn more: http://github.com/javan/whenever
job_type :runner,  "cd :path && rbenv local 3.1.4 && bin/rails runner -e :environment ':task' :output"
set :output, "/code/ucart/cron_log.log"


every 1.minutes do
  runner "ScheduledWorktask.run_scheduled_tasks"
end

