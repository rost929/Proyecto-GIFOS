const containerSuggestedList = document.querySelector(".listSuggestions");
const separatorSearch = document.querySelector(".separatorSearch");
const seperatorElement = document.querySelector(".separator");
const boxSuggestionsElement = document.querySelector(".boxSuggestions");

/**
 * @method hideSuggestionsBar
 * @description Hides the suggestions separator
 */
const hideSuggestionsBar = () => {
  containerSuggestedList.innerHTML = "";
  seperatorElement.style.visibility = "hidden";
  boxSuggestionsElement.style.cssText = "margin-top: 0";
  boxSuggestionsElement.style.display = "none";
};

/**
 * @method showSuggestionsBar
 * @description shows the suggestions separator
 */
const showSuggestionBar = () => {
  boxSuggestionsElement.style.cssText = "margin-top: 20px";
  seperatorElement.style.visibility = "visible";
  boxSuggestionsElement.style.display = "block";
};

/**
 * @method showSeparatorSearchBar
 * @description shows the search separator
 */
const showSeparatorSearchBar = () => {
  separatorSearch.style.visibility = "visible";
};

/**
 * @method hideSeparatorSearchBar
 * @description hides the search separator
 */
const hideSeparatorSearchBar = () => {
  separatorSearch.style.visibility = "hidden";
};

/**
 * @method changeMessageCreation
 * @description Triggers the visual elements of gifos creation
 */
const changeMessageCreation = (
  firstHtmlElement,
  secondHtmlElement,
  boxStep1,
  step1
) => {
  firstHtmlElement.style.display = "none";
  secondHtmlElement.style.display = "block";
  turnOnStep(boxStep1, step1);
};

/**
 * @method turnOnStep
 * @description Changes element background and color
 */
const turnOnStep = (boxStep, step) => {
  boxStep.style.background = "#572EE5";
  step.style.color = "white";
};
/**
 * @method turnOffStep
 * @description Changes element background and color
 */
const turnOffStep = (boxStep, step) => {
  boxStep.style.background = "white";
  step.style.color = "#572EE5";
};
/**
 * @method showElement
 * @description displays an element
 */
const showElement = (element) => {
  element.style.display = "block";
};
/**
 * @method hideElement
 * @description hides an element
 */
const hideElement = (element) => {
  element.style.display = "none";
};
/**
 * @method enableElement
 * @description changes element visibility
 */
const enableElement = (element) => {
  element.style.visibility = "visible";
};
/**
 * @method disableElement
 * @description changes element visibility
 */
const disableElement = (element) => {
  element.style.visibility = "hidden";
};
/**
 * @method showLoadingScreen
 * @description shows loading Message
 */
const showLoadingScreen = (element) => {
  element.style.opacity = "0.6";
  element.style.background = "#572ee5";
};

export {
  showElement,
  hideElement,
  enableElement,
  disableElement,
  turnOnStep,
  turnOffStep,
  showLoadingScreen,
  changeMessageCreation,
  showSuggestionBar,
  hideSuggestionsBar,
  showSeparatorSearchBar,
  hideSeparatorSearchBar,
};
