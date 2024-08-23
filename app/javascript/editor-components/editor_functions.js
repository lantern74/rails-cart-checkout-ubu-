function closeAllSidebars() {
  closeAllTextEditPopups();
  var allSideBars = document.querySelectorAll(".settingsSidebar.open");
  allSideBars.forEach(function (Sidebar) {
    Sidebar.classList.remove("open");
  });
}


function closeAllTextEditPopups() {
  var editTextRolloverToolsList = document.querySelectorAll('.text-de-rollover-tools');

  editTextRolloverToolsList.forEach((editTextRolloverTool) => {
    editTextRolloverTool.style.display = 'none';

    for (let i = 0; i < editTextRolloverTool.childNodes.length && i < 8; i++) {
      let child = editTextRolloverTool.childNodes[i];
      if (child.style) {
        child.style.display = 'none';
      }
    }
  });
}
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function anyOfTheSidebarsOpen() {
  var allSideBars = document.querySelectorAll(".settingsSidebar.open");
  return allSideBars.length > 0; // Returns true if any sidebar is open, otherwise false
}



function traverseAndSetUniqueId(sourceElement) {
  const allCopyElements = sourceElement.querySelectorAll("*");
  const idMap = new Map(); // Map to store original prefixes and their corresponding new unique numbers

  allCopyElements.forEach((copyElement) => {
    const existingId = copyElement.getAttribute("id");
    if (existingId && existingId.includes("-")) {
      const idParts = existingId.split("-");
      const prefix = idParts[0];

      if (!idMap.has(prefix)) {
        idMap.set(prefix, Math.floor(Math.random() * 1000000)); // Store a random unique number for this prefix
      }

      const newId = prefix + "-" + idMap.get(prefix);
      copyElement.setAttribute("id", newId);
      idMap.set(prefix, idMap.get(prefix) + 1); // Update the unique number for the next element with the same prefix
    }
  });
}


//this is for the orange
function moveUp(element) {
  if (element.previousElementSibling) {
    element.parentNode.insertBefore(element, element.previousElementSibling); // insert element before the previous sibling
  }
}

//this is for the orange
function moveDown(element) {
  if (element.nextElementSibling) {
    element.parentNode.insertBefore(element, element.nextElementSibling.nextElementSibling);
  }
}

//this is for the orange
function removeElement(element) {
  element.parentNode.removeChild(element);
}


function updateTextareaFromContainer(containerId, textareaName) {
  const mainContainer = document.getElementById(containerId);
  const textarea = document.querySelector(`textarea[name="${textareaName}"]`);

  if (mainContainer && textarea) {
    textarea.value = mainContainer.innerHTML;
  } else {
    console.error("Container or textarea not found");
  }
}




export { closeAllSidebars, closeAllTextEditPopups, anyOfTheSidebarsOpen, traverseAndSetUniqueId, getRandomColor, moveUp, moveDown, removeElement, updateTextareaFromContainer };
