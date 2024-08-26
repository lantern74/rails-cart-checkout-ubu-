import React from "react";
import ReactDOM from "react-dom/client";
import {
  closeAllSidebars,
  closeAllTextEditPopups,
  moveUp,
  moveDown,
  removeElement,
} from "../editor_functions";
import { OrangeGearElement } from "../orangeGearElement/OrangeGearElement";
import {
  addYellowElementButton,
  elementControl,
  editTextControl,
  openAddElementPopup,
  closeElementsPanel,
  currentChosenField,
} from "../addElement/AddElement";

function createTextElement(type) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("draggable", "de", "ui-droppable", "de-editable");
  wrapper.setAttribute("id", `${type}-${Date.now()}`);
  wrapper.setAttribute("data-de-type", type);
  wrapper.setAttribute("data-de-editing", "false");
  wrapper.setAttribute("data-title", type);
  wrapper.setAttribute("data-ce", "true");
  wrapper.setAttribute("data-trigger", "none");
  wrapper.setAttribute("data-animate", "fade");
  wrapper.setAttribute("data-delay", "500");
  wrapper.style.outline = "none";
  wrapper.style.cursor = "pointer";
  wrapper.style.padding = "0";
  wrapper.style.backgroundColor = "transparent";
  wrapper.setAttribute("aria-disabled", "false");
  wrapper.setAttribute("draggable", true);

  const contentElement = document.createElement(
    type === "paragraph-field" ? "p" : type === "subhead-field" ? "h3" : "h1"
  );

  contentElement.classList.add(
    "ne",
    type === "headline-field"
      ? "elHeadline"
      : type === "subhead-field"
      ? "elSubHeadline"
      : "elText",
    "lh4",
    "elMargin0",
    "elBGStyle0",
    "hsTextShadow0"
  );

  contentElement.style.fontSize = {
    "headline-field": "36px",
    "subhead-field": "28px",
    "paragraph-field": "20px",
  }[type];

  contentElement.style.textAlign =
    type === "headline-field" || type === "subhead-field" ? "center" : "";

  //contentElement.style.fontWeight = type === "headline-field" ? "bold" : "";

  contentElement.dataset.gramm = "false";
  let textContent = {
    "headline-field": "How To [GOOD] Without [BAD]",
    "subhead-field": "FREE: Brand New On-Demand Class Reveals ...",
    "paragraph-field": "This Class Is Available Instantly ...No Waiting.",
  }[type];

  // If type is 'headline-field', wrap the textContent inside <b> tags
  if (type === "headline-field") {
    const boldElement = document.createElement("b");
    boldElement.innerHTML = textContent; // Use innerHTML as it can interpret the string as HTML
    contentElement.appendChild(boldElement);
  } else {
    contentElement.textContent = textContent; // Use textContent for other types
  }

  contentElement.setAttribute("id", `field-${Date.now()}`);
  contentElement.setAttribute("placeholder", type.replace("-field", " Text"));
  contentElement.setAttribute("contenteditable", "true");

  wrapper.appendChild(contentElement);
  elementControl(wrapper); //here the problem

  editTextControl(wrapper);

  return wrapper;
}

function createImageElement() {
  const imageWrapper = document.createElement("div");
  imageWrapper.classList.add(
    "draggable",
    "de",
    "elSubHeadlineWrapper",
    "ui-droppable",
    "de-editable"
  );
  imageWrapper.setAttribute("id", `image-${Date.now()}`);
  imageWrapper.setAttribute("data-de-type", "image");
  imageWrapper.setAttribute("data-de-editing", "false");
  imageWrapper.setAttribute("data-title", "image");
  imageWrapper.setAttribute("data-ce", "true");
  imageWrapper.setAttribute("data-trigger", "none");
  imageWrapper.setAttribute("data-animate", "fade");
  imageWrapper.setAttribute("data-delay", "500");
  imageWrapper.style.outline = "none";
  imageWrapper.style.cursor = "pointer";
  imageWrapper.style.textAlign = "center";
  imageWrapper.setAttribute("aria-disabled", "false");
  imageWrapper.setAttribute("draggable", true);
  imageWrapper.innerHTML = `<img data-v-21a2eb52="" src="https://storage.googleapis.com/preview-production-assets/funnel/img/img_400x300.png" alt="broken image..." class="img-none img-border-none img-shadow-none img-effects-none" style = "width:100%">`;
  elementControl(imageWrapper);
  return imageWrapper;
}
function createVideoElement() {
  const videoWrapper = document.createElement("div");
  videoWrapper.classList.add(
    "draggable",
    "de",
    "elSubHeadlineWrapper",
    "ui-droppable",
    "de-editable"
  );
  videoWrapper.setAttribute("id", `video-${Date.now()}`);
  videoWrapper.setAttribute("data-de-type", "video");
  videoWrapper.setAttribute("data-de-editing", "false");
  videoWrapper.setAttribute("data-title", "video");
  videoWrapper.setAttribute("data-ce", "true");
  videoWrapper.setAttribute("data-trigger", "none");
  videoWrapper.setAttribute("data-animate", "fade");
  videoWrapper.setAttribute("data-delay", "500");
  videoWrapper.style.outline = "none";
  videoWrapper.style.cursor = "upset";
  videoWrapper.style.margin = "auto";
  videoWrapper.setAttribute("aria-disabled", "false");
  videoWrapper.setAttribute("draggable", true);

  videoWrapper.innerHTML = `
  <div class="video-container">
  <iframe class="video-frame" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
  <div class="video-overlay"></div>
  </div>
  `;

  elementControl(videoWrapper);
  return videoWrapper;
}

