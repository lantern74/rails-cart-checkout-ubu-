import React from "react";
import ReactDOM from "react-dom/client";
// import { VideoDragAndDrop } from "./VideoDragAndDrop";
import { closeAllSidebars, closeAllTextEditPopups } from "../editor_functions";

var setButtonMarginTop = document.getElementById("setButtonMarginTop");
var setButtonMarginLeft = document.getElementById("setButtonMarginLeft");
var setButtonMarginRight = document.getElementById("setButtonMarginRight");
var setButtonMarginBottom = document.getElementById("setButtonMarginBottom");
var setButtonPaddingTop = document.getElementById("setButtonPaddingTop");
var setButtonPaddingLeft = document.getElementById("setButtonPaddingLeft");
var setButtonPaddingRight = document.getElementById("setButtonPaddingRight");
var setButtonPaddingBottom = document.getElementById("setButtonPaddingBottom");

// Settings for button element
let selectedElSettings = null; // Global variable to store the selected .elSettings element
let selectedButtonElement = null;

// Select all anchor elements within elements with class "elSettings"
var elSettingsAnchors = document.querySelectorAll("a.elSettings");
var setButtonPopup = document.getElementById("setButtonPopup"); //id is the button settings

// Attach the click event to each anchor element within "elSettings" buttons
elSettingsAnchors.forEach(function (elSettingsAnchor) {
  elSettingsAnchor.addEventListener("click", function (event) {
    event.preventDefault();
    if (setButtonPopup.classList.contains("open")) {
      closeAllSidebars();
      ButtonGearElement(elSettingsAnchor);
    }
    //  else {
    //   // closeAllSidebars();
    //   // setButtonPopup.classList.add("open");
    // }
  });
});

function ButtonGearElement(element) {
  selectedElSettings = element.id;
  selectedButtonElement = element.parentNode.id;

  if (setButtonPopup.classList.contains("open")) {
    closeAllSidebars();
    document.getElementById("marginPaddingPopup").style.display = "none";
  } else {
    closeAllSidebars();
    setButtonPopup.classList.add("open");
  }
  loadPresetButtonSettings(element);
  event.stopPropagation();
}

/** *
 * @ param {HTMLElement} parentWrapper - The parent wrapper element.
 */
