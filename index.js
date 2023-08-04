var navButtons = document.querySelectorAll(".nav-button");
var pagesContainer = document.querySelector(".pages-container");
var numberOfnavButtons = navButtons.length;

// Navigate to page that corresponds to clicked-on button
navButtons.forEach((navButton, index) => {
  navButton.onclick = function () {
    var leftPosition = index * 100;
    pagesContainer.style.left = "-" + leftPosition + "vw";
    for (let i = 0; i < numberOfnavButtons; i++) {
      if (navButtons[index] === navButtons[i]) {
        navButtons[i].style.fill = "var(--fourth-color)";
      } else {
        navButtons[i].style.fill = "var(--third-color)";
      }
    }
  };
});

// Function to navigate to hash location
function navigateToHashLocation() {
  var targetLocation = window.location.hash;
  for (let i = 0; i < numberOfnavButtons; i++) {
    if (navButtons[i].hash === targetLocation) {
      var leftPosition = i * 100;
      pagesContainer.style.left = "-" + leftPosition + "vw";
      navButtons[i].style.fill = "var(--fourth-color)";
    } else {
      navButtons[i].style.fill = "var(--third-color)";
    }
  }
}

// Navigate to hash location on load
window.addEventListener("load", navigateToHashLocation);

// Navigate to hash location when browser back/forward button is clicked
window.addEventListener("popstate", navigateToHashLocation);

// Prevent transition of pages container during resizing
window.addEventListener("resize", function () {
  var pagesContainer = document.querySelector(".pages-container");
  pagesContainer.style.WebkitTransition = "none";
  pagesContainer.style.OTransition = "none";
  pagesContainer.style.transition = "none";

  clearTimeout(resizeTimeout);
  var resizeTimeout = setTimeout(function () {
    pagesContainer.style.WebkitTransition = "";
    pagesContainer.style.OTransition = "";
    pagesContainer.style.transition = "";
  }, 100);
});

// Create custom select items
//Look for any elements with the class "custom-select"
var customSelects = document.querySelectorAll(".custom-select");
numberOfCustomSelects = customSelects.length;