function createListElement() {
  const listWrapper = document.createElement("div");
  listWrapper.classList.add(
    "draggable",
    "de",
    "elSubHeadlineWrapper",
    "ui-droppable",
    "de-editable"
  );
  listWrapper.setAttribute("id", `list-${Date.now()}`);
  listWrapper.setAttribute("data-de-type", "Bullet List");
  listWrapper.setAttribute("data-de-editing", "false");
  listWrapper.setAttribute("data-title", "list");
  listWrapper.setAttribute("data-ce", "true");
  listWrapper.setAttribute("data-trigger", "none");
  listWrapper.setAttribute("data-animate", "fade");
  listWrapper.setAttribute("data-delay", "500");
  listWrapper.style.outline = "none";
  listWrapper.style.cursor = "pointer";
  listWrapper.setAttribute("aria-disabled", "false");
  listWrapper.setAttribute("draggable", true);

  const listWrapperElement = document.createElement("ul");
  listWrapperElement.setAttribute("id", `listUL-${Date.now()}`);
  listWrapperElement.classList.add("elBullet");
  listWrapperElement.style.listStyleType = "none";
  listWrapperElement.style.paddingLeft = "0";
  listWrapperElement.style.fontSize = "20px";

  // Create and append the initial list item
  const listWrapperElementLi = createListItem("Bullet List");
  listWrapperElement.appendChild(listWrapperElementLi);
  listWrapper.appendChild(listWrapperElement);

  // Attach event listener to handle Enter and Backspace keys
  listWrapperElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();

      // Create and insert a new list item after the currently focused one
      const activeElement = document.activeElement;
      if (activeElement.tagName === "LI") {
        const iconClass = activeElement.querySelector("i").className; // Get the icon class
        const newItem = createListItem("", iconClass); // Pass the icon class to createListItem
        listWrapperElement.insertBefore(newItem, activeElement.nextSibling);

        // Move the cursor to the position after the icon in the new item
        moveCursorAfterIcon(newItem);

        // Focus on the new item
        newItem.focus();
      }
    } else if (event.key === "Backspace") {
      const activeElement = document.activeElement;
      if (
        activeElement.tagName === "LI" &&
        activeElement.innerText.trim() === ""
      ) {
        event.preventDefault();
        const prevElement = activeElement.previousElementSibling;
        if (prevElement) {
          activeElement.remove();
          prevElement.focus();
        } else {
          activeElement.remove();
        }
      }
    }
  });

  elementControl(listWrapper);
  editTextControl(listWrapper);
  return listWrapper;
}

// Helper function to create a list item
function createListItem(text, iconClass = "bi bi-check") {
  // Default icon class
  const listItem = document.createElement("li");
  listItem.classList.add(
    "ne",
    "elText",
    "hsSize3",
    "lh4",
    "elMargin0",
    "elBGStyle0",
    "hsTextShadow0"
  );
  listItem.dataset.bold = "inherit";
  listItem.dataset.gramm = "false";
  listItem.innerHTML = `<i class='${iconClass}' style="padding-right: 10px"></i>${text} &nbsp;`; // Use the passed icon class
  listItem.setAttribute("contenteditable", "true");
  listItem.style.display = "flex";

  return listItem;
}

