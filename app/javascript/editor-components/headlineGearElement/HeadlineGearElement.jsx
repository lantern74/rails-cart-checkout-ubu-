import React from "react";
import ReactDOM from "react-dom/client";
// import { VideoDragAndDrop } from "./VideoDragAndDrop";
import { closeAllSidebars, closeAllTextEditPopups } from "../editor_functions";

var setOrangeMarginTop = document.getElementById("setOrangeMarginTop");
var setOrangeMarginBottom = document.getElementById("setOrangeMarginBottom");
var setOrangePaddingTop = document.getElementById("setOrangePaddingTop");
var setOrangePaddingLeft = document.getElementById("setOrangePaddingLeft");
var setOrangePaddingRight = document.getElementById("setOrangePaddingRight");
var setOrangePaddingBottom = document.getElementById("setOrangePaddingBottom");

// Settings for headline element
let selectedHeadlineElement = null;
let selectedHeadlineContainer = null;

function HeadlineGearElement(parentWrapper, parentType) {
  selectedHeadlineElement = parentWrapper.firstChild.id;
  selectedHeadlineContainer = parentWrapper.id;
  const titleComponent = document.getElementById("orange-title");

  wasTitle = titleComponent.textContent; //get the previous title which had the gear settings open

  const extractedTitle = parentType.split("-")[0]; // Extracts "headline" from "headline-field"
  titleComponent.textContent =
    extractedTitle.charAt(0).toUpperCase() + extractedTitle.slice(1); // Converts to "Headline"

  // dontClose = false;
  //this is when I had the headlines settings open automatically
  // if (titleComponent.textContent != wasTitle) {
  //   dontClose = true;
  // }

  // if (setHeadlinePopup.classList.contains("open")) {
  //   console.log("let's close:");
  //   console.log("dontClose?"+dontClose);
  //   if (!dontClose) {
  //     // closeAllSidebars();
  //   }
  // } else {
  //   closeAllTextEditPopups();
  //   closeAllSidebars();
  //   setHeadlinePopup.classList.add("open");
  // }

  loadPresetHeadlineSettings(parentWrapper);
}

/**
 * Loads preset settings for the headline element.
 *
 * @ param {HTMLElement} parentWrapper - The parent wrapper element.
 */
