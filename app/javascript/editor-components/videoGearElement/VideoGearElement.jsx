import React from "react";
import ReactDOM from "react-dom/client";
// import { VideoDragAndDrop } from "./VideoDragAndDrop";
import { closeAllSidebars, closeAllTextEditPopups } from "../editor_functions";

var setVideoMarginTop = document.getElementById("setVideoMarginTop");
var setVideoMarginLeft = document.getElementById("setVideoMarginLeft");
var setVideoMarginRight = document.getElementById("setVideoMarginRight");
var setVideoMarginBottom = document.getElementById("setVideoMarginBottom");
var setVideoPaddingTop = document.getElementById("setVideoPaddingTop");
var setVideoPaddingLeft = document.getElementById("setVideoPaddingLeft");
var setVideoPaddingRight = document.getElementById("setVideoPaddingRight");
var setVideoPaddingBottom = document.getElementById("setVideoPaddingBottom");

// Settings for Video Element
let selectedVideoElement = null;
// let selectedVideoComponent = null;
function VideoGearElement(parentWrapper) {
  selectedVideoElement = parentWrapper.id;
  // selectedVideoComponent = parentWrapper.firstChild.id;

  if (setVideoPopup.classList.contains("open")) {
    closeAllSidebars();
    setVideoPopup.classList.remove("open");
    document.getElementById("marginPaddingPopup").style.display = "none";
  } else {
    closeAllSidebars();
    setVideoPopup.classList.add("open");
  }

  loadPresetVideoSettings(parentWrapper);
}