// Helper function to move the cursor after the check icon
function moveCursorAfterIcon(listItem) {
  const selection = window.getSelection();
  const range = document.createRange();
  const icon = listItem.querySelector("i");
  if (icon) {
    // Position the cursor after the icon element
    range.setStartAfter(icon);
    range.collapse(true);
  } else {
    // Fallback in case the icon is not found
    range.setStart(listItem, 0);
    range.collapse(true);
  }
  selection.removeAllRanges();
  selection.addRange(range);
}

function createButtonElement() {
  // Create the outer container
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add(
    "draggable",
    "de",
    "elBTN",
    "de-editable",
    "elAlign_center",
    "elMargin0"
  );
  buttonContainer.id = `tmp_button-${Date.now()}`;
  buttonContainer.dataset.deType = "button";
  buttonContainer.dataset.deEditing = "false";
  buttonContainer.dataset.title = "button";
  buttonContainer.dataset.ce = "false";
  buttonContainer.dataset.trigger = "none";
  buttonContainer.dataset.animate = "fade";
  buttonContainer.dataset.delay = "500";
  buttonContainer.style.outline = "none";
  buttonContainer.style.textAlign = "center";
  buttonContainer.addEventListener("click", function (event) {
    getButtonContainerId(this);
  });
  // buttonContainer.style.margin = '20px 30px';

  // Create the <a> element
  const linkElement = document.createElement("a");
  linkElement.href = "#submit-form";
  linkElement.id = `the_button-${Date.now()}`;
  linkElement.classList.add(
    "elSettings",
    "elButton",
    "elButtonSize1",
    "elButtonColor1",
    "elButtonRounded",
    "elButtonPadding2",
    "elBtnVP_10",
    "elButtonCorner3",
    "elButtonFluid",
    "elBtnHP_25",
    "elBTN_b_1",
    "elButtonShadowN1",
    "elButtonTxtColor1"
  );
  linkElement.style.color = "rgb(255, 255, 255)";
  linkElement.style.fontWeight = "600";
  linkElement.style.backgroundColor = "#ff0000";
  linkElement.style.fontSize = "20px";
  linkElement.rel = "noopener noreferrer";

  // Create the main and sub spans
  const mainSpan = document.createElement("span");
  mainSpan.classList.add("elButtonMain");
  mainSpan.textContent = "Let Me In!";

  const subSpan = document.createElement("span");
  subSpan.classList.add("elButtonSub");

  // Append the main and sub spans to the <a> element
  linkElement.appendChild(mainSpan);
  linkElement.appendChild(subSpan);

  // Append the <a> element to the button container
  buttonContainer.appendChild(linkElement);

  // Add rollover tools for the button (you should complete this part)

  // Set the draggable attribute
  elementToInsert = buttonContainer;
  elementToInsert.setAttribute("draggable", true);
  elementControl(buttonContainer);
  return buttonContainer;
}
function createCountdownElement() {
  const currentDate = new Date();
  const futureDate = new Date();

  futureDate.setDate(currentDate.getDate() + 1); // Add 1 day
  futureDate.setHours(currentDate.getHours() + 12); // Add 11 hours

  // Construct the targetDateStr with the desired format, including hours, minutes, and seconds
  const targetDateStr = `${futureDate.getFullYear()}-${(
    futureDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${futureDate
    .getDate()
    .toString()
    .padStart(2, "0")}T${futureDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${futureDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${futureDate.getSeconds().toString().padStart(2, "0")}`;

  const targetDate = new Date(targetDateStr);
  const targetStamp = targetDate.getTime();

  const containercountdownWrapper = document.createElement("div");
  containercountdownWrapper.classList.add(
    "container-fluid",
    "draggable",
    "de",
    "elCountdownWrapper",
    "ui-droppable",
    "de-editable"
  );
  containercountdownWrapper.setAttribute("data-de-type", "CountDown");

  const countdownWrapper = document.createElement("div");
  countdownWrapper.classList.add("row", "no-gutters");
  countdownWrapper.setAttribute("id", `field-${Date.now()}`);
  // countdownWrapper.style.margin = 0;
  countdownWrapper.style.backgroundColor = "red";
  countdownWrapper.style.color = "yellow";
  countdownWrapper.style.display = "flex"; // Enable Flexbox
  countdownWrapper.style.alignItems = "center"; // Center content vertically

  const leftColumn = document.createElement("div");
  // leftColumn.classList.add('col-md-9');
  leftColumn.classList.add("col-md-8", "d-none", "d-md-block"); // Hide on iPhones, show on medium and larger screens

  const textLeft = document.createElement("div");
  textLeft.classList.add("text-left");

  function getFormattedDate(date) {
    const options = {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
      timeZone: "America/New_York",
      // timeZone: 'Europe/Vienna'
    };
    return date.toLocaleString("en-US", options);
  }

  const heading = document.createElement("div");
  // heading.style.fontSize = '24px'; // Set font size
  heading.style.fontSize = "1.6vw"; // 3% of the viewport width

  heading.style.fontWeight = "600"; // Set font weight
  heading.style.letterSpacing = "letter-spacing: -0.5px;"; // Set letter spacing
  heading.style.fontFamily = "Nunito Sans, sans-serif"; // Set font family
  heading.style.paddingLeft = "20px";
  const formattedTargetDateMessage = `Hurry! This special offer is available until ${getFormattedDate(
    currentDate
  )}`;
  heading.textContent = formattedTargetDateMessage;

  textLeft.appendChild(heading);
  // textLeft.appendChild(paragraph);
  leftColumn.appendChild(textLeft);

  const rightColumn = document.createElement("div");
  // rightColumn.classList.add('col-md-3');
  rightColumn.classList.add("col-12", "col-md-4"); // Span full width on small screens, and col-3 on medium and larger screens

  const countdownDiv = document.createElement("div");
  countdownDiv.classList.add(
    "de",
    "elCountdown",
    "de-editable",
    "elAlign_center",
    "elMargin0"
  );
  countdownDiv.setAttribute("id", `countdown-${Date.now()}`);
  countdownDiv.setAttribute("data-de-type", "countdown");
  countdownDiv.setAttribute("data-de-editing", "false");
  countdownDiv.setAttribute("data-title", "Date Countdown 2.0");
  countdownDiv.setAttribute("data-ce", "false");
  countdownDiv.setAttribute("data-trigger", "none");
  countdownDiv.setAttribute("data-animate", "fade");
  countdownDiv.setAttribute("data-delay", "500");
  countdownDiv.style.outline = "none";
  countdownDiv.style.backgroundColor = "red";
  countdownDiv.style.color = "yellow";
  countdownDiv.style.border = "0px none";

  const countdownElement = document.createElement("div");
  countdownElement.classList.add(
    "realcountdown",
    "wideCountdownSize2",
    "cdBlack",
    "cdStyleTextOnly",
    "clearfix",
    "hide"
  );

  countdownElement.setAttribute("data-date", targetDateStr);
  countdownElement.setAttribute("data-time", targetStamp);
  countdownElement.setAttribute("data-tz", "America/New_York");
  // countdownElement.setAttribute('data-tz', 'Europe/Vienna');
  countdownElement.setAttribute("data-url", "#");
  countdownElement.setAttribute("data-lang", "eng");
  countdownElement.textContent = "";

  const countdownDemo = document.createElement("div");
  countdownDemo.classList.add(
    "wideCountdown",
    "wideCountdownSize2",
    "cdBlack",
    "cdStyleTextOnly",
    "wideCountdown-demo",
    "is-countdown",
    "clearfix"
  );

  const timerDiv = document.createElement("div");
  timerDiv.classList.add("timer");

  const timerElements = [
    {
      number: "03",
      word: "days",
    },
    {
      number: "04",
      word: "hrs",
    },
    {
      number: "12",
      word: "min",
    },
    {
      number: "03",
      word: "sec",
    },
  ];

  timerElements.forEach((element) => {
    const timerItem = document.createElement("div");
    timerItem.style.display = "inline-block";
    timerItem.style.marginRight = "10px";

    const timerNumber = document.createElement("div");
    timerNumber.classList.add("timer-number");
    timerNumber.textContent = element.number;

    const timerWord = document.createElement("div");
    timerWord.classList.add("timer-word");
    timerWord.textContent = element.word;

    timerItem.appendChild(timerNumber);
    timerItem.appendChild(timerWord);
    timerDiv.appendChild(timerItem);
  });

  countdownElement.appendChild(timerDiv); // Nest the timer inside .realcountdown

  countdownDiv.appendChild(countdownElement);
  countdownDiv.appendChild(countdownDemo);

  // Append columns to the countdown wrapper
  containercountdownWrapper.appendChild(countdownWrapper);

  countdownWrapper.appendChild(leftColumn);
  countdownWrapper.appendChild(rightColumn);

  rightColumn.appendChild(countdownDiv);

  // countdownWrapper.appendChild(rolloverTools);

  countdownWrapper.setAttribute("draggable", true);
  elementControl(containercountdownWrapper);
  return containercountdownWrapper;
}

