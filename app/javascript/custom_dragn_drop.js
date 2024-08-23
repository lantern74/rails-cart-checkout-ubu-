
var { closeAllSidebars, closeAllTextEditPopups, anyOfTheSidebarsOpen, traverseAndSetUniqueId, getRandomColor, moveUp, moveDown, removeElement, updateTextareaFromContainer } = require("./editor-components");
var { GreenGearElement, currentSelectedGreenElement } = require("./editor-components");
var { BlueGearElement, currentSelectedBlueElement } = require("./editor-components");
var { OrangeGearElement, addOrangeDraggingPoints, addEventListenersForContainer } = require("./editor-components");
var { createContainer, addGreenTools, sectionControl } = require("./editor-components");
var { createRowSection, addBlueTools, rowControl, handleMouseEnter, handleMouseLeave, setupMouseInteractions, setupResizingBehavior, createDivCol1 } = require("./editor-components");
var { addYellowElementButton, elementControl, editTextControl, openAddElementPopup, closeElementsPanel, currentChosenField } = require("./editor-components");


var { currentSelectedHeadlineElement } = require("./editor-components");
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

        let allButtons = container.querySelectorAll(".elBTN");
        allButtons.forEach((buttonContainer) => {
          buttonContainer.addEventListener("click", function (event) {
            getButtonContainerId(this);
          });
        }); // allButtons



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
  console.log("new green stuff"); //old stuff is in custom_drag_cut

  const greenGearButtons = document.querySelectorAll("[id*='green_advanced']");
  const isMarginPaddingPopup = event.target !== marginPaddingPopup && !marginPaddingPopup.contains(event.target);
  const isOutsideGreenPopup = event.target !== setSectionPopup && !setSectionPopup.contains(event.target);


  // ** BLUE STUFF **
  console.log("blue stuff");
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
  if (isOutsideComboPopup && !isOrangeGearButton && isMarginPaddingPopup) {
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
  setValueWithNumber.value = button.innerText.match(regex);
  setValueWithRange.value = button.innerText.match(regex);
  settingMarginPadding = button;
}
const marginPaddingIds = [
  "setButtonMarginTop",
  "setButtonMarginBottom",
  "setButtonPaddingTop",
  "setButtonPaddingLeft",
  "setButtonPaddingRight",
  "setButtonPaddingBottom",
  "setVideoMarginTop",
  "setVideoMarginBottom",
  "setVideoPaddingTop",
  "setVideoPaddingLeft",
  "setVideoPaddingRight",
  "setVideoPaddingBottom",
  "setCombMarginTop",
  "setCombMarginBottom",
  "setCombPaddingTop",
  "setCombPaddingLeft",
  "setCombPaddingRight",
  "setCombPaddingBottom",
  "setGreenMarginTop",
  "setGreenMarginBottom",
  "setGreenPaddingTop",
  "setGreenPaddingLeft",
  "setGreenPaddingRight",
  "setGreenPaddingBottom",
  "setOrangeMarginTop",
  "setOrangeMarginBottom",
  "setOrangePaddingTop",
  "setOrangePaddingLeft",
  "setOrangePaddingRight",
  "setOrangePaddingBottom",
  "setBlueMarginTop",
  "setBlueMarginBottom",
  "setBluePaddingTop",
  "setBluePaddingLeft",
  "setBluePaddingRight",
  "setBluePaddingBottom",
  "setImageMarginTop",
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
  setMarginPaddingWithInput();
});

setValueWithRange.addEventListener("input", function () {
  updateNumber();
});

function updateNumber() {
  setValueWithNumber.value = setValueWithRange.value;
  settingMarginPadding.innerText = setValueWithNumber.value + setUnit.value;
  setMarginPaddingWithInput();
  // Event listener for handling further changes
  setUnit.addEventListener("change", function () {
    settingMarginPadding.innerText = setValueWithNumber.value + setUnit.value;
    setMarginPaddingWithInput();
  });
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
  const valueToSet = div.innerText === "AUTO" ? 0 : div.innerText;
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
}

