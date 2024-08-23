
https://stackoverflow.com/questions/71042588/rails-turbo-doesnt-trigger-turboload-event

// document.addEventListener('DOMContentLoaded', startFrontController)
// document.addEventListener('turbo:render', startFrontController)

document.addEventListener('DOMContentLoaded', initializeWorkflow);
document.addEventListener("turbo:render", initializeWorkflow);



// *  This must stay, or it won't work
  if (window.jQuery.ui) { //** it loads jQuery UI
  //   console.log('jQuery UI loaded');
  }




function initializeWorkflow() {
  // Get the current URL
  var currentURL = window.location.href;
  var workflowId = getCurrentWorkflowId(currentURL);


  if (!isNaN(workflowId)) {
    // The workflowId is valid, continue with loading the step details

    // Check if there's a step_id parameter in the URL
    var urlParams = new URLSearchParams(window.location.search);
    var stepIdParam = urlParams.get("step_id");


    if (stepIdParam) {
      // console.log('the 1st one loads and its not problem');
      // If step_id is provided in the URL, set the initial step to the specified step_id
      var initialStepItem = $(".step-list-item[data-worktask-id='" + stepIdParam + "']");
      if (initialStepItem.length > 0) {
        initialStepItem.addClass("active");
        loadStepDetails(stepIdParam, workflowId);
      }
    } else {
    // console.log('the second one loads and its not problem');

    // Get the initial step by its index
    var initialStepIndex = getInitialStepIndexForWorkflow(workflowId);
    // console.log(initialStepIndex );
      // Set the initial step as active
      var initialStepItem = $(".step-list-item:eq(" + initialStepIndex + ")");
      if (initialStepItem.length > 0) {
        initialStepItem.addClass("active");
        var stepId = initialStepItem.data("worktask-id");
         loadStepDetails(stepId, workflowId);
      }
    }

      $(".clickable-column").on("click", function () {
        var href = $(this).data("href");
        if (href) {
          window.location.href = href;
        }
      });


    // Listen for step title clicks
    $(".step-list-item").on("click", function (e) {
      e.preventDefault();
      $(".step-list-item").removeClass("active");
      $(this).addClass("active");
      var stepId = $(this).data("worktask-id");
      loadStepDetails(stepId, workflowId);
    });

    // Extract workflowId from the current URL
    var workflowId = window.location.pathname.match(/\/workflows\/(\d+)/);

    if (workflowId && workflowId[1]) {
      // Extracted workflowId from the URL
      workflowId = parseInt(workflowId[1]);

      // Get the CSRF token from the page's meta tag
      var csrfToken = $('meta[name=csrf-token]').attr('content');


      // THE DRAGGABLE STEP LIST BEGIN
      $(".step-list").sortable({
        update: function (event, ui) {
          // Get the updated order of steps
          var stepIds = [];
          $(this).find(".step-list-item").each(function () {
            stepIds.push($(this).data("worktask-id"));
          });

          // Send the updated order to the server
          $.ajax({
            url: "/workflows/" + workflowId + "/update_worktask_order", // Define a route in your Rails routes file
            type: "PUT",
            data: {
              worktaskIds: stepIds
            },
            headers: {
              'X-CSRF-Token': csrfToken // Include the CSRF token in the headers
            },
            success: function (response) {
              // Handle success
            },
            error: function (xhr, textStatus, errorThrown) {
              // Handle errors
            },
          });
        },
      });
      // THE DRAGGABLE STEP LIST END
    }


  }

}




function getCurrentWorkflowId(url) {
  // Split the URL by slashes
  var parts = url.split('/');

  //? when I had my old code for workflow#show it was this code below
  // var lastPart = parts[parts.length - 1];
  // console.log(parts)

  //? now I'm using the 2nd version of workflow#show, use this code below
  var lastPart = parts[parts.length - 2];

  // Check if the last part is a number (e.g., "2")
  var workflowId = parseInt(lastPart);

  return isNaN(workflowId) ? 0 : workflowId;
}

function getInitialStepIndexForWorkflow(workflowId) {
  // Loop through step items to find the initial step index based on workflowId
  var stepItems = $(".step-list-item");
  for (var i = 0; i < stepItems.length; i++) {
    var step = $(stepItems[i]);
    if (step.data("workflow-id") == workflowId) {
      return i;
    }
  }
  return 0; // Default to the first step if no matching step is found
}

// Rest of the code remains the same



  function loadStepDetails(stepId, workflowId) {

    // Check if workflowId is valid and stepId is greater than 0 before displaying step details
    if (!isNaN(workflowId) && stepId > 0) {
      $.ajax({
        url: `/workflows/${workflowId}/worktasks/${stepId}`,
        type: "GET",
        dataType: "script",
        success: function (response) {
          // Handle the response (loaded step details) in your view
        },
        error: function (xhr, textStatus, errorThrown) {
          if (xhr.status === 404) {
            // Handle the case where the step doesn't exist for the workflow
            console.log(`Step with ID ${stepId} doesn't exist for workflow with ID ${workflowId}`);
          } else {
            // Handle other errors
            console.error(`Error loading step details: ${errorThrown}`);
          }
        },
      });
    } else {
      // If stepId is not greater than 0, you can clear the step details or take other actions
      clearStepDetails(); // Implement this function to clear or hide the step details
    }
  }

  function clearStepDetails() {
    // Implement this function to clear or hide the step details as needed
    // For example:
    $("#workflow-details").empty(); // This empties the step details container
  }





