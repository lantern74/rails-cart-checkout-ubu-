import React from "react";
import ReactDOM from "react-dom/client";
import {
  closeAllSidebars,
  closeAllTextEditPopups,
  anyOfTheSidebarsOpen,
  getRandomColor,
} from "../editor_functions";

var setGreenMarginTop = document.getElementById("setGreenMarginTop");
var setGreenMarginBottom = document.getElementById("setGreenMarginBottom");
var setGreenPaddingTop = document.getElementById("setGreenPaddingTop");
var setGreenPaddingLeft = document.getElementById("setGreenPaddingLeft");
var setGreenPaddingRight = document.getElementById("setGreenPaddingRight");
var setGreenPaddingBottom = document.getElementById("setGreenPaddingBottom");

// Settings for Green Section Container
let selectedGreenSection = null;
function GreenGearElement(id) {
  selectedGreenSection = id;

  if (setSectionPopup.classList.contains("open")) {
    // setSectionPopup.classList.remove("open"); // Remove "open" class
    closeAllSidebars();
  } else {
    closeAllSidebars();
    setSectionPopup.classList.add("open"); // Add "open" class
  }
  loadPresetGreenSettings(id);
}

function loadPresetGreenSettings(id) {
  const editorComponent = document.getElementById(id);
  //get margin padding value
  let editorComponentStyles = getComputedStyle(editorComponent);
  setGreenMarginTop.innerText =
    editorComponentStyles.getPropertyValue("margin-top");
  setGreenMarginBottom.innerText =
    editorComponentStyles.getPropertyValue("margin-bottom");
  setGreenPaddingTop.innerText =
    editorComponentStyles.getPropertyValue("padding-top");
  setGreenPaddingLeft.innerText =
    editorComponentStyles.getPropertyValue("padding-left");
  setGreenPaddingRight.innerText =
    editorComponentStyles.getPropertyValue("padding-right");
  setGreenPaddingBottom.innerText =
    editorComponentStyles.getPropertyValue("padding-bottom");
  // Background color setting for Green Section
  const greenBackColor = document.getElementById("green-back-color");
  const greenBackColorIcon = document.getElementById("green-back-color-icon");
  greenBackColor.style.color = editorComponent.style.backgroundColor;
  greenBackColorIcon.style.color = editorComponent.style.backgroundColor;
  greenBackColor.addEventListener("input", function () {
    greenBackColorIcon.style.color = greenBackColor.value;
    const editorComponent = document.getElementById(selectedGreenSection);
    editorComponent.style.backgroundColor = greenBackColor.value;
  });

  //Setting Background Image
  const backgroundImage = document.getElementById("input-green-image");
  backgroundImage.addEventListener("input", function () {
    const editorComponent = document.getElementById(selectedGreenSection);
    editorComponent.style.background = 'url("' + backgroundImage.value + '")';
  });
  const imageRepeatOption = document.getElementById(
    "select-green-image-repeat-options"
  );
  imageRepeatOption.addEventListener("change", function () {
    if (imageRepeatOption.value == "No Repeat") {
      editorComponent.style.backgroundRepeat = "no-repeat";
    } else if (imageRepeatOption.value == "Repeat") {
      editorComponent.style.backgroundRepeat = "repeat";
    } else if (imageRepeatOption.value == "Repeat Horizontally") {
      editorComponent.style.backgroundRepeat = "repeat-x";
    } else if (imageRepeatOption.value == "Repeat Vertically") {
      editorComponent.style.backgroundRepeat = "repeat-y";
    }
  });
  const imageSizeOption = document.getElementById(
    "select-green-image-size-options"
  );
  imageSizeOption.addEventListener("change", function () {
    if (imageSizeOption.value == "Full Center") {
      editorComponent.style.backgroundSize = "auto";
    } else if (imageSizeOption.value == "Full 100% Width") {
      editorComponent.style.backgroundSize = "100% auto";
    } else if (imageSizeOption.value == "Full 100% Width & Height") {
      editorComponent.style.backgroundSize = "100% 100%";
    } else if (imageSizeOption.value == "Contain") {
      editorComponent.style.backgroundSize = "contain";
    }
  });
  //Box Shadow
  const setBoxShadow = document.getElementById("set-green-box-shadow");
  setBoxShadow.addEventListener("change", function () {
    const editorComponent = document.getElementById(selectedGreenSection);
    if (setBoxShadow.value == "No Shadow") {
      editorComponent.style.boxShadow = "none";
    } else if (setBoxShadow.value == "5% Drop Shadow") {
      editorComponent.style.boxShadow = "0 1px 3px #0000000d";
    } else if (setBoxShadow.value == "10% Drop Shadow") {
      editorComponent.style.boxShadow = "0 1px 5px #0000001a";
    } else if (setBoxShadow.value == "20% Drop Shadow") {
      editorComponent.style.boxShadow = "0 1px 5px #0003";
    } else if (setBoxShadow.value == "30% Drop Shadow") {
      editorComponent.style.boxShadow = "0 2px 5px 2px #0000004d";
    } else if (setBoxShadow.value == "40% Drop Shadow") {
      editorComponent.style.boxShadow = "0 2px 5px 2px #0006";
    } else if (setBoxShadow.value == "5% Inner Shadow") {
      editorComponent.style.boxShadow = "0 1px 3px #0000000d inset";
    } else if (setBoxShadow.value == "10% Inner Shadow") {
      editorComponent.style.boxShadow = "0 1px 5px #0000001a inset";
    } else if (setBoxShadow.value == "20% Inner Shadow") {
      editorComponent.style.boxShadow = "0 1px 5px #0003 inset";
    } else if (setBoxShadow.value == "30% Inner Shadow") {
      editorComponent.style.boxShadow = "0 2px 5px 2px #0000004d inset";
    } else if (setBoxShadow.value == "40% Inner Shadow") {
      editorComponent.style.boxShadow = "0 2px 5px 2px #0006 inset";
    }
  });
  function settingSectionBorderMouseLeave() {
    const editorComponent = document.getElementById(selectedGreenSection);
    if (settedSectionBorderType == "No Border") {
      editorComponent.style.border = "none";
    } else if (settedSectionBorderType == "full") {
      editorComponent.style.border = `${settedSectionBorderWidth} ${settedSectionBorderStyle} ${settedSectionBorderColor}`;
    } else if (settedSectionBorderType == "bottom") {
      editorComponent.style.border = "none";
      editorComponent.style.borderBottom = `${settedSectionBorderWidth} ${settedSectionBorderStyle} ${settedSectionBorderColor}`;
    } else if (settedSectionBorderType == "top") {
      editorComponent.style.border = "none";
      editorComponent.style.borderTop = `${settedSectionBorderWidth} ${settedSectionBorderStyle} ${settedSectionBorderColor}`;
    } else if (settedSectionBorderType == "top&bototm") {
      editorComponent.style.border = "none";
      editorComponent.style.borderBottom = `${settedSectionBorderWidth} ${settedSectionBorderStyle} ${settedSectionBorderColor}`;
      editorComponent.style.borderTop = `${settedSectionBorderWidth} ${settedSectionBorderStyle} ${settedSectionBorderColor}`;
    }
    editorComponent.style.borderRadius = settedRadiusValue;
    editorComponent.addEventListener("mouseleave", function () {
      if (settedSectionBorderType == "No Border") {
        editorComponent.style.border = "none";
      } else if (settedSectionBorderType == "full") {
        editorComponent.style.border = `${settedSectionBorderWidth} ${settedSectionBorderStyle} ${settedSectionBorderColor}`;
      } else if (settedSectionBorderType == "bottom") {
        editorComponent.style.border = "none";
        editorComponent.style.borderBottom = `${settedSectionBorderWidth} ${settedSectionBorderStyle} ${settedSectionBorderColor}`;
      } else if (settedSectionBorderType == "top") {
        editorComponent.style.border = "none";
        editorComponent.style.borderTop = `${settedSectionBorderWidth} ${settedSectionBorderStyle} ${settedSectionBorderColor}`;
      } else if (settedSectionBorderType == "top&bototm") {
        editorComponent.style.border = "none";
        editorComponent.style.borderBottom = `${settedSectionBorderWidth} ${settedSectionBorderStyle} ${settedSectionBorderColor}`;
        editorComponent.style.borderTop = `${settedSectionBorderWidth} ${settedSectionBorderStyle} ${settedSectionBorderColor}`;
      }
    });
  }
  //Border select
  var settedSectionBorderType;
  const borderSelect = document.getElementById("setting-section-border-select");
  borderSelect.addEventListener("change", function () {
    settedSectionBorderType = borderSelect.value;
    settingSectionBorderMouseLeave();
    if (borderSelect.value != "No Border") {
      document.getElementById("green-border-setting").style.display = "block";
    } else {
      document.getElementById("green-border-setting").style.display = "none";
    }
  });
  //set border style
  var settedSectionBorderStyle = "solid";
  const borderStyle = document.getElementById("setting-section-border-style");
  borderStyle.addEventListener("change", function () {
    settedSectionBorderStyle = borderStyle.value;
    settingSectionBorderMouseLeave();
  });
  //set border width
  var settedSectionBorderWidth = "3px";
  const borderWidth = document.getElementById("setting-section-border-width");
  borderWidth.addEventListener("change", function () {
    settedSectionBorderWidth = borderWidth.value;
    settingSectionBorderMouseLeave();
  });
  //set border color
  var settedSectionBorderColor = "#333";
  const borderColor = document.getElementById("section-border-color");
  const borderColorIcon = document.getElementById("section-border-color-icon");
  borderColor.style.color = editorComponent.style.borderColor;
  borderColorIcon.style.color = editorComponent.style.borderColor;
  borderColor.addEventListener("input", function () {
    borderColorIcon.style.color = borderColor.value;
    editorComponent.style.borderColor = borderColor.value;
    settedSectionBorderColor = borderColor.value;
  });
  //set border radius
  var settedRadiusValue = "0px";
  const borderRadius = document.getElementById("setting-section-border-radius");
  borderRadius.addEventListener("change", function () {
    settedRadiusValue = borderRadius.value;
    settingSectionBorderMouseLeave();
  });
  //set border edge
  const borderEdge = document.getElementById("setting-section-edge");
  borderEdge.addEventListener("change", function () {
    if (borderEdge.value == "All Edges") {
      editorComponent.style.borderRadius = settedRadiusValue;
    } else if (borderEdge.value == "Top Only Edges") {
      editorComponent.style.borderRadius = `${settedRadiusValue} ${settedRadiusValue} 0 0`;
    } else if (borderEdge.value == "Bottom Only Edges") {
      editorComponent.style.borderRadius = `0 0 ${settedRadiusValue} ${settedRadiusValue}`;
    }
  });
  //set section width
  const sectionWidth = document.getElementById("setting-section-width");
  sectionWidth.addEventListener("change", function () {
    if (sectionWidth.value == "full") {
      editorComponent.style.width = "100%";
    } else if (sectionWidth.value == "wide") {
      editorComponent.style.width = "80%";
    } else if (sectionWidth.value == "mid-wide") {
      editorComponent.style.width = "60%";
    } else if (sectionWidth.value == "small") {
      editorComponent.style.width = "50%";
    }
  });
}

