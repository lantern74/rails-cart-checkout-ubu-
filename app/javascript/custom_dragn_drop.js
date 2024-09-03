
var { closeAllSidebars, closeAllTextEditPopups, anyOfTheSidebarsOpen, traverseAndSetUniqueId, getRandomColor, moveUp, moveDown, removeElement, updateTextareaFromContainer } = require("./editor-components");
var { GreenGearElement, currentSelectedGreenElement } = require("./editor-components");
var { BlueGearElement, currentSelectedBlueElement } = require("./editor-components");
var { OrangeGearElement, addOrangeDraggingPoints, addEventListenersForContainer } = require("./editor-components");
var { createContainer, addGreenTools, sectionControl } = require("./editor-components");
var { createRowSection, addBlueTools, rowControl, handleMouseEnter, handleMouseLeave, setupMouseInteractions, setupResizingBehavior, createDivCol1 } = require("./editor-components");
var { addYellowElementButton, elementControl, editTextControl, openAddElementPopup, closeElementsPanel, currentChosenField } = require("./editor-components");


var { currentSelectedHeadlineElement, currentSelectedHeadlineContainer } = require("./editor-components");
var { currentSelectedImageElement } = require("./editor-components");
var { currentSelectedVideoElement } = require("./editor-components");
var { currentSelectedComboElement } = require("./editor-components");
var { ButtonGearElement, currentSelectedButtonElement } = require("./editor-components");


var setSectionWidthPopup = document.getElementById("setSectionWidthPopup");
var setColumnNumberPopup = document.getElementById("setColumnNumberPopup");
var setTwoStepOrderPopup = document.getElementById("setTwoStepOrderPopup");
var setSectionPopup = document.getElementById("setSectionPopup");
var setColumnPopup = document.getElementById("setColumnPopup");
var setImagePopup = document.getElementById("setImagePopup");
var setVideoPopup = document.getElementById("setVideoPopup");
var marginPaddingPopup = document.getElementById("marginPaddingPopup");
var setHeadlinePopup = document.getElementById("setHeadlinePopup");
var setButtonPopup = document.getElementById("setButtonPopup");
var leftSlidingPopup = document.getElementById("leftSlidingPopup");

var settingFullWidth = document.getElementById("setting-full-width");
var settingWide = document.getElementById("setting-wide");
var settingMedium = document.getElementById("setting-medium");
var settingSmall = document.getElementById("setting-small");
var setValueWithNumber = document.getElementById("setValueWithNumber");
var setValueWithNumberMobile = document.getElementById("setValueWithNumberMobile");
var setValueWithRange = document.getElementById("setValueWithRange");
var setUnit = document.getElementById("select-unit");
var settingGreenMarginPaddingValue = document.getElementsByClassName("settingMarginPaddingValue")[0];
var settingBlueMarginPaddingValue = document.getElementsByClassName("settingMarginPaddingValue")[1];
var settingOrangeMarginPaddingValue = document.getElementsByClassName("settingMarginPaddingValue")[2];
var settingCombMarginPaddingValue = document.getElementsByClassName("settingMarginPaddingValue")[3];
var settingImageMarginPaddingValue = document.getElementsByClassName("settingMarginPaddingValue")[4];
var settingVideoMarginPaddingValue = document.getElementsByClassName("settingMarginPaddingValue")[5];
var settingButtonMarginPaddingValue = document.getElementsByClassName("settingMarginPaddingValue")[6];
// var id = undefined; // global id of the container div -- this on actually is needed
var draggables = undefined;
var placeholder = undefined;
var elementToInsert = "";

var settingMarginPadding;
var buttonContainerId;


// view device
const desktopBtn = document.getElementById('desktopBtn');
const mobileBtn = document.getElementById('mobileBtn');
const container = document.querySelector(".deviceview");

function showDesktopView() {
  desktopBtn.classList.add('active');
  mobileBtn.classList.remove('active');
  container.style.width = "100%";
  document.querySelectorAll(".mobile-view").forEach((view) => {
    view.classList.replace("mobile-view", "desktop-view");
  })
  document.querySelectorAll(".mp-mobile-view").forEach((view) => {
    view.classList.replace("mp-mobile-view", "mp-desktop-view");
  })
  document.querySelectorAll('.device-select .selected').forEach((options) => {
    options.setAttribute("data-value", "desktop");
    if (options.querySelector("i").classList.contains("bi-phone")) {
      options.querySelector("i").classList.replace("bi-phone", "bi-laptop");
    }
  })
  setValueWithNumber.style.display = "block";
  setValueWithNumberMobile.style.display = "none";
}

function showMobileView() {
  desktopBtn.classList.remove('active');
  mobileBtn.classList.add('active');
  container.style.width = "400px";
  document.querySelector(".steps-edit").style.backgroundColor = "#eee";
  document.getElementById('da-main-container').style.backgroundColor = "#eee";
  document.querySelectorAll(".desktop-view").forEach((view) => {
    view.classList.replace("desktop-view", "mobile-view");
  })
  document.querySelectorAll(".mp-desktop-view").forEach((view) => {
    view.classList.replace("mp-desktop-view", "mp-mobile-view");
  })
  document.querySelectorAll('.device-select .selected').forEach((options) => {
    options.setAttribute("data-value", "mobile");
    if (options.querySelector("i").classList.contains("bi-laptop")) {
      options.querySelector("i").classList.replace("bi-laptop", "bi-phone");
    }
  })
  setValueWithNumber.style.display = "none";
  setValueWithNumberMobile.style.display = "block";
}

desktopBtn.addEventListener('click', function (event) {
  event.preventDefault();
  showDesktopView();
});
mobileBtn.addEventListener('click', function (event) {
  event.preventDefault();
  showMobileView();
});

// Setting Device
document.querySelectorAll('.device-select').forEach(dropdown => {
  const selected = dropdown.querySelector('.selected');
  const options = dropdown.querySelector('.options');

  // Toggle options display on click
  selected.addEventListener('click', function () {
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
  });

  const icon = document.createElement("i");
  icon.className = "bi bi-chevron-down";
  icon.style.fontSize = "0.5rem";
  icon.style.marginLeft = "5px";

  // Set selected value and hide options on option click
  dropdown.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function () {
      selected.innerHTML = this.innerHTML;
      selected.setAttribute('data-value', this.getAttribute('data-value'));
      options.style.display = 'none';
      if (selected.getAttribute('data-value') === "desktop") {
        showDesktopView();
        document.querySelectorAll('.device-select .selected').forEach((selectElement) => {
          selectElement.setAttribute("data-value", "desktop");
          selectElement.querySelector("i").classList.replace("bi-phone", "bi-laptop");
        })
        selected.appendChild(icon);
      } else {
        showMobileView();
        document.querySelectorAll('.device-select .selected').forEach((selectElement) => {
          selectElement.setAttribute("data-value", "mobile");
          selectElement.querySelector("i").classList.replace("bi-laptop", "bi-phone");
        })
        selected.appendChild(icon);
      }
    });
  });

  // Hide options if clicking outside the dropdown
  window.addEventListener('click', function (event) {
    if (!dropdown.contains(event.target)) {
      if (options.style.display === 'block') {
        options.style.display = 'none';
      }
    }
  });
});

