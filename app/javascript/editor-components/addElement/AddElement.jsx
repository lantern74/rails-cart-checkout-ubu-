import React from "react";
import ReactDOM from "react-dom/client";
import {
  closeAllSidebars,
  closeAllTextEditPopups,
  traverseAndSetUniqueId,
  moveUp,
  moveDown,
  removeElement,
} from "../editor_functions";
import { OrangeGearElement } from "../orangeGearElement/OrangeGearElement";

const daMainContainer = document.getElementById("da-main-container"); // Assuming there's only one such container

let basicContainerSection = document.getElementById("basic-container");
let chosenField = ""; // this is the field when you click on the element to insert, it know where to insert

function addYellowElementButton() {
  //yellow 'add an element' in the empty blue div
  const randomNum = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  var blueAddElementRolloverTools = document.createElement("div");
  blueAddElementRolloverTools.classList.add(
    "add-row-de-rollover-tools",
    "smallWidthElementHover",
    "d-flex"
  );
  var key = new Date().getTime();
  blueAddElementRolloverTools.setAttribute(
    "id",
    "add-element-" + key + randomNum
  );

  blueAddElementRolloverTools.style.display = "none";

  var blueAddElementButton = document.createElement("div");
  blueAddElementButton.classList.add(
    "container-fluid",
    "p-3",
    "rounded",
    "text-orange"
  );
  blueAddElementButton.innerHTML =
    '<button class="add-element btn fs-5  w-100  text-orange bg-lightorange" style="padding:20px 0 !important"> + Add Element</button>';

  // blueAddElementButton.style.backgroundColor = "#ffd88f";
  // blueAddElementButton.style.borderRadius = "3px";
  blueAddElementButton.style.display = "none"; //it will show where they can add the elements when they load it

  // blueAddElementButton.setAttribute("id", `blue_add-${Date.now()}`);
  blueAddElementButton.setAttribute("id", `blue_add-${Date.now()}${randomNum}`);

  blueAddElementButton.addEventListener("click", function (e) {
    openAddElementPopup(this); //this is the button when the blue div is empty
  });

  blueAddElementRolloverTools.appendChild(blueAddElementButton);

  return blueAddElementRolloverTools;
}

function orangeClone(element) {
  const copyElement = element.parentNode.parentNode;
  const pasteElement = copyElement.cloneNode(true);
  const copyElementId = copyElement.getAttribute("id");
  const idParts = copyElementId.split("-");
  var key = new Date().getTime();
  pasteElement.setAttribute("id", idParts[0] + "-" + key);
  traverseAndSetUniqueId(pasteElement);
  copyElement.insertAdjacentElement("afterend", pasteElement);

  cloneElementControl(pasteElement);
  cloneEditTextControl(pasteElement);
}

function cloneEditTextControl(element) {
  var editTextRolloverTools = element.childNodes[4];
  element.addEventListener("mouseup", () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      closeAllTextEditPopups();

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect(); // Get the position of the selected text
      // Calculate the position relative to the parent
      const parentRect = element.getBoundingClientRect();
      const relativeLeft = rect.x - parentRect.x;
      // Get the width of the selected text in pixels
      const selectedTextRect = range.getClientRects()[0];
      const textWidth = selectedTextRect.width;

      // Set the left position of editTextRolloverTools based on the position of the selected text
      if (relativeLeft < 130) {
        editTextRolloverTools.style.left = "0";
      } else if (relativeLeft > parentRect.width - 140 - textWidth / 2) {
        editTextRolloverTools.style.left = parentRect.width - 280 + "px";
      } else {
        editTextRolloverTools.style.left =
          relativeLeft - 140 + textWidth / 2 + "px";
      }

      element.style.border = "3px solid #777";
      for (let i = 0; i < 3; i++) {
        element.childNodes[1].childNodes[i].style.display = "none";
      }
      for (let i = 0; i < 2; i++) {
        element.childNodes[2].childNodes[i].style.display = "none";
      }
      element.childNodes[3].childNodes[0].style.display = "none";
      editTextRolloverTools.style.display = "block";
      for (let i = 0; i < 8; i++) {
        editTextRolloverTools.childNodes[i].style.display = "block";
      }
    } else {
      editTextRolloverTools.style.display = "none";
      for (let i = 0; i < 8; i++) {
        editTextRolloverTools.childNodes[i].style.display = "none";
      }
    }
  });

  //!!!!!!!!!!!!!!! I think this click stopped working
  document.addEventListener("click", function (event) {
    console.log("I think this click stopped working");
    console.log("removing " + editTextRolloverTools);

    if (!element.contains(event.target)) {
      //? ***   close all text-de-rollover-tools
      var editTextRolloverTools = document.querySelector(
        ".text-de-rollover-tools"
      );

      // If the click is outside of the paragraphelement, hide the editTextRolloverTools
      editTextRolloverTools.style.display = "none";
      for (let i = 0; i < 8; i++) {
        editTextRolloverTools.childNodes[i].style.display = "none";
      }
    }
  });
}