// General and Advanced tab panel for Green Section
const greenGeneralTab = document.getElementById("green-general-tab");
const greenGeneralContent = document.getElementById("green-general-content");
const greenAdvancedTab = document.getElementById("green-advanced-tab");
const greenAdvancedContent = document.getElementById("green-advanced-content");
greenGeneralTab.addEventListener("click", function () {
  greenGeneralContent.classList.add("active");
  greenGeneralTab.classList.add("active");
  greenAdvancedContent.classList.remove("active");
  greenAdvancedTab.classList.remove("active");
});
greenAdvancedTab.addEventListener("click", function () {
  greenGeneralContent.classList.remove("active");
  greenGeneralTab.classList.remove("active");
  greenAdvancedContent.classList.add("active");
  greenAdvancedTab.classList.add("active");
});

const greenSettingClose = document.getElementById("greenpopup-close");
greenSettingClose.addEventListener("click", function () {
  selectedGreenSection = null;
  // setSectionPopup.classList.remove("open"); // Remove "open" class
  closeAllSidebars();
});

// export the currentSelectedGreenElement that has the right value

const currentSelectedGreenElement = (args) => {
  if (args) {
    selectedGreenSection = args;
  }
  return selectedGreenSection;
};

export { GreenGearElement, selectedGreenSection, currentSelectedGreenElement };