document.querySelectorAll(".view-visibility").forEach((selected) => {
  selected.querySelector(".desktop").addEventListener('click', function (event) {
    event.stopPropagation();
    console.log(event.target.value, 'value')
    if (this.classList.contains("active")) {
      this.classList.remove("active");
    } else {
      this.classList.add("active");
    }
  })
  selected.querySelector(".mobile").addEventListener('click', function () {
    if (this.classList.contains("active")) {
      this.classList.remove("active");
    } else {
      this.classList.add("active");
    }
  })
})

// SAVE button saving da-main-container and da-popup-container
document.addEventListener("DOMContentLoaded", function () {
  const editorForm = document.getElementById('editorForm');
  const saveButton = document.getElementById('save-button');

  if (editorForm) {
    saveButton.addEventListener('click', (e) => {
      e.preventDefault();

      // Disable the save button
      saveButton.disabled = true;

      updateTextareaFromContainer("da-main-container", "step[large_html_blob_content]");
      updateTextareaFromContainer("da-popup-container", "step[popup_html_blob_content]");

      const formData = new FormData(editorForm);
      fetch(editorForm.action, {
        method: 'PATCH',
        headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
          'Accept': 'application/json'
        },
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          // handle success
          console.log('Success:', data);
          displayFlashMessage('Saved.', 'notice');
        })
        .catch((error) => {
          // handle error
          console.error('Error:', error);
          displayFlashMessage('There was a problem saving the file. Try again later.', 'notice');
        })
        .finally(() => {
          // Re-enable the save button after a 3-second delay
          setTimeout(() => {
            saveButton.disabled = false;
          }, 2000);
        });

    });
  }
});

//this function is for flashing messages on the top... If saved for example
function displayFlashMessage(message, type) {
  const flashMessage = document.createElement('div');
  flashMessage.setAttribute('data-controller', 'flash');
  flashMessage.className = 'notification flash-it';
  if (type === 'alert') {
    flashMessage.classList.add('is-danger');
  }
  flashMessage.hidden = true;

  const paragraph = document.createElement('p');
  paragraph.className = 'notice';
  paragraph.textContent = message;

  flashMessage.appendChild(paragraph);
  document.body.appendChild(flashMessage);

  // Trigger Stimulus connect to show the flash message
  const event = new Event('DOMContentLoaded');
  flashMessage.dispatchEvent(event);
}


// this is the MAIN code when LOADING
document.addEventListener("DOMContentLoaded", function (e) {
  if (!customDragnDropInitialized) {
    init();

    const addSectionButton = document.getElementById("add-section-button");

    if (addSectionButton) {
      addSectionButton.addEventListener("click", (event) => {

        rand = getRandomColor();
        const daMainContainer = document.getElementById("da-main-container");
        if (daMainContainer.childNodes[0]) {
          daMainContainer.lastChild.childNodes[2].childNodes[0].click();
        } else {
          if (setSectionWidthPopup.classList.contains("open")) {
            closeAllSidebars();
            setSectionWidthPopup.classList.remove("open");
          } else {

            closeAllSidebars();
            setSectionWidthPopup.classList.add("open");
          }
          event.stopPropagation(); // prevent
        }
      });
    }

    // cancel paste - make paste only plain text
    document.addEventListener("paste", function (e) {
      e.preventDefault();
      var text = (e.originalEvent || e).clipboardData.getData("text/plain");
      document.execCommand("insertHTML", false, text);
    });

    // start loading ALL sections
    // let's load the listeners for the saved divs from Rails.
    const containers = document.querySelectorAll(".editor-container");

    // Loop through each container and apply the sectionControl function
    containers.forEach((container) => {

      addGreenTools(container); //add green rollover divs


      // sectionControl(container); // this is not needed because I'm calling it from the addGreenTools


      //ROWS
      // Attaching rows and initializing interactions
      const attachRows = container.querySelectorAll('div[id^="row-"]');
      attachRows.forEach((attachRow) => {
        addBlueTools(attachRow); // Attach clicks and mouse overs if necessary

        const attachColumns = attachRow.querySelectorAll("div.col-div");
        const boundaries = [];


        attachColumns.forEach((attachColumn, index) => {
          // Detect and store boundaries
          const boundary = attachColumn.querySelector(".div-boundary");
          if (boundary) {
            boundaries.push(boundary); // Add to boundaries array if present
          }
          // Check if the column is effectively empty
          // if (attachColumn.children.length === 0 || (attachColumn.children.length === 1 && boundary)) {
          const yellowButton = addYellowElementButton();
          attachColumn.prepend(yellowButton); // Append the yellow button to the column
          // }

          // Set drag-to attribute and additional listeners if needed
          addEventListenersForContainer(attachColumn);
          attachColumn.setAttribute("data-drag-to", "true");
        }); //attachColumns.forEach


        // If using global mouse interaction handlers for the row, consider initializing them here
        if (boundaries.length > 0) {
          setupResizingBehavior(attachColumns, boundaries);
        }
        setupMouseInteractions(attachRow, attachColumns, boundaries);


      });//attachRows.forEach


      // * ORANGE ELEMENTS and CONTAINERS
      const attachElements = container.querySelectorAll("div.draggable");
      attachElements.forEach((attachElement) => {
        elementControl(attachElement);
        editTextControl(attachElement);


      }); // orange elements


      let allColDivs = container.querySelectorAll(".col-div");
      allColDivs.forEach((coldiv) => {
        let condition = coldiv.getAttribute("data-drag-to");

        if (!condition) {
          coldiv.setAttribute("data-drag-to", "true");
          addEventListenersForContainer(coldiv);
        }

        // let allButtons = container.querySelectorAll(".elBTN");
        // allButtons.forEach((buttonContainer) => {
        //   buttonContainer.addEventListener("click", function (event) {
        //     getButtonContainerId(this);
        //   });
        // }); // allButtons



      }); // allColDivs

      //make blue buttons work when editing elements
      let blueAddElementButton = container.querySelectorAll(".add-element");
      blueAddElementButton.forEach((button) => {
        button.addEventListener("click", function (e) {

          // openAddElementPopup(this);
        });
      }); // blueAddElementButton
    }); //containers loop

    // end loading ALL sections
  } else {
  }
});

