import React from "react";
import ReactDOM from "react-dom/client";
import { closeAllSidebars, closeAllTextEditPopups, anyOfTheSidebarsOpen, getRandomColor, updateTextareaFromContainer } from "../editor_functions";
import { ImageGearElement } from "../imageGearElement/ImageGearElement";
import { VideoGearElement } from "../videoGearElement/VideoGearElement";
import { HeadlineGearElement } from "../headlineGearElement/HeadlineGearElement";
import { TwoStepGearElement } from "../twoStepGearElement/TwoStepGearElement";
import { ButtonGearElement } from "../buttonGearElement/ButtonGearElement";
import { createTextElement, createImageElement, createVideoElement, createListElement, createButtonElement, createCountdownElement, createInputField, createInputElement, createEmailElement, createPhoneElement, createCombElement } from "../createElement/CreateElement";

// Settings for Orange Section Container
let selectedOrangeSection = null;
let afterElement = undefined;
let placeholder = undefined;
var existingElement = undefined;
const container = document.querySelector(".deviceview");

function OrangeGearElement(element) {
  event.stopPropagation();

  var parentWrapper = element;
  var firstChild = parentWrapper.firstChild;
  var parentType = element.getAttribute("data-de-type");

  if (parentType === "headline-field" || parentType === "subhead-field" || parentType === "paragraph-field") {
    document.getElementById("icon-field").style.display = "none";
    HeadlineGearElement(parentWrapper, parentType);

    if (setHeadlinePopup.classList.contains("open")) {
      closeAllSidebars();
      document.getElementById("marginPaddingPopup").style.display = "none";
    } else {
      setHeadlinePopup.classList.add("open");
    }
  } else if (parentType === "Bullet List") {
    document.getElementById("icon-field").style.display = "block";
    HeadlineGearElement(parentWrapper, parentType);

    if (setHeadlinePopup.classList.contains("open")) {
      closeAllSidebars();
      document.getElementById("marginPaddingPopup").style.display = "none";
    } else {
      setHeadlinePopup.classList.add("open");
    }
  } else if (parentType === "button") {
    ButtonGearElement(firstChild);
  } else if (parentType === "combo") {
    console.log("open the bar dude");
    TwoStepGearElement(parentWrapper);
    if (setTwoStepOrderPopup.classList.contains("open")) {
      closeAllSidebars();
      document.getElementById("marginPaddingPopup").style.display = "none";
    } else {
      setTwoStepOrderPopup.classList.add("open");
    }
  } else if (parentType === "image") {
    ImageGearElement(parentWrapper);
  } else if (parentType === "video") {
    VideoGearElement(parentWrapper);
  } else {
    document.getElementById("icon-field").style.display = "none";
    HeadlineGearElement(parentWrapper, parentType);
    if (setHeadlinePopup.classList.contains("open")) {
      closeAllSidebars();
      document.getElementById("marginPaddingPopup").style.display = "none";
    } else {
      setHeadlinePopup.classList.add("open");
    }
  }
}

function addOrangeDraggingPoints(contId) {
  var newContainer = document.getElementById(contId);
  var allContainers = newContainer.querySelectorAll(".col-div");

  if (allContainers.length > 0) {
    allContainers.forEach((container) => {
      var condition = container.getAttribute("data-drag-to");
      if (!condition) {
        container.setAttribute("data-drag-to", "true");
        addEventListenersForContainer(container);
      }
    });
    // updateContainers();
  } else {
    // Handle the case when no elements with the class .editor-container are found.
    // You can choose to display an error message or take appropriate action here.
  }
}

function addEventListenersForContainer(container) {
  container.addEventListener("dragover", (e) => onDragHover(e, container, false));
  container.addEventListener("drop", (e) => onDragDrop(e), false);
  container.addEventListener("dragleave", (e) => onDragLeave(e), false);
  container.addEventListener("dragenter", (e) => onDragEnter(e), false);
}

function onDragHover(e, container) {
  e.preventDefault();
  afterElement = getDragAfterElement(container, e.clientY);

  if (afterElement == null) {
    container.appendChild(placeholder);
  } else {
    createPlaceHolder = function () {
      placeholder = document.createElement("div");
      placeholder.style.height = "5px";
      placeholder.style.borderRadius = "5px";
      placeholder.style.backgroundColor = "#ffa500";
      placeholder.style.margin = "10px 0";
      placeholder = placeholder;
    };

    container.insertBefore(placeholder, afterElement);
  }

  createPlaceHolder = function () {
    placeholder = document.createElement("div");
    placeholder.style.height = "5px";
    placeholder.style.borderRadius = "5px";
    placeholder.style.backgroundColor = "#ffa500";
    placeholder.style.margin = "10px 0";
    placeholder = placeholder;
  };
}

function onDragEnter(e) {
  console.log("onDragEnter");
  e.preventDefault();
}

function onDragLeave(e) {
  console.log("onDragLeave");

  // var dragPlaceholder = document.querySelector('[id*="placeholder-"]');
  // if (dragPlaceholder) {
  //   dragPlaceholder.remove();
  // }

  e.preventDefault();
}

function onDragDrop(e) {
  console.log("onDragDrop");

  e.preventDefault();
  placeholder.replaceWith(elementToInsert);
}

createPlaceHolder = function () {
  placeholder = document.createElement("div");
  placeholder.style.height = "5px";
  placeholder.style.borderRadius = "5px";
  placeholder.style.backgroundColor = "#ffa500";
  placeholder.style.margin = "10px 0";
  placeholder = placeholder;
};

updateDraggables = function () {
  draggables = document.querySelectorAll(".draggable");
};

