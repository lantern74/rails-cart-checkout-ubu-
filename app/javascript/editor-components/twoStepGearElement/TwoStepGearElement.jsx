import React from "react";
import ReactDOM from "react-dom/client";
// import { VideoDragAndDrop } from "./VideoDragAndDrop";
import { closeAllSidebars, closeAllTextEditPopups } from "../editor_functions";

var setCombMarginTop = document.getElementById("setCombMarginTop");
var setCombMarginLeft = document.getElementById("setCombMarginLeft");
var setCombMarginRight = document.getElementById("setCombMarginRight");
var setCombMarginBottom = document.getElementById("setCombMarginBottom");
var setCombPaddingTop = document.getElementById("setCombPaddingTop");
var setCombPaddingLeft = document.getElementById("setCombPaddingLeft");
var setCombPaddingRight = document.getElementById("setCombPaddingRight");
var setCombPaddingBottom = document.getElementById("setCombPaddingBottom");

// --------------------------------------------------------------

// Settings for 2 Step Combo Element
let selectedComboElement = null;

function TwoStepGearElement(parentWrapper) {
  selectedComboElement = parentWrapper.id;

  // if (setTwoStepOrderPopup.classList.contains("open")) {
  //     closeAllSidebars();
  //     setTwoStepOrderPopup.classList.remove("open");
  // } else {
  //   closeAllTextEditPopups();
  //   closeAllSidebars();
  //   setTwoStepOrderPopup.classList.add("open");
  // }

  loadPresetComboSettings(parentWrapper.firstChild.firstChild);
}

