import React from "react";
import ReactDOM from "react-dom/client";
// import { VideoDragAndDrop } from "./VideoDragAndDrop";
import { closeAllSidebars, closeAllTextEditPopups } from "../editor_functions";

var setVideoMarginTop = document.getElementById("setVideoMarginTop");
var setVideoMarginBottom = document.getElementById("setVideoMarginBottom");
var setVideoPaddingTop = document.getElementById("setVideoPaddingTop");
var setVideoPaddingLeft = document.getElementById("setVideoPaddingLeft");
var setVideoPaddingRight = document.getElementById("setVideoPaddingRight");
var setVideoPaddingBottom = document.getElementById("setVideoPaddingBottom");

// Settings for Video Element
let selectedVideoElement = null;
function VideoGearElement(parentWrapper) {
  selectedVideoElement = parentWrapper.id;

  if (setVideoPopup.classList.contains("open")) {
    closeAllSidebars();
    setVideoPopup.classList.remove("open");
  } else {
    closeAllSidebars();
    setVideoPopup.classList.add("open");
  }

  loadPresetVideoSettings(parentWrapper);
}

function loadPresetVideoSettings(parentWrapper) {
  const videoContainer = document.getElementById(parentWrapper.id);
  const videoComponent = document.getElementById(parentWrapper.firstChild.id);

  const videoGeneralTab = document.getElementById("video-general-tab");
  const videoGeneralContent = document.getElementById("video-general-content");
  const videoAdvancedTab = document.getElementById("video-advanced-tab");
  const videoAdvancedContent = document.getElementById(
    "video-advanced-content"
  );
  videoGeneralTab.addEventListener("click", function () {
    videoGeneralContent.classList.add("active");
    videoGeneralTab.classList.add("active");
    videoAdvancedContent.classList.remove("active");
    videoAdvancedTab.classList.remove("active");
  });
  videoAdvancedTab.addEventListener("click", function () {
    videoGeneralContent.classList.remove("active");
    videoGeneralTab.classList.remove("active");
    videoAdvancedContent.classList.add("active");
    videoAdvancedTab.classList.add("active");
  });
  //get margin padding value
  var editorComponentStyles = getComputedStyle(videoContainer);
  setVideoMarginTop.innerText =
    editorComponentStyles.getPropertyValue("margin-top");
  setVideoMarginBottom.innerText =
    editorComponentStyles.getPropertyValue("margin-bottom");
  setVideoPaddingTop.innerText =
    editorComponentStyles.getPropertyValue("padding-top");
  setVideoPaddingLeft.innerText =
    editorComponentStyles.getPropertyValue("padding-left");
  setVideoPaddingRight.innerText =
    editorComponentStyles.getPropertyValue("padding-right");
  setVideoPaddingBottom.innerText =
    editorComponentStyles.getPropertyValue("padding-bottom");
  // Background color setting for Image Element
  const videoBackColor = document.getElementById("video-back-color");
  const videoBackColorIcon = document.getElementById("video-back-color-icon");
  videoBackColor.style.color = videoContainer.style.backgroundColor;
  videoBackColorIcon.style.color = videoContainer.style.backgroundColor;
  videoBackColor.addEventListener("input", function () {
    videoBackColorIcon.style.color = videoBackColor.value;
    videoContainer.style.backgroundColor = videoBackColor.value;
  });
  //Setting import Image
  const videoPath = document.getElementById("input-video-path");
  videoPath.addEventListener("change", function () {
    let inputUrl = videoPath.value;
    let embedUrl = "";

    if (inputUrl.includes("youtu.be/")) {
      // Handle YouTube short URL
      const videoId = inputUrl.split("youtu.be/")[1];
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (inputUrl.includes("youtube.com/watch?v=")) {
      // Handle YouTube watch URL
      const videoId = new URL(inputUrl).searchParams.get("v");
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (inputUrl.includes("vimeo.com/")) {
      // Handle Vimeo URL
      const videoId = inputUrl.split("vimeo.com/")[1].split("?")[0];
      embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    } else {
      embedUrl = videoPath.value;
    }

    // Set the new source URL for the video

    const videoElement = videoContainer.childNodes[1].childNodes[1];
    videoElement.setAttribute("src", embedUrl);
  });
  //Box Shadow
  const setBoxShadow = document.getElementById("set-video-box-shadow");
  setBoxShadow.addEventListener("change", function () {
    if (setBoxShadow.value == "No Shadow") {
      videoContainer.style.boxShadow = "none";
    } else if (setBoxShadow.value == "5% Drop Shadow") {
      videoContainer.style.boxShadow = "0 1px 3px #0000000d";
    } else if (setBoxShadow.value == "10% Drop Shadow") {
      videoContainer.style.boxShadow = "0 1px 5px #0000001a";
    } else if (setBoxShadow.value == "20% Drop Shadow") {
      videoContainer.style.boxShadow = "0 1px 5px #0003";
    } else if (setBoxShadow.value == "30% Drop Shadow") {
      videoContainer.style.boxShadow = "0 2px 5px 2px #0000004d";
    } else if (setBoxShadow.value == "40% Drop Shadow") {
      videoContainer.style.boxShadow = "0 2px 5px 2px #0006";
    } else if (setBoxShadow.value == "5% Inner Shadow") {
      videoContainer.style.boxShadow = "0 1px 3px #0000000d inset";
    } else if (setBoxShadow.value == "10% Inner Shadow") {
      videoContainer.style.boxShadow = "0 1px 5px #0000001a inset";
    } else if (setBoxShadow.value == "20% Inner Shadow") {
      videoContainer.style.boxShadow = "0 1px 5px #0003 inset";
    } else if (setBoxShadow.value == "30% Inner Shadow") {
      videoContainer.style.boxShadow = "0 2px 5px 2px #0000004d inset";
    } else if (setBoxShadow.value == "40% Inner Shadow") {
      videoContainer.style.boxShadow = "0 2px 5px 2px #0006 inset";
    }
  });
  // set video url
  // const setVideoPath = document.getElementById("input-video-path");
  // setVideoPath.addEventListener("input", function () {
  //   const cresateSourceTag = document.createElement("source");
  //   cresateSourceTag.setAttribute("src", setVideoPath.value);
  //   videoContainer.childNodes[0].append(cresateSourceTag);
  // });
  //setting video width
  const setVideoWidth = document.getElementById("set-video-width");
  setVideoWidth.addEventListener("change", function () {
    if (setVideoWidth.value == "Full Width") {
      videoContainer.style.width = "100%";
    } else if (setVideoWidth.value == "3/4 Width") {
      videoContainer.style.width = "75%";
    } else if (setVideoWidth.value == "Half Width") {
      videoContainer.style.width = "50%";
    }
  });
  //Border select
  function settingVideoBorderMouseLeave() {
    if (settedVideoBorderType == "No Border") {
      videoContainer.style.border = "none";
    } else if (settedVideoBorderType == "full") {
      videoContainer.style.border = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
    } else if (settedVideoBorderType == "bottom") {
      videoContainer.style.border = "none";
      videoContainer.style.borderBottom = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
    } else if (settedVideoBorderType == "top") {
      videoContainer.style.border = "none";
      videoContainer.style.borderTop = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
    } else if (settedVideoBorderType == "top&bototm") {
      videoContainer.style.border = "none";
      videoContainer.style.borderBottom = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
      videoContainer.style.borderTop = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
    }
    videoContainer.style.borderRadius = settedRadiusValue;
    videoContainer.addEventListener("mouseleave", function () {
      if (settedVideoBorderType == "No Border") {
        videoContainer.style.border = "none";
      } else if (settedVideoBorderType == "full") {
        videoContainer.style.border = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
      } else if (settedVideoBorderType == "bottom") {
        videoContainer.style.border = "none";
        videoContainer.style.borderBottom = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
      } else if (settedVideoBorderType == "top") {
        videoContainer.style.border = "none";
        videoContainer.style.borderTop = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
      } else if (settedVideoBorderType == "top&bototm") {
        videoContainer.style.border = "none";
        videoContainer.style.borderBottom = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
        videoContainer.style.borderTop = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
      }
    });
  }
  var settedVideoBorderType;
  const borderSelect = document.getElementById("setting-video-border-select");
  borderSelect.addEventListener("change", function () {
    settedVideoBorderType = borderSelect.value;
    settingVideoBorderMouseLeave();
    if (borderSelect.value != "No Border") {
      document.getElementById("video-border-setting").style.display = "block";
    } else {
      document.getElementById("video-border-setting").style.display = "none";
    }
  });
  //set border style
  var settedVideoBorderStyle = "solid";
  const borderStyle = document.getElementById("setting-video-border-style");
  borderStyle.addEventListener("change", function () {
    settedVideoBorderStyle = borderStyle.value;
    settingVideoBorderMouseLeave();
  });
  //set border width
  var settedVideoBorderWidth = "3px";
  const borderWidth = document.getElementById("setting-video-border-width");
  borderWidth.addEventListener("change", function () {
    settedVideoBorderWidth = borderWidth.value;
    settingVideoBorderMouseLeave();
  });
  //set border color
  var settedVideoBorderColor = "#333";
  const borderColor = document.getElementById("video-border-color");
  const borderColorIcon = document.getElementById("video-border-color-icon");
  borderColor.style.color = videoContainer.style.borderColor;
  borderColorIcon.style.color = videoContainer.style.borderColor;
  borderColor.addEventListener("input", function () {
    borderColorIcon.style.color = borderColor.value;
    videoContainer.style.borderColor = borderColor.value;
    settedVideoBorderColor = borderColor.value;
  });
  //set border radius
  var settedRadiusValue = "0px";
  const borderRadius = document.getElementById("setting-video-border-radius");
  borderRadius.addEventListener("change", function () {
    settedRadiusValue = borderRadius.value;
    settingVideoBorderMouseLeave();
  });
  //set border edge
  const borderEdge = document.getElementById("setting-video-edge");
  borderEdge.addEventListener("change", function () {
    if (borderEdge.value == "All Edges") {
      videoContainer.style.borderRadius = settedRadiusValue;
    } else if (borderEdge.value == "Top Only Edges") {
      videoContainer.style.borderRadius = `${settedRadiusValue} ${settedRadiusValue} 0 0`;
    } else if (borderEdge.value == "Bottom Only Edges") {
      videoContainer.style.borderRadius = `0 0 ${settedRadiusValue} ${settedRadiusValue}`;
    }
  });
}

const videoSettingClose = document.getElementById("video-setting-close");
videoSettingClose.addEventListener("click", function () {
  selectedVideoElement = null;
  selectedVideoContainer = null;
  setVideoPopup.classList.remove("open");
});

// export the currentSelectedVideoElement that has the right value
const currentSelectedVideoElement = (args) => {
  if (args) {
    selectedVideoElement = args;
  }
  return selectedVideoElement;
};

export { VideoGearElement, selectedVideoElement, currentSelectedVideoElement };
