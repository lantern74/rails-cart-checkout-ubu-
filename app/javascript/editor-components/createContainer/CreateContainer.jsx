import React from "react";
import ReactDOM from "react-dom/client";
import { closeAllSidebars, closeAllTextEditPopups, traverseAndSetUniqueId, moveUp, moveDown, removeElement } from "../editor_functions";
import { GreenGearElement } from "../greenGearElement/GreenGearElement";
import { rowControl } from "../createRow/CreateRow";
import { elementControl, editTextControl } from "../addElement/AddElement";

var mainContainerSection = document.getElementById("da-main-container");
var popupContainerSection = document.getElementById("da-popup-container");

function createContainer(width, containerId) {
  var originContainer = document.getElementById(containerId);
  var container = document.createElement("div");
  var key = new Date().getTime();
  container.setAttribute("id", key);
  container.classList.add("editor-container", "new-section", "new-container");
  const desktopBtn = document.getElementById("desktopBtn");
  const mobileBtn = document.getElementById("mobileBtn");
  if (desktopBtn.classList.contains("active")) {
    container.classList.add("mp-desktop-view");
  } else {
    container.classList.add("mp-mobile-view");
  }
  container.style.width = width;
  container.style.margin = "auto";
  container.style.setProperty("--desktop-margin-top", "0px");
  container.style.setProperty("--desktop-margin-left", "0px");
  container.style.setProperty("--desktop-margin-right", "0px");
  container.style.setProperty("--desktop-margin-bottom", "0px");
  container.style.setProperty("--desktop-padding-top", "20px");
  container.style.setProperty("--desktop-padding-left", "0px");
  container.style.setProperty("--desktop-padding-right", "0px");
  container.style.setProperty("--desktop-padding-bottom", "20px");
  container.style.setProperty("--mobile-margin-top", "0px");
  container.style.setProperty("--mobile-margin-left", "0px");
  container.style.setProperty("--mobile-margin-right", "0px");
  container.style.setProperty("--mobile-margin-bottom", "0px");
  container.style.setProperty("--mobile-padding-top", "20px");
  container.style.setProperty("--mobile-padding-left", "0px");
  container.style.setProperty("--mobile-padding-right", "0px");
  container.style.setProperty("--mobile-padding-bottom", "20px");
  setSectionWidthPopup.classList.remove("open");

  addGreenTools(container);

  if (isPopupOpen()) {
    if (popupContainerSection.childNodes[0]) {
      popupContainerSection.insertBefore(container, originContainer.nextSibling);
    } else {
      popupContainerSection.appendChild(container);
    }
  } else {
    if (mainContainerSection.childNodes[0]) {
      mainContainerSection.insertBefore(container, originContainer.nextSibling);
    } else {
      mainContainerSection.appendChild(container);
    }
  }
}