for (let i = 0; i < numberOfCustomSelects; i++) {
  selectElements = customSelects[i].getElementsByTagName("select")[0];
  var numberOfSelectElements = selectElements.length;
  //For each element, create a new div that will act as the selected item
  var selectedItemDiv = document.createElement("div");

  selectedItemDiv.setAttribute("class", "select-selected");
  selectedItemDiv.innerHTML =
    selectElements.options[selectElements.selectedIndex].innerHTML;
  customSelects[i].appendChild(selectedItemDiv);

  // For each element, create a new div that will contain the option list
  var optionListDiv = document.createElement("div");
  optionListDiv.setAttribute("class", "select-items select-hide");

  for (let j = 0; j < numberOfSelectElements; j++) {
    // For each option in the original select element,
    // create a new div that will act as an option item
    var optionItemDiv = document.createElement("div");
    optionItemDiv.innerHTML = selectElements.options[j].innerHTML;

    optionItemDiv.addEventListener("click", function (e) {
      //When an item is clicked, update the original select box,
      //and the selected item
      var selectElements =
        this.parentNode.parentNode.getElementsByTagName("select")[0];
      var numberOfSelectElements = selectElements.length;
      var selected = this.parentNode.previousSibling;
      for (let i = 0; i < numberOfSelectElements; i++) {
        if (selectElements.options[i].innerHTML == this.innerHTML) {
          selectElements.selectedIndex = i;
          selected.innerHTML = this.innerHTML;
          var sameAsSelected =
            this.parentNode.getElementsByClassName("same-as-selected");
          var numberOfSameAsSelected = sameAsSelected.length;
          for (let k = 0; k < numberOfSameAsSelected; k++) {
            sameAsSelected[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      selected.click();
    });
    optionListDiv.appendChild(optionItemDiv);
  }
  customSelects[i].appendChild(optionListDiv);
  selectedItemDiv.addEventListener("click", function (event) {
    // When the select box is clicked, close any other select boxes,
    // and open/close the current select box
    event.stopPropagation();
    closeAllSelects(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
    this.nextSibling.classList.toggle("select-show");
    if (this.nextSibling.classList.contains("select-show")) {
      var optionItemDivs = Array.from(this.nextElementSibling.children);
      optionItemDivs.forEach((optionItemDiv, index) => {
        setTimeout(function () {
          optionItemDiv.classList.add("show-menu-item");
        }, index * 100);
      });
    } else {
      var optionItemDivs = Array.from(this.nextElementSibling.children);
      optionItemDivs.forEach((optionItemDiv) => {
        optionItemDiv.classList.remove("show-menu-item");
      });
    }
  });
}
function closeAllSelects(element) {
  // A function that will close all select boxes in the document,
  // except the current select box
  var arrayNumber = [];
  var optionListDivs = document.getElementsByClassName("select-items");
  var selectedItems = document.getElementsByClassName("select-selected");
  var numberOfoptionListDivs = optionListDivs.length;
  var numberOfSelectedItems = selectedItems.length;
  for (let i = 0; i < numberOfSelectedItems; i++) {
    if (element == selectedItems[i]) {
      arrayNumber.push(i);
    } else {
      selectedItems[i].classList.remove("select-arrow-active");
    }
  }
  for (let i = 0; i < numberOfoptionListDivs; i++) {
    if (arrayNumber.indexOf(i)) {
      optionListDivs[i].classList.add("select-hide");
      optionListDivs[i].classList.remove("select-show");
    }
  }
  // Remove '.show-menu-item' if user clicks outside the box
  var optionListDivs = document.querySelectorAll(".select-items");
  optionListDivs.forEach((optionListDiv) => {
    var optionItemDivs = optionListDiv.querySelectorAll("div");
    optionItemDivs.forEach((optionItemDiv) => {
      optionItemDiv.classList.remove("show-menu-item");
    });
  });
}
// If the user clicks anywhere outside the select box,
// close all select boxes
document.addEventListener("click", closeAllSelects);

customSelects.forEach((customSelect) => {
  var selectElement = customSelect.querySelector("select");

  // Make each custom-select div have a class based on the ID of the default/hidden select menu,
  // eg. the custom-select div of fonts has the class custom-select-fonts
  var selectId = selectElement.id;
  customSelect.setAttribute("id", "custom-select-" + selectId);

  // Before user selects an option, make the item in the dropdown menu that
  // corresponds with the default selection take the class "same-as-selected"
  var selected = customSelect.querySelector(".select-selected");
  var optionItemDivs = customSelect.querySelectorAll(".select-items div");
  var numberOfOptionItemDivs = optionItemDivs.length;
  for (let i = 0; i < numberOfOptionItemDivs; i++) {
    if (selected.innerHTML === optionItemDivs[i].innerHTML) {
      optionItemDivs[i].setAttribute("class", "same-as-selected");
    }
  }
});

// Apply styling to text
var editorButtons = document.querySelectorAll(".editor-button");

function editorButtonsFunction() {
  let command = this.dataset["element"];
  document.execCommand(command, false, null);
}

editorButtons.forEach((editorButton) => {
  editorButton.addEventListener("click", editorButtonsFunction);
  editorButton.addEventListener("touchstart", editorButtonsFunction);
});

// Submit typed text & add blur for line mode
var previewContent = document.querySelector("#preview-content");
var containerForFocusLine = document.querySelector("#container-for-focus-line");

var editor = document.querySelector("#editor");
var submittedText = document.querySelector("#submitted-text");
var submitButton = document.querySelector("#submit-button");

function submitTextFunction() {
  // When submit button is clicked, wrap div around first paragraph (like the rest of the paragraphs) and submit text
  var content = editor.innerHTML;
  var submittedParagraphs = content.split("<br>");
  var firstParagraph = submittedParagraphs.shift(); // Remove the first paragraph from the array
  var wrappedFirstParagraph = "<div>" + firstParagraph + "</div>";
  var modifiedContent =
    wrappedFirstParagraph + submittedParagraphs.join("<br>");
  submittedText.innerHTML = modifiedContent;

  // Display preview of text, with limit of 50 words.
  var words = editor.innerHTML.split(" ");
  var limitedWords = words.slice(0, 50).join(" ");
  previewContent.innerHTML = limitedWords;

  editor.innerHTML = "";
  if (submittedText.innerHTML.trim() !== "") {
    // Add margin-bottom to submitted text
    submittedText.style.marginBottom = "50vh";

    // Change size of focus line when text is submitted
    var selectedFontSize = document.querySelector(
      "#custom-select-font-sizes .select-selected"
    ).innerHTML;
    var selectedLineHeight = document.querySelector(
      "#custom-select-line-heights .select-selected"
    ).innerHTML;

    selectedFontSize = selectedFontSize.replace("px", "");
    focusLine.style.height = selectedFontSize * selectedLineHeight + "px";

    // Add padding-bottom of 1px to focus line if line height of submitted text is 1.25
    if (selectedLineHeight === "1.25") {
      focusLine.style.paddingBottom = "1px";
    } else {
      focusLine.style.paddingBottom = "";
    }

    // Add class to paragraphs for paragraph mode when text is submitted
    var submittedTextDivs = submittedText.querySelectorAll("div");
    submittedTextDivs.forEach((submittedTextDiv) => {
      var hasText = submittedTextDiv.textContent.trim().length > 0;
      if (hasText) {
        submittedTextDiv.classList.add("paragraph");
      }
    });

    // Change mode according to selected mode.
    selectedModeFunction();
  }
}

submitButton.addEventListener("click", submitTextFunction);
submitButton.addEventListener("touchstart", submitTextFunction);

editor.addEventListener("paste", function (e) {
  // Cancel paste
  e.preventDefault();

  // Get text representation of clipboard
  var text = (e.originalEvent || e).clipboardData.getData("text/plain");

  // insert text manually
  document.execCommand("insertText", false, text);
});

// Change font of dropdown menu items to correspond to each option.
var fontNames = document.querySelectorAll(
  "#custom-select-fonts .select-items div"
);
fontNames.forEach((fontName) => {
  fontName.style.fontFamily = fontName.innerHTML;
});

// Change font of preview and submitted text + change font of selected font to correspond to the selected font
var fonts = document.querySelector("#custom-select-fonts .select-items");
fonts.onclick = function () {
  var selectedFont = document.querySelector(
    "#custom-select-fonts .select-selected"
  );
  previewContent.style.fontFamily = selectedFont.innerHTML;
  submittedText.style.fontFamily = selectedFont.innerHTML;
  selectedFont.style.fontFamily = selectedFont.innerHTML;
};

var fontSizes = document.querySelector(
  "#custom-select-font-sizes .select-items"
);
var focusLine = document.querySelector("#focus-line");

fontSizes.onclick = function () {
  var selectedFontSize = document.querySelector(
    "#custom-select-font-sizes .select-selected"
  ).innerHTML;
  var selectedLineHeight = document.querySelector(
    "#custom-select-line-heights .select-selected"
  ).innerHTML;
  // Change font size of preview and submitted text
  previewContent.style.fontSize = selectedFontSize;
  submittedText.style.fontSize = selectedFontSize;

  // Change size of focus line when font size is changed
  selectedFontSize = selectedFontSize.replace("px", "");
  focusLine.style.height = selectedFontSize * selectedLineHeight + "px";
};

var lineHeights = document.querySelector(
  "#custom-select-line-heights .select-items"
);
lineHeights.onclick = function () {
  var selectedFontSize = document.querySelector(
    "#custom-select-font-sizes .select-selected"
  ).innerHTML;
  var selectedLineHeight = document.querySelector(
    "#custom-select-line-heights .select-selected"
  ).innerHTML;
  // Change line height of preview and submitted text
  previewContent.style.lineHeight = selectedLineHeight;
  submittedText.style.lineHeight = selectedLineHeight;

  // Change size of focus line when line height is changed
  selectedFontSize = selectedFontSize.replace("px", "");
  focusLine.style.height = selectedFontSize * selectedLineHeight + "px";

  // Add padding-bottom to focus line of 1px if line height of submitted text is 1.25
  if (selectedLineHeight === "1.25") {
    focusLine.style.paddingBottom = "1px";
  } else {
    focusLine.style.paddingBottom = "";
  }
};

// Change mode
var modes = document.querySelector("#custom-select-modes .select-items");
modes.addEventListener("click", selectedModeFunction);

// Function for line mode up button
var topBlurForFocusLine = document.querySelector("#top-blur-for-focus-line");
var initialHeightOfTopBlur = window
  .getComputedStyle(topBlurForFocusLine, null)
  .getPropertyValue("height");
var numbersOnlyStringOfInitialHeightOfTopBlur = initialHeightOfTopBlur.replace(
  /\D/g,
  ""
);
var numericValueOfInitialHeightOfTopBlur = parseInt(
  numbersOnlyStringOfInitialHeightOfTopBlur,
  10
);

var submittedTextMarginTop = window
  .getComputedStyle(submittedText, null)
  .getPropertyValue("margin-top");
var numbersOnlyStringOfSubmittedTextMarginTop = submittedTextMarginTop.replace(
  /\D/g,
  ""
);
var numericValueOfSubmittedTextMarginTop = parseInt(
  numbersOnlyStringOfSubmittedTextMarginTop,
  10
);
let buttonCounter = numericValueOfInitialHeightOfTopBlur;

function lineModeUpButtonFunction() {
  var selectedFontSize = document.querySelector(
    "#custom-select-font-sizes .select-selected"
  ).innerHTML;
  var selectedLineHeight = document.querySelector(
    "#custom-select-line-heights .select-selected"
  ).innerHTML;

  selectedFontSize = selectedFontSize.replace("px", "");
  var focusLineHeight = selectedFontSize * selectedLineHeight;
  if (buttonCounter > numericValueOfSubmittedTextMarginTop) {
    buttonCounter -= focusLineHeight;
  }
  topBlurForFocusLine.style.height = buttonCounter + "px";
}

// Function for line mode down button
function lineModeDownButtonFunction() {
  var offsetTopOfSubmittedText = submittedText.offsetTop;
  var heightOfSubmittedText = submittedText.offsetHeight;
  var offsetBottomOfSubmittedText =
    offsetTopOfSubmittedText + heightOfSubmittedText;
  var heightOfPage = document.querySelectorAll(".page")[0].offsetHeight;
  var heightOfNav = document.querySelector(".nav").offsetHeight;
  var heightOfVisiblePage = heightOfPage - heightOfNav;
  var focusLineHeight = window
    .getComputedStyle(focusLine, null)
    .getPropertyValue("height");
  var numbersOnlyStringOfFocusLineHeight = focusLineHeight.replace(
    /[^\d.]/g,
    ""
  );
  var numericValueOfFocusLineHeight = parseInt(
    numbersOnlyStringOfFocusLineHeight,
    10
  );
  // Function to check if the element's bottom is visible in the viewport
  function isElementBottomVisible(element) {
    var rect = element.getBoundingClientRect();
    return (
      rect.bottom >= 0 &&
      rect.bottom <=
        (window.innerHeight - heightOfNav ||
          document.documentElement.clientHeight - heightOfNav)
    );
  }

  // Find bottom position of submitted text
  var rect = submittedText.getBoundingClientRect();
  var bottomPositionOfSubmittedText = rect.bottom;
  if (offsetBottomOfSubmittedText < heightOfVisiblePage) {
    var bottomLimitOfFocusLine =
      offsetBottomOfSubmittedText - numericValueOfFocusLineHeight;
  } else if (
    offsetBottomOfSubmittedText > heightOfVisiblePage &&
    isElementBottomVisible(submittedText)
  ) {
    var bottomLimitOfFocusLine =
      bottomPositionOfSubmittedText - numericValueOfFocusLineHeight;
  } else {
    var bottomLimitOfFocusLine =
      heightOfVisiblePage - numericValueOfFocusLineHeight * 2;
  }

  var selectedFontSize = document.querySelector(
    "#custom-select-font-sizes .select-selected"
  ).innerHTML;
  var selectedLineHeight = document.querySelector(
    "#custom-select-line-heights .select-selected"
  ).innerHTML;

  selectedFontSize = selectedFontSize.replace("px", "");
  var focusLineHeight = selectedFontSize * selectedLineHeight;
  if (buttonCounter + 1 < bottomLimitOfFocusLine) {
    // (Add 1 to make up for 0.5 increments when the font size is an odd number and the line height is 1.5.)
    buttonCounter += focusLineHeight;
  }
  topBlurForFocusLine.style.height = buttonCounter + "px";
}

var wrapperForLineModeButtons = document.querySelector(
  "#wrapper-for-line-mode-buttons"
);
var wrapperForParagraphModeButtons = document.querySelector(
  "#wrapper-for-paragraph-mode-buttons"
);

var upButtonForLineMode = document.querySelector("#up-button-for-line-mode");
var downButtonForLineMode = document.querySelector(
  "#down-button-for-line-mode"
);
var upButtonForParagraphMode = document.querySelector(
  "#up-button-for-paragraph-mode"
);
var downButtonForParagraphMode = document.querySelector(
  "#down-button-for-paragraph-mode"
);

function lineMode() {
  containerForFocusLine.style.display = "-webkit-box";
  containerForFocusLine.style.display = "-ms-flexbox";
  containerForFocusLine.style.display = "flex";

  wrapperForLineModeButtons.style.display = "block";
  wrapperForParagraphModeButtons.style.display = "none";

  var paragraphs = document.querySelectorAll(".paragraph");

  paragraphs.forEach((paragraph) => {
    paragraph.classList.remove("blurred-paragraph");
  });

  // Reset height of top blur when line mode is selected
  topBlurForFocusLine.style.height = initialHeightOfTopBlur;
  buttonCounter = numericValueOfInitialHeightOfTopBlur;

  // In line mode, change position of focus line when up button is clicked or up arrow is pressed
  upButtonForLineMode.addEventListener("click", lineModeUpButtonFunction);
  upButtonForLineMode.addEventListener("touchstart", lineModeUpButtonFunction);

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
      lineModeUpButtonFunction();
    }
  });

  // In line mode, change position of focus line when down button is clicked
  downButtonForLineMode.addEventListener("click", lineModeDownButtonFunction);
  downButtonForLineMode.addEventListener(
    "touchstart",
    lineModeDownButtonFunction
  );

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown") {
      lineModeDownButtonFunction();
    }
  });
}