function createInputField(type) {
  const wrapper = document.createElement("div");
  wrapper.classList.add(
    "draggable",
    "de",
    "de-editable",
    "de-input-block",
    "elAlign_center",
    "elMargin0"
  );
  wrapper.setAttribute("id", `${type}-${Date.now()}`);
  wrapper.setAttribute("data-de-type", type);
  wrapper.setAttribute("data-de-editing", "false");
  wrapper.setAttribute("data-title", type);
  wrapper.setAttribute("data-ce", "false");
  wrapper.setAttribute("data-trigger", "none");
  wrapper.setAttribute("data-animate", "fade");
  wrapper.setAttribute("data-delay", "500");
  wrapper.setAttribute("draggable", true);
  wrapper.style.outline = "none";

  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.setAttribute("id", `field-${Date.now()}`);
  inputElement.classList.add(
    "elInput",
    "elInput100",
    "elAlign_left",
    "elInputMid",
    "elInputStyl0",
    "elInputBG1",
    "elInputBR5",
    "elInputI0",
    "elInputIBlack",
    "elInputIRight",
    "required0",
    "ceoinput"
  );
  inputElement.dataset.type = "extra";
  inputElement.style.width = "100%";

  switch (type) {
    case "input":
      inputElement.placeholder = "Your Name Here...";
      inputElement.name = "name";
      break;
    case "email":
      inputElement.placeholder = "Your Email Address Here...";
      inputElement.name = "email";
      break;
    case "phone-field":
      inputElement.placeholder = "Your Phone Number Here...";
      inputElement.name = "phone";
      break;
  }

  wrapper.appendChild(inputElement);
  elementControl(wrapper); // Assuming this function adds necessary event listeners or control logic
  return wrapper;
}