document.addEventListener("DOMContentLoaded", function (event) {
  // Adding keydown event listener to the document
  // Handle CMD+S keypress

  document.addEventListener('keydown', (e) => {

    if (e.key === "Tab") {
      openAddElementPopup(this);
    }

    if (e.key === "Escape") {
      closeAllSidebars();

    }

    const saveButton = document.getElementById('save-button');
    if (e.keyCode === 83 && e.metaKey) {
      e.preventDefault(); e.stopPropagation();
      saveButton.click();// CMD+S was pressed
      console.log('CMD+S was pressed');
    }

  });

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 68 && e.metaKey) { // CMD+D
      e.preventDefault(); e.stopPropagation();
      // Check if the active element is an input, textarea, or contentEditable
      var isEditable = false;
      var checkElement = document.activeElement;

      // Check if the element is inherently editable or set to be content editable
      if (checkElement.tagName === "INPUT" || checkElement.tagName === "TEXTAREA" || checkElement.contentEditable === "true") {
        isEditable = true;
      } else {
        // Check the parents for contentEditable true
        while (checkElement && checkElement !== document.body) {
          if (checkElement.contentEditable === "true") {
            isEditable = true;
            break;
          }
          checkElement = checkElement.parentNode;
        }
      }

      if (!isEditable) {
        e.preventDefault();
        const daMainContainer = document.getElementById("da-main-container");
        if (daMainContainer && daMainContainer.querySelectorAll(".editor-container").length === 0) {
          createContainer("100%");
        } else if (daMainContainer && daMainContainer.querySelectorAll(".editor-container").length === 1) {
          const container = daMainContainer.querySelector(".editor-container");

          // Check if the rowSection already exists
          if (!container.querySelector(".row-section")) {
            var rowSection = createRowSection();
            container.appendChild(rowSection);


            var divCol1 = createDivCol1();
            rowSection.appendChild(divCol1);

            setColumnNumberPopup.classList.remove("open");
            var blueAddElementRolloverTools = addYellowElementButton();
            divCol1.appendChild(blueAddElementRolloverTools);

            divCol1.addEventListener("mouseenter", (e) => {
              if (!divCol1.childNodes[1]) {
                divCol1.childNodes[0].style.display = "block";
                divCol1.childNodes[0].childNodes[0].style.display = "block";
              }
            });

            divCol1.addEventListener("mouseleave", (e) => {
              divCol1.childNodes[0].style.display = "none";
              divCol1.childNodes[0].childNodes[0].style.display = "none";
            });

            addOrangeDraggingPoints(container.id);
            openAddElementPopup(this); //this is the button when the blue div is empty
          }

          // alert("add a new element");
          /* Here we will add a combo for example*/
          // insertEl(e, draggable, "click", currentChosenField);
          document.querySelector('div[name="headline-field"]').click();
          document.querySelector('div[name="2step-combo"]').click();


          /* */
        } else {
          // openAddElementPopup(this); //this is the button when the blue div is empty
          // alert("2");
        }
      }
    }//key CMD-D
  });
});







document.addEventListener("DOMContentLoaded", function (event) {
  draggables = document.querySelectorAll('div.draggable[id]:not([id*="-"])');
  if (draggables) {
    draggables.forEach((draggable) => {
      // console.log("I'm draggable and clickable:" + draggable.id);
      //this makes it click on the left
      draggable.addEventListener("click", (e) => addElementWithClick(e, draggable, currentChosenField()), false);
    });
  }


});

// Function to extract numeric class name from an element
function getNumericClassName(element) {
  // Get all class names from the element
  const classNames = element.parentElement?.parentElement?.parentElement.classList;
  // Iterate through class names and return the numeric one
  for (let className of classNames) {
    // Check if the class name is numeric
    if (/^\d+$/.test(className)) {
      return className;
    }
  }

  // Return null if no numeric class name is found
  return null;
}

document.addEventListener("DOMContentLoaded", function (event) {
  settingFullWidth.addEventListener("click", function () {
    var numberClass = getNumericClassName(settingFullWidth);
    createContainer("100%", numberClass);
  });
  settingWide.addEventListener("click", function () {
    var numberClass = getNumericClassName(settingWide);
    createContainer("80%", numberClass);
  });
  settingMedium.addEventListener("click", function () {
    var numberClass = getNumericClassName(settingMedium);
    createContainer("60%", numberClass);
  });
  settingSmall.addEventListener("click", function () {
    var numberClass = getNumericClassName(settingSmall);
    createContainer("50%", numberClass);
  });
});


function configPopup() {
  let container = document.createElement("div");
  container.classList.add("editor-container", "new-section"); //p-3
  container.style.minHeight = "250px";
  container.style.backgroundColor = "#ffffff";

  let section = document.createElement("div");
  container.appendChild(section);

  //  // popupContainer.appendChild(container);

  //! here somewhere there is the error:
  //! this code which will break green container
  //! this doesn't even work because the configPopup() isn't called and turned off

  // var allContainers = document.querySelectorAll(".editor-container");

  // if (allContainers.length > 0) {
  //   allContainers.forEach((container) => {
  //     addEventListenersForContainer(container);
  //   });
  // } else {
  // }


}



function init() {
  try {
    mainContainer = document.getElementById("da-main-container");
    popupContainer = document.getElementById("da-popup-container");

    // configPopup(); //here's the error

    // updateContainers();
    updateDraggables();
    addEventListeners();
    createPlaceHolder();
  } catch (e) { }
}

//* BEGINNING FOR THE 2PART FORM

function createFormContainer(id, heading1, subHeading1, heading2, subHeading2) {
  const container = document.createElement("div");
  container.classList.add("container-fluid");
  container.id = id;

  const card = document.createElement("div");
  card.classList.add("card", "px-5", "pb-5", "col-12", "mx-auto");

  const containerInner = document.createElement("div");
  containerInner.classList.add("container", "mt-3");

  const formTitle = document.createElement("div");
  formTitle.classList.add("form-title");

  const row = document.createElement("div");
  row.classList.add("row");

  const colMd6Step1 = createFormStep("Your profile222", "Contact details");
  const colMd6Step2 = createFormStep("Normally $297. Use coupon code FAP to get 90% OFF", "Billing details");

  row.appendChild(colMd6Step1);
  row.appendChild(colMd6Step2);

  formTitle.appendChild(row);
  containerInner.appendChild(formTitle);

  card.appendChild(containerInner);
  container.appendChild(card);

  return container;
}