function cloneElementControl(element) {
  var orangeRolloverTools = element.childNodes[1];
  var orangeArrowRolloverTools = element.childNodes[2];
  var orangeAddRolloverTools = element.childNodes[3];
  element.addEventListener("mouseenter", () => {
    orangeRolloverTools.style.display = "block";
    orangeArrowRolloverTools.style.display = "block";
    orangeAddRolloverTools.style.display = "block";
    orangeRolloverTools.childNodes[0].style.display = "block";
    orangeRolloverTools.childNodes[1].style.display = "block";
    orangeRolloverTools.childNodes[2].style.display = "block";
    orangeArrowRolloverTools.childNodes[0].style.display = "block";
    orangeArrowRolloverTools.childNodes[1].style.display = "block";
    orangeArrowRolloverTools.childNodes[2].style.display = "block";
    orangeAddRolloverTools.childNodes[0].style.display = "block";
    element.style.border = "3px solid orange"; // Change border color on mouseover

    element.parentNode.parentNode.style.border = "none";
    for (let i = 0; i < 3; i++) {
      element.parentNode.parentNode.childNodes[0].childNodes[i].style.display =
        "none";
    }
    for (let i = 0; i < 3; i++) {
      element.parentNode.parentNode.childNodes[1].childNodes[i].style.display =
        "none";
    }
    element.parentNode.parentNode.childNodes[2].childNodes[0].style.display =
      "none";
    for (let i = 3; i < element.parentNode.parentNode.children.length; i++) {
      element.parentNode.parentNode.childNodes[i].style.borderRight = "none";
      if (
        element.parentNode.parentNode.childNodes[i].childNodes[1].className ==
        "div-boundary"
      ) {
        element.parentNode.parentNode.childNodes[
          i
        ].childNodes[1].style.display = "none";
      }
    }
    addElementButtons = document.querySelectorAll("[id*='blue_add']");
    addElementButtons.forEach((item) => {
      item.style.display = "none";
    });
  });

  element.addEventListener("mouseleave", () => {
    orangeRolloverTools.style.display = "none";
    orangeArrowRolloverTools.style.display = "none";
    orangeAddRolloverTools.style.display = "none";
    orangeRolloverTools.childNodes[0].style.display = "none";
    orangeRolloverTools.childNodes[1].style.display = "none";
    orangeRolloverTools.childNodes[2].style.display = "none";
    orangeArrowRolloverTools.childNodes[0].style.display = "none";
    orangeArrowRolloverTools.childNodes[1].style.display = "none";
    orangeArrowRolloverTools.childNodes[2].style.display = "none";
    orangeAddRolloverTools.childNodes[0].style.display = "none";
    element.style.border = "none"; // Reset border color on mouseout

    element.parentNode.parentNode.style.border = "3px solid rgb(58, 133, 255)";
    for (let i = 0; i < 3; i++) {
      element.parentNode.parentNode.childNodes[0].childNodes[i].style.display =
        "block";
    }
    for (let i = 0; i < 3; i++) {
      element.parentNode.parentNode.childNodes[1].childNodes[i].style.display =
        "block";
    }
    element.parentNode.parentNode.childNodes[2].childNodes[0].style.display =
      "block";
    for (let i = 4; i < element.parentNode.parentNode.children.length; i++) {
      element.parentNode.parentNode.childNodes[i - 1].style.borderRight =
        "3px dotted rgb(58, 133, 255)";
      if (
        element.parentNode.parentNode.childNodes[i - 1].childNodes[0]
          .className == "div-boundary"
      ) {
        element.parentNode.parentNode.childNodes[
          i - 1
        ].childNodes[0].style.display = "block";
      }
    }
  });
  document.addEventListener("click", function (event) {
    const isSetRowPopup =
      event.target.parentNode === element && element.contains(event.target);
    if (isSetRowPopup) {
      event.target.parentNode.childNodes[2].childNodes[2].click();
    }
  });
}

