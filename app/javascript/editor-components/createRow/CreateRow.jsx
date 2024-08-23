import React from "react";
import ReactDOM from "react-dom/client";
import {
  closeAllSidebars,
  closeAllTextEditPopups,
  traverseAndSetUniqueId,
} from "../editor_functions";
import { BlueGearElement } from "../blueGearElement/BlueGearElement";

import {
  OrangeGearElement,
  addOrangeDraggingPoints,
} from "../orangeGearElement/OrangeGearElement";
import {
  addYellowElementButton,
  elementControl,
  editTextControl,
} from "../addElement/AddElement";

var settingRow1 = document.getElementById("setting-row1");
var settingRow2 = document.getElementById("setting-row2");
var settingRow3 = document.getElementById("setting-row3");
var settingRow4 = document.getElementById("setting-row4");
var settingRow5 = document.getElementById("setting-row5");
var settingRow6 = document.getElementById("setting-row6");

function createRowSection() {
  const rowSection = document.createElement("div");
  rowSection.id = `row-${new Date().getTime()}`;
  rowSection.className = "row-section";
  rowSection.style.cssText =
    "margin: 10px auto; width: 90%; display: flex; justify-content: center;";
  addBlueTools(rowSection);
  return rowSection;
}

function addBlueTools(rowSection) {
  var rowId = rowSection.getAttribute("id");
  var blueRolloverTools = document.createElement("div");
  blueRolloverTools.classList.add(
    "de-rollover-tools",
    "blue",
    "smallWidthElementHover",
    "d-flex",
    "flex-column"
  );
  blueRolloverTools.style.display = "none";

  var blueArrowRolloverTools = document.createElement("div");
  blueArrowRolloverTools.classList.add(
    "arrow-de-rollover-tools",
    "smallWidthElementHover",
    "d-flex",
    "flex-column"
  );
  blueArrowRolloverTools.style.display = "none";

  var bluePlusRolloverTools = document.createElement("div");
  bluePlusRolloverTools.setAttribute("id", `plus-${rowId}`);
  bluePlusRolloverTools.classList.add(
    "plus-de-rollover-tools",
    "smallWidthElementHover",
    "d-flex",
    "flex-column"
  );
  bluePlusRolloverTools.style.display = "none";

  // Create and configure buttons
  appendBlueButton(
    blueRolloverTools,
    "de-rollover-move",
    "#3a85ff",
    "fa fa-arrows"
  );
  appendBlueButton(
    blueRolloverTools,
    "de-rollover-clone",
    "#3a85ff",
    "fa fa-copy"
  );
  appendBlueButton(
    blueRolloverTools,
    "de-rollover-remove",
    "#3a85ff",
    "fa fa-trash"
  );
  appendBlueButton(
    blueArrowRolloverTools,
    "de-rollover-arrow-up",
    "#3a85ff",
    "fa fa-arrow-up"
  );
  appendBlueButton(
    blueArrowRolloverTools,
    "de-rollover-arrow-down",
    "#3a85ff",
    "fa fa-arrow-down"
  );
  appendBlueButton(
    blueArrowRolloverTools,
    "de-rollover-settings",
    "#3a85ff",
    "fa fa-cog",
    `blue_gear-${Date.now()}`
  );
  appendBlueButton(
    bluePlusRolloverTools,
    "de-rollover-plus-circle",
    "#3a85ff",
    "fa fa-plus",
    null,
    "-50%"
  );

  // Prepend tools to rowSection
  rowSection.prepend(bluePlusRolloverTools);
  rowSection.prepend(blueArrowRolloverTools);
  rowSection.prepend(blueRolloverTools);

  rowControl(rowSection);
}

function appendBlueButton(
  parent,
  className,
  backgroundColor,
  iconClass,
  id = null,
  left = null
) {
  var button = document.createElement("div");
  button.classList.add(...className.split(" "));
  button.style.backgroundColor = backgroundColor;
  button.style.display = "none";
  if (left) button.style.left = left;
  button.innerHTML = `<i class="${iconClass}"></i>`;
  button.setAttribute("type", "button");
  if (id) button.setAttribute("id", id);

  parent.appendChild(button);
}