function createForm(id, formClass, nextFormId) {
  const form = document.createElement("form");
  form.id = id;
  form.classList.add(formClass);

  const dividerForm = document.createElement("div");
  dividerForm.classList.add("divider-form");
  dividerForm.innerHTML = '<i class="fas fa-caret-up caret-up"></i>';

  form.appendChild(dividerForm);

  return form;
}

function createFormBody(id, inputs1, inputs2, country) {
  const formBody = document.createElement("div");
  formBody.classList.add("form-body", "pt-4");
  formBody.id = id;

  const sectionInfo = document.createElement("section");
  sectionInfo.classList.add("info");

  inputs1.forEach((placeholder) => {
    const input = createInput("text", placeholder);
    sectionInfo.appendChild(input);
  });

  const sectionShipping = document.createElement("section");
  sectionShipping.classList.add("shipping");

  inputs2.forEach((placeholder) => {
    const input = createInput("text", placeholder);
    sectionShipping.appendChild(input);
  });

  const select = document.createElement("select");
  select.classList.add("form-select", "mb-3");
  select.name = "country";

  const option = document.createElement("option");
  option.disabled = true;
  option.value = "";
  option.textContent = "Select Country";

  select.appendChild(option);

  const countryOption = document.createElement("option");
  countryOption.value = "US";
  countryOption.textContent = country;

  select.appendChild(countryOption);

  sectionShipping.appendChild(select);

  const sectionButton = document.createElement("section");

  const button = document.createElement("button");
  button.classList.add("btn", "btn-success", "w-100", "p-2");
  button.type = "button";
  // button.onclick = () => showForm();
  button.innerHTML = `<i class="fas fa-arrow-right fs-5"></i>
                      <span class="main-text fs-4" style="font-weight: 600;"> &nbsp; Go To Step #2 </span><br>
                      <span class="sub-text"></span>`;

  sectionButton.appendChild(button);

  formBody.appendChild(sectionInfo);
  formBody.appendChild(sectionShipping);
  formBody.appendChild(sectionButton);

  return formBody;
}


function createFormButtons(nextFormId, buttonText) {
  const section = document.createElement("section");
  section.classList.add("order-form-footer");

  const button = document.createElement("button");
  button.classList.add("btn", "btn-success", "w-100", "p-2");
  // button.onclick = () => showForm(nextFormId);
  button.innerHTML = `<i class="fas fa-arrow-right fs-5"></i>
                      <span class="main-text fs-4" style="font-weight: 600;"> &nbsp; ${buttonText} </span><br>
                      <span class="sub-text"></span>`;

  section.appendChild(button);

  return section;
}

function createPaymentForm() {
  const form = document.createElement("form");
  form.classList.add("form-payment", "order-form-v2");

  const paymentContent = document.createElement("div");
  paymentContent.classList.add("payment-content");

  const paymentForm = document.createElement("div");
  paymentForm.id = "ctwo-setp-order-payment-form";
  paymentForm.classList.add("payment-form");

  const vSpinner = document.createElement("div");
  vSpinner.classList.add("v-spinner", "loaderClass");
  vSpinner.style.display = "none";

  const vMoon1 = createVMoon("30px", "30px", "100%", "rgb(24, 139, 246)");
  const vMoon2 = createVMoon("4.28571px", "4.28571px", "100%", "rgb(24, 139, 246)");
  const vMoon3 = createVMoon("30px", "30px", "100%", "rgb(24, 139, 246)", "4.28571px");

  vSpinner.appendChild(vMoon1);
  vSpinner.appendChild(vMoon2);
  vSpinner.appendChild(vMoon3);

  paymentForm.appendChild(vSpinner);

  paymentContent.appendChild(paymentForm);
  form.appendChild(paymentContent);

  return form;
}

function createVMoon(height, width, borderRadius, backgroundColor, border) {
  const vMoon = document.createElement("div");
  vMoon.classList.add("v-moon");
  vMoon.style.height = height;
  vMoon.style.width = width;
  vMoon.style.borderRadius = borderRadius;
  vMoon.style.backgroundColor = backgroundColor;

  if (border) {
    vMoon.style.border = border;
  }

  return vMoon;
}

function appendElements(parent, elements) {
  elements.forEach((element) => {
    parent.appendChild(element);
  });
}

//* END FOR 2PART FORM



// * MAIN CODE SECTION ------------------------------------------------------------------

var customDragnDropInitialized = false;



// The popup START - this is the editing popup that's clicked by button
const openPopupButton = document.getElementById("open-popup");
const closePopupButton = document.getElementById("close-popup");
const popup = document.querySelector(".popup-container");
const thebody = document.querySelector("body");
const damaincontainer = document.getElementById("da-main-container");

openPopupButton.addEventListener("click", function (event) {
  event.preventDefault();

  // Display the popup
  popup.classList.add("open");

  popup.style.display = "block";
  thebody.style.backgroundColor = "rgba(100, 100, 100, 0.1)"; // Red with 50% opacity
  // damaincontainer.style.opacity = 0.5;
  damaincontainer.style.display = "none"; // Set the background color to red
});

closePopupButton.addEventListener("click", function (event) {
  event.preventDefault();
  // popup.classList.remove("open");
  closeAllSidebars();
  popup.style.display = "none";

  damaincontainer.style.display = "block"; // Set the background color to red
});
// The popup END





// ***** new function by EU



// hide the url input -- this is only when the page is already loaded -- it looks like the code  in the loadPresetSettings, but we need this too

const urlInputContainers = document.querySelectorAll(".url-input-container");
const actionSelect = document.getElementById("action-select");

actionSelect.addEventListener("change", () => {
  const selectedValue = actionSelect.value;
  urlInputContainers.forEach((container) => {
    if (selectedValue === "#") {
      container.style.display = "flex";
      const urlInput = document.getElementById("url-input");
      if (urlInput.value.trim() === "") {
        urlInput.value = "#";
      }
    } else {
      container.style.display = "none";
    }
  });
});







// this green opener for sections is almost working

document.querySelectorAll(".editor-container").forEach(element => {
  element.addEventListener('click', function (event) {
    // if the `.editor-container` itself was clicked,
    // not any of its children, check if event.target is the element the listener is attached to.
    if (event.target === event.currentTarget) {
      // console.clear();
      // console.log(`contains("editor-container")`);
      //closeAllSidebars();
      GreenGearElement(event.target.id);
      event.stopPropagation();
    }
  });
});




//! this click for all has to be restructured
//*     this is needed when they click out    */
//* this should not include any clickble areas except protecting the other clickable elements from being clicked


