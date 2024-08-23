import React from "react";
import ReactDOM from "react-dom/client";
import { ImageDragAndDrop } from "./ImageDragAndDrop";
import {closeAllSidebars,closeAllTextEditPopups} from "../editor_functions";
// Settings for Image Element
let selectedImageElement = null;
function ImageGearElement(parentWrapper) {
  selectedImageElement = parentWrapper.id;


  if (setImagePopup.classList.contains("open")) {
      closeAllSidebars();
      setImagePopup.classList.remove("open");
  } else {
    closeAllSidebars();
    setImagePopup.classList.add("open");
  }
  // loadPresetImageSettings(parentWrapper);
  loadPresetImageSettings();
}




function loadPresetImageSettings(parentWrapper) {
  const imageContainer = document.getElementById(selectedImageElement);
  // const imageContainer = document.getElementById(parentWrapper.id);
  const imageGeneralTab = document.getElementById("image-general-tab");
  const imageGeneralContent = document.getElementById("image-general-content");
  const imageAdvancedTab = document.getElementById("image-advanced-tab");
  const imageAdvancedContent = document.getElementById(
    "image-advanced-content"
  );
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
  var setImageMarginTop = document.getElementById("setImageMarginTop");
  var setImageMarginBottom = document.getElementById("setImageMarginBottom");
  var setImagePaddingTop = document.getElementById("setImagePaddingTop");
  var setImagePaddingLeft = document.getElementById("setImagePaddingLeft");
  var setImagePaddingRight = document.getElementById("setImagePaddingRight");
  var setImagePaddingBottom = document.getElementById("setImagePaddingBottom");
  var editorComponentStyles = getComputedStyle(imageContainer);
  setImageMarginTop.innerText =
    editorComponentStyles.getPropertyValue("margin-top");
  setImageMarginBottom.innerText =
    editorComponentStyles.getPropertyValue("margin-bottom");
  setImagePaddingTop.innerText =
    editorComponentStyles.getPropertyValue("padding-top");
  setImagePaddingLeft.innerText =
    editorComponentStyles.getPropertyValue("padding-left");
  setImagePaddingRight.innerText =
    editorComponentStyles.getPropertyValue("padding-right");
  setImagePaddingBottom.innerText =
    editorComponentStyles.getPropertyValue("padding-bottom");
  // Background color setting for Image Element
  const imageBackColor = document.getElementById("image-back-color");
  const imageBackColorIcon = document.getElementById("image-back-color-icon");
  imageBackColor.style.color = imageContainer.style.backgroundColor;
  imageBackColorIcon.style.color = imageContainer.style.backgroundColor;
  imageBackColor.addEventListener("input", function () {
    imageBackColorIcon.style.color = imageBackColor.value;
    imageContainer.style.backgroundColor = imageBackColor.value;
    imageOpacitySelect.value = "1.0";
  });
  // Background color opacity for Image Element
  imageOpacitySelect.addEventListener("change", function () {
    let rgbColor = imageContainer.style.backgroundColor;
    if (imageContainer.style.backgroundColor.includes("rgba")) {
      rgbColor =
        imageContainer.style.backgroundColor.replace(/, [\d\.]+\)$/, "") + ")";
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
    imageContainer.style.textAlign = "left";
    imageAlignLeft.classList.add("selected-button");
    imageAlignCenter.classList.remove("selected-button");
    imageAlignRigth.classList.remove("selected-button");
    imageAlignFull.classList.remove("selected-button");
  });
  imageAlignCenter.addEventListener("click", function () {
    imageContainer.style.textAlign = "center";
    imageAlignLeft.classList.remove("selected-button");
    imageAlignCenter.classList.add("selected-button");
    imageAlignRigth.classList.remove("selected-button");
    imageAlignFull.classList.remove("selected-button");
  });
  imageAlignRigth.addEventListener("click", function () {
    imageContainer.style.textAlign = "right";
    imageAlignLeft.classList.remove("selected-button");
    imageAlignCenter.classList.remove("selected-button");
    imageAlignRigth.classList.add("selected-button");
    imageAlignFull.classList.remove("selected-button");
  });
  imageAlignFull.addEventListener("click", function () {
    imageContainer.style.textAlign = "justify";
    imageAlignLeft.classList.remove("selected-button");
    imageAlignCenter.classList.remove("selected-button");
    imageAlignRigth.classList.remove("selected-button");
    imageAlignFull.classList.add("selected-button");
  });

  // imagePath.addEventListener("input", function () {
  //   imageContainer.childNodes[0].setAttribute("src", imagePath.value);
  // });
  // setting image width
  const imageWidth = document.getElementById("set-image-width");
  imageWidth.addEventListener("input", function () {
    imageContainer.childNodes[0].style.width = imageWidth.value + "px";
  });
  // setting image height
  const imageHeight = document.getElementById("set-image-height");
  imageHeight.addEventListener("input", function () {
    imageContainer.childNodes[0].style.height = imageHeight.value + "px";
  });
  //get image width and height
  var imageStyle = getComputedStyle(imageContainer.childNodes[0]);
  var getImageWidth = imageStyle.getPropertyValue("width");
  var getImageHeight = imageStyle.getPropertyValue("height");
  imageWidth.value = parseInt(getImageWidth.match(/\d+/)[0]);
  imageHeight.value = parseInt(getImageHeight.match(/\d+/)[0]);
  // setting image alt
  const imageAlt = document.getElementById("set-image-alt");
  imageAlt.addEventListener("input", function () {
    imageContainer.childNodes[0].setAttribute("alt", imageAlt.value);
  });
  //setting image radius
  const imageRadius = document.getElementById("set-image-radius");
  imageRadius.addEventListener("change", function () {
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
      imageContainer.childNodes[0].style.borderBottom =
        "2px solid rgba(0,0,0,.15)";
      imageContainer.childNodes[0].style.padding = "5px";
    } else if (imageBorder.value == "2px Bottom Thumbnail Border") {
      imageContainer.childNodes[0].style.border = "1px solid rgba(0,0,0,.35)";
      imageContainer.childNodes[0].style.borderBottom =
        "2px solid rgba(0,0,0,.35)";
      imageContainer.childNodes[0].style.padding = "1px";
    }
  });
  //setting image shadow
  const setImageShadow = document.getElementById("set-image-shadow");
  setImageShadow.addEventListener("change", function () {
    if (setImageShadow.value == "None") {
      imageContainer.childNodes[0].style.boxShadow = "0px";
    } else if (setImageShadow.value == "Light Shadow") {
      imageContainer.childNodes[0].style.boxShadow = "0 1px 5px #0003";
    } else if (setImageShadow.value == "Full Shadow") {
      imageContainer.childNodes[0].style.boxShadow = "0 2px 5px 2px #0000004d";
    } else if (setImageShadow.value == "Dark Shadow") {
      imageContainer.childNodes[0].style.boxShadow = "0 2px 5px 2px #0006";
    } else if (setImageShadow.value == "Buttom Medium Dark Shadow") {
      imageContainer.childNodes[0].style.boxShadow =
        "0 4px 3px #00000026, 0 0 2px #00000026";
    } else if (setImageShadow.value == "Bottom Light Shadow") {
      imageContainer.childNodes[0].style.boxShadow =
        "0 10px 6px -6px #00000026";
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
      console.error(
        `${imagePath} element not found. React component not rendered.`
      );
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