function elementControl(element) {
  console.log("add tools works");
  // create orange rollover
  var orangeRolloverTools = document.createElement("div");
  orangeRolloverTools.classList.add(
    "orange-de-rollover-tools",
    "smallWidthElementHover",
    "d-flex"
  );
  orangeRolloverTools.style.display = "none";

  var orangeMoveButton = document.createElement("div");
  orangeMoveButton.classList.add("de-rollover-move");
  orangeMoveButton.style.display = "none";
  orangeMoveButton.style.padding = "0 5px";
  orangeMoveButton.innerHTML = '<i class="fa fa-arrows"></i>';
  orangeMoveButton.style.cursor = "move";

  var orangeCloneButton = document.createElement("div");
  orangeCloneButton.classList.add("de-rollover-clone");
  orangeCloneButton.style.zIndex = "10";
  orangeCloneButton.style.display = "none";
  orangeCloneButton.innerHTML = '<i class="fa fa-copy"></i>';
  orangeCloneButton.setAttribute("type", "button");
  orangeCloneButton.addEventListener("click", function (e) {
    orangeClone(this);
    e.stopPropagation();
  });

  var orangeGearButton = document.createElement("div");
  orangeGearButton.classList.add("de-rollover-settings");
  orangeGearButton.style.display = "none";
  orangeGearButton.style.padding = "0 5px";
  orangeGearButton.innerHTML = '<i class="fa fa-cog"></i>';
  orangeGearButton.setAttribute("type", "button");
  orangeGearButton.setAttribute("id", `orange_gear-${Date.now()}`);

  orangeGearButton.addEventListener("click", function (e) {
    e.stopPropagation();
    console.log("clicking only on the orange gear settings only!");

    OrangeGearElement(this.parentElement.parentElement); //this is where the problem is
  });

  var orangeRemoveButton = document.createElement("div");
  orangeRemoveButton.classList.add("de-rollover-remove");
  orangeRemoveButton.style.display = "none";
  orangeRemoveButton.style.padding = "0 5px";
  orangeRemoveButton.innerHTML = '<i class="fa fa-trash"></i>';
  orangeRemoveButton.setAttribute("type", "button");
  orangeRemoveButton.addEventListener("click", function (e) {
    e.stopPropagation();
    removeElement(this.parentElement.parentElement);
  });
  orangeRolloverTools.appendChild(orangeMoveButton);
  orangeRolloverTools.appendChild(orangeCloneButton);
  orangeRolloverTools.appendChild(orangeRemoveButton);
  // create orange arrow rollover
  var orangeArrowRolloverTools = document.createElement("div");
  orangeArrowRolloverTools.classList.add(
    "orange-arrow-de-rollover-tools",
    "smallWidthElementHover",
    "d-flex"
  );
  orangeArrowRolloverTools.style.display = "none";
  var orangeArrowUpButton = document.createElement("div");
  orangeArrowUpButton.classList.add("de-rollover-arrow-up");
  orangeArrowUpButton.style.backgroundColor = "orange";
  orangeArrowUpButton.style.display = "none";
  orangeArrowUpButton.style.padding = "0 5px";
  orangeArrowUpButton.innerHTML = '<i class="fa fa-arrow-up"></i>';
  orangeArrowUpButton.setAttribute("type", "button");
  orangeArrowUpButton.addEventListener("click", function (e) {
    moveUp(this.parentElement.parentElement);
    e.stopPropagation();
  });

  var orangeArrowDownButton = document.createElement("div");
  orangeArrowDownButton.classList.add("de-rollover-arrow-down");
  orangeArrowDownButton.style.backgroundColor = "orange";
  orangeArrowDownButton.style.display = "none";
  orangeArrowDownButton.style.padding = "0 5px";
  orangeArrowDownButton.innerHTML = '<i class="fa fa-arrow-down"></i>';
  orangeArrowDownButton.setAttribute("type", "button");
  orangeArrowDownButton.addEventListener("click", function (e) {
    moveDown(this.parentElement.parentElement);
    e.stopPropagation();
  });
  orangeArrowRolloverTools.appendChild(orangeArrowUpButton);
  orangeArrowRolloverTools.appendChild(orangeArrowDownButton);
  orangeArrowRolloverTools.appendChild(orangeGearButton);

  // create orange add circle rollover
  var orangeAddRolloverTools = document.createElement("div");
  orangeAddRolloverTools.classList.add(
    "plus-de-rollover-tools",
    "smallWidthElementHover",
    "d-flex"
  );
  orangeAddRolloverTools.style.display = "none";

  var orangeAddButton = document.createElement("div");
  orangeAddButton.classList.add("de-rollover-plus-circle");
  orangeAddButton.style.backgroundColor = "orange";
  orangeAddButton.style.display = "none";
  orangeAddButton.setAttribute("type", "button");
  orangeAddButton.style.zIndex = "10";
  orangeAddButton.style.position = "relative";
  orangeAddButton.style.left = "-50%";
  orangeAddButton.innerHTML = '<i class="fa fa-plus"></i>';
  orangeAddButton.setAttribute("type", "button");
  orangeAddButton.setAttribute("id", `orange_add-${Date.now()}`);
  orangeAddButton.addEventListener("click", function (e) {
    openAddElementPopup(this);
    closeAllSidebars();
    e.stopPropagation();
  });
  orangeAddRolloverTools.appendChild(orangeAddButton);

  // Append all the elements to the element
  element.appendChild(orangeRolloverTools);
  element.appendChild(orangeArrowRolloverTools);
  element.appendChild(orangeAddRolloverTools);
  element.style.position = "relative";

  // If they click on some elements I want to open the properties sidebar
  // this is to click anywhere in the headline!! -- now I don't want to have this feature

  element.childNodes[0].addEventListener("click", function (e) {
    if (
      element.childNodes[0] &&
      !element.childNodes[0].classList.contains("elHeadline") &&
      !element.childNodes[0].classList.contains("elSubHeadline") &&
      !element.childNodes[0].classList.contains("elText") &&
      !element.childNodes[0].classList.contains("elBullet")
    ) {
      e.stopPropagation();
      element.childNodes[2].childNodes[2].click();
    } else {
      //  closeAllSidebars();
    }
  });

  element.addEventListener("click", function (e) {
    if (element.childNodes[1].classList.contains("video-container")) {
      e.stopPropagation();
      element.childNodes[4].childNodes[2].click();
    }
  });

  // Add event listeners to show/hide rollover tools and change border color on mouseover
  element.addEventListener("mouseenter", () => {
    orangeRolloverTools.style.display = "block";
    orangeArrowRolloverTools.style.display = "block";
    orangeAddRolloverTools.style.display = "block";
    orangeRolloverTools.childNodes[0].style.display = "block";
    orangeRolloverTools.childNodes[1].style.display = "block";
    orangeRolloverTools.childNodes[2].style.display = "block";
    orangeArrowRolloverTools.childNodes[0].style.display = "block";
    orangeArrowRolloverTools.childNodes[1].style.display = "block";
    orangeArrowRolloverTools.childNodes[2].style.display = "block";
    orangeAddRolloverTools.childNodes[0].style.display = "block";
    element.style.border = "3px solid orange"; // Change border color on mouseover

    element.parentNode.parentNode.style.border = "none";
    for (let i = 0; i < 3; i++) {
      element.parentNode.parentNode.childNodes[0].childNodes[i].style.display =
        "none";
    }
    for (let i = 0; i < 3; i++) {
      element.parentNode.parentNode.childNodes[1].childNodes[i].style.display =
        "none";
    }
    element.parentNode.parentNode.childNodes[2].childNodes[0].style.display =
      "none";
    for (let i = 3; i < element.parentNode.parentNode.children.length; i++) {
      // TODO: I turned it off -- there's an error somewhere here when you create a new item and then remove it... And try to roll over
      // element.parentNode.parentNode.childNodes[i].style.borderRight = "none";
      // if (element.parentNode.parentNode.childNodes[i].childNodes[1].className == "div-boundary") {
      //   element.parentNode.parentNode.childNodes[i].childNodes[1].style.display = "none";
      // }
    }
    addElementButtons = document.querySelectorAll("[id*='blue_add']");
    addElementButtons.forEach((item) => {
      item.style.display = "none";
    });
  });

  element.addEventListener("mouseleave", () => {
    orangeRolloverTools.style.display = "none";
    orangeArrowRolloverTools.style.display = "none";
    orangeAddRolloverTools.style.display = "none";
    orangeRolloverTools.childNodes[0].style.display = "none";
    orangeRolloverTools.childNodes[1].style.display = "none";
    orangeRolloverTools.childNodes[2].style.display = "none";
    orangeArrowRolloverTools.childNodes[0].style.display = "none";
    orangeArrowRolloverTools.childNodes[1].style.display = "none";
    orangeArrowRolloverTools.childNodes[2].style.display = "none";
    orangeAddRolloverTools.childNodes[0].style.display = "none";
    element.style.border = "none"; // Reset border color on mouseout

    element.parentNode.parentNode.style.border = "3px solid rgb(58, 133, 255)";
    for (let i = 0; i < 3; i++) {
      element.parentNode.parentNode.childNodes[0].childNodes[i].style.display =
        "block";
    }
    for (let i = 0; i < 3; i++) {
      element.parentNode.parentNode.childNodes[1].childNodes[i].style.display =
        "block";
    }
    element.parentNode.parentNode.childNodes[2].childNodes[0].style.display =
      "block";
    for (let i = 4; i < element.parentNode.parentNode.children.length; i++) {
      // TODO: I turned it off -- there's an error somewhere here when you create a new item and then remove it... And try to roll over
      // element.parentNode.parentNode.childNodes[i - 1].style.borderRight = "3px dotted rgb(58, 133, 255)";
      // if (element.parentNode.parentNode.childNodes[i - 1].childNodes[0].className == "div-boundary") {
      //   element.parentNode.parentNode.childNodes[i - 1].childNodes[0].style.display = "block";
      // }
    }
  });
}