document.addEventListener("click", function (event) {
  // ** GREEN STUFF **

  const greenGearButtons = document.querySelectorAll("[id*='green_advanced']");
  const isMarginPaddingPopup = event.target !== marginPaddingPopup && !marginPaddingPopup.contains(event.target);
  const isOutsideGreenPopup = event.target !== setSectionPopup && !setSectionPopup.contains(event.target);


  // ** BLUE STUFF **
  const blueGearButtons = document.querySelectorAll("[id*='blue_gear']");
  const isOutsideBluePopup = event.target !== setColumnPopup && !setColumnPopup.contains(event.target);

  let isBlueGearButton = Array.from(blueGearButtons).some((button) => button === event.target || button.contains(event.target));

  if (isOutsideBluePopup && !isBlueGearButton && isMarginPaddingPopup) {
    setColumnPopup.classList.remove("open");

  }

  const orangeGearButtons = document.querySelectorAll("[id*='orange_gear']");
  const isOutsideHeadlinePopup = event.target !== setHeadlinePopup && !setHeadlinePopup.contains(event.target);
  const isOrangeGearButton = Array.from(orangeGearButtons).some((button) => button.contains(event.target));

  // console.log("is this outside green popup?:" + isOutsideGreenPopup);


  //Close the headline properties - this is for outside headline
  if (isOutsideGreenPopup && isOutsideHeadlinePopup && !isOrangeGearButton && isMarginPaddingPopup) {
    if (currentSelectedHeadlineElement) {
      currentSelectedHeadlineElement(null);
      setHeadlinePopup.classList.remove("open");
    }
  }

  //Close the TwoStep Sidebar
  const isOutsideComboPopup = event.target !== setTwoStepOrderPopup && !setTwoStepOrderPopup.contains(event.target);
  if (isOutsideGreenPopup && isOutsideComboPopup && !isOrangeGearButton && isMarginPaddingPopup) {
    if (currentSelectedComboElement()) {
      currentSelectedComboElement(null);
      setTwoStepOrderPopup.classList.remove("open");
    }
  }


  const isOutsideImagePopup = event.target !== setImagePopup && !setImagePopup.contains(event.target);
  if (isOutsideImagePopup && !isOrangeGearButton && isMarginPaddingPopup) {
    if (currentSelectedImageElement()) {
      currentSelectedImageElement(null);
      setImagePopup.classList.remove("open");
    }
  }
  const isOutsideVideoPopup = event.target !== setVideoPopup && !setVideoPopup.contains(event.target);
  if (isOutsideVideoPopup && !isOrangeGearButton && isMarginPaddingPopup) {
    if (currentSelectedVideoElement()) {
      currentSelectedVideoElement(null);
      setVideoPopup.classList.remove("open");
    }
  }

  const buttonElements = document.querySelectorAll("[id*='the_button']");
  const isButtonElement = Array.from(buttonElements).some((button) => button.contains(event.target));
  const isOutsideButtonPopup = event.target !== setButtonPopup && !setButtonPopup.contains(event.target);
  if (isOutsideButtonPopup && !isOrangeGearButton && !isButtonElement && isMarginPaddingPopup) {
    if (currentSelectedButtonElement) {
      setButtonPopup.classList.remove("open");
    }
  }

  const blueAddButtons = document.querySelectorAll("[id*='blue_add']");
  const isBlueAddButton = Array.from(blueAddButtons).some((button) => button.contains(event.target));
  const orangeAddButtons = document.querySelectorAll("[id*='orange_add']");
  const isOrangeAddButton = Array.from(orangeAddButtons).some((button) => button.contains(event.target));
  const addElementButton = document.getElementById("add-element-button");

  const isAddElementButton = addElementButton.contains(event.target);
  const isOutsideElementsPopup = event.target !== leftSlidingPopup && !leftSlidingPopup.contains(event.target);
  if (isOutsideElementsPopup && !isAddElementButton && !isBlueAddButton && !isOrangeAddButton) {
    if (!leftSlidingPopup.classList.contains("hidden")) closeElementsPanel();
  }

  const isSettingGreenMarginPaddingValue = event.target !== settingGreenMarginPaddingValue && !settingGreenMarginPaddingValue.contains(event.target);
  const isSettingBlueMarginPaddingValue = event.target !== settingBlueMarginPaddingValue && !settingBlueMarginPaddingValue.contains(event.target);
  const isSettingOrangeMarginPaddingValue = event.target !== settingOrangeMarginPaddingValue && !settingOrangeMarginPaddingValue.contains(event.target);
  const isSettingCombMarginPaddingValue = event.target !== settingCombMarginPaddingValue && !settingCombMarginPaddingValue.contains(event.target);
  const isSettingButtonMarginPaddingValue = event.target !== settingButtonMarginPaddingValue && !settingButtonMarginPaddingValue.contains(event.target);
  const isSettingImageMarginPaddingValue = event.target !== settingImageMarginPaddingValue && !settingImageMarginPaddingValue.contains(event.target);
  const isSettingVideoMarginPaddingValue = event.target !== settingVideoMarginPaddingValue && !settingVideoMarginPaddingValue.contains(event.target);
  if (
    isMarginPaddingPopup &&
    isSettingGreenMarginPaddingValue &&
    isSettingBlueMarginPaddingValue &&
    isSettingOrangeMarginPaddingValue &&
    isSettingCombMarginPaddingValue &&
    isSettingButtonMarginPaddingValue &&
    isSettingImageMarginPaddingValue &&
    isSettingVideoMarginPaddingValue
  ) {
    marginPaddingPopup.style.display = "none";
  }
});

