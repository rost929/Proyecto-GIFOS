const containerSuggestedList = document.querySelector(".listSuggestions");
const separatorSearch = document.querySelector(".separatorSearch");
const seperatorElement = document.querySelector(".separator");
const boxSuggestionsElement = document.querySelector(".boxSuggestions");

/**
 * @method hideSuggestionsBar
 * @description Hide the suggestions separator
 * @param {}
 * @returns {}
 */
const hideSuggestionsBar = () => {
  containerSuggestedList.innerHTML = "";
  seperatorElement.style.visibility = "hidden";
  boxSuggestionsElement.style.cssText = "margin-top: 0";
  boxSuggestionsElement.style.display = "none";
};

/**
 * @method showSuggestionsBar
 * @description show the suggestions separator
 * @param {}
 * @returns {}
 */
const showSuggestionBar = () => {
  boxSuggestionsElement.style.cssText = "margin-top: 20px";
  seperatorElement.style.visibility = "visible";
  boxSuggestionsElement.style.display = "block";
};

/**
 * @method showSeparatorSearchBar
 * @description show the search separator
 * @param {}
 * @returns {}
 */
const showSeparatorSearchBar = () => {
  separatorSearch.style.visibility = "visible";
};

/**
 * @method hideSeparatorSearchBar
 * @description hide the search separator
 * @param {}
 * @returns {}
 */
const hideSeparatorSearchBar = () => {
  separatorSearch.style.visibility = "hidden";
};

const showFavoriteIcon = (htmlElement, index) => {
  //.style.cssText = "visibility: visible";
};

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

const turnOnStep = (boxStep, step) => {
  boxStep.style.background = "#572EE5";
  step.style.color = "white";
};

const turnOffStep = (boxStep, step) => {
  boxStep.style.background = "white";
  step.style.color = "#572EE5";
};

const showElement = (element) => {
  element.style.display = "block";
};

const hideElement = (element) => {
  element.style.display = "none";
};

const enableElement = (element) =>{
    element.style.visibility = "visible";
}
const disableElement = (element) => {
    element.style.visibility = "hidden";
}
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
  showFavoriteIcon,
};