function addGreenTools(container) {
  var containerId = container.getAttribute("id");
  var greenRolloverTools = document.createElement("div");
  greenRolloverTools.classList.add("de-rollover-tools", "green", "smallWidthElementHover", "d-flex", "flex-column");
  greenRolloverTools.style.display = "none";

  var greenArrowRolloverTools = document.createElement("div");
  greenArrowRolloverTools.classList.add("arrow-de-rollover-tools", "green", "smallWidthElementHover", "d-flex", "flex-column");
  greenArrowRolloverTools.style.display = "none";

  var greenPlusRolloverTools = document.createElement("div");
  greenPlusRolloverTools.setAttribute("id", `plus-container-${containerId}`);
  greenPlusRolloverTools.classList.add("plus-de-rollover-tools", "green", "smallWidthElementHover", "d-flex", "flex-column");
  greenPlusRolloverTools.style.display = "none";

  var greenAddRowRolloverTools = document.createElement("div");
  greenAddRowRolloverTools.classList.add("add-row-de-rollover-tools", "green", "smallWidthElementHover", "d-flex");
  greenAddRowRolloverTools.style.display = "none";

  var greenAddRowPlusRolloverTools = document.createElement("div");
  greenAddRowPlusRolloverTools.style.position = "relative";

  appendGreenButton(greenRolloverTools, "de-rollover-move", "#37ca37", "fa fa-arrows");
  appendGreenButton(greenRolloverTools, "de-rollover-clone", "#37ca37", "fa fa-copy");
  appendGreenButton(greenRolloverTools, "de-rollover-remove", "#37ca37", "fa fa-trash");

  appendGreenButton(greenArrowRolloverTools, "de-rollover-arrow-up", "#37ca37", "fa fa-arrow-up");
  appendGreenButton(greenArrowRolloverTools, "de-rollover-arrow-down", "#37ca37", "fa fa-arrow-down");
  appendGreenButton(greenArrowRolloverTools, "de-rollover-advanced", "#37ca37", "fa fa-cog", `green_advanced-${Date.now()}`);
  appendGreenButton(greenPlusRolloverTools, "de-rollover-plus-circle", "#37ca37", "fa fa-plus", null, "-50%");
  appendGreenButton(greenAddRowRolloverTools, "container-fluid p-3 rounded", null, null, null, null, '<button class="add-row btn fs-5 w-100 text-green bg-lightgreen" style="padding:20px 0 !important"> + Add Row</button>');
  appendGreenButton(greenAddRowPlusRolloverTools, "add-row-plus-de-rollover-tools", null, "fa fa-plus", null, null, null, "fa-plus-custom-classes");

  container.prepend(greenAddRowPlusRolloverTools);
  container.prepend(greenAddRowRolloverTools);
  container.prepend(greenPlusRolloverTools);
  container.prepend(greenArrowRolloverTools);
  container.prepend(greenRolloverTools);

  sectionControl(container);
}

function appendGreenButton(parent, className, backgroundColor, iconClass, id = null, left = null, customHTML = null, innerElementClasses = "") {
  var button = document.createElement("div");
  button.classList.add(...className.split(" ")); // Split className to support multiple classes
  button.style.display = "none"; // Default to hidden
  if (backgroundColor) button.style.backgroundColor = backgroundColor;
  if (left) button.style.left = left;

  if (customHTML) {
    // Use customHTML when provided
    button.innerHTML = customHTML;
  } else if (iconClass) {
    // Use iconClass to construct an icon button
    button.innerHTML = `<i class="${iconClass} ${innerElementClasses}"></i>`;
  }

  button.setAttribute("type", "button");
  if (id) button.setAttribute("id", id);

  parent.appendChild(button);
}