function setFormat(command) {
  document.execCommand(command, false, null);
}
function setAlignment(align) {
  document.execCommand("justify" + align, false, null);
}

function setLink() {
  var url = prompt("Enter the URL:");
  document.execCommand("createLink", false, url);
}

function editTextControl(element) {
  console.log("edit text works");
  var editTextRolloverTools = document.createElement("div");
  editTextRolloverTools.classList.add(
    "text-de-rollover-tools",
    "smallWidthElementHover",
    "d-flex"
  );
  editTextRolloverTools.style.display = "none";
  editTextRolloverTools.style.zIndex = "100";

  var editBoldButton = document.createElement("div");
  editBoldButton.classList.add("de-rollover-bold");
  editBoldButton.style.display = "none";
  editBoldButton.innerHTML = '<i class="fa fa-bold"></i>';
  editBoldButton.addEventListener("click", function () {
    setFormat("bold");
  });
  var editItalicButton = document.createElement("div");
  editItalicButton.classList.add("de-rollover-italic");
  editItalicButton.style.display = "none";
  editItalicButton.innerHTML = '<i class="fa fa-italic"></i>';
  editItalicButton.addEventListener("click", function () {
    setFormat("italic");
  });
  var editUnderlineButton = document.createElement("div");
  editUnderlineButton.classList.add("de-rollover-underline");
  editUnderlineButton.style.display = "none";
  editUnderlineButton.innerHTML = '<i class="fa fa-underline"></i>';
  editUnderlineButton.addEventListener("click", function () {
    setFormat("underline");
  });
  var editStrikeButton = document.createElement("div");
  editStrikeButton.classList.add("de-rollover-strike");
  editStrikeButton.style.display = "none";
  editStrikeButton.innerHTML = '<i class="fa fa-strikethrough"></i>';
  editStrikeButton.addEventListener("click", function () {
    setFormat("strikeThrough");
  });
  var editLeftButton = document.createElement("div");
  editLeftButton.classList.add("de-rollover-left");
  editLeftButton.style.display = "none";
  editLeftButton.innerHTML = '<i class="fa fa-align-left"></i>';
  editLeftButton.addEventListener("click", function () {
    setAlignment("left");
  });
  var editCenterButton = document.createElement("div");
  editCenterButton.classList.add("de-rollover-center");
  editCenterButton.style.display = "none";
  editCenterButton.innerHTML = '<i class="fa fa-align-center"></i>';
  editCenterButton.addEventListener("click", function () {
    setAlignment("center");
  });
  var editRightButton = document.createElement("div");
  editRightButton.classList.add("de-rollover-right");
  editRightButton.style.display = "none";
  editRightButton.innerHTML = '<i class="fa fa-align-right"></i>';
  editRightButton.addEventListener("click", function () {
    setAlignment("right");
  });
  var editLinkButton = document.createElement("div");
  editLinkButton.classList.add("de-rollover-link");
  editLinkButton.style.display = "none";
  editLinkButton.innerHTML = '<i class="fa fa-link"></i>';
  editLinkButton.addEventListener("click", function () {
    setLink();
  });

  editTextRolloverTools.appendChild(editBoldButton);
  editTextRolloverTools.appendChild(editItalicButton);
  editTextRolloverTools.appendChild(editUnderlineButton);
  editTextRolloverTools.appendChild(editStrikeButton);
  editTextRolloverTools.appendChild(editLeftButton);
  editTextRolloverTools.appendChild(editCenterButton);
  editTextRolloverTools.appendChild(editRightButton);
  editTextRolloverTools.appendChild(editLinkButton);

  element.appendChild(editTextRolloverTools);

  element.addEventListener("click", () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      closeAllTextEditPopups();
      const selection = window.getSelection();

      let range;

      if (selection.rangeCount > 0) {
        range = selection.getRangeAt(0);
      } else {
        range = document.createRange();
      }

      const rect = range.getBoundingClientRect();
      const parentRect = element.getBoundingClientRect();
      const relativeLeft = rect.x - parentRect.x;
      const selectedTextRects = range.getClientRects();

      // Check if selectedTextRects is not empty
      if (selectedTextRects.length > 0) {
        const selectedTextRect = selectedTextRects[0];
        const textWidth = selectedTextRect.width;

        // Set the left position of editTextRolloverTools based on the position of the selected text
        if (relativeLeft < 130) {
          editTextRolloverTools.style.left = "0";
        } else if (relativeLeft > parentRect.width - 140 - textWidth / 2) {
          editTextRolloverTools.style.left = parentRect.width - 280 + "px";
        } else {
          editTextRolloverTools.style.left =
            relativeLeft - 140 + textWidth / 2 + "px";
        }

        element.style.border = "3px solid #777";
        for (let i = 0; i < 3; i++) {
          element.childNodes[1].childNodes[i].style.display = "none";
        }
        for (let i = 0; i < 2; i++) {
          element.childNodes[2].childNodes[i].style.display = "none";
        }
        element.childNodes[3].childNodes[0].style.display = "none";
        editTextRolloverTools.style.display = "block";
        for (let i = 0; i < 8; i++) {
          editTextRolloverTools.childNodes[i].style.display = "block";
        }
      } else {
        editTextRolloverTools.style.display = "none";
        for (let i = 0; i < 8; i++) {
          editTextRolloverTools.childNodes[i].style.display = "none";
        }
      }
    }
  });

  document.addEventListener("click", function (event) {
    if (!element.contains(event.target)) {
      var editTextRolloverTools = element.childNodes[4];

      //? ***   close all text-de-rollover-tools
      // If the click is outside of the paragraphelement, hide the editTextRolloverTools
      editTextRolloverTools.style.display = "none";
      for (let i = 0; i < 8; i++) {
        editTextRolloverTools.childNodes[i].style.display = "none";
      }
    }
  });
}