function loadPresetComboSettings(parentContainer) {
  const firstForm = parentContainer.firstChild.childNodes[2];
  const secondForm = parentContainer.firstChild.childNodes[3];
  const combContainer = document.getElementById(selectedComboElement);
  //get margin padding value
  var editorComponentStyles = getComputedStyle(combContainer);

  if (desktopBtn.classList.contains("active")) {
    setCombMarginTop.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-top");
    setCombMarginLeft.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-left");
    setCombMarginRight.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-right");
    setCombMarginBottom.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-bottom");
    setCombPaddingTop.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-top");
    setCombPaddingLeft.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-left");
    setCombPaddingRight.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-right");
    setCombPaddingBottom.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-bottom");
  } else if (mobileBtn.classList.contains("active")) {
    setCombMarginTop.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-top");
    setCombMarginLeft.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-left");
    setCombMarginRight.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-right");
    setCombMarginBottom.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-bottom");
    setCombPaddingTop.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-top");
    setCombPaddingLeft.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-left");
    setCombPaddingRight.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-right");
    setCombPaddingBottom.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-bottom");
  }

  document.querySelectorAll(".device-select .option").forEach((option) => {
    option.addEventListener("click", function () {
      const combContainer = document.getElementById(selectedComboElement);
      const device = this.getAttribute("data-value");

      // Update the font size based on device selection
      if (device === "desktop") {
        // combContainer.classList.add("active");
        // combContainer.classList.remove("mobile-view");
        // combContainer.classList.add("desktop-view");
        combContainer.classList.add("active");
        combContainer.classList.remove("mp-mobile-view");
        combContainer.classList.add("mp-desktop-view");

        // combContainer.style.setProperty("--desktop-text-align", desktopTextAlign);
        // document.querySelectorAll(".align-button").forEach((button) => {
        //   button.classList.remove("selected-button");
        //   if (button.querySelector("i").classList.contains(`bi-text-${desktopTextAlign}`)) {
        //     button.classList.add("selected-button");
        //   } else if (button.querySelector("i").classList.contains(`bi-${desktopTextAlign}`)) {
        //     button.classList.add("selected-button");
        //   }
        // });
        setCombMarginTop.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-top");
        setCombMarginLeft.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-left");
        setCombMarginRight.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-right");
        setCombMarginBottom.innerText = editorComponentStyles.getPropertyValue("--desktop-margin-bottom");
        setCombPaddingTop.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-top");
        setCombPaddingLeft.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-left");
        setCombPaddingRight.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-right");
        setCombPaddingBottom.innerText = editorComponentStyles.getPropertyValue("--desktop-padding-bottom");
      } else if (device === "mobile") {
        // combContainer.classList.remove("active");
        // combContainer.classList.add("mobile-view");
        // combContainer.classList.remove("desktop-view");
        combContainer.classList.remove("active");
        combContainer.classList.add("mp-mobile-view");
        combContainer.classList.remove("mp-desktop-view");

        // combContainer.style.setProperty("--mobile-text-align", mobileTextAlign);
        // document.querySelectorAll(".align-button").forEach((button) => {
        //   button.classList.remove("selected-button");
        //   if (button.querySelector("i").classList.contains(`bi-text-${mobileTextAlign}`)) {
        //     button.classList.add("selected-button");
        //   } else if (button.querySelector("i").classList.contains(`bi-${mobileTextAlign}`)) {
        //     button.classList.add("selected-button");
        //   }
        // });
        setCombMarginTop.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-top");
        setCombMarginLeft.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-left");
        setCombMarginRight.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-right");
        setCombMarginBottom.innerText = editorComponentStyles.getPropertyValue("--mobile-margin-bottom");
        setCombPaddingTop.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-top");
        setCombPaddingLeft.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-left");
        setCombPaddingRight.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-right");
        setCombPaddingBottom.innerText = editorComponentStyles.getPropertyValue("--mobile-padding-bottom");
      }
    });
  });
  // Add event listener for 2-step advanced setting tabs
  const step1Tab = document.getElementById("step1-tab");
  const step2Tab = document.getElementById("step2-tab");
  const eyeIcon1 = document.getElementById("eye-icon1");
  const eyeIcon2 = document.getElementById("eye-icon2");
  step1Content = document.getElementById("step1-content");
  step2Content = document.getElementById("step2-content");
  if (firstForm.classList.contains("hidden")) {
    step1Tab.classList.remove("step-active");
    step2Tab.classList.add("step-active");
    eyeIcon1.classList.remove("bi-eye");
    eyeIcon1.classList.add("bi-eye-slash");
    eyeIcon2.classList.remove("bi-eye-slash");
    eyeIcon2.classList.add("bi-eye");
  } else if (secondForm.classList.contains("hidden")) {
    step1Tab.classList.add("step-active");
    step2Tab.classList.remove("step-active");
    eyeIcon1.classList.remove("bi-eye-slash");
    eyeIcon1.classList.add("bi-eye");
    eyeIcon2.classList.remove("bi-eye");
    eyeIcon2.classList.add("bi-eye-slash");
  }
  step1Tab.addEventListener("click", function () {
    step1Tab.classList.add("step-active");
    step2Tab.classList.remove("step-active");
    eyeIcon1.classList.remove("bi-eye-slash");
    eyeIcon1.classList.add("bi-eye");
    eyeIcon2.classList.remove("bi-eye");
    eyeIcon2.classList.add("bi-eye-slash");
    showForm(parentContainer.firstChild, firstForm.id);
    step1Content.classList.add("active");
    step2Content.classList.remove("active");
  });
  step2Tab.addEventListener("click", function () {
    step1Tab.classList.remove("step-active");
    step2Tab.classList.add("step-active");
    eyeIcon1.classList.remove("bi-eye");
    eyeIcon1.classList.add("bi-eye-slash");
    eyeIcon2.classList.remove("bi-eye-slash");
    eyeIcon2.classList.add("bi-eye");
    showForm(parentContainer.firstChild, secondForm.id);
    step1Content.classList.remove("active");
    step2Content.classList.add("active");
  });
  // set step1 container text
  //TODO:to change/add new one here #1 - page 1  - this is the input in the SIDEBAR  that'll change the form field
  const step1headline = document.getElementById("step1-headline");
  const step1subheadline = document.getElementById("step1-subheadline");
  const step1ToggleCompany = document.getElementById("toggle-company");
  const step1Company = document.getElementById("step1-company-name");
  const step1Name = document.getElementById("step1-fullname");
  const step1Email = document.getElementById("step1-email");
  const step1TogglePhone = document.getElementById("toggle-phone");
  const step1Phone = document.getElementById("step1-phone");
  const step1Address = document.getElementById("step1-address");
  const step1City = document.getElementById("step1-city");
  const step1State = document.getElementById("step1-state");
  const step1Zip = document.getElementById("step1-zip");
  const step1Button = document.getElementById("step1-button");
  const step1ButtonSub = document.getElementById("step1-button-sub");
  //TODO:to change/add new one here #2 - page 1 - this is the input in the FORM on the show page
  const formComboStep1Headline = document.getElementsByClassName("form-heading")[0];
  const formComboStep1Subheadline = document.getElementsByClassName("form-sub-heading")[0];
  const formComboCompany = document.getElementsByName("companyname...")[0];
  const formComboName = document.getElementsByName("fullname...")[0];
  const formComboEmail = document.getElementsByName("emailaddress...")[0];
  const formComboPhone = document.getElementsByName("phonenumber...")[0];
  const formComboShipping = document.getElementsByClassName("shipping")[0];
  const formComboAddress = document.getElementsByName("fulladdress...")[0];
  const formComboCity = document.getElementsByName("cityname...")[0];
  const formComboState = document.getElementsByName("state/province...")[0];
  const formComboZip = document.getElementsByName("zipcode...")[0];
  const formComboButton = document.getElementsByClassName("main-text")[0];
  const formComboButtonSub = document.getElementsByClassName("sub-text")[0];
  //TODO:to change/add new one here #3 - page 1 - this is where the functions happen
  //^ hide feilds
  const step1ToggleCompanyName = document.getElementById("step1-toggle-company-name");
  step1ToggleCompanyName.addEventListener("change", function () {
    if (step1ToggleCompanyName.value === "Hide Company Name") {
      formComboCompany.style.display = "none";
      step1ToggleCompany.style.display = "none";
    } else {
      formComboCompany.style.display = "block";
      step1ToggleCompany.style.display = "block";
    }
  });
  const step1TogglePhoneNumber = document.getElementById("step1-toggle-phone");
  step1TogglePhoneNumber.addEventListener("change", function () {
    if (step1TogglePhoneNumber.value === "Hide Phone Number") {
      formComboPhone.style.display = "none";
      step1TogglePhone.style.display = "none";
    } else {
      formComboPhone.style.display = "block";
      step1TogglePhone.style.display = "block";
    }
  });
  const step1ToggleShippingControl = document.getElementById("step1-toggle-shipping");
  if (formComboShipping.style.display === "none") {
    step1ToggleShippingControl.value = "Hide Shipping";
  } else {
    step1ToggleShippingControl.value = "Show Shipping";
  }
  step1ToggleShippingControl.addEventListener("change", function () {
    if (step1ToggleShippingControl.value === "Hide Shipping") {
      formComboShipping.style.display = "none";
    } else {
      formComboShipping.style.display = "block";
    }
  });
  step1headline.value = formComboStep1Headline.innerText;
  step1headline.addEventListener("input", function () {
    formComboStep1Headline.innerText = step1headline.value;
  });
  step1subheadline.value = formComboStep1Subheadline.innerText;
  step1subheadline.addEventListener("input", function () {
    formComboStep1Subheadline.innerText = step1subheadline.value;
  });
  step1Company.value = formComboCompany.value;
  step1Company.addEventListener("input", function () {
    formComboCompany.value = step1Company.value;
  });
  step1Name.value = formComboName.value;
  step1Name.addEventListener("input", function () {
    formComboName.value = step1Name.value;
  });
  step1Email.value = formComboEmail.value;
  step1Email.addEventListener("input", function () {
    formComboEmail.value = step1Email.value;
  });
  step1Phone.value = formComboPhone.value;
  step1Phone.addEventListener("input", function () {
    formComboPhone.value = step1Phone.value;
  });
  step1Address.value = formComboAddress.value;
  step1Address.addEventListener("input", function () {
    formComboAddress.value = step1Address.value;
  });
  step1City.value = formComboCity.value;
  step1City.addEventListener("input", function () {
    formComboCity.value = step1City.value;
  });
  step1State.value = formComboState.value;
  step1State.addEventListener("input", function () {
    formComboState.value = step1State.value;
  });
  step1Zip.value = formComboZip.value;
  step1Zip.addEventListener("input", function () {
    formComboZip.value = step1Zip.value;
  });
  step1Button.value = formComboButton.innerText;
  step1Button.addEventListener("input", function () {
    formComboButton.innerText = step1Button.value;
  });
  step1ButtonSub.value = formComboButtonSub.innerText;
  step1ButtonSub.addEventListener("input", function () {
    formComboButtonSub.innerText = step1ButtonSub.value;
  });
  // set step2 container text
  //TODO: to change/add new one here #1 - page 2
  const step2headline = document.getElementById("step2-headline");
  const step2subheadline = document.getElementById("step2-subheadline");
  const step2SelectItem = document.getElementById("step2-select-item");
  const step2SelectPrice = document.getElementById("step2-select-price");
  const step2SummaryItem = document.getElementById("step2-summary-item");
  const step2SummaryPrice = document.getElementById("step2-summary-price");
  const step2Button = document.getElementById("step2-button");
  const step2ButtonSub = document.getElementById("step2-button-sub");
  //TODO: to change/add new one here #2 - page 2
  const combstep2headline = document.getElementsByClassName("form-heading")[1];
  const combstep2Subheadline = document.getElementsByClassName("form-sub-heading")[1];
  const combselectItem = document.getElementsByClassName("product-detail")[0].childNodes[0].firstElementChild;
  const combselectPrice = combselectItem.nextElementSibling.nextElementSibling;
  const combsummaryItem = document.getElementsByClassName("product-cost-total")[0].firstElementChild.firstElementChild;
  const combsummarytPrice = combsummaryItem.nextElementSibling.nextElementSibling;
  const combstep2Button = document.getElementsByClassName("main-text")[1];
  const combstep2ButtonSub = document.getElementsByClassName("sub-text")[1];
  //TODO: to change/add new one here #3 - page 2
  step2headline.value = combstep2headline.innerText;
  step2headline.addEventListener("input", function () {
    combstep2headline.innerText = step2headline.value;
  });
  step2subheadline.value = combstep2Subheadline.innerText;
  step2subheadline.addEventListener("input", function () {
    combstep2Subheadline.innerText = step2subheadline.value;
  });
  step2SelectItem.value = combselectItem.innerText;
  step2SelectItem.addEventListener("input", function () {
    combselectItem.innerText = step2SelectItem.value;
  });
  step2SelectPrice.value = combselectPrice.innerText;
  step2SelectPrice.addEventListener("input", function () {
    combselectPrice.innerText = step2SelectPrice.value;
  });
  step2SummaryItem.value = combsummaryItem.innerText;
  step2SummaryItem.addEventListener("input", function () {
    combsummaryItem.innerText = step2SummaryItem.value;
  });
  step2SummaryPrice.value = combsummarytPrice.innerText;
  step2SummaryPrice.addEventListener("input", function () {
    combsummarytPrice.innerText = step2SummaryPrice.value;
  });
  step2Button.value = combstep2Button.innerText;
  step2Button.addEventListener("input", function () {
    combstep2Button.innerText = step2Button.value;
  });
  step2ButtonSub.value = combstep2ButtonSub.innerText;
  step2ButtonSub.addEventListener("input", function () {
    combstep2ButtonSub.innerText = step2ButtonSub.value;
  });
  //^ Color pickers & Button Text & Input Background
  //* Button background color
  const btnBackColor = document.getElementById("comb-btn-back-color"); // this is @ sidebar
  const btnBackColorIcon = document.getElementById("comb-btn-back-color-icon"); // this is a color circle @ sidebar
  const formComboButtonBg = document.getElementsByClassName("main-text")[0].parentNode; // this is @ the HTML edited file
  const formComboButtonBg2 = document.getElementsByClassName("main-text")[1].parentNode; // this is @ the HTML edited file
  btnBackColorIcon.style.color = formComboButtonBg.style.backgroundColor; // load the text color from the edited file to the sidebar
  btnBackColor.addEventListener("input", function () {
    btnBackColorIcon.style.color = btnBackColor.value;
    formComboButtonBg.style.backgroundColor = btnBackColor.value; //btn #1 @ edited HTML file
    formComboButtonBg2.style.backgroundColor = btnBackColor.value; //btn #2 @ edited HTML file
  });
  //* Button text color
  const btnTxtColor = document.getElementById("comb-btn-txt-color"); // this is @ sidebar
  const btnTxtColorIcon = document.getElementById("comb-btn-txt-color-icon"); // this is a color circle @ sidebar
  btnTxtColorIcon.style.color = formComboButtonBg.style.color; // load the text color from the edited file to the sidebar
  btnTxtColor.addEventListener("input", function () {
    btnTxtColorIcon.style.color = btnTxtColor.value; // this is @ the HTML edited file
    formComboButtonBg.style.color = btnTxtColor.value; // this is @ the HTML edited file
    formComboButtonBg2.style.color = btnTxtColor.value; // this is @ the HTML edited file
  });
  //* background color
  const combBackColor = document.getElementById("comb-back-color");
  const combBackColorIcon = document.getElementById("comb-back-color-icon");
  const transparentButton = document.getElementById("comb-transparent-background");
  const combField = combContainer.childNodes[0];
  combBackColor.style.color = combField.style.backgroundColor;
  combBackColorIcon.style.color = combBackColor.style.color;
  const updateBackgroundColor = () => {
    const combField = document.getElementById(selectedComboElement).childNodes[0];
    if (combField.dataset.transparent === "true") {
      // Set the background color to transparent
      combField.style.backgroundColor = "transparent";
    } else {
      // Set the background color to the chosen color
      combField.style.backgroundColor = combBackColor.value;
    }
  };
  // Event listener for color input
  combBackColor.addEventListener("input", function () {
    const combField = document.getElementById(selectedComboElement).childNodes[0];
    combField.dataset.transparent = "false";
    updateBackgroundColor();
    combBackColorIcon.style.color = combBackColor.value;
  });
  // Event listener for the transparent button
  transparentButton.addEventListener("click", function () {
    const combField = document.getElementById(selectedComboElement).childNodes[0];
    combField.dataset.transparent = "true";
    updateBackgroundColor();
    combBackColorIcon.style.color = "white";
  });
  function settingCombBorderMouseLeave() {
    if (settedCombeBorderType == "No Border") {
      combContainer.style.border = "none";
    } else if (settedCombeBorderType == "full") {
      combContainer.style.border = `${settedCombeBorderWidth} ${settedCombeBorderStyle} ${settedCombeBorderColor}`;
    } else if (settedCombeBorderType == "bottom") {
      combContainer.style.border = "none";
      combContainer.style.borderBottom = `${settedCombeBorderWidth} ${settedCombeBorderStyle} ${settedCombeBorderColor}`;
    } else if (settedCombeBorderType == "top") {
      combContainer.style.border = "none";
      combContainer.style.borderTop = `${settedCombeBorderWidth} ${settedCombeBorderStyle} ${settedCombeBorderColor}`;
    } else if (settedCombeBorderType == "top&bototm") {
      combContainer.style.border = "none";
      combContainer.style.borderBottom = `${settedCombeBorderWidth} ${settedCombeBorderStyle} ${settedCombeBorderColor}`;
      combContainer.style.borderTop = `${settedCombeBorderWidth} ${settedCombeBorderStyle} ${settedCombeBorderColor}`;
    }
    combContainer.style.borderRadius = settedRadiusValue;
    combContainer.addEventListener("mouseleave", function () {
      if (settedCombeBorderType == "No Border") {
        combContainer.style.border = "none";
      } else if (settedCombeBorderType == "full") {
        combContainer.style.border = `${settedCombeBorderWidth} ${settedCombeBorderStyle} ${settedCombeBorderColor}`;
      } else if (settedCombeBorderType == "bottom") {
        combContainer.style.border = "none";
        combContainer.style.borderBottom = `${settedCombeBorderWidth} ${settedCombeBorderStyle} ${settedCombeBorderColor}`;
      } else if (settedCombeBorderType == "top") {
        combContainer.style.border = "none";
        combContainer.style.borderTop = `${settedCombeBorderWidth} ${settedCombeBorderStyle} ${settedCombeBorderColor}`;
      } else if (settedCombeBorderType == "top&bototm") {
        combContainer.style.border = "none";
        combContainer.style.borderBottom = `${settedCombeBorderWidth} ${settedCombeBorderStyle} ${settedCombeBorderColor}`;
        combContainer.style.borderTop = `${settedCombeBorderWidth} ${settedCombeBorderStyle} ${settedCombeBorderColor}`;
      }
    });
  }
  //Border select
  var settedCombeBorderType;
  const borderSelect = document.getElementById("setting-comb-border-select");
  borderSelect.addEventListener("change", function () {
    settedCombeBorderType = borderSelect.value;
    settingCombBorderMouseLeave();
    if (borderSelect.value != "No Border") {
      document.getElementById("comb-border-setting").style.display = "block";
    } else {
      document.getElementById("comb-border-setting").style.display = "none";
    }
  });
  //set border style
  var settedCombeBorderStyle = "solid";
  const borderStyle = document.getElementById("setting-comb-border-style");
  borderStyle.addEventListener("change", function () {
    settedCombeBorderStyle = borderStyle.value;
    settingCombBorderMouseLeave();
  });
  //set border width
  var settedCombeBorderWidth = "3px";
  const borderWidth = document.getElementById("setting-comb-border-width");
  borderWidth.addEventListener("change", function () {
    settedCombeBorderWidth = borderWidth.value;
    settingCombBorderMouseLeave();
  });
  //set border color
  var settedCombeBorderColor = "#333";
  const borderColor = document.getElementById("comb-border-color");
  const borderColorIcon = document.getElementById("comb-border-color-icon");
  borderColor.style.color = combContainer.style.borderColor;
  borderColorIcon.style.color = combContainer.style.borderColor;
  borderColor.addEventListener("input", function () {
    borderColorIcon.style.color = borderColor.value;
    combContainer.style.borderColor = borderColor.value;
    settedCombeBorderColor = borderColor.value;
  });
  //set border radius
  var settedRadiusValue = "0px";
  const borderRadius = document.getElementById("setting-comb-border-radius");
  borderRadius.addEventListener("change", function () {
    settedRadiusValue = borderRadius.value;
    settingCombBorderMouseLeave();
  });
  //set border edge
  const borderEdge = document.getElementById("setting-comb-edge");
  borderEdge.addEventListener("change", function () {
    if (borderEdge.value == "All Edges") {
      combContainer.style.borderRadius = settedRadiusValue;
    } else if (borderEdge.value == "Top Only Edges") {
      combContainer.style.borderRadius = `${settedRadiusValue} ${settedRadiusValue} 0 0`;
    } else if (borderEdge.value == "Bottom Only Edges") {
      combContainer.style.borderRadius = `0 0 ${settedRadiusValue} ${settedRadiusValue}`;
    }
  });

  const desktopVi = document.getElementById("comb-desktop");
  const mobileVi = document.getElementById("comb-mobile");
  const desktopDisplay = (section) => {
    const combContainer = document.getElementById(selectedComboElement);
    if (desktopBtn.classList.contains("active")) {
      if (section.classList.contains("active")) {
        combContainer.style.display = "block";
      } else {
        combContainer.style.display = "none";
      }
    }
  };
  const mobileDisplay = (section) => {
    const combContainer = document.getElementById(selectedComboElement);
    if (mobileBtn.classList.contains("active")) {
      if (section.classList.contains("active")) {
        combContainer.style.display = "block";
      } else {
        combContainer.style.display = "none";
      }
    }
  };
  if (desktopBtn.classList.contains("active")) {
    desktopVi.addEventListener("click", () => desktopDisplay(desktopVi));
  } else {
    mobileVi.addEventListener("click", () => mobileDisplay(mobileVi));
  }
}

