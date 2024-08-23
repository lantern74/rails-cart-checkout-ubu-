import React from "react";
import ReactDOM from "react-dom/client";
import {
  closeAllSidebars,
  closeAllTextEditPopups,
  anyOfTheSidebarsOpen,
  getRandomColor,
} from "../editor_functions";

var setBlueMarginTop = document.getElementById("setBlueMarginTop");
var setBlueMarginBottom = document.getElementById("setBlueMarginBottom");
var setBluePaddingTop = document.getElementById("setBluePaddingTop");
var setBluePaddingLeft = document.getElementById("setBluePaddingLeft");
var setBluePaddingRight = document.getElementById("setBluePaddingRight");
var setBluePaddingBottom = document.getElementById("setBluePaddingBottom");

// Settings for Blue Section Container
let selectedBlueSection = null;

function BlueGearElement(id) {
  selectedBlueSection = id;
  selectedBlueSectionObject = document.getElementById(id); // Get the DOM element by its ID

  if (!setColumnPopup.classList.contains("open")) {
    closeAllSidebars();
    setColumnPopup.classList.add("open");
  } else if (setColumnPopup.classList.contains("open")) {
    closeAllSidebars();
  }
  // * THIS IS THE SLIDING SETTINGS PANEL FOR BLUE
  loadBlueSettings(id);

  event.stopPropagation();
}