function loadPresetHeadlineSettings(parentWrapper) {
  const headlineContainer = document.getElementById(parentWrapper.id);
  const headlineComponent = document.getElementById(
    parentWrapper.firstChild.id
  );
  const headlineOpacitySelect = document.getElementById(
    "headline-opacity-select"
  );
  //get margin padding value
  let editorComponentStyles = getComputedStyle(headlineContainer);
  setOrangeMarginTop.innerText =
    editorComponentStyles.getPropertyValue("margin-top");
  setOrangeMarginBottom.innerText =
    editorComponentStyles.getPropertyValue("margin-bottom");
  setOrangePaddingTop.innerText =
    editorComponentStyles.getPropertyValue("padding-top");
  setOrangePaddingLeft.innerText =
    editorComponentStyles.getPropertyValue("padding-left");
  setOrangePaddingRight.innerText =
    editorComponentStyles.getPropertyValue("padding-right");
  setOrangePaddingBottom.innerText =
    editorComponentStyles.getPropertyValue("padding-bottom");
  // Background color setting for Headline Element
  const headlineBackColor = document.getElementById("headline-back-color");
  const headlineBackColorIcon = document.getElementById(
    "headline-back-color-icon"
  );
  headlineBackColor.style.color = headlineContainer.style.backgroundColor;
  headlineBackColorIcon.style.color = headlineContainer.style.backgroundColor;
  headlineBackColor.addEventListener("input", function () {
    headlineBackColorIcon.style.color = headlineBackColor.value;
    const headlineContainer = document.getElementById(
      selectedHeadlineContainer
    );
    headlineContainer.style.backgroundColor = headlineBackColor.value;
    headlineOpacitySelect.value = "1.0";
  });

  // Background color opacity for Headline Element
  headlineOpacitySelect.addEventListener("change", function () {
    const headlineContainer = document.getElementById(parentWrapper.id);
    let rgbColor = headlineContainer.style.backgroundColor;
    if (headlineContainer.style.backgroundColor.includes("rgba")) {
      rgbColor =
        headlineContainer.style.backgroundColor.replace(/, [\d\.]+\)$/, "") +
        ")";
    }
    let convertedRGBA = rgbColor.replace(
      ")",
      `, ${headlineOpacitySelect.value})`
    );
    headlineContainer.style.backgroundColor = convertedRGBA;
  });

  // Text Alignment for Headline Element
  const headlineAlignButtons = document.querySelectorAll(".align-button");
  headlineAlignButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const headlineComponent = document.getElementById(
        selectedHeadlineElement
      );

      headlineComponent.style.textAlign = "";
      headlineAlignButtons.forEach(function (btn) {
        btn.classList.remove("selected-button");
      });
      if (this.querySelector("i").classList.contains("bi-text-left")) {
        headlineComponent.style.textAlign = "left";
        this.classList.add("selected-button");
      } else if (this.querySelector("i").classList.contains("bi-text-center")) {
        headlineComponent.style.textAlign = "center";
        this.classList.add("selected-button");
      } else if (this.querySelector("i").classList.contains("bi-text-right")) {
        headlineComponent.style.textAlign = "right";
        this.classList.add("selected-button");
      } else if (this.querySelector("i").classList.contains("bi-justify")) {
        headlineComponent.style.textAlign = "justify";
        this.classList.add("selected-button");
      }
    });
  });

  // fontSizeSlider -----------------------------------------
  const fontSizeSlider = document.getElementById("headline-font-slider");
  // Get the initial font size from the selected element
  const initialFontSize = window.getComputedStyle(
    parentWrapper.childNodes[0]
  ).fontSize;
  // Set the slider value to the initial font size
  fontSizeSlider.value = parseFloat(initialFontSize);
  // Listen for changes in the slider value
  fontSizeSlider.addEventListener("input", function () {
    if (selectedHeadlineElement) {
      // Apply the font size to the selected .elSettings element
      const targetElement = document.getElementById(selectedHeadlineElement);
      const fontSize = this.value;
      targetElement.style.fontSize = fontSize + "px";
    }
  });

  // Text Shadow
  const headlineTextShadow = document.getElementById(
    "set-headline-text-shadow"
  );
  headlineTextShadow.addEventListener("change", function () {
    const headlineComponent = document.getElementById(selectedHeadlineElement);
    if (headlineTextShadow.value == "No Shadow") {
      headlineComponent.style.textShadow = "none";
    } else if (headlineTextShadow.value == "Light Fade") {
      headlineComponent.style.textShadow = "1px 1px 1px rgba(0,0,0,0.2)";
    } else if (headlineTextShadow.value == "Mid Shadow") {
      headlineComponent.style.textShadow = "1px 1px 2px rgba(0,0,0,0.4)";
    } else if (headlineTextShadow.value == "Strong Shadow") {
      headlineComponent.style.textShadow = "1px 1px 3px rgba(0,0,0,0.5)";
    }
  });
  // Letter Spacing
  const headlineLetterSpacing = document.getElementById(
    "set-headline-letter-spacing"
  );
  headlineLetterSpacing.addEventListener("change", function () {
    const headlineComponent = document.getElementById(selectedHeadlineElement);
    if (headlineLetterSpacing.value == "Normal") {
      headlineComponent.style.letterSpacing = "0";
    } else if (headlineLetterSpacing.value == "1px") {
      headlineComponent.style.letterSpacing = "1px";
    } else if (headlineLetterSpacing.value == "2px") {
      headlineComponent.style.letterSpacing = "2px";
    } else if (headlineLetterSpacing.value == "3px") {
      headlineComponent.style.letterSpacing = "3px";
    } else if (headlineLetterSpacing.value == "-1px") {
      headlineComponent.style.letterSpacing = "-1px";
    }
  });
  //Box Shadow
  const setBoxShadow = document.getElementById("set-headline-box-shadow");
  setBoxShadow.addEventListener("change", function () {
    const headlineComponent = document.getElementById(selectedHeadlineElement);
    if (setBoxShadow.value == "No Shadow") {
      headlineComponent.parentNode.style.boxShadow = "none";
    } else if (setBoxShadow.value == "5% Drop Shadow") {
      headlineComponent.parentNode.style.boxShadow = "0 1px 3px #0000000d";
    } else if (setBoxShadow.value == "10% Drop Shadow") {
      headlineComponent.parentNode.style.boxShadow = "0 1px 5px #0000001a";
    } else if (setBoxShadow.value == "20% Drop Shadow") {
      headlineComponent.parentNode.style.boxShadow = "0 1px 5px #0003";
    } else if (setBoxShadow.value == "30% Drop Shadow") {
      headlineComponent.parentNode.style.boxShadow = "0 2px 5px 2px #0000004d";
    } else if (setBoxShadow.value == "40% Drop Shadow") {
      headlineComponent.parentNode.style.boxShadow = "0 2px 5px 2px #0006";
    } else if (setBoxShadow.value == "5% Inner Shadow") {
      headlineComponent.parentNode.style.boxShadow =
        "0 1px 3px #0000000d inset";
    } else if (setBoxShadow.value == "10% Inner Shadow") {
      headlineComponent.parentNode.style.boxShadow =
        "0 1px 5px #0000001a inset";
    } else if (setBoxShadow.value == "20% Inner Shadow") {
      headlineComponent.parentNode.style.boxShadow = "0 1px 5px #0003 inset";
    } else if (setBoxShadow.value == "30% Inner Shadow") {
      headlineComponent.parentNode.style.boxShadow =
        "0 2px 5px 2px #0000004d inset";
    } else if (setBoxShadow.value == "40% Inner Shadow") {
      headlineComponent.parentNode.style.boxShadow =
        "0 2px 5px 2px #0006 inset";
    }
  });

  // font family dropdown -----------------------------------------
  const fontFamilySelect = document.getElementById(
    "headline-font-family-select"
  );
  console.log(
    getComputedStyle(headlineComponent).fontFamily,
    "headlinecomponents-fontfamily"
  );
  fontFamilySelect.value = getComputedStyle(
    headlineComponent
  ).fontFamily.replace(/['"]/g, "");
  fontFamilySelect.addEventListener("change", function () {
    const headlineComponent = document.getElementById(selectedHeadlineElement);
    headlineComponent.style.fontFamily = fontFamilySelect.value;
  });

  // Text color setting for Headline Element
  const headlineColor = document.getElementById("headline-color");
  const headlineColorIcon = document.getElementById("headline-color-icon");

  headlineColor.addEventListener("input", function () {
    const hc = document.getElementById(selectedHeadlineElement);
    headlineColor.style.color = hc.style.color;
    headlineColorIcon.style.color = hc.style.color;
    headlineColorIcon.style.color = headlineColor.value;

    // Update the color icon if <b> exists in hc
    const hcBoldElement = hc.querySelector("span");
    if (hcBoldElement) {
      headlineColorIcon.style.color = getComputedStyle(hcBoldElement).color;
    }

    // Apply the new color to <span> elements or create them for text nodes
    Array.from(hc.childNodes).forEach((node) => {
      if (
        node.nodeType === Node.TEXT_NODE &&
        node.textContent.trim().length > 0
      ) {
        // Wrap text nodes in a span and apply the color
        const span = document.createElement("span");
        span.textContent = node.textContent;
        span.style.color = headlineColor.value; // Apply the chosen color
        hc.replaceChild(span, node);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== "B") {
        // Apply the color to existing non-<b> elements (like <span>)
        node.style.color = headlineColor.value;
      }
    });
  });

  // Bold Text Color
  const headlineBoldColor = document.getElementById("headline-bold-color");
  const headlineBoldColorIcon = document.getElementById(
    "headline-bold-color-icon"
  );
  // Update the color icon if <b> exists in hc
  const hcBoldElement = headlineComponent.querySelector("b");

  if (hcBoldElement) {
    headlineBoldColorIcon.style.color = getComputedStyle(hcBoldElement).color;
  }

  headlineBoldColor.addEventListener("input", function () {
    const hc = document.getElementById(selectedHeadlineElement);

    // Update the color icon if <b> exists in hc
    const hcBoldElement = hc.querySelector("b");
    if (hcBoldElement) {
      headlineBoldColorIcon.style.color = getComputedStyle(hcBoldElement).color;
    }

    // change the child of hc that has bold tags
    hc.querySelectorAll("b").forEach((child) => {
      child.style.color = headlineBoldColor.value;
    });
  });

  // Italic Text Color
  const headlineItalicColor = document.getElementById("headline-italic-color");
  const headlineItalicColorIcon = document.getElementById(
    "headline-italic-color-icon"
  );
  var IatalicTags = headlineComponent.querySelectorAll("i");
  headlineItalicColor.addEventListener("input", function () {
    headlineItalicColorIcon.style.color = headlineItalicColor.value;
    IatalicTags.forEach(function (tag) {
      tag.style.color = headlineItalicColor.value;
    });
  });
  // Underline Text Color
  const headlineUnderlineColor = document.getElementById(
    "headline-underline-color"
  );
  const headlineUnderlineColorIcon = document.getElementById(
    "headline-underline-color-icon"
  );
  var UnderlineTags = headlineComponent.querySelectorAll("u");
  headlineUnderlineColor.addEventListener("input", function () {
    headlineUnderlineColorIcon.style.color = headlineUnderlineColor.value;
    UnderlineTags.forEach(function (tag) {
      tag.style.color = headlineUnderlineColor.value;
    });
  });
  // Link Text Color
  const headlineLinkColor = document.getElementById("headline-link-color");
  const headlineLinkColorIcon = document.getElementById(
    "headline-link-color-icon"
  );
  var LinkTags = headlineComponent.querySelectorAll("a");
  headlineLinkColor.addEventListener("input", function () {
    headlineLinkColorIcon.style.color = headlineLinkColor.value;
    LinkTags.forEach(function (tag) {
      tag.style.color = headlineLinkColor.value;
    });
  });
  function settingHeadlineBorderMouseLeave() {
    if (settedHeadlineBorderType == "No Border") {
      headlineContainer.style.border = "none";
    } else if (settedHeadlineBorderType == "full") {
      headlineContainer.style.border = `${settedHeadlineBorderWidth} ${settedHeadlineBorderStyle} ${settedHeadlineBorderColor}`;
    } else if (settedHeadlineBorderType == "bottom") {
      headlineContainer.style.border = "none";
      headlineContainer.style.borderBottom = `${settedHeadlineBorderWidth} ${settedHeadlineBorderStyle} ${settedHeadlineBorderColor}`;
    } else if (settedHeadlineBorderType == "top") {
      headlineContainer.style.border = "none";
      headlineContainer.style.borderTop = `${settedHeadlineBorderWidth} ${settedHeadlineBorderStyle} ${settedHeadlineBorderColor}`;
    } else if (settedHeadlineBorderType == "top&bototm") {
      headlineContainer.style.border = "none";
      headlineContainer.style.borderBottom = `${settedHeadlineBorderWidth} ${settedHeadlineBorderStyle} ${settedHeadlineBorderColor}`;
      headlineContainer.style.borderTop = `${settedHeadlineBorderWidth} ${settedHeadlineBorderStyle} ${settedHeadlineBorderColor}`;
    }
    headlineContainer.style.borderRadius = settedRadiusValue;
    headlineContainer.addEventListener("mouseleave", function () {
      if (settedHeadlineBorderType == "No Border") {
        headlineContainer.style.border = "none";
      } else if (settedHeadlineBorderType == "full") {
        headlineContainer.style.border = `${settedHeadlineBorderWidth} ${settedHeadlineBorderStyle} ${settedHeadlineBorderColor}`;
      } else if (settedHeadlineBorderType == "bottom") {
        headlineContainer.style.border = "none";
        headlineContainer.style.borderBottom = `${settedHeadlineBorderWidth} ${settedHeadlineBorderStyle} ${settedHeadlineBorderColor}`;
      } else if (settedHeadlineBorderType == "top") {
        headlineContainer.style.border = "none";
        headlineContainer.style.borderTop = `${settedHeadlineBorderWidth} ${settedHeadlineBorderStyle} ${settedHeadlineBorderColor}`;
      } else if (settedHeadlineBorderType == "top&bototm") {
        headlineContainer.style.border = "none";
        headlineContainer.style.borderBottom = `${settedHeadlineBorderWidth} ${settedHeadlineBorderStyle} ${settedHeadlineBorderColor}`;
        headlineContainer.style.borderTop = `${settedHeadlineBorderWidth} ${settedHeadlineBorderStyle} ${settedHeadlineBorderColor}`;
      }
    });
  }
  //Border select
  var settedHeadlineBorderType;
  const borderSelect = document.getElementById(
    "setting-headline-border-select"
  );
  borderSelect.addEventListener("change", function () {
    settedHeadlineBorderType = borderSelect.value;
    settingHeadlineBorderMouseLeave();
    if (borderSelect.value != "No Border") {
      document.getElementById("headline-border-setting").style.display =
        "block";
    } else {
      document.getElementById("headline-border-setting").style.display = "none";
    }
  });
  //set border style
  var settedHeadlineBorderStyle = "solid";
  const borderStyle = document.getElementById("setting-headline-border-style");
  borderStyle.addEventListener("change", function () {
    settedHeadlineBorderStyle = borderStyle.value;
    settingHeadlineBorderMouseLeave();
  });
  //set border width
  var settedHeadlineBorderWidth = "3px";
  const borderWidth = document.getElementById("setting-headline-border-width");
  borderWidth.addEventListener("change", function () {
    settedHeadlineBorderWidth = borderWidth.value;
    settingHeadlineBorderMouseLeave();
  });
  //set border color
  var settedHeadlineBorderColor = "#333";
  const borderColor = document.getElementById("headline-border-color");
  const borderColorIcon = document.getElementById("headline-border-color-icon");
  borderColor.style.color = headlineContainer.style.borderColor;
  borderColorIcon.style.color = headlineContainer.style.borderColor;
  borderColor.addEventListener("input", function () {
    borderColorIcon.style.color = borderColor.value;
    headlineContainer.style.borderColor = borderColor.value;
    settedHeadlineBorderColor = borderColor.value;
  });
  //set border radius
  var settedRadiusValue = "0px";
  const borderRadius = document.getElementById(
    "setting-headline-border-radius"
  );
  borderRadius.addEventListener("change", function () {
    settedRadiusValue = borderRadius.value;
    settingHeadlineBorderMouseLeave();
  });
  //set border edge
  const borderEdge = document.getElementById("setting-headline-edge");
  borderEdge.addEventListener("change", function () {
    if (borderEdge.value == "All Edges") {
      headlineContainer.style.borderRadius = settedRadiusValue;
    } else if (borderEdge.value == "Top Only Edges") {
      headlineContainer.style.borderRadius = `${settedRadiusValue} ${settedRadiusValue} 0 0`;
    } else if (borderEdge.value == "Bottom Only Edges") {
      headlineContainer.style.borderRadius = `0 0 ${settedRadiusValue} ${settedRadiusValue}`;
    }
  });
  //icon setting
  if (headlineContainer.getAttribute("data-de-type") == "Bullet List") {
    const iconButtons = document.querySelectorAll(".icon-button");
    Array.from(iconButtons).forEach((button) => {
      button.addEventListener("click", function () {
        const headlineComponent = document.getElementById(
          selectedHeadlineElement
        );

        // Select the specific <i> element you want to change
        const bulletListIcons = headlineComponent.querySelectorAll("i");

        Array.from(bulletListIcons).forEach((bulletListIcon) => {
          bulletListIcon.className = button.childNodes[0].className;
        });
      });
    });
  }
}

const headlineSettingClose = document.getElementById("headline-close");
headlineSettingClose.addEventListener("click", function () {
  selectedHeadlineElement = null;
  selectedHeadlineContainer = null;
  setHeadlinePopup.classList.remove("open");
});

// export the currentSelectedHeadlineElement that has the right value

const currentSelectedHeadlineElement = (args) => {
  if (args) {
    selectedHeadlineElement = args;
  }
  return selectedHeadlineElement;
};

export {
  HeadlineGearElement,
  selectedHeadlineElement,
  currentSelectedHeadlineElement,
};