function openAddElementPopup(button) {
  if (leftSlidingPopup.classList.contains("hidden")) {
    leftSlidingPopup.classList.remove("hidden");
    basicContainerSection.style.maxWidth = "calc(100vw - 360px)";
    basicContainerSection.style.marginLeft = "360px";
  } else {
    // probably we don't want to close the popup with tools if they already want to add the element
    closeElementsPanel();

    // we will close and open for the effect of being opened
    //   setTimeout(function () {
    //     leftSlidingPopup.classList.remove("hidden");
    //     basicContainerSection.style.maxWidth = "calc(100vw - 360px)";
    //     basicContainerSection.style.marginLeft = "360px";
    // }, 100);
  }

  let buttonIdKey;
  if (button === undefined || button.id === undefined) {
    buttonIdKey = "add-element-button";
  } else {
    buttonIdKey = button.id.replace(/\d+/g, "");
  }

  if (buttonIdKey === "blue_add-") {
    chosenField = button.parentNode.parentNode;
  } else if (buttonIdKey === "orange_add-") {
    chosenField = button.parentNode.parentNode.parentNode;
  } else if (buttonIdKey === "add-element-button") {
    const nodes = daMainContainer.querySelectorAll("div.draggable");
    const lastChild = nodes[nodes.length - 1];
    chosenField = lastChild.parentNode;
  }
}

function closeElementsPanel() {
  leftSlidingPopup.classList.add("hidden");
  basicContainerSection.style.maxWidth = "100vw";
  basicContainerSection.style.marginLeft = "0px";
}

// Add event listener to the search panel for elements input
document.querySelector(".search-panel").addEventListener("input", function () {
  const searchKeyword = this.value.toLowerCase();
  const elementPanels = document.querySelectorAll(".element-panel");

  // Loop through each element panel and check if it matches the search keyword
  elementPanels.forEach(function (panel) {
    const panelText = panel.textContent.toLowerCase();
    if (panelText.includes(searchKeyword)) {
      panel.style.display = "flex"; // Show the element panel
    } else {
      panel.style.display = "none"; // Hide the element panel
    }
  });
});

var openElementsPanel = document.getElementById("add-element-button");

openElementsPanel.addEventListener("click", function () {
  openAddElementPopup(this);
});

const currentChosenField = (args) => {
  if (args) {
    chosenField = args;
  }
  return chosenField;
};

export {
  addYellowElementButton,
  elementControl,
  openAddElementPopup,
  closeElementsPanel,
  currentChosenField,
  editTextControl,
};