function openMarginPaddingPopup(button) {
  marginPaddingPopup.style.display = "block";
  const regex = /-?\d*\.?\d+/g;
  if (desktopBtn.classList.contains("active")) {
    setValueWithNumber.value = button.innerText.match(regex);
  } else if (mobileBtn.classList.contains("active")) {
    setValueWithNumberMobile.value = button.innerText.match(regex);
  }

  setValueWithRange.value = button.innerText.match(regex);
  settingMarginPadding = button;
}
const marginPaddingIds = [
  "setButtonMarginTop",
  "setButtonMarginLeft",
  "setButtonMarginRight",
  "setButtonMarginBottom",
  "setButtonPaddingTop",
  "setButtonPaddingLeft",
  "setButtonPaddingRight",
  "setButtonPaddingBottom",
  "setVideoMarginTop",
  "setVideoMarginLeft",
  "setVideoMarginRight",
  "setVideoMarginBottom",
  "setVideoPaddingTop",
  "setVideoPaddingLeft",
  "setVideoPaddingRight",
  "setVideoPaddingBottom",
  "setCombMarginTop",
  "setCombMarginLeft",
  "setCombMarginRight",
  "setCombMarginBottom",
  "setCombPaddingTop",
  "setCombPaddingLeft",
  "setCombPaddingRight",
  "setCombPaddingBottom",
  "setGreenMarginTop",
  "setGreenMarginLeft",
  "setGreenMarginRight",
  "setGreenMarginBottom",
  "setGreenPaddingTop",
  "setGreenPaddingLeft",
  "setGreenPaddingRight",
  "setGreenPaddingBottom",
  "setOrangeMarginTop",
  "setOrangeMarginLeft",
  "setOrangeMarginRight",
  "setOrangeMarginBottom",
  "setOrangePaddingTop",
  "setOrangePaddingLeft",
  "setOrangePaddingRight",
  "setOrangePaddingBottom",
  "setBlueMarginTop",
  "setBlueMarginLeft",
  "setBlueMarginRight",
  "setBlueMarginBottom",
  "setBluePaddingTop",
  "setBluePaddingLeft",
  "setBluePaddingRight",
  "setBluePaddingBottom",
  "setImageMarginTop",
  "setImageMarginLeft",
  "setImageMarginRight",
  "setImageMarginBottom",
  "setImagePaddingTop",
  "setImagePaddingLeft",
  "setImagePaddingRight",
  "setImagePaddingBottom",
];

marginPaddingIds.map((id) => {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener("click", () => {
      openMarginPaddingPopup(element);
    });
  }
});

setValueWithNumber.addEventListener("input", function () {
  setValueWithRange.value = setValueWithNumber.value;
  settingMarginPadding.innerText = setValueWithNumber.value + setUnit.value;
  setMarginPaddingWithInput();
});

setValueWithNumberMobile.addEventListener("input", function () {
  setValueWithRange.value = setValueWithNumberMobile.value;
  settingMarginPadding.innerText = setValueWithNumberMobile.value + setUnit.value;
  setMarginPaddingWithInput();
});

setValueWithRange.addEventListener("input", function () {
  updateNumber();
});

function updateNumber() {
  if (desktopBtn.classList.contains("active")) {
    setValueWithNumber.value = setValueWithRange.value;
    settingMarginPadding.innerText = setValueWithNumber.value + setUnit.value;
    setMarginPaddingWithInput();
    // Event listener for handling further changes
    setUnit.addEventListener("change", function () {
      settingMarginPadding.innerText = setValueWithNumber.value + setUnit.value;
      setMarginPaddingWithInput();
    });
  } else if (mobileBtn.classList.contains("active")) {
    setValueWithNumberMobile.value = setValueWithRange.value;
    settingMarginPadding.innerText = setValueWithNumberMobile.value + setUnit.value;
    setMarginPaddingWithInput();
    // Event listener for handling further changes
    setUnit.addEventListener("change", function () {
      settingMarginPadding.innerText = setValueWithNumberMobile.value + setUnit.value;
      setMarginPaddingWithInput();
    });
  }

}
const marginPaddingBtnIds = [
  "set-margin-padding-auto-value",
  "set-margin-padding-10-value",
  "set-margin-padding-20-value",
  "set-margin-padding-40-value",
  "set-margin-padding-60-value",
  "set-margin-padding-80-value",
  "set-margin-padding-100-value",
];

marginPaddingBtnIds.map((id) => {
  const div = document.getElementById(id);
  div.addEventListener("click", function () {
    setValue(div);
  });
});

function setValue(div) {
  setValueWithNumber.value = 0;
  setValueWithNumberMobile.value = 0;
  const valueToSet = div.innerText === "AUTO" ? 0 : div.innerText;
  if (desktopBtn.classList.contains("active")) {
    setValueWithNumber.value = valueToSet;
    setValueWithRange.value = valueToSet;
    settingMarginPadding.innerText = div.innerText === "AUTO" ? "AUTO" : valueToSet + setUnit.value;
    setMarginPaddingWithInput();
    setUnit.addEventListener("change", function () {
      setValueWithNumber.value = valueToSet;
      setValueWithRange.value = valueToSet;
      settingMarginPadding.innerText = div.innerText === "AUTO" ? "AUTO" : valueToSet + setUnit.value;
      setMarginPaddingWithInput();
    });
  } else if (mobileBtn.classList.contains("active")) {
    setValueWithNumberMobile.value = valueToSet;
    setValueWithRange.value = valueToSet;
    settingMarginPadding.innerText = div.innerText === "AUTO" ? "AUTO" : valueToSet + setUnit.value;
    setMarginPaddingWithInput();
    setUnit.addEventListener("change", function () {
      setValueWithNumberMobile.value = valueToSet;
      setValueWithRange.value = valueToSet;
      settingMarginPadding.innerText = div.innerText === "AUTO" ? "AUTO" : valueToSet + setUnit.value;
      setMarginPaddingWithInput();
    });
  }
}

