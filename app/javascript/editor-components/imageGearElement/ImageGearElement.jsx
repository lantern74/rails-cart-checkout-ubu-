import React from "react";
import ReactDOM from "react-dom/client";
import { ImageDragAndDrop } from "./ImageDragAndDrop";
import { closeAllSidebars, closeAllTextEditPopups } from "../editor_functions";
// Settings for Image Element
let selectedImageElement = null;
function ImageGearElement(parentWrapper) {
  selectedImageElement = parentWrapper.id;

  if (setImagePopup.classList.contains("open")) {
    closeAllSidebars();
    setImagePopup.classList.remove("open");
    document.getElementById("marginPaddingPopup").style.display = "none";
  } else {
    closeAllSidebars();
    setImagePopup.classList.add("open");
  }
  // loadPresetImageSettings(parentWrapper);
  loadPresetImageSettings();
}

function loadPresetImageSettings(parentWrapper) {
  const imageContainer = document.getElementById(selectedImageElement);
  const imageComponent = imageContainer.querySelector("img");
  const imageGeneralTab = document.getElementById("image-general-tab");
  const imageGeneralContent = document.getElementById("image-general-content");
  const imageAdvancedTab = document.getElementById("image-advanced-tab");
  const imageAdvancedContent = document.getElementById("image-advanced-content");
  const imageOpacitySelect = document.getElementById("image-opacity-select");
  imageGeneralTab.addEventListener("click", function () {
    imageGeneralContent.classList.add("active");
    imageGeneralTab.classList.add("active");
    imageAdvancedContent.classList.remove("active");
    imageAdvancedTab.classList.remove("active");
  });
  imageAdvancedTab.addEventListener("click", function () {
    imageGeneralContent.classList.remove("active");
    imageGeneralTab.classList.remove("active");
    imageAdvancedContent.classList.add("active");
    imageAdvancedTab.classList.add("active");
  });
  //get margin padding value
  const imageWidth = document.getElementById("set-image-width");
  const imageHeight = document.getElementById("set-image-height");
  var setImageMarginTop = document.getElementById("setImageMarginTop");
  var setImageMarginLeft = document.getElementById("setImageMarginLeft");
  var setImageMarginRight = document.getElementById("setImageMarginRight");
  var setImageMarginBottom = document.getElementById("setImageMarginBottom");
  var setImagePaddingTop = document.getElementById("setImagePaddingTop");
  var setImagePaddingLeft = document.getElementById("setImagePaddingLeft");
  var setImagePaddingRight = document.getElementById("setImagePaddingRight");
  var setImagePaddingBottom = document.getElementById("setImagePaddingBottom");
  var editorComponentStyles = getComputedStyle(imageContainer);
  if (desktopBtn.classList.contains("active")) {
    setImageMarginTop.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-top");
    setImageMarginLeft.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-left");
    setImageMarginRight.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-right");
    setImageMarginBottom.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-bottom");
    setImagePaddingTop.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-top");
    setImagePaddingLeft.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-left");
    setImagePaddingRight.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-right");
    setImagePaddingBottom.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-bottom");
    imageWidth.value = parseFloat(getComputedStyle(imageComponent).getPropertyValue("--desktop-width"));
    // imageHeight.value = parseFloat(getComputedStyle(imageComponent).getPropertyValue("--desktop-height"));
  } else if (mobileBtn.classList.contains("active")) {
    setImageMarginTop.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-top");
    setImageMarginLeft.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-left");
    setImageMarginRight.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-right");
    setImageMarginBottom.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-bottom");
    setImagePaddingTop.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-top");
    setImagePaddingLeft.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-left");
    setImagePaddingRight.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-right");
    setImagePaddingBottom.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-bottom");
    imageWidth.value = parseFloat(getComputedStyle(imageComponent).getPropertyValue("--mobile-width"));
    // imageHeight.value = parseFloat(getComputedStyle(imageComponent).getPropertyValue("--mobile-height"));
  }

  const deviceSelected = document.getElementById("headline-fontsize-device");
  document.querySelectorAll(".device-select .option").forEach((option) => {
    option.addEventListener("click", function () {
      const imageContainer = document.getElementById(selectedImageElement);
      const imageComponent = imageContainer.querySelector("img");
      const device = this.getAttribute("data-value");

      // Update the font size based on device selection
      if (device === "desktop") {
        imageComponent.classList.add("active");
        imageComponent.classList.remove("mobile-view");
        imageComponent.classList.add("desktop-view");
        imageContainer.classList.add("active");
        imageContainer.classList.remove("mp-mobile-view");
        imageContainer.classList.add("mp-desktop-view");

        imageWidth.value = getComputedStyle(imageComponent).getPropertyValue("--desktop-width");
        imageHeight.value = getComputedStyle(imageComponent).getPropertyValue("--desktop-height");

        setImageMarginTop.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-top");
        setImageMarginLeft.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-left");
        setImageMarginRight.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-right");
        setImageMarginBottom.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-bottom");
        setImagePaddingTop.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-top");
        setImagePaddingLeft.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-left");
        setImagePaddingRight.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-right");
        setImagePaddingBottom.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-bottom");
      } else if (device === "mobile") {
        imageComponent.classList.remove("active");
        imageComponent.classList.add("mobile-view");
        imageComponent.classList.remove("desktop-view");
        imageContainer.classList.remove("active");
        imageContainer.classList.add("mp-mobile-view");
        imageContainer.classList.remove("mp-desktop-view");

        imageWidth.value = getComputedStyle(imageComponent).getPropertyValue("--mobile-width");
        imageHeight.value = getComputedStyle(imageComponent).getPropertyValue("--mobile-height");

        setImageMarginTop.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-top");
        setImageMarginLeft.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-left");
        setImageMarginRight.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-right");
        setImageMarginBottom.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-bottom");
        setImagePaddingTop.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-top");
        setImagePaddingLeft.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-left");
        setImagePaddingRight.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-right");
        setImagePaddingBottom.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-bottom");
      }
    });
  });

  let desktopWidth = getComputedStyle(imageComponent).getPropertyValue("--desktop-width");
  let mobileWidth = getComputedStyle(imageComponent).getPropertyValue("--mobile-width");
  let desktopHeight = getComputedStyle(imageComponent).getPropertyValue("--desktop-height");
  let mobileHeight = getComputedStyle(imageComponent).getPropertyValue("--mobile-height");
  // setting image width

  imageWidth.addEventListener("input", function () {
    const imageContainer = document.getElementById(selectedImageElement);
    const imageComponent = imageContainer.querySelector("img");

    const device = deviceSelected.getAttribute("data-value");
    if (device === "desktop") {
      if (imageWidth.value == "") {
        imageComponent.style.removeProperty("width");
      } else {
        if (imageWidth.value.endsWith("%")) {
          desktopWidth = imageWidth.value;
          imageComponent.style.setProperty("--desktop-width", imageWidth.value);
        } else {
          desktopWidth = imageWidth.value + "px";
          imageComponent.style.setProperty("--desktop-width", `${imageWidth.value}px`);
        }
      }
    } else if (device === "mobile") {
      if (imageWidth.value == "") {
        imageComponent.style.removeProperty("width");
      } else {
        if (imageWidth.value.endsWith("%")) {
          mobileWidth = imageWidth.value;
          imageComponent.style.setProperty("--mobile-width", imageWidth.value);
        } else {
          mobileWidth = imageWidth.value + "px";
          imageComponent.style.setProperty("--mobile-width", `${imageWidth.value}px`);
        }
      }
    }
  });
  // setting image height

  imageHeight.addEventListener("input", function () {
    const imageContainer = document.getElementById(selectedImageElement);
    const imageComponent = imageContainer.querySelector("img");
    const device = deviceSelected.getAttribute("data-value");

    if (device === "desktop") {
      if (imageHeight.value == "") {
        imageComponent.style.removeProperty("height");
      } else {
        if (imageHeight.value.endsWith("%")) {
          desktopHeight = imageHeight.value;
          imageComponent.style.setProperty("--desktop-height", imageHeight.value);
        } else {
          desktopHeight = imageHeight.value + "px";
          imageComponent.style.setProperty("--desktop-height", `${imageHeight.value}px`);
        }
      }
    } else if (device === "mobile") {
      if (imageHeight.value == "") {
        imageComponent.style.removeProperty("height");
      } else {
        if (imageHeight.value.endsWith("%")) {
          mobileHeight = imageHeight.value;
          imageComponent.style.setProperty("--mobile-height", imageHeight.value);
        } else {
          mobileHeight = imageHeight.value + "px";
          imageComponent.style.setProperty("--mobile-height", `${imageHeight.value}px`);
        }
      }
    }
  });

  // Background color setting for Image Element
  const imageBackColor = document.getElementById("image-back-color");
  const imageBackColorIcon = document.getElementById("image-back-color-icon");
  const transparentButton = document.getElementById("image-transparent-background");
  imageBackColor.style.color = imageContainer.style.backgroundColor;
  imageBackColorIcon.style.color = imageBackColor.style.color;
  const updateBackgroundColor = () => {
    const imageContainer = document.getElementById(selectedImageElement);
    if (imageContainer.dataset.transparent === "true") {
      // Set the background color to transparent
      imageContainer.style.backgroundColor = "transparent";
    } else {
      // Set the background color to the chosen color
      imageContainer.style.backgroundColor = imageBackColor.value;
    }
  };
  // Event listener for color input
  imageBackColor.addEventListener("input", function () {
    const imageContainer = document.getElementById(selectedImageElement);
    imageContainer.dataset.transparent = "false";
    updateBackgroundColor();
    imageBackColorIcon.style.color = imageBackColor.value;
  });
  // Event listener for the transparent button
  transparentButton.addEventListener("click", function () {
    const imageContainer = document.getElementById(selectedImageElement);
    imageContainer.dataset.transparent = "true";
    updateBackgroundColor();
    imageBackColorIcon.style.color = "white";
  });

  // Background color opacity for Image Element
  imageOpacitySelect.addEventListener("change", function () {
    const imageContainer = document.getElementById(selectedImageElement);
    let rgbColor = imageContainer.style.backgroundColor;
    if (imageContainer.style.backgroundColor.includes("rgba")) {
      rgbColor = imageContainer.style.backgroundColor.replace(/, [\d\.]+\)$/, "") + ")";
    }
    let convertedRGBA = rgbColor.replace(")", `, ${imageOpacitySelect.value})`);
    imageContainer.style.backgroundColor = convertedRGBA;
  });
  // Text Alignment for Headline Element
  const imageAlignLeft = document.getElementById("image-align-left");
  const imageAlignCenter = document.getElementById("image-align-center");
  const imageAlignRigth = document.getElementById("image-align-right");
  const imageAlignFull = document.getElementById("image-align-full");
  imageAlignLeft.addEventListener("click", function () {
    const imageContainer = document.getElementById(selectedImageElement);
    imageContainer.style.textAlign = "left";
    imageAlignLeft.classList.add("selected-button");
    imageAlignCenter.classList.remove("selected-button");
    imageAlignRigth.classList.remove("selected-button");
    imageAlignFull.classList.remove("selected-button");
  });
  imageAlignCenter.addEventListener("click", function () {
    const imageContainer = document.getElementById(selectedImageElement);
    imageContainer.style.textAlign = "center";
    imageAlignLeft.classList.remove("selected-button");
    imageAlignCenter.classList.add("selected-button");
    imageAlignRigth.classList.remove("selected-button");
    imageAlignFull.classList.remove("selected-button");
  });
  imageAlignRigth.addEventListener("click", function () {
    const imageContainer = document.getElementById(selectedImageElement);
    imageContainer.style.textAlign = "right";
    imageAlignLeft.classList.remove("selected-button");
    imageAlignCenter.classList.remove("selected-button");
    imageAlignRigth.classList.add("selected-button");
    imageAlignFull.classList.remove("selected-button");
  });
  imageAlignFull.addEventListener("click", function () {
    const imageContainer = document.getElementById(selectedImageElement);
    imageContainer.style.textAlign = "justify";
    imageAlignLeft.classList.remove("selected-button");
    imageAlignCenter.classList.remove("selected-button");
    imageAlignRigth.classList.remove("selected-button");
    imageAlignFull.classList.add("selected-button");
  });

  // imagePath.addEventListener("input", function () {
  //   imageContainer.childNodes[0].setAttribute("src", imagePath.value);
  // });

  // setting image alt
  const imageAlt = document.getElementById("set-image-alt");
  imageAlt.addEventListener("input", function () {
    imageContainer.childNodes[0].setAttribute("alt", imageAlt.value);
  });
  //setting image radius
  const imageRadius = document.getElementById("set-image-radius");
  imageRadius.addEventListener("change", function () {
    const imageContainer = document.getElementById(selectedImageElement);
    if (imageRadius.value == "None") {
      imageContainer.childNodes[0].style.borderRadius = "0px";
    } else if (imageRadius.value == "Circle") {
      imageContainer.childNodes[0].style.borderRadius = "50%";
    } else if (imageRadius.value == "Round Corners") {
      imageContainer.childNodes[0].style.borderRadius = "5px";
    }
  });
  //setting image border
  const imageBorder = document.getElementById("set-image-border");
  imageBorder.addEventListener("change", function () {
    const imageContainer = document.getElementById(selectedImageElement);
    if (imageBorder.value == "None") {
      imageContainer.childNodes[0].style.border = "none";
    } else if (imageBorder.value == "White Thumbnail Border") {
      imageContainer.childNodes[0].style.border = "3px solid #fff";
    } else if (imageBorder.value == "Dark Thumbnail Border") {
      imageContainer.childNodes[0].style.border = "3px solid rgba(0,0,0,.7)";
    } else if (imageBorder.value == "2px Dark Thumbnail Border") {
      imageContainer.childNodes[0].style.border = "2px solid rgba(0,0,0,.55)";
    } else if (imageBorder.value == "5px Transparent Thumbnail Border") {
      imageContainer.childNodes[0].style.border = "1px solid rgba(0,0,0,.15)";
      imageContainer.childNodes[0].style.borderBottom = "2px solid rgba(0,0,0,.15)";
      imageContainer.childNodes[0].style.padding = "5px";
    } else if (imageBorder.value == "2px Bottom Thumbnail Border") {
      imageContainer.childNodes[0].style.border = "1px solid rgba(0,0,0,.35)";
      imageContainer.childNodes[0].style.borderBottom = "2px solid rgba(0,0,0,.35)";
      imageContainer.childNodes[0].style.padding = "1px";
    }
  });
  //setting image shadow
  const setImageShadow = document.getElementById("set-image-shadow");
  setImageShadow.addEventListener("change", function () {
    const imageContainer = document.getElementById(selectedImageElement);
    if (setImageShadow.value == "None") {
      imageContainer.childNodes[0].style.boxShadow = "0px";
    } else if (setImageShadow.value == "Light Shadow") {
      imageContainer.childNodes[0].style.boxShadow = "0 1px 5px #0003";
    } else if (setImageShadow.value == "Full Shadow") {
      imageContainer.childNodes[0].style.boxShadow = "0 2px 5px 2px #0000004d";
    } else if (setImageShadow.value == "Dark Shadow") {
      imageContainer.childNodes[0].style.boxShadow = "0 2px 5px 2px #0006";
    } else if (setImageShadow.value == "Buttom Medium Dark Shadow") {
      imageContainer.childNodes[0].style.boxShadow = "0 4px 3px #00000026, 0 0 2px #00000026";
    } else if (setImageShadow.value == "Bottom Light Shadow") {
      imageContainer.childNodes[0].style.boxShadow = "0 10px 6px -6px #00000026";
    } else if (setImageShadow.value == "Bottom Right Dark Shadow") {
      imageContainer.childNodes[0].style.boxShadow = "3px 3px 15px #212121a8";
    } else if (setImageShadow.value == "Bottom Dark Shadow") {
      imageContainer.childNodes[0].style.boxShadow = "0px 3px 15px #212121a8";
    }
  });

  //Setting import Image
  const imagePath = document.getElementById("react-image-drag-and-drop");
  //Setting import Image
  const render = (Component, props) => {
    if (imagePath) {
      ReactDOM.createRoot(imagePath).render(<Component {...props} />);
    } else {
      console.error(`${imagePath} element not found. React component not rendered.`);
    }
  };
  render(ImageDragAndDrop, {
    onSetImage: (imgUrl) => {
      imageContainer.childNodes[0].setAttribute("src", imgUrl);
      imageContainer.childNodes[0].style.width = imageWidth.value + "px";
      imageContainer.childNodes[0].style.objectFit = "cover";
      imageContainer.childNodes[0].style.height = imageHeight.value + "px";
      imageContainer.childNodes[0].setAttribute("alt", imageAlt.value);
      imageBackColorIcon.style.color = imageBackColor.value;
      imageContainer.style.backgroundColor = imageBackColor.value;
      imageOpacitySelect.value = "1.0";
    },
  });
  const desktopVi = document.getElementById("image-desktop");
  const mobileVi = document.getElementById("image-mobile");
  const desktopDisplay = (section) => {
    const imageContainer = document.getElementById(selectedImageElement);
    if (desktopBtn.classList.contains("active")) {
      if (section.classList.contains("active")) {
        imageContainer.style.display = "block";
      } else {
        imageContainer.style.display = "none";
      }
    }
  };
  const mobileDisplay = (section) => {
    const imageContainer = document.getElementById(selectedImageElement);
    if (mobileBtn.classList.contains("active")) {
      if (section.classList.contains("active")) {
        imageContainer.style.display = "block";
      } else {
        imageContainer.style.display = "none";
      }
    }
  };
  if (desktopBtn.classList.contains("active")) {
    desktopVi.addEventListener("click", () => desktopDisplay(desktopVi));
  } else {
    mobileVi.addEventListener("click", () => mobileDisplay(mobileVi));
  }
}
// export the currentSelectedImageElement that has the right value

const imageSettingClose = document.getElementById("image-setting-close");
imageSettingClose.addEventListener("click", function () {
  selectedImageElement = null;
  setImagePopup.classList.remove("open");
});

const currentSelectedImageElement = (args) => {
  if (args) {
    selectedImageElement = args;
  }
  return selectedImageElement;
};

export { ImageGearElement, selectedImageElement, currentSelectedImageElement };