function createInputElement() {
  return createInputField("input", "Your Name Here...", "name");
}

function createEmailElement() {
  return createInputField("email", "Your Email Address Here...", "email");
}

function createPhoneElement() {
  return createInputField("phone-field", "Your Phone Number Here...", "phone");
}

function createCombElement() {
  const comboWrapper = document.createElement("div");
  comboWrapper.classList.add(
    "draggable",
    "de",
    "de-editable",
    "elAlign_center",
    "elMargin0",
    "container-fluid"
  );

  comboWrapper.setAttribute("data-de-type", "combo");
  comboWrapper.setAttribute("id", `combo-${Date.now()}`);
  // comboWrapper.id = "2step-form1";

  const card = document.createElement("div");
  card.classList.add("card", "px-5", "pb-5", "col-12", "mx-auto");
  card.style.backgroundColor = "#FBFBFB";
  const container = document.createElement("div");
  container.classList.add("container", "mt-3");

  const form = document.createElement("form");
  form.id = "two-step-order-form";
  form.classList.add("container-order-form-two-step");

  const formTitle = document.createElement("div");
  formTitle.classList.add("form-title");

  const row = document.createElement("div");
  row.classList.add("row");

  const colMd6Step1 = createFormStep("Your profile", "Contact details");
  const colMd6Step2 = createFormStep(
    "Normally $297. Use coupon code FAP to get 90% OFF",
    "Billing details"
  );

  row.appendChild(colMd6Step1);
  row.appendChild(colMd6Step2);

  formTitle.appendChild(row);

  const dividerForm = document.createElement("div");
  dividerForm.classList.add("divider-form");
  dividerForm.innerHTML = '<i class="fas fa-caret-up caret-up"></i>';

  const formBody = document.createElement("div");
  formBody.classList.add("form-body", "pt-4");
  formBody.id = `formBody-${Date.now()}`;

  const sectionInfo = document.createElement("section");
  sectionInfo.classList.add("info");

  const inputs1 = [
    "Company Name...",
    "Full Name...",
    "Email Address...",
    "Phone Number...",
  ];
  inputs1.forEach((placeholder) => {
    const input = createInput("text", placeholder);
    if (
      placeholder === "Company Name..." ||
      placeholder === "Phone Number..."
    ) {
      input.style.display = "none";
    }
    sectionInfo.appendChild(input);
  });

  const sectionShipping = document.createElement("section");
  sectionShipping.classList.add("shipping");
  sectionShipping.style.display = "none";

  const inputs2 = [
    "Full Address...",
    "City Name...",
    "State / Province...",
    "Zip Code...",
  ];
  inputs2.forEach((placeholder) => {
    const input = createInput("text", placeholder);
    sectionShipping.appendChild(input);
  });

  const select = document.createElement("select");
  select.classList.add("form-select", "mb-3");
  select.value = "";
  select.name = "country";

  const option = document.createElement("option");
  option.disabled = true;
  option.value = "";
  option.textContent = "Select Country";
  select.appendChild(option);

  const countryOption = document.createElement("option");
  countryOption.value = "US";
  countryOption.textContent = "United States";
  select.appendChild(countryOption);

  sectionShipping.appendChild(select);

  const sectionButton = document.createElement("section");

  const button = document.createElement("button");
  //"btn-success",
  button.classList.add("btn", "btn-success", "w-100", "p-2");
  button.style.backgroundColor = "rgb(125, 135, 176)";
  button.style.color = "rgb(255, 255, 255)";
  button.style.border = "0px";

  button.type = "button";
  // button.onclick = () => showForm(form, formBody2.id);
  button.innerHTML = `<i class="fas fa-arrow-right fs-5"></i>
                <span class="main-text fs-4" style="font-weight: 600;"> &nbsp; Go To Step #2 </span><br>
                <span class="sub-text"></span>`;

  sectionButton.appendChild(button);

  const orderFormFooter = document.createElement("section");
  orderFormFooter.classList.add("order-form-footer");
  orderFormFooter.innerHTML =
    "<span>We Respect Your Privacy &amp; Information.</span>";

  formBody.appendChild(sectionInfo);
  formBody.appendChild(sectionShipping);
  formBody.appendChild(sectionButton);
  formBody.appendChild(orderFormFooter);

  // Second part for 2 Step Combo
  const formBody2 = document.createElement("div");
  formBody2.classList.add("form-body", "pt-4", "hidden");
  formBody2.id = `formBody2-${Date.now()}`;

  const sectionDetail = document.createElement("section");
  sectionDetail.classList.add("product-detail");
  sectionDetail.id = "ctwo-setp-order";

  const productTitle = document.createElement("div");
  productTitle.classList.add("product-title");
  productTitle.innerHTML = `
        <span class="item">Item</span>
        <span class="item text-center">Quantity</span>
        <span class="item">Price</span>
    `;

  const dividerProduct = document.createElement("div");
  dividerProduct.classList.add("divider-product");

  const productDescription = document.createElement("div");
  productDescription.id = "659d9244637b7ce094361944";
  productDescription.classList.add("product-description");
  productDescription.innerHTML = `
        <div class="d-flex">
            <div class="d-flex radioBtn">
                <input id="checkbox-ctwo-setp-order-659d9244637b7ce094361944" type="checkbox" value="659d9244637b7ce094361944">
            </div>
            <div>
                <span class="item product-name" style="margin-left:7px;"><strong>FAP Airtable System</strong></span>
                <div class="item-description"><strong></strong></div>
            </div>
        </div>
        <div class="text-center item">1</div>
        <span class="item item-price">$29.00</span>
    `;

  sectionDetail.appendChild(productTitle);
  sectionDetail.appendChild(dividerProduct);
  sectionDetail.appendChild(productDescription);

  // Create main container
  const bpContainer = document.createElement("section");
  bpContainer.classList.add("bp-container");

  // Create product bump divider
  const productBumpDivider = document.createElement("div");
  productBumpDivider.classList.add("product-bump-divider");

  // Create order bump container
  const orderBumpContainer = document.createElement("section");
  orderBumpContainer.classList.add("order-bump-container");

  // Create main section within order bump container
  const mainSection = document.createElement("div");
  mainSection.classList.add("main-section");
  mainSection.innerHTML = `
      <img src="data:image/webp;base64,UklGRsYBAABXRUJQVlA4WAoAAAASAAAAGwAAEAAAQU5JTQYAAAAAAAAAAABBTk1GsgAAAAAAAAAAABsAABAAAA4BAANWUDhMmgAAAC8bAAQQH8GgbSRHx59rL/8/ys/gmH/FbSQ19F8pvxwHBs1/FIG/ppDrB1yyELIAuslyFqb4AEKWNQHOIiSbiaij+ADg3QGyESEADttIUqQ+Zmaeu84/y/v/mY8gov8TgH+eYwt5et+AvCoLck3eJuoOgQWlcQzIPbMgJ4uz0Ls7D2pLBKAefnxejhyqQlJaF2pjCG3ZUuiX+BpBTk1GJgAAAAAAAAAAAAAAAAAAAOYAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcAQU5NRrIAAAAAAAAAAAAbAAAQAABGAAAAVlA4TJoAAAAvGwAEEB/BoG0kR8efay//P8rP4Jh/xW0kNfRfKb8cBwbNfxSBv6aQ6wdcshCyALrJcham+ABCljUBziIkm4moo/gA4N0BshEhAA7bSFKkPmZmnrvOP8v7/5mPIKL/E4B/nmMLeXrfgLwqC3JN3ibqDoEFpXEMyD2zICeLs9C7Ow9qSwSgHn58Xo4cqkJSWhdqYwht2VLol/ga" class="bump--flashing-arrow">
      <input type="checkbox" name="order-bump" class="bump--checkbox">
      <span class="headline bump-headline">YES! Add the "Advanced Ads Scaling Q&amp;A" for just $29!</span>
    `;

  // Create paragraph within order bump container
  const paragraph = document.createElement("p");
  paragraph.innerHTML = `
      <span class="oto-headline">Advanced Ads Scaling Q&amp;A Session</span>
      <span> Get a recording of one of our live monthly calls! Our media buyer who has run ads for Frank Kern, Agora, Dean Graziosi, Jeff Lerner (and more!) not only shows how to launch and SCALE campaigns but also answers the TOP questions most people when trying to scale ads! This is "Behind Closed Doors" information for pennies!</span>
    `;

  orderBumpContainer.appendChild(mainSection);
  orderBumpContainer.appendChild(paragraph);

  // Create separator for order summary
  const separator = document.createElement("div");
  separator.classList.add("separator");
  separator.textContent = "Order Summary";

  // Create product cost total section
  const productCostTotal = document.createElement("section");
  productCostTotal.classList.add("product-cost-total");
  productCostTotal.innerHTML = `
      <div class="product-title">
          <span class="item">item</span>
          <span class="item text-center">Quantity</span>
          <span class="item">amount</span>
      </div>
      <div class="divider-product"></div>
      <div class="product-description">
          <span class="item"><span class="coupon-item">FAP Airtable System</span><!----></span>
          <span class="item text-center">1</span>
          <span class="item item-price">$ 29.00</span>
      </div>
      <div class="divider-product"></div>
      <div class="order-total">
          <span class="item"><strong>Order Total</strong></span>
          <span class="item text-right">
              <div class="item-price">$ 29.00</div>
              <!---->
          </span>
      </div>
    `;

  // Append all elements to the main container
  bpContainer.appendChild(productBumpDivider);
  bpContainer.appendChild(orderBumpContainer);
  bpContainer.appendChild(separator);
  bpContainer.appendChild(productCostTotal);

  // Create billing form section
  const billingSection = document.createElement("section");
  billingSection.classList.add("billing");

  // Create credit card input elements
  const creditCardContainer = document.createElement("div");
  creditCardContainer.classList.add("ghl-payment-element", "pb-4");

  const inlineCreditCardContainer = document.createElement("div");
  inlineCreditCardContainer.classList.add("inline-credit-card-container");

  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row");

  const colMd6Div1 = document.createElement("div");
  colMd6Div1.classList.add("col-md-6");

  const cardNumberLabel = document.createElement("label");
  cardNumberLabel.setAttribute("for", "cardNumber");
  cardNumberLabel.classList.add("card-input-label", "d-block");
  cardNumberLabel.textContent = "Card Number";

  const cardNumberInput = document.createElement("input");
  cardNumberInput.setAttribute("type", "text");
  cardNumberInput.setAttribute("name", "cc");
  cardNumberInput.setAttribute("id", "cc-ctwo-setp-order-payment-element");
  cardNumberInput.setAttribute("placeholder", "1234 1234 1234 1234");
  cardNumberInput.classList.add("card-input");

  colMd6Div1.appendChild(cardNumberLabel);
  colMd6Div1.appendChild(cardNumberInput);

  const colMd6Div2 = document.createElement("div");
  colMd6Div2.classList.add("col-md-6");

  const creditCardSubContainer = document.createElement("div");
  creditCardSubContainer.classList.add("credit-card-sub-container");

  const rowDiv2 = document.createElement("div");
  rowDiv2.classList.add("row");

  const colMd6Div3 = document.createElement("div");
  colMd6Div3.classList.add("col-md-6");

  const expirationLabel = document.createElement("label");
  expirationLabel.setAttribute("for", "cardExpiration");
  expirationLabel.classList.add("card-input-label");
  expirationLabel.textContent = "Expiration";

  const expirationInput = document.createElement("input");
  expirationInput.setAttribute("type", "text");
  expirationInput.setAttribute("name", "card-expiration");
  expirationInput.setAttribute(
    "id",
    "card-expiration-ctwo-setp-order-payment-element"
  );
  expirationInput.setAttribute("maxlength", "5");
  expirationInput.setAttribute("placeholder", "MM / YY");
  expirationInput.classList.add("card-input");

  colMd6Div3.appendChild(expirationLabel);
  colMd6Div3.appendChild(expirationInput);

  const colMd6Div4 = document.createElement("div");
  colMd6Div4.classList.add("col-md-6");

  const cvcLabel = document.createElement("label");
  cvcLabel.setAttribute("for", "cardCvc");
  cvcLabel.classList.add("card-input-label");
  cvcLabel.textContent = "CVC";

  const cvcInput = document.createElement("input");
  cvcInput.setAttribute("type", "text");
  cvcInput.setAttribute("name", "card-cvc");
  cvcInput.setAttribute("id", "card-cvc-ctwo-setp-order-payment-element");
  cvcInput.setAttribute("maxlength", "3");
  cvcInput.setAttribute("placeholder", "CVC");
  cvcInput.classList.add("card-input");

  colMd6Div4.appendChild(cvcLabel);
  colMd6Div4.appendChild(cvcInput);

  rowDiv2.appendChild(colMd6Div3);
  rowDiv2.appendChild(colMd6Div4);

  creditCardSubContainer.appendChild(rowDiv2);

  colMd6Div2.appendChild(creditCardSubContainer);

  rowDiv.appendChild(colMd6Div1);
  rowDiv.appendChild(colMd6Div2);

  inlineCreditCardContainer.appendChild(rowDiv);

  creditCardContainer.appendChild(inlineCreditCardContainer);

  // Create order button
  const orderButton = document.createElement("button");
  orderButton.classList.add("btn", "btn-success", "w-100", "p-2");
  // orderButton.onclick = () => showForm(form, formBody.id);
  orderButton.style.backgroundColor = "rgb(125, 135, 176)";
  orderButton.style.color = "rgb(255, 255, 255)";
  orderButton.style.border = "0px";

  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-arrow-right", "fs-5");

  const mainText = document.createElement("span");
  mainText.classList.add("main-text", "fs-4");
  mainText.setAttribute("style", "font-weight: 600;");
  mainText.innerHTML = "&nbsp; Complete Order";

  const subText = document.createElement("span");
  subText.classList.add("sub-text");

  orderButton.appendChild(icon);
  orderButton.appendChild(mainText);
  orderButton.appendChild(document.createElement("br"));
  orderButton.appendChild(subText);

  // Create order form footer section
  const orderFormFooter2 = document.createElement("section");
  orderFormFooter2.classList.add("order-form-footer");
  orderFormFooter2.innerHTML = "<span>* 100% Secure & Safe Payments *</span>";

  // Append elements to the billing section
  billingSection.appendChild(creditCardContainer);
  billingSection.appendChild(orderButton);
  billingSection.appendChild(orderFormFooter2);

  formBody2.appendChild(sectionDetail);
  formBody2.appendChild(bpContainer);
  formBody2.appendChild(billingSection);

  form.appendChild(formTitle);
  form.appendChild(dividerForm);
  form.appendChild(formBody);
  form.appendChild(formBody2);

  container.appendChild(form);
  card.appendChild(container);
  comboWrapper.appendChild(card);
  elementControl(comboWrapper);
  return comboWrapper;
}