function showForm(form, formId) {
  document.getElementById(form.childNodes[2].id).classList.add("hidden");
  document.getElementById(form.childNodes[3].id).classList.add("hidden");
  const currentForm = document.getElementById(formId);
  if (currentForm) {
    currentForm.classList.remove("hidden");
  }
}

// Add event listener for 2-step combo setting tabs
const generalTab = document.getElementById("general-tab");
const generalContent = document.getElementById("general-content");
const advancedTab = document.getElementById("advanced-tab");
const advancedContent = document.getElementById("advanced-content");
generalTab.addEventListener("click", function () {
  generalContent.classList.add("active");
  generalTab.classList.add("active");
  advancedContent.classList.remove("active");
  advancedTab.classList.remove("active");
});
advancedTab.addEventListener("click", function () {
  generalContent.classList.remove("active");
  generalTab.classList.remove("active");
  advancedContent.classList.add("active");
  advancedTab.classList.add("active");
});
// Close popups when click close button

const comboSettingClose = document.getElementById("combo-close");
comboSettingClose.addEventListener("click", function () {
  selectedComboElement = null;
  setTwoStepOrderPopup.classList.remove("open");
});

// export the currentSelectedComboElement that has the right value

const currentSelectedComboElement = (args) => {
  if (args) {
    selectedComboElement = args;
  }
  return selectedComboElement;
};

export { TwoStepGearElement, selectedComboElement, currentSelectedComboElement, showForm };