function paragraphMode() {
  containerForFocusLine.style.display = "none";

  wrapperForLineModeButtons.style.display = "none";
  wrapperForParagraphModeButtons.style.display = "block";

  var paragraphs = document.querySelectorAll(".paragraph");
  paragraphs.forEach((paragraph, index) => {
    if (index !== 0) {
      paragraph.classList.add("blurred-paragraph");
    }
  });

  // In paragraph mode, change paragraph when down button is clicked
  let currentIndex = 1;
  let nextParagraphIndex = 1;
  var page = document.querySelectorAll(".page")[0];

  function paragraphModeDownButtonFunction() {
    if (currentIndex < paragraphs.length) {
      // Remove the "blurred-paragraph" class from the current paragraph
      paragraphs[currentIndex].classList.remove("blurred-paragraph");

      // Add the "blurred-paragraph" class to the previous paragraph
      if (paragraphs[currentIndex - 1]) {
        paragraphs[currentIndex - 1].classList.add("blurred-paragraph");
      }
      currentIndex++;
    }
    if (nextParagraphIndex < paragraphs.length) {
      var nextParagraph = paragraphs[nextParagraphIndex];

      page.scrollTo({
        top: nextParagraph.offsetTop - 70,
        behavior: "smooth",
      });
      nextParagraphIndex++;
    }
  }

  downButtonForParagraphMode.addEventListener(
    "click",
    paragraphModeDownButtonFunction
  );
  downButtonForParagraphMode.addEventListener(
    "touchstart",
    paragraphModeDownButtonFunction
  );

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown") {
      paragraphModeDownButtonFunction();
    }
  });

  // In paragraph mode, change paragraph when up button is clicked
  function paragraphModeUpButtonFunction() {
    if (currentIndex <= paragraphs.length && currentIndex > 1) {
      currentIndex--;

      // Remove the "blurred-paragraph" class from the current paragraph
      if (paragraphs[currentIndex - 1]) {
        paragraphs[currentIndex - 1].classList.remove("blurred-paragraph");

        // Add the "blurred-paragraph" class to the following paragraph
        paragraphs[currentIndex].classList.add("blurred-paragraph");
      }
    }
    if (nextParagraphIndex >= 2 && nextParagraphIndex <= paragraphs.length) {
      var currentParagraph = paragraphs[nextParagraphIndex - 2];

      page.scrollTo({
        top: currentParagraph.offsetTop - 70, // 70px is margin-top of #submitted-text
        behavior: "smooth",
      });
      nextParagraphIndex--;
    }
  }

  upButtonForParagraphMode.addEventListener(
    "click",
    paragraphModeUpButtonFunction
  );
  upButtonForParagraphMode.addEventListener(
    "touchstart",
    paragraphModeUpButtonFunction
  );

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
      paragraphModeUpButtonFunction();
    }
  });
}