function createFormStep(heading, subHeading) {
  const colMd6 = document.createElement("div");
  colMd6.classList.add("col-md-6");

  const rowInner = document.createElement("div");
  rowInner.classList.add("row");

  const formStep = document.createElement("div");
  formStep.classList.add("form-step", "text-center", "col-md-11", "p-0");
  formStep.innerHTML = `<span class="form-heading active">${heading}</span> <br>
                        <span class="form-sub-heading">${subHeading}</span>`;

  const colMd1 = document.createElement("div");
  colMd1.classList.add("col-md-1", "p-0");

  const hr = document.createElement("hr");
  hr.classList.add("separator-vertical", "m-0");

  rowInner.appendChild(formStep);
  rowInner.appendChild(colMd1);
  rowInner.appendChild(hr);

  colMd6.appendChild(rowInner);

  return colMd6;
}

function createInput(type, placeholder) {
  const input = document.createElement("input");
  input.type = type;
  input.name = placeholder.toLowerCase().replace(/\s/g, "");
  input.placeholder = placeholder;
  input.classList.add("form-control", "mb-3");
  return input;
}

// const currentChosenField = (args) => {
//   if (args) {
//     chosenField = args;
//   }
//   return chosenField;
// };

export {
  createTextElement,
  createImageElement,
  createVideoElement,
  createListElement,
  createButtonElement,
  createCountdownElement,
  createInputField,
  createInputElement,
  createEmailElement,
  createPhoneElement,
  createCombElement,
};