function setMarginPaddingWithInput() {

  const elements = {
    setSectionMarginPadding: document.getElementById(currentSelectedGreenElement()),
    setRowColumnMarginPadding: document.getElementById(currentSelectedBlueElement()),
    setElementMarginPadding: document.getElementById(currentSelectedHeadlineContainer()),
    setCombMarginPadding: document.getElementById(currentSelectedComboElement()),
    setButtonMarginPadding: document.getElementById(currentSelectedButtonElement()),
    imageContainer: document.getElementById(currentSelectedImageElement()),
    videoContainer: document.getElementById(currentSelectedVideoElement()),
  };

  const idActionMap = {
    setGreenMarginTop: () => applyStyle("setSectionMarginPadding", "--desktop-margin-top"),
    setGreenMarginLeft: () => applyStyle("setSectionMarginPadding", "--desktop-margin-left"),
    setGreenMarginRight: () => applyStyle("setSectionMarginPadding", "--desktop-margin-right"),
    setGreenPaddingTop: () => applyStyle("setSectionMarginPadding", "--desktop-padding-top"),
    setGreenPaddingLeft: () => applyStyle("setSectionMarginPadding", "--desktop-padding-left"),
    setGreenPaddingRight: () => applyStyle("setSectionMarginPadding", "--desktop-padding-right"),
    setGreenPaddingBottom: () => applyStyle("setSectionMarginPadding", "--desktop-padding-bottom"),
    setGreenMarginBottom: () => applyStyle("setSectionMarginPadding", "--desktop-margin-bottom"),
    setBlueMarginTop: () => applyStyle("setRowColumnMarginPadding", "--desktop-margin-top"),
    setBlueMarginLeft: () => applyStyle("setRowColumnMarginPadding", "--desktop-margin-left"),
    setBlueMarginRight: () => applyStyle("setRowColumnMarginPadding", "--desktop-margin-right"),
    setBluePaddingTop: () => applyStyle("setRowColumnMarginPadding", "--desktop-padding-top"),
    setBluePaddingLeft: () => applyStyle("setRowColumnMarginPadding", "--desktop-padding-left"),
    setBluePaddingRight: () => applyStyle("setRowColumnMarginPadding", "--desktop-padding-right"),
    setBluePaddingBottom: () => applyStyle("setRowColumnMarginPadding", "--desktop-padding-bottom"),
    setBlueMarginBottom: () => applyStyle("setRowColumnMarginPadding", "--desktop-margin-bottom"),
    setOrangeMarginTop: () => applyStyle("setElementMarginPadding", "--desktop-margin-top"),
    setOrangeMarginLeft: () => applyStyle("setElementMarginPadding", "--desktop-margin-left"),
    setOrangeMarginRight: () => applyStyle("setElementMarginPadding", "--desktop-margin-right"),
    setOrangePaddingTop: () => applyStyle("setElementMarginPadding", "--desktop-padding-top"),
    setOrangePaddingLeft: () => applyStyle("setElementMarginPadding", "--desktop-padding-left"),
    setOrangePaddingRight: () => applyStyle("setElementMarginPadding", "--desktop-padding-right"),
    setOrangePaddingBottom: () => applyStyle("setElementMarginPadding", "--desktop-padding-bottom"),
    setOrangeMarginBottom: () => applyStyle("setElementMarginPadding", "--desktop-margin-bottom"),
    setCombMarginTop: () => applyStyle("setCombMarginPadding", "--desktop-margin-top"),
    setCombMarginLeft: () => applyStyle("setCombMarginPadding", "--desktop-margin-left"),
    setCombMarginRight: () => applyStyle("setCombMarginPadding", "--desktop-margin-right"),
    setCombPaddingTop: () => applyStyle("setCombMarginPadding", "--desktop-padding-top"),
    setCombPaddingLeft: () => applyStyle("setCombMarginPadding", "--desktop-padding-left"),
    setCombPaddingRight: () => applyStyle("setCombMarginPadding", "--desktop-padding-right"),
    setCombPaddingBottom: () => applyStyle("setCombMarginPadding", "--desktop-padding-bottom"),
    setCombMarginBottom: () => applyStyle("setCombMarginPadding", "--desktop-margin-bottom"),
    setButtonMarginTop: () => applyStyle("setButtonMarginPadding", "--desktop-margin-top"),
    setButtonMarginLeft: () => applyStyle("setButtonMarginPadding", "--desktop-margin-left"),
    setButtonMarginRight: () => applyStyle("setButtonMarginPadding", "--desktop-margin-right"),
    setButtonPaddingTop: () => applyStyle("setButtonMarginPadding", "--desktop-padding-top", true),
    setButtonPaddingLeft: () => applyStyle("setButtonMarginPadding", "--desktop-padding-left", true),
    setButtonPaddingRight: () => applyStyle("setButtonMarginPadding", "--desktop-padding-right", true),
    setButtonPaddingBottom: () => applyStyle("setButtonMarginPadding", "--desktop-padding-bottom", true),
    setButtonMarginBottom: () => applyStyle("setButtonMarginPadding", "--desktop-margin-bottom"),
    setImageMarginTop: () => applyStyle("imageContainer", "--desktop-margin-top"),
    setImageMarginLeft: () => applyStyle("imageContainer", "--desktop-margin-left"),
    setImageMarginRight: () => applyStyle("imageContainer", "--desktop-margin-right"),
    setImagePaddingTop: () => applyStyle("imageContainer", "--desktop-padding-top"),
    setImagePaddingLeft: () => applyStyle("imageContainer", "--desktop-padding-left"),
    setImagePaddingRight: () => applyStyle("imageContainer", "--desktop-padding-right"),
    setImagePaddingBottom: () => applyStyle("imageContainer", "--desktop-padding-bottom"),
    setImageMarginBottom: () => applyStyle("imageContainer", "--desktop-margin-bottom"),
    setVideoMarginTop: () => applyStyle("videoContainer", "--desktop-margin-top"),
    setVideoMarginLeft: () => applyStyle("videoContainer", "--desktop-margin-left"),
    setVideoMarginRight: () => applyStyle("videoContainer", "--desktop-margin-right"),
    setVideoPaddingTop: () => applyStyle("videoContainer", "--desktop-padding-top"),
    setVideoPaddingLeft: () => applyStyle("videoContainer", "--desktop-padding-left"),
    setVideoPaddingRight: () => applyStyle("videoContainer", "--desktop-padding-right"),
    setVideoPaddingBottom: () => applyStyle("videoContainer", "--desktop-padding-bottom"),
    setVideoMarginBottom: () => applyStyle("videoContainer", "--desktop-margin-bottom"),
  };

  const idActionMapMobile = {
    setGreenMarginTop: () => applyStyleMobile("setSectionMarginPadding", "--mobile-margin-top"),
    setGreenMarginLeft: () => applyStyleMobile("setSectionMarginPadding", "--mobile-margin-left"),
    setGreenMarginRight: () => applyStyleMobile("setSectionMarginPadding", "--mobile-margin-right"),
    setGreenPaddingTop: () => applyStyleMobile("setSectionMarginPadding", "--mobile-padding-top"),
    setGreenPaddingLeft: () => applyStyleMobile("setSectionMarginPadding", "--mobile-padding-left"),
    setGreenPaddingRight: () => applyStyleMobile("setSectionMarginPadding", "--mobile-padding-right"),
    setGreenPaddingBottom: () => applyStyleMobile("setSectionMarginPadding", "--mobile-padding-bottom"),
    setGreenMarginBottom: () => applyStyleMobile("setSectionMarginPadding", "--mobile-margin-bottom"),
    setBlueMarginTop: () => applyStyleMobile("setRowColumnMarginPadding", "--mobile-margin-top"),
    setBlueMarginLeft: () => applyStyleMobile("setRowColumnMarginPadding", "--mobile-margin-left"),
    setBlueMarginRight: () => applyStyleMobile("setRowColumnMarginPadding", "--mobile-margin-right"),
    setBluePaddingTop: () => applyStyleMobile("setRowColumnMarginPadding", "--mobile-padding-top"),
    setBluePaddingLeft: () => applyStyleMobile("setRowColumnMarginPadding", "--mobile-padding-left"),
    setBluePaddingRight: () => applyStyleMobile("setRowColumnMarginPadding", "--mobile-padding-right"),
    setBluePaddingBottom: () => applyStyleMobile("setRowColumnMarginPadding", "--mobile-padding-bottom"),
    setBlueMarginBottom: () => applyStyleMobile("setRowColumnMarginPadding", "--mobile-margin-bottom"),
    setOrangeMarginTop: () => applyStyleMobile("setElementMarginPadding", "--mobile-margin-top"),
    setOrangeMarginLeft: () => applyStyleMobile("setElementMarginPadding", "--mobile-margin-left"),
    setOrangeMarginRight: () => applyStyleMobile("setElementMarginPadding", "--mobile-margin-right"),
    setOrangePaddingTop: () => applyStyleMobile("setElementMarginPadding", "--mobile-padding-top"),
    setOrangePaddingLeft: () => applyStyleMobile("setElementMarginPadding", "--mobile-padding-left"),
    setOrangePaddingRight: () => applyStyleMobile("setElementMarginPadding", "--mobile-padding-right"),
    setOrangePaddingBottom: () => applyStyleMobile("setElementMarginPadding", "--mobile-padding-bottom"),
    setOrangeMarginBottom: () => applyStyleMobile("setElementMarginPadding", "--mobile-margin-bottom"),
    setCombMarginTop: () => applyStyleMobile("setCombMarginPadding", "--mobile-margin-top"),
    setCombMarginLeft: () => applyStyleMobile("setCombMarginPadding", "--mobile-margin-left"),
    setCombMarginRight: () => applyStyleMobile("setCombMarginPadding", "--mobile-margin-right"),
    setCombPaddingTop: () => applyStyleMobile("setCombMarginPadding", "--mobile-padding-top"),
    setCombPaddingLeft: () => applyStyleMobile("setCombMarginPadding", "--mobile-padding-left"),
    setCombPaddingRight: () => applyStyleMobile("setCombMarginPadding", "--mobile-padding-right"),
    setCombPaddingBottom: () => applyStyleMobile("setCombMarginPadding", "--mobile-padding-bottom"),
    setCombMarginBottom: () => applyStyleMobile("setCombMarginPadding", "--mobile-margin-bottom"),
    setButtonMarginTop: () => applyStyleMobile("setButtonMarginPadding", "--mobile-margin-top"),
    setButtonMarginLeft: () => applyStyleMobile("setButtonMarginPadding", "--mobile-margin-left"),
    setButtonMarginRight: () => applyStyleMobile("setButtonMarginPadding", "--mobile-margin-right"),
    setButtonPaddingTop: () => applyStyleMobile("setButtonMarginPadding", "--mobile-padding-top", true),
    setButtonPaddingLeft: () => applyStyleMobile("setButtonMarginPadding", "--mobile-padding-left", true),
    setButtonPaddingRight: () => applyStyleMobile("setButtonMarginPadding", "--mobile-padding-right", true),
    setButtonPaddingBottom: () => applyStyleMobile("setButtonMarginPadding", "--mobile-padding-bottom", true),
    setButtonMarginBottom: () => applyStyleMobile("setButtonMarginPadding", "--mobile-margin-bottom"),
    setImageMarginTop: () => applyStyleMobile("imageContainer", "--mobile-margin-top"),
    setImageMarginLeft: () => applyStyleMobile("imageContainer", "--mobile-margin-left"),
    setImageMarginRight: () => applyStyleMobile("imageContainer", "--mobile-margin-right"),
    setImagePaddingTop: () => applyStyleMobile("imageContainer", "--mobile-padding-top"),
    setImagePaddingLeft: () => applyStyleMobile("imageContainer", "--mobile-padding-left"),
    setImagePaddingRight: () => applyStyleMobile("imageContainer", "--mobile-padding-right"),
    setImagePaddingBottom: () => applyStyleMobile("imageContainer", "--mobile-padding-bottom"),
    setImageMarginBottom: () => applyStyleMobile("imageContainer", "--mobile-margin-bottom"),
    setVideoMarginTop: () => applyStyleMobile("videoContainer", "--mobile-margin-top"),
    setVideoMarginLeft: () => applyStyleMobile("videoContainer", "--mobile-margin-left"),
    setVideoMarginRight: () => applyStyleMobile("videoContainer", "--mobile-margin-right"),
    setVideoPaddingTop: () => applyStyleMobile("videoContainer", "--mobile-padding-top"),
    setVideoPaddingLeft: () => applyStyleMobile("videoContainer", "--mobile-padding-left"),
    setVideoPaddingRight: () => applyStyleMobile("videoContainer", "--mobile-padding-right"),
    setVideoPaddingBottom: () => applyStyleMobile("videoContainer", "--mobile-padding-bottom"),
    setVideoMarginBottom: () => applyStyleMobile("videoContainer", "--mobile-margin-bottom"),
  };


  function applyStyle(elementKey, styleProperty, isChild = false) {
    const element = isChild ? elements[elementKey].childNodes[0] : elements[elementKey];
    if (element) {
      console.log(setValueWithNumber.value, 'setValueWithNumber');
      element.style.setProperty(styleProperty, `${setValueWithNumber.value}${setUnit.value}`);
    }
  }

  function applyStyleMobile(elementKey, styleProperty, isChild = false) {
    const element = isChild ? elements[elementKey].childNodes[0] : elements[elementKey];
    if (element) {
      console.log(setValueWithNumberMobile.value, 'setValueWithNumberMobile');
      element.style.setProperty(styleProperty, `${setValueWithNumberMobile.value}${setUnit.value}`);
    }
  }


  if (desktopBtn.classList.contains("active")) {
    const action = idActionMap[settingMarginPadding.getAttribute("id")];
    if (action) action();
  } else if (mobileBtn.classList.contains("active")) {
    const actionMobile = idActionMapMobile[settingMarginPadding.getAttribute("id")];
    if (actionMobile) actionMobile();
  }

}

// Event listener for reset button
document.getElementById("set-value-reset").addEventListener("click", function () {
  setValueReset();
});

function setValueReset() {
  if (desktopBtn.classList.contains("active")) {
    setValueWithNumber.value = "0";
    setValueWithRange.value = 0;
    settingMarginPadding.innerText = setValueWithNumber.value + setUnit.value;
  } else if (mobileBtn.classList.contains("active")) {
    setValueWithNumberMobile.value = "0";
    setValueWithRange.value = 0;
    settingMarginPadding.innerText = setValueWithNumberMobile.value + setUnit.value;
  }

  setMarginPaddingWithInput();
}






function getButtonContainerId(div) {
  buttonContainerId = div.id;
}