function loadPresetVideoSettings(parentWrapper) {
  const videoContainer = document.getElementById(selectedVideoElement);
  const videoComponent = videoContainer.firstChild;
  const videoGeneralTab = document.getElementById("video-general-tab");
  const videoGeneralContent = document.getElementById("video-general-content");
  const videoAdvancedTab = document.getElementById("video-advanced-tab");
  const videoAdvancedContent = document.getElementById("video-advanced-content");
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
  if (desktopBtn.classList.contains("active")) {
    setVideoMarginTop.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-top");
    setVideoMarginLeft.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-left");
    setVideoMarginRight.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-right");
    setVideoMarginBottom.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-bottom");
    setVideoPaddingTop.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-top");
    setVideoPaddingLeft.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-left");
    setVideoPaddingRight.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-right");
    setVideoPaddingBottom.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-bottom");
  } else if (mobileBtn.classList.contains("active")) {
    setVideoMarginTop.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-top");
    setVideoMarginLeft.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-left");
    setVideoMarginRight.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-right");
    setVideoMarginBottom.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-bottom");
    setVideoPaddingTop.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-top");
    setVideoPaddingLeft.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-left");
    setVideoPaddingRight.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-right");
    setVideoPaddingBottom.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-bottom");
  }
  const deviceSelected = document.getElementById("headline-fontsize-device");
  document.querySelectorAll(".device-select .option").forEach((option) => {
    option.addEventListener("click", function () {
      const videoContainer = document.getElementById(selectedVideoElement);
      const videoComponent = videoContainer.firstChild;
      const device = this.getAttribute("data-value");

      // Update the font size based on device selection
      if (device === "desktop") {
        videoComponent.classList.add("active");
        videoComponent.classList.remove("mobile-view");
        videoComponent.classList.add("desktop-view");
        videoContainer.classList.add("active");
        videoContainer.classList.remove("mp-mobile-view");
        videoContainer.classList.add("mp-desktop-view");

        if (desktopWidth === "100%") {
          setVideoWidth.value = "Full Width";
        } else if (desktopWidth === "75%") {
          setVideoWidth.value = "3/4 Width";
        } else if (desktopWidth === "50%") {
          setVideoWidth.value = "Half Width";
        }
        setVideoMarginTop.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-top");
        setVideoMarginLeft.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-left");
        setVideoMarginRight.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-right");
        setVideoMarginBottom.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-bottom");
        setVideoPaddingTop.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-top");
        setVideoPaddingLeft.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-left");
        setVideoPaddingRight.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-right");
        setVideoPaddingBottom.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-bottom");
      } else if (device === "mobile") {
        videoComponent.classList.remove("active");
        videoComponent.classList.add("mobile-view");
        videoComponent.classList.remove("desktop-view");
        videoContainer.classList.remove("active");
        videoContainer.classList.add("mp-mobile-view");
        videoContainer.classList.remove("mp-desktop-view");

        if (mobileWidth === "100%") {
          setVideoWidth.value = "Full Width";
        } else if (mobileWidth === "75%") {
          setVideoWidth.value = "3/4 Width";
        } else if (mobileWidth === "50%") {
          setVideoWidth.value = "Half Width";
        }
        setVideoMarginTop.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-top");
        setVideoMarginLeft.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-left");
        setVideoMarginRight.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-right");
        setVideoMarginBottom.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-bottom");
        setVideoPaddingTop.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-top");
        setVideoPaddingLeft.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-left");
        setVideoPaddingRight.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-right");
        setVideoPaddingBottom.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-bottom");
      }
    });
  });

  let desktopWidth = getComputedStyle(videoComponent).getPropertyValue("--desktop-width");
  let mobileWidth = getComputedStyle(videoComponent).getPropertyValue("--mobile-width");
  const setVideoWidth = document.getElementById("set-video-width");
  setVideoWidth.addEventListener("change", function () {
    const videoContainer = document.getElementById(selectedVideoElement);
    const videoComponent = videoContainer.firstChild;

    const device = deviceSelected.getAttribute("data-value");
    if (device === "desktop") {
      if (setVideoWidth.value == "Full Width") {
        desktopWidth = "100%";
        videoComponent.style.setProperty("--desktop-width", "100%");
      } else if (setVideoWidth.value == "3/4 Width") {
        desktopWidth = "75%";
        videoComponent.style.setProperty("--desktop-width", "75%");
      } else if (setVideoWidth.value == "Half Width") {
        desktopWidth = "50%";
        videoComponent.style.setProperty("--desktop-width", "50%");
      }
    } else if (device === "mobile") {
      if (setVideoWidth.value == "Full Width") {
        mobileWidth = "100%";
        videoComponent.style.setProperty("--mobile-width", "100%");
      } else if (setVideoWidth.value == "3/4 Width") {
        mobileWidth = "75%";
        videoComponent.style.setProperty("--mobile-width", "75%");
      } else if (setVideoWidth.value == "Half Width") {
        mobileWidth = "50%";
        videoComponent.style.setProperty("--mobile-width", "50%");
      }
    }
  });

  // Background color setting for Image Element
  const videoBackColor = document.getElementById("video-back-color");
  const videoBackColorIcon = document.getElementById("video-back-color-icon");
  const transparentButton = document.getElementById("video-transparent-background");
  videoBackColor.style.color = videoContainer.style.backgroundColor;
  videoBackColorIcon.style.color = videoBackColor.style.color;
  const updateBackgroundColor = () => {
    const videoContainer = document.getElementById(selectedVideoElement);
    if (videoContainer.dataset.transparent === "true") {
      videoContainer.style.backgroundColor = "transparent";
    } else {
      videoContainer.style.backgroundColor = videoBackColor.value;
    }
  };
  videoBackColor.addEventListener("input", function () {
    const videoContainer = document.getElementById(selectedVideoElement);
    videoContainer.dataset.transparent = "false";
    updateBackgroundColor();
    videoBackColorIcon.style.color = videoBackColor.value;
  });
  transparentButton.addEventListener("click", function () {
    const videoContainer = document.getElementById(selectedVideoElement);
    videoContainer.dataset.transparent = "true";
    updateBackgroundColor();
    videoBackColorIcon.style.color = "white";
  });

  //Setting import Image
  const videoPath = document.getElementById("input-video-path");
  const videoElement = videoContainer.childNodes[1].childNodes[1];
  videoPath.value = videoElement.getAttribute("src");
  videoPath.addEventListener("change", function () {
    let inputUrl = videoPath.value;
    let embedUrl = "";

    if (inputUrl.includes("youtu.be/")) {
      // Handle YouTube short URL
      const videoId = inputUrl.split("youtu.be/")[1];
      embedUrl = `https://www.youtube.com/embed/${videoId}?controls=1`;
    } else if (inputUrl.includes("youtube.com/watch?v=")) {
      // Handle YouTube watch URL
      const videoId = new URL(inputUrl).searchParams.get("v");
      embedUrl = `https://www.youtube.com/embed/${videoId}?controls=1`;
    } else if (inputUrl.includes("vimeo.com/")) {
      // Handle Vimeo URL
      const videoId = inputUrl.split("vimeo.com/")[1].split("?")[0];
      embedUrl = `https://player.vimeo.com/video/${videoId}?controls=1`;
    } else {
      embedUrl = videoPath.value;
    }
    console.log(embedUrl, "embe");

    // Set the new source URL for the video
    document.getElementById(selectedVideoElement).querySelector("iframe").setAttribute("src", embedUrl);

    // var videoOverlay = document.querySelector(".video-overlay");
    // videoOverlay.style.display = "none";
  });

  //Box Shadow
  const setBoxShadow = document.getElementById("set-video-box-shadow");
  setBoxShadow.addEventListener("change", function () {
    if (setBoxShadow.value == "No Shadow") {
      document.getElementById(selectedVideoElement).style.boxShadow = "none";
    } else if (setBoxShadow.value == "5% Drop Shadow") {
      document.getElementById(selectedVideoElement).style.boxShadow = "0 1px 3px #0000000d";
    } else if (setBoxShadow.value == "10% Drop Shadow") {
      document.getElementById(selectedVideoElement).style.boxShadow = "0 1px 5px #0000001a";
    } else if (setBoxShadow.value == "20% Drop Shadow") {
      document.getElementById(selectedVideoElement).style.boxShadow = "0 1px 5px #0003";
    } else if (setBoxShadow.value == "30% Drop Shadow") {
      document.getElementById(selectedVideoElement).style.boxShadow = "0 2px 5px 2px #0000004d";
    } else if (setBoxShadow.value == "40% Drop Shadow") {
      document.getElementById(selectedVideoElement).style.boxShadow = "0 2px 5px 2px #0006";
    } else if (setBoxShadow.value == "5% Inner Shadow") {
      document.getElementById(selectedVideoElement).style.boxShadow = "0 1px 3px #0000000d inset";
    } else if (setBoxShadow.value == "10% Inner Shadow") {
      document.getElementById(selectedVideoElement).style.boxShadow = "0 1px 5px #0000001a inset";
    } else if (setBoxShadow.value == "20% Inner Shadow") {
      document.getElementById(selectedVideoElement).style.boxShadow = "0 1px 5px #0003 inset";
    } else if (setBoxShadow.value == "30% Inner Shadow") {
      document.getElementById(selectedVideoElement).style.boxShadow = "0 2px 5px 2px #0000004d inset";
    } else if (setBoxShadow.value == "40% Inner Shadow") {
      document.getElementById(selectedVideoElement).style.boxShadow = "0 2px 5px 2px #0006 inset";
    }
  });

  //Border select
  function settingVideoBorderMouseLeave() {
    if (settedVideoBorderType == "No Border") {
      document.getElementById(selectedVideoElement).style.border = "none";
    } else if (settedVideoBorderType == "full") {
      document.getElementById(selectedVideoElement).style.border = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
    } else if (settedVideoBorderType == "bottom") {
      document.getElementById(selectedVideoElement).style.border = "none";
      document.getElementById(selectedVideoElement).style.borderBottom = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
    } else if (settedVideoBorderType == "top") {
      document.getElementById(selectedVideoElement).style.border = "none";
      document.getElementById(selectedVideoElement).style.borderTop = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
    } else if (settedVideoBorderType == "top&bototm") {
      document.getElementById(selectedVideoElement).style.border = "none";
      document.getElementById(selectedVideoElement).style.borderBottom = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
      document.getElementById(selectedVideoElement).style.borderTop = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
    }
    document.getElementById(selectedVideoElement).style.borderRadius = settedRadiusValue;
    videoContainer.addEventListener("mouseleave", function () {
      if (settedVideoBorderType == "No Border") {
        document.getElementById(selectedVideoElement).style.border = "none";
      } else if (settedVideoBorderType == "full") {
        document.getElementById(selectedVideoElement).style.border = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
      } else if (settedVideoBorderType == "bottom") {
        document.getElementById(selectedVideoElement).style.border = "none";
        document.getElementById(selectedVideoElement).style.borderBottom = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
      } else if (settedVideoBorderType == "top") {
        document.getElementById(selectedVideoElement).style.border = "none";
        document.getElementById(selectedVideoElement).style.borderTop = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
      } else if (settedVideoBorderType == "top&bototm") {
        document.getElementById(selectedVideoElement).style.border = "none";
        document.getElementById(selectedVideoElement).style.borderBottom = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
        document.getElementById(selectedVideoElement).style.borderTop = `${settedVideoBorderWidth} ${settedVideoBorderStyle} ${settedVideoBorderColor}`;
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
    document.getElementById(selectedVideoElement).style.borderColor = borderColor.value;
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
      document.getElementById(selectedVideoElement).style.borderRadius = settedRadiusValue;
    } else if (borderEdge.value == "Top Only Edges") {
      document.getElementById(selectedVideoElement).style.borderRadius = `${settedRadiusValue} ${settedRadiusValue} 0 0`;
    } else if (borderEdge.value == "Bottom Only Edges") {
      document.getElementById(selectedVideoElement).style.borderRadius = `0 0 ${settedRadiusValue} ${settedRadiusValue}`;
    }
  });

  const desktopVi = document.getElementById("video-desktop");
  const mobileVi = document.getElementById("video-mobile");
  const desktopDisplay = (section) => {
    const videoContainer = document.getElementById(selectedVideoElement);
    if (desktopBtn.classList.contains("active")) {
      if (section.classList.contains("active")) {
        videoContainer.style.display = "block";
      } else {
        videoContainer.style.display = "none";
      }
    }
  };
  const mobileDisplay = (section) => {
    const videoContainer = document.getElementById(selectedVideoElement);
    if (mobileBtn.classList.contains("active")) {
      if (section.classList.contains("active")) {
        videoContainer.style.display = "block";
      } else {
        videoContainer.style.display = "none";
      }
    }
  };
  if (desktopBtn.classList.contains("active")) {
    desktopVi.addEventListener("click", () => desktopDisplay(desktopVi));
  } else {
    mobileVi.addEventListener("click", () => mobileDisplay(mobileVi));
  }
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
