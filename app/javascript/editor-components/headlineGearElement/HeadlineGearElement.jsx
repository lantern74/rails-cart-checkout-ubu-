import React from "react";
import ReactDOM from "react-dom/client";
// import { VideoDragAndDrop } from "./VideoDragAndDrop";
import { closeAllSidebars, closeAllTextEditPopups } from "../editor_functions";

// Settings for headline element
let selectedHeadlineElement = null;
let selectedHeadlineContainer = null;
const mobileBtn = document.getElementById("mobileBtn");
const desktopBtn = document.getElementById("desktopBtn");

function HeadlineGearElement(parentWrapper, parentType) {
  selectedHeadlineElement = parentWrapper.firstChild.id;
  selectedHeadlineContainer = parentWrapper.id;

  const titleComponent = document.getElementById("orange-title");

  wasTitle = titleComponent.textContent; //get the previous title which had the gear settings open

  const extractedTitle = parentType.split("-")[0]; // Extracts "headline" from "headline-field"
  titleComponent.textContent = extractedTitle.charAt(0).toUpperCase() + extractedTitle.slice(1); // Converts to "Headline"

  document.getElementById("set-bullet-icon").style.display = "none";
  document.getElementById("set-bullet-space").style.display = "none";
  if (parentType == "Bullet List") {
    document.getElementById("set-bullet-icon").style.display = "block";
    document.getElementById("set-bullet-space").style.display = "block";
  }
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
  const headlineContainer = document.getElementById(selectedHeadlineContainer);
  const headlineComponent = document.getElementById(selectedHeadlineElement);
  const headlineOpacitySelect = document.getElementById("headline-opacity-select");
  //get margin padding value
  var setOrangeMarginTop = document.getElementById("setOrangeMarginTop");
  var setOrangeMarginLeft = document.getElementById("setOrangeMarginLeft");
  var setOrangeMarginRight = document.getElementById("setOrangeMarginRight");
  var setOrangeMarginBottom = document.getElementById("setOrangeMarginBottom");
  var setOrangePaddingTop = document.getElementById("setOrangePaddingTop");
  var setOrangePaddingLeft = document.getElementById("setOrangePaddingLeft");
  var setOrangePaddingRight = document.getElementById("setOrangePaddingRight");
  var setOrangePaddingBottom = document.getElementById("setOrangePaddingBottom");

  if (desktopBtn.classList.contains("active")) {
    setOrangeMarginTop.innerText = getComputedStyle(headlineContainer).getPropertyValue("--desktop-margin-top");
    setOrangeMarginLeft.innerText = getComputedStyle(headlineContainer).getPropertyValue("--desktop-margin-left");
    setOrangeMarginRight.innerText = getComputedStyle(headlineContainer).getPropertyValue("--desktop-margin-right");
    setOrangeMarginBottom.innerText = getComputedStyle(headlineContainer).getPropertyValue("--desktop-margin-bottom");
    setOrangePaddingTop.innerText = getComputedStyle(headlineContainer).getPropertyValue("--desktop-padding-top");
    setOrangePaddingLeft.innerText = getComputedStyle(headlineContainer).getPropertyValue("--desktop-padding-left");
    setOrangePaddingRight.innerText = getComputedStyle(headlineContainer).getPropertyValue("--desktop-padding-right");
    setOrangePaddingBottom.innerText = getComputedStyle(headlineContainer).getPropertyValue("--desktop-padding-bottom");
  } else if (mobileBtn.classList.contains("active")) {
    setOrangeMarginTop.innerText = getComputedStyle(headlineContainer).getPropertyValue("--mobile-margin-top");
    setOrangeMarginLeft.innerText = getComputedStyle(headlineContainer).getPropertyValue("--mobile-margin-left");
    setOrangeMarginRight.innerText = getComputedStyle(headlineContainer).getPropertyValue("--mobile-margin-right");
    setOrangeMarginBottom.innerText = getComputedStyle(headlineContainer).getPropertyValue("--mobile-margin-bottom");
    setOrangePaddingTop.innerText = getComputedStyle(headlineContainer).getPropertyValue("--mobile-padding-top");
    setOrangePaddingLeft.innerText = getComputedStyle(headlineContainer).getPropertyValue("--mobile-padding-left");
    setOrangePaddingRight.innerText = getComputedStyle(headlineContainer).getPropertyValue("--mobile-padding-right");
    setOrangePaddingBottom.innerText = getComputedStyle(headlineContainer).getPropertyValue("--mobile-padding-bottom");
  }

  // Background color setting for Headline Element
  const headlineBackColor = document.getElementById("headline-back-color");
  const headlineBackColorIcon = document.getElementById("headline-back-color-icon");
  const transparentButton = document.getElementById("headline-transparent-background");

  headlineBackColorIcon.style.color = getComputedStyle(headlineContainer).backgroundColor;
  const updateBackgroundColor = () => {
    const headlineContainer = document.getElementById(selectedHeadlineContainer);
    if (headlineContainer.dataset.transparent === "true") {
      // Set the background color to transparent
      headlineContainer.style.backgroundColor = "transparent";
    } else {
      // Set the background color to the chosen color
      headlineContainer.style.backgroundColor = headlineBackColor.value;
    }
    headlineOpacitySelect.value = "1.0";
  };
  // Event listener for color input
  headlineBackColor.addEventListener("input", function () {
    const headlineContainer = document.getElementById(selectedHeadlineContainer);
    headlineContainer.dataset.transparent = "false";
    updateBackgroundColor();
  });
  // Event listener for the transparent button
  transparentButton.addEventListener("click", function () {
    const headlineContainer = document.getElementById(selectedHeadlineContainer);
    headlineContainer.dataset.transparent = "true";
    updateBackgroundColor();
    headlineBackColorIcon.style.color = "white";
  });

  // Background color opacity for Headline Element
  headlineOpacitySelect.addEventListener("change", function () {
    const headlineContainer = document.getElementById(parentWrapper.id);
    let rgbColor = headlineContainer.style.backgroundColor;
    if (headlineContainer.style.backgroundColor.includes("rgba")) {
      rgbColor = headlineContainer.style.backgroundColor.replace(/, [\d\.]+\)$/, "") + ")";
    }
    let convertedRGBA = rgbColor.replace(")", `, ${headlineOpacitySelect.value})`);
    headlineContainer.style.backgroundColor = convertedRGBA;
  });

  // fontSizeSlider -----------------------------------------
  const fontSizeSlider = document.getElementById("headline-font-slider");
  const deviceSelected = document.getElementById("headline-fontsize-device");
  const deviceOptions = document.querySelector(".device-select .options");

  // Variables to store the font sizes
  let desktopFontSize = parseFloat(getComputedStyle(headlineComponent).getPropertyValue("--desktop-font-size"));
  let mobileFontSize = parseFloat(getComputedStyle(headlineComponent).getPropertyValue("--mobile-font-size"));

  fontSizeSlider.value = desktopFontSize;
  document.querySelectorAll(".device-select .option").forEach((option) => {
    option.addEventListener("click", function () {
      const headlineComponent = document.getElementById(selectedHeadlineElement);
      const device = this.getAttribute("data-value");

      // Update the font size based on device selection
      if (device === "desktop") {
        headlineComponent.classList.add("active");
        headlineComponent.classList.remove("mobile-view");
        headlineComponent.classList.add("desktop-view");
        headlineContainer.classList.add("active");
        headlineContainer.classList.remove("mp-mobile-view");
        headlineContainer.classList.add("mp-desktop-view");
        headlineComponent.style.setProperty("--desktop-font-size", `${desktopFontSize}px`);
        fontSizeSlider.value = desktopFontSize;

        headlineComponent.style.setProperty("--desktop-text-align", desktopTextAlign);
        document.querySelectorAll(".align-button").forEach((button) => {
          button.classList.remove("selected-button");
          if (button.querySelector("i").classList.contains(`bi-text-${desktopTextAlign}`)) {
            button.classList.add("selected-button");
          } else if (button.querySelector("i").classList.contains(`bi-${desktopTextAlign}`)) {
            button.classList.add("selected-button");
          }
        });
        setOrangeMarginTop.innerText = getComputedStyle(headlineContainer).getPropertyValue("--desktop-margin-top");
        setOrangeMarginLeft.innerText = getComputedStyle(headlineContainer).getPropertyValue("--desktop-margin-left");
        setOrangeMarginRight.innerText = getComputedStyle(headlineContainer).getPropertyValue("--desktop-margin-right");
        setOrangeMarginBottom.innerText = getComputedStyle(headlineContainer).getPropertyValue("--desktop-margin-bottom");
        setOrangePaddingTop.innerText = getComputedStyle(headlineContainer).getPropertyValue("--desktop-padding-top");
        setOrangePaddingLeft.innerText = getComputedStyle(headlineContainer).getPropertyValue("--desktop-padding-left");
        setOrangePaddingRight.innerText = getComputedStyle(headlineContainer).getPropertyValue("--desktop-padding-right");
        setOrangePaddingBottom.innerText = getComputedStyle(headlineContainer).getPropertyValue("--desktop-padding-bottom");
      } else if (device === "mobile") {
        headlineComponent.classList.remove("active");
        headlineComponent.classList.add("mobile-view");
        headlineComponent.classList.remove("desktop-view");
        headlineContainer.classList.remove("active");
        headlineContainer.classList.add("mp-mobile-view");
        headlineContainer.classList.remove("mp-desktop-view");
        headlineComponent.style.setProperty("--mobile-font-size", `${mobileFontSize}px`);
        fontSizeSlider.value = mobileFontSize;

        headlineComponent.style.setProperty("--mobile-text-align", mobileTextAlign);
        document.querySelectorAll(".align-button").forEach((button) => {
          button.classList.remove("selected-button");
          if (button.querySelector("i").classList.contains(`bi-text-${mobileTextAlign}`)) {
            button.classList.add("selected-button");
          } else if (button.querySelector("i").classList.contains(`bi-${mobileTextAlign}`)) {
            button.classList.add("selected-button");
          }
        });
        setOrangeMarginTop.innerText = getComputedStyle(headlineContainer).getPropertyValue("--mobile-margin-top");
        setOrangeMarginLeft.innerText = getComputedStyle(headlineContainer).getPropertyValue("--mobile-margin-left");
        setOrangeMarginRight.innerText = getComputedStyle(headlineContainer).getPropertyValue("--mobile-margin-right");
        setOrangeMarginBottom.innerText = getComputedStyle(headlineContainer).getPropertyValue("--mobile-margin-bottom");
        setOrangePaddingTop.innerText = getComputedStyle(headlineContainer).getPropertyValue("--mobile-padding-top");
        setOrangePaddingLeft.innerText = getComputedStyle(headlineContainer).getPropertyValue("--mobile-padding-left");
        setOrangePaddingRight.innerText = getComputedStyle(headlineContainer).getPropertyValue("--mobile-padding-right");
        setOrangePaddingBottom.innerText = getComputedStyle(headlineContainer).getPropertyValue("--mobile-padding-bottom");
      }
    });
  });

  fontSizeSlider.addEventListener("input", function () {
    const headlineComponent = document.getElementById(selectedHeadlineElement);
    const fontSize = this.value + "px";
    const device = deviceSelected.getAttribute("data-value");

    if (device === "desktop") {
      desktopFontSize = this.value;
      headlineComponent.style.setProperty("--desktop-font-size", fontSize);
    } else if (device === "mobile") {
      mobileFontSize = this.value;
      headlineComponent.style.setProperty("--mobile-font-size", fontSize);
    }

    // set padding left of bullet list
    if (headlineComponent.childNodes[0].nodeType === 1 && headlineComponent.childNodes[0].tagName === "LI") {
      const bulletLists = headlineComponent.childNodes;
      bulletLists.forEach((bulletList) => {
        bulletList.style.paddingLeft = `${parseInt(fontSize) + 20}px`;
      });
    }
  });

  // Text Alignment for Headline Element
  let desktopTextAlign = getComputedStyle(headlineComponent).getPropertyValue("--desktop-text-align");
  let mobileTextAlign = getComputedStyle(headlineComponent).getPropertyValue("--mobile-text-align");
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
      const headlineComponent = document.getElementById(selectedHeadlineElement);
      const device = deviceSelected.getAttribute("data-value");
      headlineAlignButtons.forEach((button) => {
        button.classList.remove("selected-button");
      });

      if (device === "desktop") {
        if (this.querySelector("i").classList.contains("bi-text-left")) {
          desktopTextAlign = "left";
          headlineComponent.style.setProperty("--desktop-text-align", "left");
          this.classList.add("selected-button");
        } else if (this.querySelector("i").classList.contains("bi-text-center")) {
          desktopTextAlign = "center";
          headlineComponent.style.setProperty("--desktop-text-align", "center");
          this.classList.add("selected-button");
        } else if (this.querySelector("i").classList.contains("bi-text-right")) {
          desktopTextAlign = "right";
          headlineComponent.style.setProperty("--desktop-text-align", "right");
          this.classList.add("selected-button");
        } else if (this.querySelector("i").classList.contains("bi-justify")) {
          desktopTextAlign = "justify";
          headlineComponent.style.setProperty("--desktop-text-align", "justify");
          this.classList.add("selected-button");
        }
      } else if (device === "mobile") {
        if (this.querySelector("i").classList.contains("bi-text-left")) {
          mobileTextAlign = "left";
          headlineComponent.style.setProperty("--mobile-text-align", "left");
          this.classList.add("selected-button");
        } else if (this.querySelector("i").classList.contains("bi-text-center")) {
          mobileTextAlign = "center";
          headlineComponent.style.setProperty("--mobile-text-align", "center");
          this.classList.add("selected-button");
        } else if (this.querySelector("i").classList.contains("bi-text-right")) {
          mobileTextAlign = "right";
          headlineComponent.style.setProperty("--mobile-text-align", "right");
          this.classList.add("selected-button");
        } else if (this.querySelector("i").classList.contains("bi-justify")) {
          mobileTextAlign = "justify";
          headlineComponent.style.setProperty("--mobile-text-align", "justify");
          this.classList.add("selected-button");
        }
      }
    });
  });

  // Text Shadow
  const headlineTextShadow = document.getElementById("set-headline-text-shadow");
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
  const headlineLetterSpacing = document.getElementById("set-headline-letter-spacing");
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
      headlineComponent.parentNode.style.boxShadow = "0 1px 3px #0000000d inset";
    } else if (setBoxShadow.value == "10% Inner Shadow") {
      headlineComponent.parentNode.style.boxShadow = "0 1px 5px #0000001a inset";
    } else if (setBoxShadow.value == "20% Inner Shadow") {
      headlineComponent.parentNode.style.boxShadow = "0 1px 5px #0003 inset";
    } else if (setBoxShadow.value == "30% Inner Shadow") {
      headlineComponent.parentNode.style.boxShadow = "0 2px 5px 2px #0000004d inset";
    } else if (setBoxShadow.value == "40% Inner Shadow") {
      headlineComponent.parentNode.style.boxShadow = "0 2px 5px 2px #0006 inset";
    }
  });

  // font family dropdown -----------------------------------------
  const fontFamilySelect = document.getElementById("headline-font-family-select");
  fontFamilySelect.value = getComputedStyle(headlineComponent).fontFamily.replace(/['"]/g, "");
  fontFamilySelect.addEventListener("change", function () {
    const headlineComponent = document.getElementById(selectedHeadlineElement);
    headlineComponent.style.fontFamily = fontFamilySelect.value;
  });

  // Line Height setting
  const lineHeight = document.getElementById("headline-line-heigh");
  const lineHeightPx = parseFloat(getComputedStyle(headlineComponent).lineHeight);
  const fontSizePx = parseFloat(getComputedStyle(headlineComponent).fontSize);

  // Convert line height from px to em
  const lineHeightEm = lineHeightPx / fontSizePx;
  lineHeight.value = lineHeightEm + "em";
  lineHeight.addEventListener("change", function () {
    const headlineComponent = document.getElementById(selectedHeadlineElement);
    headlineComponent.style.lineHeight = lineHeight.value;
  });

  // Text color setting for Headline Element

  const headlineColor = document.getElementById("headline-color");
  const headlineColorIcon = document.getElementById("headline-color-icon");

  if (headlineComponent.className === "elBullet") {
    const headlineComponent = document.getElementById(selectedHeadlineElement);

    // var bulletText = headlineComponent.querySelector("span");
    var bulletText = headlineComponent.querySelector("span");
    headlineColorIcon.style.color = getComputedStyle(bulletText).color;

    headlineColor.addEventListener("input", function () {
      headlineColorIcon.style.color = headlineColor.value;
      const headlineComponent = document.getElementById(selectedHeadlineElement);

      var bulletTexts = headlineComponent.querySelectorAll("span");
      bulletTexts.forEach((bulletText) => {
        bulletText.style.color = headlineColor.value;
      });
    });
  } else {
    const hc = document.getElementById(selectedHeadlineElement);
    const hcBoldElement = hc.querySelector("span");
    if (hcBoldElement) {
      headlineColorIcon.style.color = getComputedStyle(hcBoldElement).color;
    } else {
      headlineColorIcon.style.color = getComputedStyle(hc).color;
    }

    headlineColor.addEventListener("input", function () {
      const hc = document.getElementById(selectedHeadlineElement);
      headlineColorIcon.style.color = headlineColor.value;

      const childNodes = hc.childNodes;

      let firstSpan = null;

      for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === Node.ELEMENT_NODE && childNodes[i].tagName === "SPAN") {
          firstSpan = childNodes[i];
          break;
        }
      }

      if (firstSpan) {
        const normalTexts = hc.querySelectorAll("span");
        normalTexts.forEach((normalText) => {
          normalText.style.color = headlineColor.value;
        });
      } else {
        Array.from(hc.childNodes).forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
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
      }
    });
  }

  // Bold Text Color
  const headlineBoldColor = document.getElementById("headline-bold-color");
  const headlineBoldColorIcon = document.getElementById("headline-bold-color-icon");
  // Update the color icon if <b> exists in hc
  const hcBoldElement = headlineComponent.querySelector("b");

  if (hcBoldElement) {
    headlineBoldColorIcon.style.color = getComputedStyle(hcBoldElement).color;
  } else {
    headlineBoldColorIcon.style.color = getComputedStyle(headlineComponent).color;
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
  const headlineItalicColorIcon = document.getElementById("headline-italic-color-icon");
  if (headlineComponent.className === "elBullet") {
    headlineItalicColorIcon.style.color = getComputedStyle(headlineComponent.childNodes[0].childNodes[0]).color;

    headlineItalicColor.addEventListener("input", function () {
      headlineItalicColorIcon.style.color = headlineItalicColor.value;
      const headlineComponent = document.getElementById(selectedHeadlineElement);
      for (i = 0; i < headlineComponent.childNodes.length; i++) {
        headlineComponent.childNodes[i].childNodes[0].style.color = headlineItalicColor.value;
      }
    });
  } else {
    var IatalicTags = headlineComponent.querySelector("i");
    if (IatalicTags) {
      headlineItalicColorIcon.style.color = getComputedStyle(IatalicTags).color;
    } else {
      headlineItalicColorIcon.style.color = getComputedStyle(headlineComponent).color;
    }

    headlineItalicColor.addEventListener("input", function () {
      const headlineComponent = document.getElementById(selectedHeadlineElement);
      headlineItalicColorIcon.style.color = headlineItalicColor.value;
      var IatalicTags = headlineComponent.querySelectorAll("i");
      IatalicTags.forEach(function (tag) {
        tag.style.color = headlineItalicColor.value;
      });
    });
  }

  // Underline Text Color
  const headlineUnderlineColor = document.getElementById("headline-underline-color");
  const headlineUnderlineColorIcon = document.getElementById("headline-underline-color-icon");
  var UnderlineTags = headlineComponent.querySelector("u");
  if (UnderlineTags) {
    headlineUnderlineColorIcon.style.color = getComputedStyle(UnderlineTags).color;
  } else {
    headlineUnderlineColorIcon.style.color = getComputedStyle(headlineComponent).color;
  }
  headlineUnderlineColor.addEventListener("input", function () {
    const headlineComponent = document.getElementById(selectedHeadlineElement);
    headlineUnderlineColorIcon.style.color = headlineUnderlineColor.value;
    var UnderlineTags = headlineComponent.querySelectorAll("u");
    UnderlineTags.forEach(function (tag) {
      tag.style.color = headlineUnderlineColor.value;
    });
  });

  // Link Text Color
  const headlineLinkColor = document.getElementById("headline-link-color");
  const headlineLinkColorIcon = document.getElementById("headline-link-color-icon");
  var LinkTags = headlineComponent.querySelector("a");
  if (LinkTags) {
    headlineLinkColorIcon.style.color = getComputedStyle(LinkTags).color;
  } else {
    headlineLinkColorIcon.style.color = getComputedStyle(headlineComponent).color;
  }
  headlineLinkColor.addEventListener("input", function () {
    headlineLinkColorIcon.style.color = headlineLinkColor.value;
    const headlineComponent = document.getElementById(selectedHeadlineElement);
    var LinkTags = headlineComponent.querySelectorAll("a");
    LinkTags.forEach(function (tag) {
      tag.style.color = headlineLinkColor.value;
    });
  });

  //Bullet List Icon Background Color
  const bulletIconColor = document.getElementById("bullet-icon-color");
  const bulletIconColorIcon = document.getElementById("bullet-icon-color-icon");
  if (headlineComponent.className === "elBullet") {
    bulletIconColorIcon.style.color = getComputedStyle(headlineComponent.childNodes[0].childNodes[0]).backgroundColor;

    bulletIconColor.addEventListener("input", function () {
      const headlineComponent = document.getElementById(selectedHeadlineElement);
      var IatalicTags = headlineComponent.querySelectorAll("i");
      IatalicTags.forEach((Itag) => {
        if (Itag.className != "") {
          bulletIconColorIcon.style.color = bulletIconColor.value;
          Itag.style.backgroundColor = bulletIconColor.value;
        }
      });
    });
  }

  //Bullet Space
  const bulletSpace = document.getElementById("bullet-space");
  // Get the initial font size from the selected element
  const initialbulletSpace = window.getComputedStyle(parentWrapper.childNodes[0]).gap;
  // Set the slider value to the initial font size
  bulletSpace.value = parseFloat(initialbulletSpace);
  // Listen for changes in the slider value
  bulletSpace.addEventListener("input", function () {
    if (selectedHeadlineElement) {
      // Apply the font size to the selected .elSettings element
      const targetElement = document.getElementById(selectedHeadlineElement);
      const fontSize = this.value;
      targetElement.style.gap = fontSize + "px";
    }
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
  const borderSelect = document.getElementById("setting-headline-border-select");
  borderSelect.addEventListener("change", function () {
    settedHeadlineBorderType = borderSelect.value;
    settingHeadlineBorderMouseLeave();
    if (borderSelect.value != "No Border") {
      document.getElementById("headline-border-setting").style.display = "block";
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
  const borderRadius = document.getElementById("setting-headline-border-radius");
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
        const headlineComponent = document.getElementById(selectedHeadlineElement);

        // Select the specific <i> element you want to change
        const bulletListIcons = headlineComponent.querySelectorAll("i");

        Array.from(bulletListIcons).forEach((bulletListIcon) => {
          bulletListIcon.className = button.childNodes[0].className;
        });
      });
    });
  }

  const desktopVi = document.getElementById("headline-desktop");
  const mobileVi = document.getElementById("headline-mobile");
  const desktopDisplay = (section) => {
    const headlineContainer = document.getElementById(selectedHeadlineContainer);
    if (desktopBtn.classList.contains("active")) {
      if (section.classList.contains("active")) {
        headlineContainer.style.display = "block";
      } else {
        headlineContainer.style.display = "none";
      }
    }
  };
  const mobileDisplay = (section) => {
    const headlineContainer = document.getElementById(selectedHeadlineContainer);
    if (mobileBtn.classList.contains("active")) {
      if (section.classList.contains("active")) {
        headlineContainer.style.display = "block";
      } else {
        headlineContainer.style.display = "none";
      }
    }
  };
  if (desktopBtn.classList.contains("active")) {
    desktopVi.addEventListener("click", () => desktopDisplay(desktopVi));
  } else {
    mobileVi.addEventListener("click", () => mobileDisplay(mobileVi));
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

const currentSelectedHeadlineContainer = (args) => {
  if (args) {
    selectedHeadlineContainer = args;
  }
  return selectedHeadlineContainer;
};

export { HeadlineGearElement, selectedHeadlineElement, currentSelectedHeadlineElement, currentSelectedHeadlineContainer };
