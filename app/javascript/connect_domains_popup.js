document.addEventListener("DOMContentLoaded", function (e) {
  // Add this to handle the form submission via AJAX
  $(document).on("submit", "#connectDomainForm", function (e) {
    e.preventDefault();
    var form = $(this);

    $.ajax({
      url: form.attr("action"),
      type: form.attr("method"),
      data: form.serialize(),
      success: function (response) {
        // Handle success, e.g., close popup
        $.magnificPopup.close();
        // Optionally, you can reload or update the domain list on the page
      },
      error: function (xhr, textStatus, errorThrown) {
        // Handle errors
        console.error("Error connecting domain:", errorThrown);
      },
    });
  });

  // Add this to show the popup when the button is clicked
  $(document).on("click", "#connectDomainButton", function () {
    $.magnificPopup.open({
      items: {
        src: "#connectDomainPopup",
        type: "inline",
      },
    });
  });
});