function loadPresetButtonSettings(element) {
  // Action select dropdown -----------------------------------------
  const urlInputContainers = document.querySelectorAll(".url-input-container");
  const actionSelect = document.getElementById("action-select");
  const actionText = document.getElementById(selectedElSettings);
  const urlInput = document.getElementById("url-input");
  const buttonGeneralTab = document.getElementById("button-general-tab");
  const buttonGeneralContent = document.getElementById("button-general-content");
  const buttonAdvancedTab = document.getElementById("button-advanced-tab");
  const buttonAdvancedContent = document.getElementById("button-advanced-content");
  buttonGeneralTab.addEventListener("click", function () {
    buttonGeneralContent.classList.add("active");
    buttonGeneralTab.classList.add("active");
    buttonAdvancedContent.classList.remove("active");
    buttonAdvancedTab.classList.remove("active");
  });
  buttonAdvancedTab.addEventListener("click", function () {
    buttonGeneralContent.classList.remove("active");
    buttonGeneralTab.classList.remove("active");
    buttonAdvancedContent.classList.add("active");
    buttonAdvancedTab.classList.add("active");
  });
  const selectText = document.getElementById(selectedElSettings);
  const selectParentButton = document.getElementById(selectedButtonElement);
  //get margin padding value
  if (selectText) {
    var editorComponentStyles = getComputedStyle(selectText);
    var editorParentComponentStyles = getComputedStyle(selectParentButton);

    if (desktopBtn.classList.contains("active")) {
      setButtonMarginTop.innerText = editorParentComponentStyles.getPropertyValue("--desktop-margin-top");
      setButtonMarginLeft.innerText = editorParentComponentStyles.getPropertyValue("--desktop-margin-left");
      setButtonMarginRight.innerText = editorParentComponentStyles.getPropertyValue("--desktop-margin-right");
      setButtonMarginBottom.innerText = editorParentComponentStyles.getPropertyValue("--desktop-margin-bottom");
      setButtonPaddingTop.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-top");
      setButtonPaddingLeft.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-left");
      setButtonPaddingRight.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-right");
      setButtonPaddingBottom.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-bottom");
    } else if (mobileBtn.classList.contains("active")) {
      setButtonMarginTop.innerText = editorParentComponentStyles.getPropertyValue("--mobile-margin-top");
      setButtonMarginLeft.innerText = editorParentComponentStyles.getPropertyValue("--mobile-margin-left");
      setButtonMarginRight.innerText = editorParentComponentStyles.getPropertyValue("--mobile-margin-right");
      setButtonMarginBottom.innerText = editorParentComponentStyles.getPropertyValue("--mobile-margin-bottom");
      setButtonPaddingTop.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-top");
      setButtonPaddingLeft.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-left");
      setButtonPaddingRight.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-right");
      setButtonPaddingBottom.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-bottom");
    }
  } else {
    console.error("Selected element not found:", selectedElSettings);
  }

  // Initialize the dropdown with the current value of the href attribute
  if (actionText) {
    readHref = actionText.getAttribute("href");
    if (readHref === "#open-popup" || readHref === "#submit-form" || readHref === "#") {
      actionSelect.value = readHref;
    } else {
      actionSelect.value = "#";
      urlInput.value = readHref;
    }
  } else {
    console.error("actionText element not found");
    // Handle the case when actionText is null, e.g., set defaults or show an error
  }

  urlInputContainers.forEach((container) => {
    //if doesn't equal those vals the show the field
    if (!(readHref === "#open-popup" || readHref === "#submit-form")) {
      container.style.display = "flex";
      if (urlInput.value.trim() === "") {
        urlInput.value = "#";
      }
    } else {
      container.style.display = "none";
    }
  });

  // Listen for changes in the dropdown value----------------
  actionSelect.addEventListener("change", function () {
    if (selectedElSettings) {
      const targetElement = document.getElementById(selectedElSettings);
      // Update the href attribute with the selected value from the dropdown
      targetElement.setAttribute("href", actionSelect.value);
    }
  });

  // Listen for changes in the url value---------------------
  urlInput.addEventListener("input", function () {
    if (selectedElSettings) {
      const targetElement = document.getElementById(selectedElSettings);
      // Update the href attribute with the selected value from the dropdown
      targetElement.setAttribute("href", urlInput.value);
    }
  });

  // fontSizeSlider -----------------------------------------
  const fontSizeSlider = document.getElementById("font-size-slider");
  const deviceSelected = document.getElementById("headline-fontsize-device");
  const deviceOptions = document.querySelector(".device-select .options");
  let desktopFontSize = parseFloat(getComputedStyle(selectParentButton).getPropertyValue("--desktop-font-size"));
  let mobileFontSize = parseFloat(getComputedStyle(selectParentButton).getPropertyValue("--mobile-font-size"));

  fontSizeSlider.value = desktopFontSize;
  document.querySelectorAll(".device-select .option").forEach((option) => {
    option.addEventListener("click", function () {
      const selectParentButton = document.getElementById(selectedButtonElement);
      const device = this.getAttribute("data-value");
      if (device === "desktop") {
        selectParentButton.classList.add("active");
        selectParentButton.classList.remove("mobile-view");
        selectParentButton.classList.add("desktop-view");
        selectParentButton.style.setProperty("--desktop-font-size", `${desktopFontSize}px`);
        fontSizeSlider.value = desktopFontSize;
        selectParentButton.style.setProperty("--desktop-text-align", desktopTextAlign);
        document.querySelectorAll(".align-button").forEach((button) => {
          button.classList.remove("selected-button");
          if (button.querySelector("i").classList.contains(`bi-text-${desktopTextAlign}`)) {
            button.classList.add("selected-button");
          } else if (button.querySelector("i").classList.contains(`bi-${desktopTextAlign}`)) {
            button.classList.add("selected-button");
          }
        });
        setButtonMarginTop.innerText = editorParentComponentStyles.getPropertyValue("--desktop-margin-top");
        setButtonMarginLeft.innerText = editorParentComponentStyles.getPropertyValue("--desktop-margin-left");
        setButtonMarginRight.innerText = editorParentComponentStyles.getPropertyValue("--desktop-margin-right");
        setButtonMarginBottom.innerText = editorParentComponentStyles.getPropertyValue("--desktop-margin-bottom");
        setButtonPaddingTop.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-top");
        setButtonPaddingLeft.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-left");
        setButtonPaddingRight.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-right");
        setButtonPaddingBottom.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-bottom");
      } else if (device === "mobile") {
        selectParentButton.classList.remove("active");
        selectParentButton.classList.add("mobile-view");
        selectParentButton.classList.remove("desktop-view");
        selectParentButton.style.setProperty("--mobile-font-size", `${mobileFontSize}px`);
        fontSizeSlider.value = mobileFontSize;
        selectParentButton.style.setProperty("--mobile-text-align", mobileTextAlign);
        document.querySelectorAll(".align-button").forEach((button) => {
          button.classList.remove("selected-button");
          if (button.querySelector("i").classList.contains(`bi-text-${mobileTextAlign}`)) {
            button.classList.add("selected-button");
          } else if (button.querySelector("i").classList.contains(`bi-${mobileTextAlign}`)) {
            button.classList.add("selected-button");
          }
        });
        setButtonMarginTop.innerText = editorParentComponentStyles.getPropertyValue("--mobile-margin-top");
        setButtonMarginLeft.innerText = editorParentComponentStyles.getPropertyValue("--mobile-margin-left");
        setButtonMarginRight.innerText = editorParentComponentStyles.getPropertyValue("--mobile-margin-right");
        setButtonMarginBottom.innerText = editorParentComponentStyles.getPropertyValue("--mobile-margin-bottom");
        setButtonPaddingTop.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-top");
        setButtonPaddingLeft.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-left");
        setButtonPaddingRight.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-right");
        setButtonPaddingBottom.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-bottom");
      }
    });
  });

  fontSizeSlider.addEventListener("input", function () {
    const selectParentButton = document.getElementById(selectedButtonElement);
    const fontSize = this.value + "px";
    const device = deviceSelected.getAttribute("data-value");

    if (device === "desktop") {
      desktopFontSize = this.value;
      selectParentButton.style.setProperty("--desktop-font-size", fontSize);
    } else if (device === "mobile") {
      mobileFontSize = this.value;
      selectParentButton.style.setProperty("--mobile-font-size", fontSize);
    }
  });

  let desktopTextAlign = getComputedStyle(selectParentButton).getPropertyValue("--desktop-text-align");
  let mobileTextAlign = getComputedStyle(selectParentButton).getPropertyValue("--mobile-text-align");
  const buttonAlignleftBtn = document.getElementById("button-align-left");
  const buttonAligncenterBtn = document.getElementById("button-align-center");
  const buttonAlignrightBtn = document.getElementById("button-align-right");
  const buttonAlignjustifyBtn = document.getElementById("button-align-full");

  console.log(desktopTextAlign, "desktopTextAlign", mobileTextAlign, "mobileTextAlign");

  if (desktopBtn.classList.contains("active")) {
    document.querySelectorAll(".align-button").forEach((button) => {
      button.classList.remove("selected-button");
      if (button.querySelector("i").classList.contains(`bi-text-${desktopTextAlign}`)) {
        button.classList.add("selected-button");
      } else if (button.querySelector("i").classList.contains(`bi-${desktopTextAlign}`)) {
        button.classList.add("selected-button");
      }
    });
  } else {
    document.querySelectorAll(".align-button").forEach((button) => {
      button.classList.remove("selected-button");
      if (button.querySelector("i").classList.contains(`bi-text-${mobileTextAlign}`)) {
        button.classList.add("selected-button");
      } else if (button.querySelector("i").classList.contains(`bi-${mobileTextAlign}`)) {
        button.classList.add("selected-button");
      }
    });
  }

  const headlineAlignButtons = document.querySelectorAll(".align-button");
  headlineAlignButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectParentButton = document.getElementById(selectedButtonElement);
      const device = deviceSelected.getAttribute("data-value");
      headlineAlignButtons.forEach((button) => {
        button.classList.remove("selected-button");
      });

      if (device === "desktop") {
        if (this.querySelector("i").classList.contains("bi-text-left")) {
          desktopTextAlign = "left";
          selectParentButton.style.setProperty("--desktop-text-align", "left");
          this.classList.add("selected-button");
        } else if (this.querySelector("i").classList.contains("bi-text-center")) {
          desktopTextAlign = "center";
          selectParentButton.style.setProperty("--desktop-text-align", "center");
          this.classList.add("selected-button");
        } else if (this.querySelector("i").classList.contains("bi-text-right")) {
          desktopTextAlign = "right";
          selectParentButton.style.setProperty("--desktop-text-align", "right");
          this.classList.add("selected-button");
        } else if (this.querySelector("i").classList.contains("bi-justify")) {
          desktopTextAlign = "justify";
          selectParentButton.style.setProperty("--desktop-text-align", "justify");
          this.classList.add("selected-button");
        }
      } else if (device === "mobile") {
        if (this.querySelector("i").classList.contains("bi-text-left")) {
          mobileTextAlign = "left";
          selectParentButton.style.setProperty("--mobile-text-align", "left");
          this.classList.add("selected-button");
        } else if (this.querySelector("i").classList.contains("bi-text-center")) {
          mobileTextAlign = "center";
          selectParentButton.style.setProperty("--mobile-text-align", "center");
          this.classList.add("selected-button");
        } else if (this.querySelector("i").classList.contains("bi-text-right")) {
          mobileTextAlign = "right";
          selectParentButton.style.setProperty("--mobile-text-align", "right");
          this.classList.add("selected-button");
        } else if (this.querySelector("i").classList.contains("bi-justify")) {
          mobileTextAlign = "justify";
          selectParentButton.style.setProperty("--mobile-text-align", "justify");
          this.classList.add("selected-button");
        }
      }
    });
  });

  // buttonTextInput -----------------------------------------
  const buttonTextInput = document.getElementById("button-text-input");
  const buttonText = document.getElementById(selectedElSettings);
  // Ensure buttonTextInput exists
  if (buttonTextInput) {
    // Ensure buttonText is not null before accessing its properties
    if (buttonText) {
      buttonTextInput.value = buttonText.textContent;
      // Listen for changes in buttonTextInput
      buttonTextInput.addEventListener("input", function () {
        if (selectedElSettings) {
          const targetElement = document.getElementById(selectedElSettings);
          // Ensure targetElement is not null before setting its innerHTML
          if (targetElement) {
            targetElement.innerHTML = this.value;
          } else {
            console.error("targetElement not found with ID:", selectedElSettings);
          }
        }
      });
    } else {
      console.error("buttonText element not found with ID:", selectedElSettings);
    }
  } else {
    console.error("buttonTextInput element not found");
  }

  // font family dropdown -----------------------------------------
  const fontFamilySelect = document.getElementById("font-family-select");
  if (fontFamilySelect) {
    // Ensure selectText is not null before accessing its properties
    if (selectText) {
      fontFamilySelect.value = selectText.style.fontFamily.replace(/['"]/g, "");

      // Listen for changes in fontFamilySelect
    } else {
      console.error("selectText element not found, check if the ID in selectedElSettings is correct.");
    }
  } else {
    console.error("fontFamilySelect element not found");
  }
  fontFamilySelect.addEventListener("change", function () {
    if (selectedElSettings) {
      const targetElement = document.getElementById(selectedElSettings);
      // Ensure targetElement is not null before setting its style
      if (targetElement) {
        targetElement.style.fontFamily = fontFamilySelect.value;
      } else {
        console.error("targetElement not found with ID:", selectedElSettings);
      }
    }
  });

  // Background color setting
  const targetElement = document.getElementById(selectedElSettings);
  const buttonBackColor = document.getElementById("button-back-color");
  const buttonBackColorIcon = document.getElementById("button-back-color-icon");
  const transparentButton = document.getElementById("button-transparent-background");
  buttonBackColor.style.color = targetElement.style.backgroundColor;
  buttonBackColorIcon.style.color = buttonBackColor.style.color;
  const updateBackgroundColor = () => {
    const targetElement = document.getElementById(selectedElSettings);
    if (targetElement.dataset.transparent === "true") {
      // Set the background color to transparent
      targetElement.style.backgroundColor = "transparent";
    } else {
      // Set the background color to the chosen color
      targetElement.style.backgroundColor = buttonBackColor.value;
    }
  };
  // Event listener for color input
  buttonBackColor.addEventListener("input", function () {
    const targetElement = document.getElementById(selectedElSettings);
    targetElement.dataset.transparent = "false";
    updateBackgroundColor();
    buttonBackColorIcon.style.color = buttonBackColor.value;
  });
  // Event listener for the transparent button
  transparentButton.addEventListener("click", function () {
    const targetElement = document.getElementById(selectedElSettings);
    targetElement.dataset.transparent = "true";
    updateBackgroundColor();
    buttonBackColorIcon.style.color = "white";
  });

  // Button Text color setting
  const buttonTextColor = document.getElementById("button-text-color");
  const buttonTextColorIcon = document.getElementById("button-text-color-icon");
  buttonTextColor.style.color = element.style.color;
  buttonTextColorIcon.style.color = element.style.color;
  buttonTextColor.addEventListener("input", function () {
    // buttonTextColorIcon.style.color = buttonTextColor.value;

    if (selectedElSettings) {
      // Apply the font size to the selected .elSettings element
      const targetElement = document.getElementById(selectedElSettings);
      //  buttonBackColorIcon.style.color = buttonBackColor.value;
      targetElement.style.color = buttonTextColor.value;
    }
  });

  // Background color opacity for button Element
  const buttonOpacitySelect = document.getElementById("button-opacity-select");
  buttonOpacitySelect.addEventListener("change", function () {
    let rgbColor = selectText.style.backgroundColor;
    if (selectText.style.backgroundColor.includes("rgba")) {
      rgbColor = selectText.style.backgroundColor.replace(/, [\d\.]+\)$/, "") + ")";
    }
    let convertedRGBA = rgbColor.replace(")", `, ${buttonOpacitySelect.value})`);
    selectText.style.backgroundColor = convertedRGBA;
  });

  // Text Shadow
  const buttonTextShadow = document.getElementById("set-button-text-shadow");
  buttonTextShadow.addEventListener("change", function () {
    if (buttonTextShadow.value == "No Shadow") {
      selectText.style.textShadow = "none";
    } else if (buttonTextShadow.value == "Light Fade") {
      selectText.style.textShadow = "1px 1px 1px rgba(0,0,0,0.2)";
    } else if (buttonTextShadow.value == "Mid Shadow") {
      selectText.style.textShadow = "1px 1px 2px rgba(0,0,0,0.4)";
    } else if (buttonTextShadow.value == "Strong Shadow") {
      selectText.style.textShadow = "1px 1px 3px rgba(0,0,0,0.5)";
    }
  });
  // Letter Spacing
  const buttonLetterSpacing = document.getElementById("set-button-letter-spacing");
  buttonLetterSpacing.addEventListener("change", function () {
    if (buttonLetterSpacing.value == "Normal") {
      selectText.style.letterSpacing = "0";
    } else if (buttonLetterSpacing.value == "1px") {
      selectText.style.letterSpacing = "1px";
    } else if (buttonLetterSpacing.value == "2px") {
      selectText.style.letterSpacing = "2px";
    } else if (buttonLetterSpacing.value == "3px") {
      selectText.style.letterSpacing = "3px";
    } else if (buttonLetterSpacing.value == "-1px") {
      selectText.style.letterSpacing = "-1px";
    }
  });
  //Box Shadow
  const setBoxShadow = document.getElementById("set-button-box-shadow");
  setBoxShadow.addEventListener("change", function () {
    if (setBoxShadow.value == "No Shadow") {
      selectText.style.boxShadow = "none";
    } else if (setBoxShadow.value == "5% Drop Shadow") {
      selectText.style.boxShadow = "0 1px 3px #0000000d";
    } else if (setBoxShadow.value == "10% Drop Shadow") {
      selectText.style.boxShadow = "0 1px 5px #0000001a";
    } else if (setBoxShadow.value == "20% Drop Shadow") {
      selectText.style.boxShadow = "0 1px 5px #0003";
    } else if (setBoxShadow.value == "30% Drop Shadow") {
      selectText.style.boxShadow = "0 2px 5px 2px #0000004d";
    } else if (setBoxShadow.value == "40% Drop Shadow") {
      selectText.style.boxShadow = "0 2px 5px 2px #0006";
    } else if (setBoxShadow.value == "5% Inner Shadow") {
      selectText.style.boxShadow = "0 1px 3px #0000000d inset";
    } else if (setBoxShadow.value == "10% Inner Shadow") {
      selectText.style.boxShadow = "0 1px 5px #0000001a inset";
    } else if (setBoxShadow.value == "20% Inner Shadow") {
      selectText.style.boxShadow = "0 1px 5px #0003 inset";
    } else if (setBoxShadow.value == "30% Inner Shadow") {
      selectText.style.boxShadow = "0 2px 5px 2px #0000004d inset";
    } else if (setBoxShadow.value == "40% Inner Shadow") {
      selectText.style.boxShadow = "0 2px 5px 2px #0006 inset";
    }
  });
  // Typography Type
  const buttonTypography = document.getElementById("set-button-typography-type");
  buttonTypography.addEventListener("change", function () {
    if (buttonTypography.value == "Button Font") {
      selectText.style.fontFamily = "Inter, sans-serif";
    } else if (buttonTypography.value == "Content Font") {
      selectText.style.fontFamily = "eufont";
    }
  });
  function settingButtonBorderMouseLeave() {
    if (settedbuttonBorderType == "No Border") {
      selectText.style.border = "none";
    } else if (settedbuttonBorderType == "full") {
      selectText.style.border = `${settedbuttonBorderWidth} ${settedbuttonBorderStyle} ${settedbuttonBorderColor}`;
    } else if (settedbuttonBorderType == "bottom") {
      selectText.style.border = "none";
      selectText.style.borderBottom = `${settedbuttonBorderWidth} ${settedbuttonBorderStyle} ${settedbuttonBorderColor}`;
    } else if (settedbuttonBorderType == "top") {
      selectText.style.border = "none";
      selectText.style.borderTop = `${settedbuttonBorderWidth} ${settedbuttonBorderStyle} ${settedbuttonBorderColor}`;
    } else if (settedbuttonBorderType == "top&bototm") {
      selectText.style.border = "none";
      selectText.style.borderBottom = `${settedbuttonBorderWidth} ${settedbuttonBorderStyle} ${settedbuttonBorderColor}`;
      selectText.style.borderTop = `${settedbuttonBorderWidth} ${settedbuttonBorderStyle} ${settedbuttonBorderColor}`;
    }
    selectText.style.borderRadius = settedRadiusValue;
    selectText.addEventListener("mouseleave", function () {
      if (settedbuttonBorderType == "No Border") {
        selectText.style.border = "none";
      } else if (settedbuttonBorderType == "full") {
        selectText.style.border = `${settedbuttonBorderWidth} ${settedbuttonBorderStyle} ${settedbuttonBorderColor}`;
      } else if (settedbuttonBorderType == "bottom") {
        selectText.style.border = "none";
        selectText.style.borderBottom = `${settedbuttonBorderWidth} ${settedbuttonBorderStyle} ${settedbuttonBorderColor}`;
      } else if (settedbuttonBorderType == "top") {
        selectText.style.border = "none";
        selectText.style.borderTop = `${settedbuttonBorderWidth} ${settedbuttonBorderStyle} ${settedbuttonBorderColor}`;
      } else if (settedbuttonBorderType == "top&bototm") {
        selectText.style.border = "none";
        selectText.style.borderBottom = `${settedbuttonBorderWidth} ${settedbuttonBorderStyle} ${settedbuttonBorderColor}`;
        selectText.style.borderTop = `${settedbuttonBorderWidth} ${settedbuttonBorderStyle} ${settedbuttonBorderColor}`;
      }
    });
  }
  //Border select
  var settedbuttonBorderType;
  const borderSelect = document.getElementById("setting-button-border-select");
  borderSelect.addEventListener("change", function () {
    settedbuttonBorderType = borderSelect.value;
    settingButtonBorderMouseLeave();
    if (borderSelect.value != "No Border") {
      document.getElementById("button-border-setting").style.display = "block";
    } else {
      document.getElementById("button-border-setting").style.display = "none";
    }
  });
  //set border style
  var settedbuttonBorderStyle = "solid";
  const borderStyle = document.getElementById("setting-button-border-style");
  borderStyle.addEventListener("change", function () {
    settedbuttonBorderStyle = borderStyle.value;
    settingButtonBorderMouseLeave();
  });
  //set border width
  var settedbuttonBorderWidth = "3px";
  const borderWidth = document.getElementById("setting-button-border-width");
  borderWidth.addEventListener("change", function () {
    settedbuttonBorderWidth = borderWidth.value;
    settingButtonBorderMouseLeave();
  });

  //set border color
  var settedbuttonBorderColor = "#333";

  // Check if the elements exist before accessing their properties
  const borderColor = document.getElementById("button-border-color");
  const borderColorIcon = document.getElementById("button-border-color-icon");

  if (borderColor && borderColorIcon && selectText) {
    borderColor.style.color = selectText.style.borderColor;
    borderColorIcon.style.color = selectText.style.borderColor;

    borderColor.addEventListener("input", function () {
      borderColorIcon.style.color = borderColor.value;
      selectText.style.borderColor = borderColor.value;
      settedbuttonBorderColor = borderColor.value;
    });
  } else {
    // Log errors for debugging
    if (!borderColor) {
      console.error("borderColor element not found");
    }
    if (!borderColorIcon) {
      console.error("borderColorIcon element not found");
    }
    if (!selectText) {
      console.error("selectText element not found - check if selectedElSettings has a correct ID");
    }
  }

  //set border radius
  var settedRadiusValue = "0px";
  const borderRadius = document.getElementById("setting-button-border-radius");
  borderRadius.addEventListener("change", function () {
    settedRadiusValue = borderRadius.value;
    settingButtonBorderMouseLeave();
  });
  //set border edge
  const borderEdge = document.getElementById("setting-button-edge");
  borderEdge.addEventListener("change", function () {
    if (borderEdge.value == "All Edges") {
      selectText.style.borderRadius = settedRadiusValue;
    } else if (borderEdge.value == "Top Only Edges") {
      selectText.style.borderRadius = `${settedRadiusValue} ${settedRadiusValue} 0 0`;
    } else if (borderEdge.value == "Bottom Only Edges") {
      selectText.style.borderRadius = `0 0 ${settedRadiusValue} ${settedRadiusValue}`;
    }
  });
  //set text transform
  const textTransform = document.getElementById("set-button-text-transform");
  textTransform.addEventListener("change", function () {
    if (textTransform.value == "Normal") {
      selectText.style.textTransform = "none";
    } else if (textTransform.value == "Uppercase") {
      selectText.style.textTransform = "uppercase";
    } else if (textTransform.value == "Lowercase") {
      selectText.style.textTransform = "lowercase";
    } else if (textTransform.value == "Capitalize") {
      selectText.style.textTransform = "capitalize";
    }
  });
  //set text width
  const textWidth = document.getElementById("set-button-text-width");
  textWidth.addEventListener("change", function () {
    if (textWidth.value == "Fluid") {
      selectText.style.width = "auto";
    } else if (textWidth.value == "Full Width") {
      selectText.style.width = "100%";
    }
  });
  event.stopPropagation();

  const desktopVi = document.getElementById("button-desktop");
  const mobileVi = document.getElementById("button-mobile");
  const desktopDisplay = (section) => {
    const selectParentButton = document.getElementById(selectedButtonElement);
    if (desktopBtn.classList.contains("active")) {
      if (section.classList.contains("active")) {
        selectParentButton.style.display = "block";
      } else {
        selectParentButton.style.display = "none";
      }
    }
  };
  const mobileDisplay = (section) => {
    const selectParentButton = document.getElementById(selectedButtonElement);
    if (mobileBtn.classList.contains("active")) {
      if (section.classList.contains("active")) {
        selectParentButton.style.display = "block";
      } else {
        selectParentButton.style.display = "none";
      }
    }
  };
  if (desktopBtn.classList.contains("active")) {
    desktopVi.addEventListener("click", () => desktopDisplay(desktopVi));
  } else {
    mobileVi.addEventListener("click", () => mobileDisplay(mobileVi));
  }
}

// Close Settings Panel
const buttonSettingClose = document.getElementById("button-setting-close");
buttonSettingClose.addEventListener("click", function () {
  // closeSidebar();
  setButtonPopup.classList.remove("open");
});

// export the currentSelectedButtonElement that has the right value

const currentSelectedButtonElement = (args) => {
  if (args) {
    selectedButtonElement = args;
  }
  return selectedButtonElement;
};

export { ButtonGearElement, selectedButtonElement, currentSelectedButtonElement };
