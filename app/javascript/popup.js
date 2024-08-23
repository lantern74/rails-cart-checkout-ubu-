
document.addEventListener("DOMContentLoaded", function(e) {

  const dynamicForm = document.getElementById("dynamic"); //new
  const popupForm = document.getElementById("dynamic-popup"); //new
  const newContactForm = document.getElementById("new_contact"); //new

  //these are just from the main form
  const nameField = dynamicForm.querySelector('input[name="name"]');
  const emailField = dynamicForm.querySelector('input[name="email"]');

  const nameFieldNewContact = newContactForm.querySelector('input[name="contact[name]"]');
  const emailFieldNewContact = newContactForm.querySelector('input[name="contact[email]"]');

  const submitButtonPopup = popupForm.querySelector("a[href='#submit-form']");

 // submit popup form button click
  submitButtonPopup.addEventListener("click", function (event) {
    event.preventDefault();
    nameFieldNewContact.value = popupForm.querySelector('input[name="name"]').value;
    emailFieldNewContact.value = popupForm.querySelector('input[name="email"]').value;
    newContactForm.submit();
  });



  // submit dynamic main form click
  const submitButtonsDynamic = dynamicForm.querySelectorAll("a[href='#submit-form']");
  submitButtonsDynamic.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default behavior

      // copy inputs from the dynamic form to the static
      console.log("copying/submitting");
      nameFieldNewContact.value = nameField.value;
      emailFieldNewContact.value = emailField.value;

      // Assuming the form is associated with the button through a common ancestor
      // const form = button.closest('form');
      //find the last form:
      const forms = document.forms;
      const lastForm = forms[forms.length - 1];

      if (lastForm) {
        lastForm.submit(); // Submit the form
      } else {
        console.error("Form not found for the button");
      }
    });
  });


  // Select all elements with the class "elButton"
  // const elButtons = document.querySelectorAll(".elButton");
  const elButtons = document.querySelectorAll("a[href='#open-popup']");

  const popupContainer = document.getElementById("popup-container");
  const closePopupButton = document.getElementById("close-popup");

  // Show the popup when any elButton is clicked
  elButtons.forEach(function (elButton) {
    elButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default behavior
      popupContainer.style.display = "flex"; // Display the popup
    });
  });

  // Close the popup when the close button is clicked
  closePopupButton.addEventListener("click", function () {
    popupContainer.style.display = "none"; // Hide the popup
  });

  // Close the popup when clicking outside of it
  popupContainer.addEventListener("click", function (event) {
    if (event.target === popupContainer) {
      popupContainer.style.display = "none"; // Hide the popup
    }
  });

  // Close the popup when the "Esc" key is pressed
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      popupContainer.style.display = "none"; // Hide the popup
    }
  });
});