// Function to change mode
function selectedModeFunction() {
  var selectedMode = document.querySelector(
    "#custom-select-modes .select-selected"
  ).innerHTML;
  if (selectedMode == "Paragraph") {
    paragraphMode();
  } else {
    lineMode();
  }
}

// Style up buttons on touch/click
function upButtonsStylesFunction(event) {
  event.preventDefault();
  if (event.type === "mouseenter") {
    this.style.WebkitTransform = "translate(-50%, -3px)";
    this.style.msTransform = "translate(-50%, -3px)";
    this.style.transform = "translate(-50%, -3px)";
  } else if (event.type === "mouseleave") {
    this.style.WebkitTransform = "translate(-50%, 0)";
    this.style.msTransform = "translate(-50%, 0)";
    this.style.transform = "translate(-50%, 0)";
  } else if (event.type === "touchstart") {
    this.style.WebkitTransform = "translate(-50%, -3px)";
    this.style.msTransform = "translate(-50%, -3px)";
    this.style.transform = "translate(-50%, -3px)";
  } else if (event.type === "touchend") {
    setTimeout(() => {
      this.style.WebkitTransform = "translate(-50%, 0)";
      this.style.msTransform = "translate(-50%, 0)";
      this.style.transform = "translate(-50%, 0)";
    }, 200);
  }
}

