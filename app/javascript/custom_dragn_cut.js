
// ** GREEN STUFF **
console.log("green stuff");


  const greenGearButtons = document.querySelectorAll("[id*='green_advanced']");

  const addSectionlink = document.getElementById("add-section-button");
  const isAddSectionlink = event.target !== addSectionlink && !addSectionlink.contains(event.target);
  const plusCircleButtons = document.querySelectorAll(".de-rollover-plus-circle");
  const isPlusCircleButton = Array.from(plusCircleButtons).some((button) => button.contains(event.target));
  const plusSquareButtons = document.querySelectorAll(".add-row-de-rollover-tools");
  const isPlusSquareButton = Array.from(plusSquareButtons).some((button) => button.contains(event.target));


  const isGreenGearButton = Array.from(greenGearButtons).some((button) => button.contains(event.target));
  const isAddSectionPopup = event.target !== setSectionWidthPopup && !setSectionWidthPopup.contains(event.target);
  const isAddRownPopup = event.target !== setColumnNumberPopup && !setColumnNumberPopup.contains(event.target);




  // if (isAddSectionPopup && !isPlusCircleButton && isAddSectionlink) {
  //    setSectionPopup.classList.remove("open");
  // }


  // if (isAddRownPopup && !isPlusCircleButton && !isPlusSquareButton) {
  //     setSectionPopup.classList.remove("open");
  // }


  // if (isOutsidePopup4 && !isGreenGearButton && isMarginPaddingPopup) {

  //   if (selectedGreenSection) {
  //     selectedGreenSection = null;
  //     setSectionPopup.classList.remove("open");
  //   }
  // }