function rowControl(rowSection) {
  var blueRolloverTools = rowSection.childNodes[0];
  var blueArrowRolloverTools = rowSection.childNodes[1];
  var bluePlusRolloverTools = rowSection.childNodes[2];

  var blueMoveButton = blueRolloverTools.childNodes[0];
  var blueCloneButton = blueRolloverTools.childNodes[1];
  var blueRemoveButton = blueRolloverTools.childNodes[2];

  var blueArrowUpButton = blueArrowRolloverTools.childNodes[0];
  var blueArrowDownButton = blueArrowRolloverTools.childNodes[1];

  var blueGearButton = blueArrowRolloverTools.childNodes[2];
  var bluePlusCircle = bluePlusRolloverTools.childNodes[0];

  // ## add the roll over tools for the blue container

  blueGearButton.addEventListener("click", function (e) {
    console.log("clicking only on the blue gear button");
    BlueGearElement(this.parentElement.parentElement.id);
    e.stopPropagation();
  });

  blueRemoveButton.addEventListener("click", function (e) {
    removeElement(this.parentElement.parentElement);
    e.stopPropagation();
  });

  blueArrowUpButton.addEventListener("click", function (e) {
    rowMoveUp(this.parentElement.parentElement);
    e.stopPropagation();
  });

  blueArrowDownButton.addEventListener("click", function (e) {
    rowMoveDown(this.parentElement.parentElement);
    e.stopPropagation();
  });

  if (blueCloneButton) {
    blueCloneButton.addEventListener("click", function (e) {
      blueClone(this);
      e.stopPropagation();
    });
  }

  // ## end of the blue container tools

  // ## make the blue div clickable
  rowSection.addEventListener("click", function (event) {
    const isSetRowPopup =
      event.target.parentNode === rowSection &&
      rowSection.contains(event.target);
    if (isSetRowPopup) {
      BlueGearElement(rowSection.id);
      event.stopPropagation();
    }
  });

  rowSection.addEventListener("mouseenter", (e) => {
    for (let i = 0; i < 3; i++) {
      rowSection.parentNode.childNodes[0].childNodes[i].style.display = "none";
    }
    for (let i = 0; i < 3; i++) {
      rowSection.parentNode.childNodes[1].childNodes[i].style.display = "none";
    }
    rowSection.parentNode.childNodes[2].childNodes[0].style.display = "none";
    blueRolloverTools.style.display = "block";
    blueArrowRolloverTools.style.display = "block";
    bluePlusRolloverTools.style.display = "block";
    blueMoveButton.style.display = "block";
    blueCloneButton.style.display = "block";
    blueRemoveButton.style.display = "block";
    blueArrowUpButton.style.display = "block";
    blueArrowDownButton.style.display = "block";
    blueGearButton.style.display = "block";
    bluePlusCircle.style.display = "block";
    rowSection.parentNode.style.border = "none";
    rowSection.style.border = "3px solid #3a85ff";
  });

  rowSection.addEventListener("mouseleave", (e) => {
    for (let i = 0; i < 3; i++) {
      rowSection.parentNode.childNodes[0].childNodes[i].style.display = "block";
    }
    for (let i = 0; i < 3; i++) {
      rowSection.parentNode.childNodes[1].childNodes[i].style.display = "block";
    }
    rowSection.parentNode.childNodes[2].childNodes[0].style.display = "block";
    blueRolloverTools.style.display = "none";
    blueArrowRolloverTools.style.display = "none";
    bluePlusRolloverTools.style.display = "none";
    blueMoveButton.style.display = "none";
    blueCloneButton.style.display = "none";
    blueRemoveButton.style.display = "none";
    blueArrowUpButton.style.display = "none";
    blueArrowDownButton.style.display = "none";
    blueGearButton.style.display = "none";
    bluePlusCircle.style.display = "none";
    rowSection.parentNode.style.border = "3px solid #37ca37";
    rowSection.style.border = "none";
  });

  if (bluePlusCircle) {
    bluePlusCircle.addEventListener("click", function () {
      var parentId = bluePlusCircle.parentElement.getAttribute("id");
      var numericPart = parentId.match(/\d+/);

      if (setColumnNumberPopup.classList.contains("open")) {
        closeAllSidebars();
        setColumnNumberPopup.classList.remove("open");
      } else {
        closeAllSidebars();
        setColumnNumberPopup.classList.add("open");

        // Remove all numeric classes
        setColumnNumberPopup.classList.forEach((className) => {
          if (/^\d+$/.test(className)) {
            setColumnNumberPopup.classList.remove(className);
          }
        });

        setColumnNumberPopup.classList.add(numericPart[0]);
      }
    });
  }

  blueCloneButton.addEventListener("click", function () {
    var colDivNumber = rowSection.children.length - 3;
    if (colDivNumber == 1) {
      settingRow1.click();
    } else if (colDivNumber == 2) {
      settingRow2.click();
    } else if (colDivNumber == 3) {
      settingRow3.click();
    } else if (colDivNumber == 4) {
      settingRow4.click();
    } else if (colDivNumber == 5) {
      settingRow5.click();
    } else if (colDivNumber == 6) {
      settingRow6.click();
    }
  });
}

