



document.addEventListener("DOMContentLoaded", function(e) {
  // Add this to handle the form submission via AJAX
  $(document).on('submit', '#connectProductForm', function(e) {
    e.preventDefault();
    var form = $(this);

    $.ajax({
      url: form.attr('action'),
      type: form.attr('method'),
      data: form.serialize(),
      success: function(response) {
        // Handle success, e.g., close popup
        $.magnificPopup.close();
        // Optionally, you can reload or update the product list on the page
      },
      error: function(xhr, textStatus, errorThrown) {
        // Handle errors
        console.error('Error connecting product:', errorThrown);
      }
    });
  });

  // Add this to show the popup when the button is clicked
  $(document).on('click', '#connectProductButton', function() {
    $.magnificPopup.open({
      items: {
        src: '#connectProductPopup',
        type: 'inline'
      }
    });
  });
  });