function sectionControl(cont) {
  var greenRolloverTools = cont.childNodes[0];
  var greenArrowRolloverTools = cont.childNodes[1];
  var greenPlusRolloverTools = cont.childNodes[2];
  var greenAddRowRolloverTools = cont.childNodes[3];

  var greenAddRowPlusRolloverTools = cont.childNodes[4];
  var greenMoveButton = greenRolloverTools.childNodes[0];
  var greenCloneButton = greenRolloverTools.childNodes[1];
  var greenRemoveButton = greenRolloverTools.childNodes[2];

  var greenArrowUpButton = greenArrowRolloverTools.childNodes[0];
  var greenArrowDownButton = greenArrowRolloverTools.childNodes[1];
  var greenGearButton = greenArrowRolloverTools.childNodes[2];

  var greenPlusCircle = greenPlusRolloverTools.childNodes[0];
  var greenAddRowButton = greenAddRowRolloverTools.childNodes[0];
  var greenAddRowPlusButton = greenAddRowPlusRolloverTools.childNodes[0];

  // ## add the roll over tools for the green container

  greenGearButton.addEventListener("click", function (e) {
    GreenGearElement(this.parentElement.parentElement.id);
    e.stopPropagation();
  });

  greenRemoveButton.addEventListener("click", function (e) {
    removeElement(this.parentElement.parentElement);
    e.stopPropagation();
  });

  greenArrowUpButton.addEventListener("click", function (e) {
    moveUp(this.parentElement.parentElement);
    e.stopPropagation();
  });

  greenArrowDownButton.addEventListener("click", function (e) {
    moveDown(this.parentElement.parentElement);
    e.stopPropagation();
  });

  if (greenCloneButton) {
    greenCloneButton.addEventListener("click", function (e) {
      greenClone(cont);
      e.stopPropagation();
    });
  }

  greenAddRowButton.addEventListener("click", function (e) {
    var target = e.target;
    let parentNode = target.parentNode.parentNode.parentNode;
    if (parentNode.classList.contains("new-container")) {
      // was   id = parentNode.getAttribute("id");
      currentContainerId = parentNode.getAttribute("id");
    }
    if (setColumnNumberPopup.classList.contains("open")) {
      closeAllSidebars();
      setColumnNumberPopup.classList.remove("open");
    } else {
      closeAllSidebars();
      setColumnNumberPopup.classList.add("open");

      setColumnNumberPopup.classList.forEach((className) => {
        if (/^\d+$/.test(className)) {
          setColumnNumberPopup.classList.remove(className);
        }
      });
      setColumnNumberPopup.classList.add(currentContainerId);
    }
    e.stopPropagation();
  });

  // ## end of the green container tools

  // another CLICK LISTENER??????? This is for the new items
  document.addEventListener("click", function (event) {
    const isOutsideGreenPopup = event.target !== setSectionPopup && !setSectionPopup.contains(event.target);
    const isSetSectionPopup = event.target === cont && cont.contains(event.target);
    const isMarginPaddingPopup = event.target !== marginPaddingPopup && !marginPaddingPopup.contains(event.target);
    // console.log(`%c isSetSectionPopup:`+isSetSectionPopup)
    // console.log("isOutsideGreenPopup:"+isOutsideGreenPopup)

    // TODO: fix later: ------------it doesn't work when you are in the orange container and you click on it anywhere,
    // TODO: then it thinks it's green container
    // this might have been an issue but I turned it back on and it seems that it's working fine now
    // GreenGearElement(event.target.id);
    // console.log("temporarily turned off GreenGearElement ");

    // * close the green popup if...
    if (isSetSectionPopup) {
      GreenGearElement(event.target.id);
      if (setSectionPopup.classList.contains("open")) {
        closeAllSidebars();
      } else {
        closeAllSidebars();
      }
    } else if (isOutsideGreenPopup && isMarginPaddingPopup) {
      setSectionPopup.classList.remove("open");
    }

    event.stopPropagation();
  });

  cont.addEventListener("mouseenter", (e) => {
    greenRolloverTools.style.display = "block";
    greenArrowRolloverTools.style.display = "block";
    greenPlusRolloverTools.style.display = "block";
    greenAddRowRolloverTools.style.display = "block";
    greenMoveButton.style.display = "block";
    greenGearButton.style.display = "block";
    greenCloneButton.style.display = "block";
    greenRemoveButton.style.display = "block";
    greenArrowUpButton.style.display = "block";
    greenArrowDownButton.style.display = "block";
    greenPlusCircle.style.display = "block";
    greenAddRowButton.style.display = "block";
    greenAddRowPlusButton.style.display = "none";
    if (cont.childNodes[5]) {
      greenAddRowRolloverTools.style.display = "none";
      greenAddRowButton.style.display = "none";
    } else {
      greenAddRowRolloverTools.style.display = "block";
      greenAddRowButton.style.display = "block";
    }
    cont.style.border = "3px solid #37ca37";
    cont.style.position = "relative";
  });
  cont.addEventListener("mouseleave", (e) => {
    greenRolloverTools.style.display = "none";
    greenArrowRolloverTools.style.display = "none";
    greenPlusRolloverTools.style.display = "none";
    greenAddRowRolloverTools.style.display = "none";
    greenMoveButton.style.display = "none";
    greenGearButton.style.display = "none";
    greenCloneButton.style.display = "none";
    greenRemoveButton.style.display = "none";
    greenArrowUpButton.style.display = "none";
    greenArrowDownButton.style.display = "none";
    greenPlusCircle.style.display = "none";
    greenAddRowButton.style.display = "none";
    greenAddRowPlusButton.style.display = "block";
    if (cont.childNodes[5]) {
      greenAddRowPlusButton.style.display = "none";
    } else {
      greenAddRowPlusButton.style.display = "block";
    }
    cont.style.border = "none";
    cont.style.position = "unset";
  });

  if (greenPlusCircle) {
    greenPlusCircle.addEventListener("click", function () {
      var parentId = greenPlusCircle.parentElement.getAttribute("id");
      var numericPart = parentId.match(/\d+/);

      if (setSectionWidthPopup.classList.contains("open")) {
        closeAllSidebars();
        setSectionWidthPopup.classList.remove("open");
      } else {
        closeAllTextEditPopups();
        closeAllSidebars();

        // Remove all numeric classes
        setSectionWidthPopup.classList.forEach((className) => {
          if (/^\d+$/.test(className)) {
            console.log("Removing class:", className); // Debug output
            setSectionWidthPopup.classList.remove(className);
          }
        });

        setSectionWidthPopup.classList.add("open");
        setSectionWidthPopup.classList.add(numericPart[0]);
      }
    });
  }
}