addEventListeners = function () {
  if (draggables) {
    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", (e) => onDragStart(e, draggable), false);
      draggable.addEventListener("dragend", (e) => onDragEnd(e, draggable), false);
    });
  }
};

getDragAfterElement = function (container, y) {
  const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return {
          offset: offset,
          element: child,
        };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
};

function insertEl(e, draggable, interactionType, currentChosenField = null) {
  e.stopPropagation();
  let creationFunctions = {
    "headline-field": () => createTextElement("headline-field"),
    "subhead-field": () => createTextElement("subhead-field"),
    "paragraph-field": () => createTextElement("paragraph-field"),
    "image-field": createImageElement,
    "video-field": createVideoElement,
    "list-field": createListElement,
    "button-field": createButtonElement,
    "countdown-field": createCountdownElement,
    "input-field": createInputElement,
    "email-field": createEmailElement,
    "2step-combo": createCombElement,
    "phone-field": createPhoneElement,
  };

  let existingElement = true;
  if (draggable && draggable.getAttribute("name")) {
    let element = draggable.getAttribute("name");
    console.log(element, "dragelement");

    let wrapperFunction = creationFunctions[element];
    if (wrapperFunction) {
      elementToInsert = wrapperFunction();
      existingElement = false;
    } else {
      elementToInsert = draggable;
    }
  } else {
    elementToInsert = draggable;
  }
  //? /\ above is basically a function that recognizes if it's a new element or draggable element, if new it wraps it
  //? also it tells us if it's existing element or not

  // Handling based on interaction type
  // ? interactionType = can be only "drag" or "click"
  if (interactionType === "drag") {
    // ! we are dragging
    placeholder.setAttribute("id", `placeholder-${Date.now()}`);
    draggable.classList.add("dragging");
  } else if (interactionType === "click") {
    // We are clicking and adding the element from the side menu

    if (currentChosenField == "") {
      currentChosenField = document.querySelector(".col-div.blue-container");
    }

    if (currentChosenField) {
      currentChosenField.appendChild(elementToInsert);
    }
  }
}

addElementWithClick = function (e, draggable, currentChosenField) {
  console.log("click element");
  insertEl(e, draggable, "click", currentChosenField);
  if (!existingElement) {
    addEventListenerForDraggableItem(elementToInsert);
    updateDraggables("draggables");
  } else {
    elementToInsert.classList.remove("dragging");
  }
};

onDragStart = function (e, draggable) {
  console.log("ondragstart");
  insertEl(e, draggable, "drag");
};

function onDragEnd(e, draggable) {
  console.log("ondragend");
  draggable.classList.remove("dragging");
  updateTextareaFromContainer("da-main-container", "step[large_html_blob_content]");
  updateTextareaFromContainer("da-popup-container", "step[popup_html_blob_content]");

  var setButtonPopup = document.getElementById("setButtonPopup");

  var anchor = elementToInsert.querySelector("a.elSettings");

  if (anchor) {
    anchor.addEventListener("click", function (event) {
      event.preventDefault();
      setButtonPopup.classList.contains("open") ? closeAllSidebars() : ButtonGearElement(anchor);
      event.stopPropagation();
    });
  }

  if (!existingElement) {
    addEventListenerForDraggableItem(elementToInsert);
    updateDraggables("draggables");
  } else {
    elementToInsert.classList.remove("dragging");
  }
  var dragPlaceholder = document.querySelector('[id*="placeholder-"]');
  if (dragPlaceholder) {
    dragPlaceholder.remove();
  }
}

function addEventListenerForDraggableItem(element) {
  element.addEventListener("dragstart", (e) => onDragStart(e, element));
  element.addEventListener("dragend", (e) => onDragEnd(e, element));

  const elHeadlineElements = element.querySelectorAll(".elHeadline, .elText, .elSubHeadline"); // Select .elHeadline elements inside the div

  // Add click event listener for content editing to each .elHeadline element
  elHeadlineElements.forEach((elHeadlineElement) => {
    elHeadlineElement.addEventListener("mousedown", function () {
      elHeadlineElement.setAttribute("contenteditable", "true");
      elHeadlineElement.style.cursor = "text";
    });
  });
}

// General and Advanced tab panel for Orange Section
const orangeGeneralTab = document.getElementById("orange-general-tab");
const orangeGeneralContent = document.getElementById("orange-general-content");
const orangeAdvancedTab = document.getElementById("orange-advanced-tab");
const orangeAdvancedContent = document.getElementById("orange-advanced-content");
orangeGeneralTab.addEventListener("click", function () {
  orangeGeneralContent.classList.add("active");
  orangeGeneralTab.classList.add("active");
  orangeAdvancedContent.classList.remove("active");
  orangeAdvancedTab.classList.remove("active");
});
orangeAdvancedTab.addEventListener("click", function () {
  orangeGeneralContent.classList.remove("active");
  orangeGeneralTab.classList.remove("active");
  orangeAdvancedContent.classList.add("active");
  orangeAdvancedTab.classList.add("active");
});

//*! shouldn't it be orange????? we are in the orange */
// maybe it's for the creating a new window from the blue container when they click on the button
const blueSettingClose = document.getElementById("bluepopup-close");
blueSettingClose.addEventListener("click", function () {
  selectedBlueSection = null;
  setColumnPopup.classList.remove("open");
});

// export the currentSelectedOrangeElement that has the right value

const currentSelectedOrangeElement = (args) => {
  if (args) {
    selectedOrangeSection = args;
  }
  return selectedOrangeSection;
};

export { OrangeGearElement, addOrangeDraggingPoints, selectedOrangeSection, currentSelectedOrangeElement, addEventListenersForContainer };