upButtonForLineMode.addEventListener("mouseenter", upButtonsStylesFunction);
upButtonForLineMode.addEventListener("mouseleave", upButtonsStylesFunction);
upButtonForLineMode.addEventListener("touchstart", upButtonsStylesFunction);
upButtonForLineMode.addEventListener("touchend", upButtonsStylesFunction);
upButtonForParagraphMode.addEventListener(
  "mouseenter",
  upButtonsStylesFunction
);
upButtonForParagraphMode.addEventListener(
  "mouseleave",
  upButtonsStylesFunction
);
upButtonForParagraphMode.addEventListener(
  "touchstart",
  upButtonsStylesFunction
);
upButtonForParagraphMode.addEventListener("touchend", upButtonsStylesFunction);

// Style down buttons on touch/click
function downButtonsStylesFunction(event) {
  event.preventDefault();
  if (event.type === "mouseenter") {
    this.style.WebkitTransform = "translate(-50%, 3px)";
    this.style.msTransform = "translate(-50%, 3px)";
    this.style.transform = "translate(-50%, 3px)";
  } else if (event.type === "mouseleave") {
    this.style.WebkitTransform = "translate(-50%, 0)";
    this.style.msTransform = "translate(-50%, 0)";
    this.style.transform = "translate(-50%, 0)";
  } else if (event.type === "touchstart") {
    this.style.WebkitTransform = "translate(-50%, 3px)";
    this.style.msTransform = "translate(-50%, 3px)";
    this.style.transform = "translate(-50%, 3px)";
  } else if (event.type === "touchend") {
    setTimeout(() => {
      this.style.WebbkitTransform = "translate(-50%, 0)";
      this.style.msTransform = "translate(-50%, 0)";
      this.style.transform = "translate(-50%, 0)";
    }, 200);
  }
}