function greenClone(element) {
  // const copySection = element.parentNode.parentNode;
  const copySection = element;

  const pasteSection = copySection.cloneNode(true);

  var newDate = new Date().getTime();
  pasteSection.setAttribute("id", newDate);
  traverseAndSetUniqueId(pasteSection);
  copySection.insertAdjacentElement("afterend", pasteSection);
  // mouseenter and mouseleave control about section, row, element
  sectionControl(pasteSection);

  const pasteRows = pasteSection.querySelectorAll('div[id^="row-"]');
  pasteRows.forEach((pasteRow) => {
    rowControl(pasteRow);
    const pasteColumns = pasteRow.querySelectorAll("div.col-div");
    pasteRow.addEventListener("mouseenter", function () {
      pasteColumns.forEach((pasteColumn) => {
        pasteColumn.style.borderRight = "3px dotted rgb(58, 133, 255)";
        if (pasteColumn.childNodes[1] && pasteColumn.childNodes[1].className === "div-boundary") {
          pasteColumn.childNodes[1].style.display = "block";
        }
        if (!pasteColumn.querySelector("div.draggable")) {
          pasteColumn.childNodes[0].childNodes[0].style.display = "block";
        } else {
          pasteColumn.childNodes[0].childNodes[0].style.display = "none";
        }

        // Check if it's the last column - then don't show it
        if (index === pasteColumns.length - 1) {
          pasteColumn.style.borderRight = "none";
        }
      });
    });
    pasteRow.addEventListener("mouseleave", function () {
      pasteColumns.forEach((pasteColumn) => {
        pasteColumn.style.borderRight = "none";
        if (pasteColumn.childNodes[1] && pasteColumn.childNodes[1].className === "div-boundary") {
          pasteColumn.childNodes[1].style.display = "none";
        }
        pasteColumn.childNodes[0].childNodes[0].style.display = "none";
      });
    });
  });
  const pasteElements = pasteSection.querySelectorAll("div.draggable");
  pasteElements.forEach((pasteElement) => {
    elementControl(pasteElement);
    editTextControl(pasteElement);
  });
}

function isPopupOpen() {
  var popup = document.querySelector(".popup-container");
  return popup.classList.contains("open"); // Or check the display style
}

const sectionClose = document.getElementById("add-section-close");
sectionClose.addEventListener("click", function () {
  setSectionWidthPopup.classList.remove("open");
});

// const currentChosenField = (args) => {
//   if (args) {
//     chosenField = args;
//   }
//   return chosenField;
// };

// export { createContainer, sectionControl, currentChosenField };
export { createContainer, addGreenTools, sectionControl };