function loadBlueSettings(id) {
  const blueComponent = document.getElementById(id);
  //get margin padding value
  let editorComponentStyles = getComputedStyle(blueComponent);
  setBlueMarginTop.innerText =
    editorComponentStyles.getPropertyValue("margin-top");
  setBlueMarginBottom.innerText =
    editorComponentStyles.getPropertyValue("margin-bottom");
  setBluePaddingTop.innerText =
    editorComponentStyles.getPropertyValue("padding-top");
  setBluePaddingLeft.innerText =
    editorComponentStyles.getPropertyValue("padding-left");
  setBluePaddingRight.innerText =
    editorComponentStyles.getPropertyValue("padding-right");
  setBluePaddingBottom.innerText =
    editorComponentStyles.getPropertyValue("padding-bottom");
  // Background color setting for Blue Section
  const blueBackColor = document.getElementById("blue-back-color");
  const blueBackColorIcon = document.getElementById("blue-back-color-icon");
  blueBackColor.style.color = blueComponent.style.backgroundColor;
  blueBackColorIcon.style.color = blueComponent.style.backgroundColor;
  blueBackColor.addEventListener("input", function () {
    blueBackColorIcon.style.color = blueBackColor.value;
    const blueComponent = document.getElementById(selectedBlueSection);
    blueComponent.style.backgroundColor = blueBackColor.value;
  });

  // Alginment for blue Section
  const alignSelect = document.getElementById("blue-align-select");
  if (blueComponent.style.margin === "auto") {
    alignSelect.value = "center";
  } else if (blueComponent.style.marginLeft === "auto") {
    alignSelect.value = "right";
  } else {
    alignSelect.value = "left";
  }
  alignSelect.addEventListener("change", function () {
    const selectedAlignment = alignSelect.value;
    const blueComponent = document.getElementById(selectedBlueSection);
    if (selectedAlignment === "center") {
      blueComponent.style.margin = "auto";
    } else if (selectedAlignment === "left") {
      blueComponent.style.margin = "0";
    } else if (selectedAlignment === "right") {
      blueComponent.style.margin = "0";
      blueComponent.style.marginLeft = "auto";
    }
  });

  // Width range change for blue Section
  const blueWidthSlider = document.getElementById("blue-width-slider");
  const blueWidthValue = document.getElementById("blue-width-value");
  if (blueComponent.style.width) {
    blueWidthSlider.value = parseInt(blueComponent.style.width);
    blueWidthValue.value = parseInt(blueComponent.style.width);
  } else {
    blueWidthSlider.value = 100;
    blueWidthValue.value = 100;
  }
  blueWidthSlider.addEventListener("input", function () {
    blueWidthValue.value = blueWidthSlider.value;
    const blueComponent = document.getElementById(selectedBlueSection);
    blueComponent.style.width = `${blueWidthSlider.value}%`;
  });
  blueWidthValue.addEventListener("change", function () {
    let parsedValue = parseInt(blueWidthValue.value);
    if (parsedValue >= 0 && parsedValue <= 100) {
      blueWidthSlider.value = parsedValue;
    }
    const blueComponent = document.getElementById(selectedBlueSection);
    blueComponent.style.width = `${parsedValue}%`;
  });
  //Box Shadow
  const setBoxShadow = document.getElementById("set-blue-box-shadow");
  setBoxShadow.addEventListener("change", function () {
    const blueComponent = document.getElementById(selectedBlueSection);
    if (setBoxShadow.value == "No Shadow") {
      blueComponent.style.boxShadow = "none";
    } else if (setBoxShadow.value == "5% Drop Shadow") {
      blueComponent.style.boxShadow = "0 1px 3px #0000000d";
    } else if (setBoxShadow.value == "10% Drop Shadow") {
      blueComponent.style.boxShadow = "0 1px 5px #0000001a";
    } else if (setBoxShadow.value == "20% Drop Shadow") {
      blueComponent.style.boxShadow = "0 1px 5px #0003";
    } else if (setBoxShadow.value == "30% Drop Shadow") {
      blueComponent.style.boxShadow = "0 2px 5px 2px #0000004d";
    } else if (setBoxShadow.value == "40% Drop Shadow") {
      blueComponent.style.boxShadow = "0 2px 5px 2px #0006";
    } else if (setBoxShadow.value == "5% Inner Shadow") {
      blueComponent.style.boxShadow = "0 1px 3px #0000000d inset";
    } else if (setBoxShadow.value == "10% Inner Shadow") {
      blueComponent.style.boxShadow = "0 1px 5px #0000001a inset";
    } else if (setBoxShadow.value == "20% Inner Shadow") {
      blueComponent.style.boxShadow = "0 1px 5px #0003 inset";
    } else if (setBoxShadow.value == "30% Inner Shadow") {
      blueComponent.style.boxShadow = "0 2px 5px 2px #0000004d inset";
    } else if (setBoxShadow.value == "40% Inner Shadow") {
      blueComponent.style.boxShadow = "0 2px 5px 2px #0006 inset";
    }
  });
  //Setting Background Image
  const backgroundImage = document.getElementById("input-blue-image");
  backgroundImage.addEventListener("input", function () {
    blueComponent.style.backgroundImage =
      'url("' + backgroundImage.value + '")';
  });
  const imageRepeatOption = document.getElementById(
    "select-blue-image-repeat-options"
  );
  imageRepeatOption.addEventListener("change", function () {
    if (imageRepeatOption.value == "No Repeat") {
      blueComponent.style.backgroundRepeat = "no-repeat";
    } else if (imageRepeatOption.value == "Repeat") {
      blueComponent.style.backgroundRepeat = "repeat";
    } else if (imageRepeatOption.value == "Repeat Horizontally") {
      blueComponent.style.backgroundRepeat = "repeat-x";
    } else if (imageRepeatOption.value == "Repeat Vertically") {
      blueComponent.style.backgroundRepeat = "repeat-y";
    }
  });
  const imageSizeOption = document.getElementById(
    "select-blue-image-size-options"
  );
  imageSizeOption.addEventListener("change", function () {
    if (imageSizeOption.value == "Full Center") {
      blueComponent.style.backgroundSize = "auto";
    } else if (imageSizeOption.value == "Full 100% Width") {
      blueComponent.style.backgroundSize = "100% auto";
    } else if (imageSizeOption.value == "Full 100% Width & Height") {
      blueComponent.style.backgroundSize = "100% 100%";
    } else if (imageSizeOption.value == "Contain") {
      blueComponent.style.backgroundSize = "contain";
    }
  });
  function settingColumnBorderMouseLeave() {
    const blueComponent = document.getElementById(selectedBlueSection);
    if (settedColumnBorderType == "No Border") {
      blueComponent.style.border = "none";
    } else if (settedColumnBorderType == "full") {
      blueComponent.style.border = `${settedColumnBorderWidth} ${settedColumnBorderStyle} ${settedColumnBorderColor}`;
    } else if (settedColumnBorderType == "bottom") {
      blueComponent.style.border = "none";
      blueComponent.style.borderBottom = `${settedColumnBorderWidth} ${settedColumnBorderStyle} ${settedColumnBorderColor}`;
    } else if (settedColumnBorderType == "top") {
      blueComponent.style.border = "none";
      blueComponent.style.borderTop = `${settedColumnBorderWidth} ${settedColumnBorderStyle} ${settedColumnBorderColor}`;
    } else if (settedColumnBorderType == "top&bototm") {
      blueComponent.style.border = "none";
      blueComponent.style.borderBottom = `${settedColumnBorderWidth} ${settedColumnBorderStyle} ${settedColumnBorderColor}`;
      blueComponent.style.borderTop = `${settedColumnBorderWidth} ${settedColumnBorderStyle} ${settedColumnBorderColor}`;
    }
    blueComponent.style.borderRadius = settedRadiusValue;
    blueComponent.addEventListener("mouseleave", function () {
      if (settedColumnBorderType == "No Border") {
        blueComponent.style.border = "none";
      } else if (settedColumnBorderType == "full") {
        blueComponent.style.border = `${settedColumnBorderWidth} ${settedColumnBorderStyle} ${settedColumnBorderColor}`;
      } else if (settedColumnBorderType == "bottom") {
        blueComponent.style.border = "none";
        blueComponent.style.borderBottom = `${settedColumnBorderWidth} ${settedColumnBorderStyle} ${settedColumnBorderColor}`;
      } else if (settedColumnBorderType == "top") {
        blueComponent.style.border = "none";
        blueComponent.style.borderTop = `${settedColumnBorderWidth} ${settedColumnBorderStyle} ${settedColumnBorderColor}`;
      } else if (settedColumnBorderType == "top&bototm") {
        blueComponent.style.border = "none";
        blueComponent.style.borderBottom = `${settedColumnBorderWidth} ${settedColumnBorderStyle} ${settedColumnBorderColor}`;
        blueComponent.style.borderTop = `${settedColumnBorderWidth} ${settedColumnBorderStyle} ${settedColumnBorderColor}`;
      }
    });
  }

  //Border select
  var settedColumnBorderType;
  const borderSelect = document.getElementById("setting-column-border-select");
  borderSelect.addEventListener("change", function () {
    settedColumnBorderType = borderSelect.value;
    settingColumnBorderMouseLeave();
    if (borderSelect.value != "No Border") {
      document.getElementById("blue-border-setting").style.display = "block";
    } else {
      document.getElementById("blue-border-setting").style.display = "none";
    }
  });
  //set border style
  var settedColumnBorderStyle = "solid";
  const borderStyle = document.getElementById("setting-column-border-style");
  borderStyle.addEventListener("change", function () {
    settedColumnBorderStyle = borderStyle.value;
    settingColumnBorderMouseLeave();
  });
  //set border width
  var settedColumnBorderWidth = "3px";
  const borderWidth = document.getElementById("setting-column-border-width");
  borderWidth.addEventListener("change", function () {
    settedColumnBorderWidth = borderWidth.value;
    settingColumnBorderMouseLeave();
  });
  //set border color
  var settedColumnBorderColor = "#333";
  const borderColor = document.getElementById("column-border-color");
  const borderColorIcon = document.getElementById("column-border-color-icon");
  borderColor.style.color = blueComponent.style.borderColor;
  borderColorIcon.style.color = blueComponent.style.borderColor;
  borderColor.addEventListener("input", function () {
    borderColorIcon.style.color = borderColor.value;
    blueComponent.style.borderColor = borderColor.value;
    settedColumnBorderColor = borderColor.value;
  });
  //set border radius
  var settedRadiusValue = "0px";
  const borderRadius = document.getElementById("setting-column-border-radius");
  borderRadius.addEventListener("change", function () {
    settedRadiusValue = borderRadius.value;
    settingColumnBorderMouseLeave();
  });
  //set border edge
  const borderEdge = document.getElementById("setting-column-edge");
  borderEdge.addEventListener("change", function () {
    if (borderEdge.value == "All Edges") {
      blueComponent.style.borderRadius = settedRadiusValue;
    } else if (borderEdge.value == "Top Only Edges") {
      blueComponent.style.borderRadius = `${settedRadiusValue} ${settedRadiusValue} 0 0`;
    } else if (borderEdge.value == "Bottom Only Edges") {
      blueComponent.style.borderRadius = `0 0 ${settedRadiusValue} ${settedRadiusValue}`;
    }
  });
}

// General and Advanced tab panel for Blue Section
const blueGeneralTab = document.getElementById("blue-general-tab");
const blueGeneralContent = document.getElementById("blue-general-content");
const blueAdvancedTab = document.getElementById("blue-advanced-tab");
const blueAdvancedContent = document.getElementById("blue-advanced-content");
blueGeneralTab.addEventListener("click", function () {
  blueGeneralContent.classList.add("active");
  blueGeneralTab.classList.add("active");
  blueAdvancedContent.classList.remove("active");
  blueAdvancedTab.classList.remove("active");
});
blueAdvancedTab.addEventListener("click", function () {
  blueGeneralContent.classList.remove("active");
  blueGeneralTab.classList.remove("active");
  blueAdvancedContent.classList.add("active");
  blueAdvancedTab.classList.add("active");
});

const blueSettingClose = document.getElementById("bluepopup-close");
blueSettingClose.addEventListener("click", function () {
  selectedBlueSection = null;
  setColumnPopup.classList.remove("open");
});

// export the currentSelectedBlueElement that has the right value

const currentSelectedBlueElement = (args) => {
  if (args) {
    selectedBlueSection = args;
  }
  return selectedBlueSection;
};

export { BlueGearElement, selectedBlueSection, currentSelectedBlueElement };