function blueClone(element) {
  const copyRow = element.parentNode.parentNode;
  const pasteRow = copyRow.cloneNode(true);
  var key = new Date().getTime();
  pasteRow.setAttribute("id", "row-" + key);
  traverseAndSetUniqueId(pasteRow);
  copyRow.insertAdjacentElement("afterend", pasteRow);

  rowControl(pasteRow);

  const pasteColumns = pasteRow.querySelectorAll("div.col-div");

  pasteRow.addEventListener("mouseenter", function () {
    pasteColumns.forEach((pasteColumn, index) => {
      pasteColumn.style.borderRight = "3px dotted rgb(58, 133, 255)";
      if (
        pasteColumn.childNodes[1] &&
        pasteColumn.childNodes[1].className === "div-boundary"
      ) {
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
      if (
        pasteColumn.childNodes[1] &&
        pasteColumn.childNodes[1].className === "div-boundary"
      ) {
        pasteColumn.childNodes[1].style.display = "none";
      }
      pasteColumn.childNodes[0].childNodes[0].style.display = "none";
    });
  });
  const pasteElements = pasteRow.querySelectorAll("div.draggable");
  pasteElements.forEach((pasteElement) => {
    elementControl(pasteElement);
    editTextControl(pasteElement);
  });
}

function rowMoveUp(element) {
  if (element.previousElementSibling) {
    element.parentNode.insertBefore(element, element.previousElementSibling); // insert element before the previous sibling
  }
}

function rowMoveDown(element) {
  if (element.nextElementSibling) {
    element.parentNode.insertBefore(
      element,
      element.nextElementSibling.nextElementSibling
    );
  }
}

//this is for the blue
function removeElement(element) {
  element.parentNode.removeChild(element);
}

//* this is when they click on the items on the right side bar when they create a blue container   	*/

// work on creating the create div -- start

function createAndAppendRowSection(event, id, currentRow, columnCreators) {
  event.preventDefault();
  var rowSection = createRowSection();
  var container = document.getElementById(id);
  if (container.childNodes[5]) {
    container.insertBefore(rowSection, currentRow.nextSibling);
  } else {
    container.appendChild(rowSection);
  }

  setColumnNumberPopup.classList.remove("open");
  columns = columnCreators.map((creator) => {
    var divCol = creator();
    var yellowButton = addYellowElementButton();
    divCol.appendChild(yellowButton);
    rowSection.appendChild(divCol);
    return divCol;
  });

  return { rowSection, columns };
}

function createAndAppendBoundaries(columns) {
  // Create a boundary for each column except the last one
  return columns.slice(0, -1).map((column) => {
    let boundary = document.createElement("div");
    boundary.classList.add("div-boundary");
    column.appendChild(boundary);
    return boundary;
  });
}

function setupMouseInteractions(rowSection, columns, boundaries) {
  rowSection.addEventListener("mouseenter", (e) => {
    handleMouseEnter(columns, boundaries);
  });
  rowSection.addEventListener("mouseleave", (e) => {
    handleMouseLeave(columns, boundaries);
  });
}

function handleMouseEnter(columns, boundaries) {
  console.log(columns, "columns");
  console.log(boundaries, "boundaries");
  columns.forEach((column, index) => {
    column.style.borderRight =
      index !== columns.length - 1 ? "3px dotted #3a85ff" : "none";

    // Determine the correct child node index to check based on whether it's the last column
    let checkIndex = index === columns.length - 1 ? 1 : 2; // Use 1 for the last column, 2 for others

    // Check if the specified child node exists and is not set to display
    if (!column.childNodes[checkIndex]) {
      // Display the childNodes[0] and its children
      if (column.childNodes[0]) {
        column.childNodes[0].style.display = "block";
        if (column.childNodes[0].childNodes[0]) {
          column.childNodes[0].childNodes[0].style.display = "block";
        }
      }
    }
  });

  // Display boundary elements if provided
  if (boundaries) {
    boundaries.forEach((boundary) => {
      if (boundary) boundary.style.display = "block";
    });
  }
}

function handleMouseLeave(columns, boundaries) {
  columns.forEach((column) => {
    column.style.borderRight = "none"; // Reset border style for all columns

    // Hide the main and nested child nodes
    if (column.childNodes[0]) {
      column.childNodes[0].style.display = "none";
      if (column.childNodes[0].childNodes[0]) {
        column.childNodes[0].childNodes[0].style.display = "none";
      }
    }
  });

  // Hide boundary elements if provided
  if (boundaries) {
    boundaries.forEach((boundary) => {
      if (boundary) boundary.style.display = "none";
    });
  }
}

function setupResizingBehavior(columns, boundaries) {
  let isResizing = false;
  let lastX;
  let resizingBoundary;
  let columnSize = columns[0].parentNode.offsetWidth / 12; // Assuming all columns are within the same parent for uniform columnSize calculation
  let columnNumbers = [];

  // Setup mousedown event for each boundary
  boundaries.forEach((boundary, index) => {
    boundary.addEventListener("mousedown", function (e) {
      isResizing = true;
      lastX = e.clientX;
      resizingBoundary = boundary; // Store the current boundary being resized
    });
  });

  // Global mousemove event
  document.addEventListener("mousemove", function (e) {
    if (isResizing) {
      const boundaryIndex = boundaries.indexOf(resizingBoundary);
      const offset = e.clientX - lastX;
      if (boundaryIndex !== -1) {
        adjustColumnWidth(columns, boundaryIndex, offset, columnSize);
      }
      lastX = e.clientX;
    }
  });

  // Global mouseup event to stop resizing
  document.addEventListener("mouseup", function () {
    isResizing = false;
    // Apply the final widths calculated from mousemove
    columns.forEach((col, idx) => {
      if (columnNumbers[idx] !== undefined) {
        col.style.width = columnNumbers[idx] * columnSize + "px";
      }
    });
  });

  function adjustColumnWidth(columns, index, offset, columnSize) {
    if (index < columns.length - 1) {
      const newWidth1 = columns[index].offsetWidth + offset;
      const newWidth2 = columns[index + 1].offsetWidth - offset;
      columns[index].style.width = newWidth1 + "px";
      columns[index + 1].style.width = newWidth2 + "px";
      columnNumbers[index] = Math.round(newWidth1 / columnSize);
      columnNumbers[index + 1] = Math.round(newWidth2 / columnSize);
    }
  }
}

function getNumericClassName(element) {
  // Get all class names from the element
  const classNames =
    element.parentElement?.parentElement?.parentElement.classList;
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

// ^ 11
settingRow1.addEventListener("click", function (e) {
  var numberClass = getNumericClassName(settingRow1);
  var CurrentRow = document.getElementById(`row-${numberClass}`);
  var currentContainerId = "";
  if (CurrentRow) {
    currentContainerId = CurrentRow.parentElement.getAttribute("id");
  } else {
    currentContainerId = numberClass;
  }

  var { rowSection, columns } = createAndAppendRowSection(
    e,
    currentContainerId,
    CurrentRow,
    [createDivCol1]
  );
  let boundaries = createAndAppendBoundaries(columns);
  setupResizingBehavior(columns, boundaries);
  setupMouseInteractions(rowSection, columns, boundaries); // Mouse overs
  addOrangeDraggingPoints(currentContainerId); // Add Orange Dragging Points
});

// ^ 22
settingRow2.addEventListener("click", function (e) {
  var numberClass = getNumericClassName(settingRow2);
  var CurrentRow = document.getElementById(`row-${numberClass}`);
  var currentContainerId = "";
  if (CurrentRow) {
    currentContainerId = CurrentRow.parentElement.getAttribute("id");
  } else {
    currentContainerId = numberClass;
  }
  var { rowSection, columns } = createAndAppendRowSection(
    e,
    currentContainerId,
    CurrentRow,
    [createDivCol2, createDivCol2]
  );
  // Create and append boundaries for resizing columns
  let boundaries = createAndAppendBoundaries(columns);
  setupResizingBehavior(columns, boundaries);
  setupMouseInteractions(rowSection, columns, boundaries); // Mouse overs
  addOrangeDraggingPoints(currentContainerId); // Add Orange Dragging Points
});

// ^ 33
settingRow3.addEventListener("click", function (e) {
  var numberClass = getNumericClassName(settingRow3);
  var CurrentRow = document.getElementById(`row-${numberClass}`);
  var currentContainerId = "";
  if (CurrentRow) {
    currentContainerId = CurrentRow.parentElement.getAttribute("id");
  } else {
    currentContainerId = numberClass;
  }
  var { rowSection, columns } = createAndAppendRowSection(
    e,
    currentContainerId,
    CurrentRow,
    [createDivCol3, createDivCol3, createDivCol3]
  );
  // Create and append boundaries for resizing columns
  let boundaries = createAndAppendBoundaries(columns);
  setupResizingBehavior(columns, boundaries);
  setupMouseInteractions(rowSection, columns, boundaries); // Mouse overs
  addOrangeDraggingPoints(currentContainerId); // Add Orange Dragging Points
});

// ^ 44
settingRow4.addEventListener("click", function (e) {
  var numberClass = getNumericClassName(settingRow4);
  var CurrentRow = document.getElementById(`row-${numberClass}`);
  var currentContainerId = "";
  if (CurrentRow) {
    currentContainerId = CurrentRow.parentElement.getAttribute("id");
  } else {
    currentContainerId = numberClass;
  }
  var { rowSection, columns } = createAndAppendRowSection(
    e,
    currentContainerId,
    CurrentRow,
    [createDivCol4, createDivCol4, createDivCol4, createDivCol4]
  );
  // Create and append boundaries for resizing columns
  let boundaries = createAndAppendBoundaries(columns);
  setupResizingBehavior(columns, boundaries);
  setupMouseInteractions(rowSection, columns, boundaries); // Mouse overs
  addOrangeDraggingPoints(currentContainerId); // Add Orange Dragging Points
});

// ^ 55
settingRow5.addEventListener("click", function (e) {
  var numberClass = getNumericClassName(settingRow5);
  var CurrentRow = document.getElementById(`row-${numberClass}`);
  var currentContainerId = "";
  if (CurrentRow) {
    currentContainerId = CurrentRow.parentElement.getAttribute("id");
  } else {
    currentContainerId = numberClass;
  }
  var { rowSection, columns } = createAndAppendRowSection(
    e,
    currentContainerId,
    CurrentRow,
    [createDivCol5, createDivCol5, createDivCol5, createDivCol5, createDivCol5]
  );
  // Create and append boundaries for resizing columns
  let boundaries = createAndAppendBoundaries(columns);
  setupResizingBehavior(columns, boundaries);
  setupMouseInteractions(rowSection, columns, boundaries); // Mouse overs
  addOrangeDraggingPoints(currentContainerId); // Add Orange Dragging Points
});

// ^ 66
settingRow6.addEventListener("click", function (e) {
  var numberClass = getNumericClassName(settingRow6);
  var CurrentRow = document.getElementById(`row-${numberClass}`);
  var currentContainerId = "";
  if (CurrentRow) {
    currentContainerId = CurrentRow.parentElement.getAttribute("id");
  } else {
    currentContainerId = numberClass;
  }
  var { rowSection, columns } = createAndAppendRowSection(
    e,
    currentContainerId,
    CurrentRow,
    [
      createDivCol6,
      createDivCol6,
      createDivCol6,
      createDivCol6,
      createDivCol6,
      createDivCol6,
    ]
  );
  // Create and append boundaries for resizing columns
  let boundaries = createAndAppendBoundaries(columns);
  setupResizingBehavior(columns, boundaries);
  setupMouseInteractions(rowSection, columns, boundaries); // Mouse overs
  addOrangeDraggingPoints(currentContainerId); // Add Orange Dragging Points
});

function createDivCol1() {
  var divCol1 = document.createElement("div");
  divCol1.classList.add("col-div", "blue-container");
  divCol1.style.width = "100%";
  divCol1.style.borderRight = "none";
  return divCol1;
}
function createDivCol2() {
  var divCol2 = document.createElement("div");
  divCol2.classList.add("col-div");
  divCol2.style.width = "50%";
  return divCol2;
}
function createDivCol3() {
  var divCol3 = document.createElement("div");
  divCol3.style.width = "33.3%";
  divCol3.classList.add("col-div");
  return divCol3;
}
function createDivCol4() {
  var divCol4 = document.createElement("div");
  divCol4.style.width = "25%";
  divCol4.classList.add("col-div");
  return divCol4;
}
function createDivCol5() {
  var divCol5 = document.createElement("div");
  divCol5.style.width = "20%";
  divCol5.classList.add("col-div");
  return divCol5;
}
function createDivCol6() {
  var divCol6 = document.createElement("div");
  divCol6.style.width = "16.6%";
  divCol6.classList.add("col-div");
  return divCol6;
}
// work on creating the create div -- end

const rowClose = document.getElementById("add-row-close");
rowClose.addEventListener("click", function () {
  setColumnNumberPopup.classList.remove("open");
});

export {
  createRowSection,
  addBlueTools,
  rowControl,
  handleMouseEnter,
  handleMouseLeave,
  setupMouseInteractions,
  setupResizingBehavior,
  createDivCol1,
};