function setMarginPaddingWithInput() {


  const elements = {
    setSectionMarginPadding: document.getElementById(currentSelectedGreenElement()),
    setRowColumnMarginPadding: document.getElementById(currentSelectedBlueElement()),
    setElementMarginPadding: document.getElementById(currentSelectedHeadlineElement()), // *DONE
    setCombMarginPadding: document.getElementById(currentSelectedComboElement()),
    // setCombMarginPadding: document.getElementById(currentSelectedComboElement),
    // setButtonMarginPadding: document.getElementById(buttonContainerId),
    setButtonMarginPadding: document.getElementById(currentSelectedButtonElement()),
    imageContainer: document.getElementById(currentSelectedImageElement()),
    videoContainer: document.getElementById(currentSelectedVideoElement()),
  };

  const idActionMap = {
    setGreenMarginTop: () => applyStyle("setSectionMarginPadding", "marginTop"),
    setGreenPaddingTop: () => applyStyle("setSectionMarginPadding", "paddingTop"),
    setGreenPaddingLeft: () => applyStyle("setSectionMarginPadding", "paddingLeft"),
    setGreenPaddingRight: () => applyStyle("setSectionMarginPadding", "paddingRight"),
    setGreenPaddingBottom: () => applyStyle("setSectionMarginPadding", "paddingBottom"),
    setGreenMarginBottom: () => applyStyle("setSectionMarginPadding", "marginBottom"),
    setBlueMarginTop: () => applyStyle("setRowColumnMarginPadding", "marginTop"),
    setBluePaddingTop: () => applyStyle("setRowColumnMarginPadding", "paddingTop"),
    setBluePaddingLeft: () => applyStyle("setRowColumnMarginPadding", "paddingLeft"),
    setBluePaddingRight: () => applyStyle("setRowColumnMarginPadding", "paddingRight"),
    setBluePaddingBottom: () => applyStyle("setRowColumnMarginPadding", "paddingBottom"),
    setBlueMarginBottom: () => applyStyle("setRowColumnMarginPadding", "marginBottom"),
    setOrangeMarginTop: () => applyStyle("setElementMarginPadding", "marginTop"),
    setOrangePaddingTop: () => applyStyle("setElementMarginPadding", "paddingTop"),
    setOrangePaddingLeft: () => applyStyle("setElementMarginPadding", "paddingLeft"),
    setOrangePaddingRight: () => applyStyle("setElementMarginPadding", "paddingRight"),
    setOrangePaddingBottom: () => applyStyle("setElementMarginPadding", "paddingBottom"),
    setOrangeMarginBottom: () => applyStyle("setElementMarginPadding", "marginBottom"),
    setCombMarginTop: () => applyStyle("setCombMarginPadding", "marginTop"),
    setCombPaddingTop: () => applyStyle("setCombMarginPadding", "paddingTop"),
    setCombPaddingLeft: () => applyStyle("setCombMarginPadding", "paddingLeft"),
    setCombPaddingRight: () => applyStyle("setCombMarginPadding", "paddingRight"),
    setCombPaddingBottom: () => applyStyle("setCombMarginPadding", "paddingBottom"),
    setCombMarginBottom: () => applyStyle("setCombMarginPadding", "marginBottom"),
    setButtonMarginTop: () => applyStyle("setButtonMarginPadding", "marginTop"),
    setButtonPaddingTop: () => applyStyle("setButtonMarginPadding", "paddingTop", true),
    setButtonPaddingLeft: () => applyStyle("setButtonMarginPadding", "paddingLeft", true),
    setButtonPaddingRight: () => applyStyle("setButtonMarginPadding", "paddingRight", true),
    setButtonPaddingBottom: () => applyStyle("setButtonMarginPadding", "paddingBottom", true),
    setButtonMarginBottom: () => applyStyle("setButtonMarginPadding", "marginBottom"),
    setImageMarginTop: () => applyStyle("imageContainer", "marginTop"),
    setImagePaddingTop: () => applyStyle("imageContainer", "paddingTop"),
    setImagePaddingLeft: () => applyStyle("imageContainer", "paddingLeft"),
    setImagePaddingRight: () => applyStyle("imageContainer", "paddingRight"),
    setImagePaddingBottom: () => applyStyle("imageContainer", "paddingBottom"),
    setImageMarginBottom: () => applyStyle("imageContainer", "marginBottom"),
    setVideoMarginTop: () => applyStyle("videoContainer", "marginTop"),
    setVideoPaddingTop: () => applyStyle("videoContainer", "paddingTop"),
    setVideoPaddingLeft: () => applyStyle("videoContainer", "paddingLeft"),
    setVideoPaddingRight: () => applyStyle("videoContainer", "paddingRight"),
    setVideoPaddingBottom: () => applyStyle("videoContainer", "paddingBottom"),
    setVideoMarginBottom: () => applyStyle("videoContainer", "marginBottom"),
  };

  function applyStyle(elementKey, styleProperty, isChild = false) {
    const element = isChild ? elements[elementKey].childNodes[0] : elements[elementKey];
    if (element) {
      element.style[styleProperty] = `${setValueWithNumber.value}${setUnit.value}`;
    }
  }

  const action = idActionMap[settingMarginPadding.getAttribute("id")];
  if (action) action();
}

// Event listener for reset button
document.getElementById("set-value-reset").addEventListener("click", function () {
  setValueReset();
});

function setValueReset() {
  setValueWithNumber.value = "0";
  setValueWithRange.value = 0;
  settingMarginPadding.innerText = setValueWithNumber.value + setUnit.value;
  setMarginPaddingWithInput();
}






function getButtonContainerId(div) {
  buttonContainerId = div.id;
}
