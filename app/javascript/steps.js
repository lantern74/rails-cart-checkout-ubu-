document.addEventListener("DOMContentLoaded", initializeSteps);
document.addEventListener("turbo:render", initializeSteps);

// *  This must stay, or it won't work
if (window.jQuery.ui) {
  //** it loads jQuery UI
  //   console.log('jQuery UI loaded');
}

function initializeSteps() {
  // Get the current URL
  var currentURL = window.location.href;
  var funnelId = getCurrentFunnelId(currentURL);

  if (!isNaN(funnelId)) {
    // The funnelId is valid, continue with loading the step details

    // Check if there's a step_id parameter in the URL
    var urlParams = new URLSearchParams(window.location.search);
    var stepIdParam = urlParams.get("step_id");

    if (stepIdParam) {
      // If step_id is provided in the URL, set the initial step to the specified step_id
      var initialStepItem = $(
        ".step-list-item[data-step-id='" + stepIdParam + "']"
      );
      if (initialStepItem.length > 0) {
        initialStepItem.addClass("active");
        loadStepDetails(stepIdParam, funnelId);
      }
    } else {
      // Get the initial step by its index
      var initialStepIndex = getInitialStepIndexForFunnel(funnelId);

      // Set the initial step as active
      var initialStepItem = $(".step-list-item:eq(" + initialStepIndex + ")");
      if (initialStepItem.length > 0) {
        initialStepItem.addClass("active");
        var stepId = initialStepItem.data("step-id");
        // loadStepDetails(stepId, funnelId); // I found that it breaks the code in the products tab. Without it, it works just fine, haven't seen any side effects. Looks like it doesn't have to be loaded.
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
      var stepId = $(this).data("step-id");
      loadStepDetails(stepId, funnelId);
    });

    // Extract funnelId from the current URL
    var funnelId = window.location.pathname.match(/\/funnels\/(\d+)/);

    if (funnelId && funnelId[1]) {
      // Extracted funnelId from the URL
      funnelId = parseInt(funnelId[1]);

      // Get the CSRF token from the page's meta tag
      var csrfToken = $("meta[name=csrf-token]").attr("content");

      // THE DRAGGABLE STEP LIST BEGIN
      $(".step-list").sortable({
        update: function (event, ui) {
          // Get the updated order of steps
          var stepIds = [];
          $(this)
            .find(".step-list-item")
            .each(function () {
              stepIds.push($(this).data("step-id"));
            });

          // Send the updated order to the server
          $.ajax({
            url: "/funnels/" + funnelId + "/update_step_order", // Define a route in your Rails routes file
            type: "PUT",
            data: {
              stepIds: stepIds,
            },
            headers: {
              "X-CSRF-Token": csrfToken, // Include the CSRF token in the headers
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

function getCurrentFunnelId(url) {
  // Split the URL by slashes
  var parts = url.split("/");
  var lastPart = parts[parts.length - 1];

  // Check if the last part is a number (e.g., "2")
  var funnelId = parseInt(lastPart);
  return isNaN(funnelId) ? 0 : funnelId;
}

function getInitialStepIndexForFunnel(funnelId) {
  // Loop through step items to find the initial step index based on funnelId
  var stepItems = $(".step-list-item");
  for (var i = 0; i < stepItems.length; i++) {
    var step = $(stepItems[i]);
    if (step.data("funnel-id") == funnelId) {
      return i;
    }
  }
  return 0; // Default to the first step if no matching step is found
}

// Rest of the code remains the same

function loadStepDetails(stepId, funnelId) {
  // Check if funnelId is valid and stepId is greater than 0 before displaying step details
  if (!isNaN(funnelId) && stepId > 0) {
    $.ajax({
      url: `/funnels/${funnelId}/steps/${stepId}/details`,
      type: "GET",
      dataType: "script",
      success: function (response) {
        // Handle the response (loaded step details) in your view
      },
      error: function (xhr, textStatus, errorThrown) {
        if (xhr.status === 404) {
          // Handle the case where the step doesn't exist for the funnel
          console.log(
            `Step with ID ${stepId} doesn't exist for funnel with ID ${funnelId}`
          );
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
  $("#step-details").empty(); // This empties the step details container
}