downButtonForLineMode.addEventListener("mouseenter", downButtonsStylesFunction);
downButtonForLineMode.addEventListener("mouseleave", downButtonsStylesFunction);

downButtonForLineMode.addEventListener("touchstart", downButtonsStylesFunction);
downButtonForLineMode.addEventListener("touchend", downButtonsStylesFunction);

downButtonForParagraphMode.addEventListener(
  "mouseenter",
  downButtonsStylesFunction
);
downButtonForParagraphMode.addEventListener(
  "mouseleave",
  downButtonsStylesFunction
);

downButtonForParagraphMode.addEventListener(
  "touchstart",
  downButtonsStylesFunction
);
downButtonForParagraphMode.addEventListener(
  "touchend",
  downButtonsStylesFunction
);

// Style editor buttons on touch/click
function editorButtonsStylesFunction(event) {
  event.preventDefault();
  if (event.type === "mouseenter") {
    this.style.backgroundColor = "var(--third-color)";
  } else if (event.type === "mouseleave") {
    this.style.backgroundColor = "var(--fourth-color)";
  } else if (event.type === "touchstart") {
    this.style.backgroundColor = "var(--third-color)";
  } else if (event.type === "touchend") {
    this.style.backgroundColor = "var(--fourth-color)";
  }
}

editorButtons.forEach((editorButton) => {
  editorButton.addEventListener("mouseenter", editorButtonsStylesFunction);
  editorButton.addEventListener("mouseleave", editorButtonsStylesFunction);
  editorButton.addEventListener("touchstart", editorButtonsStylesFunction);
  editorButton.addEventListener("touchend", editorButtonsStylesFunction);
});

// Style submit button on touch/click
function submitButtonStylesFunction(event) {
  event.preventDefault(); // Prevent touch event from triggering the click event
  if (event.type === "mouseenter") {
    this.style.opacity = "0.75";
  } else if (event.type === "mouseleave") {
    this.style.opacity = "1";
  } else if (event.type === "touchstart") {
    this.style.opacity = "0.75";
  } else if (event.type === "touchend") {
    this.style.opacity = "1";
  }
}

submitButton.addEventListener("mouseenter", submitButtonStylesFunction);
submitButton.addEventListener("mouseleave", submitButtonStylesFunction);
submitButton.addEventListener("touchstart", submitButtonStylesFunction);
submitButton.addEventListener("touchend", submitButtonStylesFunction);
