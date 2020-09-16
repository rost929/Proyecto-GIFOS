const containerSuggestedList = document.querySelector('.listSuggestions');
const separatorSearch = document.querySelector('.separatorSearch');
const seperatorElement = document.querySelector('.separator');
const boxSuggestionsElement = document.querySelector('.boxSuggestions');


/**
 * @method hideSuggestionsBar
 * @description Hide the suggestions separator 
 * @param {} 
 * @returns {}
 */
export const hideSuggestionsBar = () => {
    containerSuggestedList.innerHTML = "";
    seperatorElement.style.visibility = "hidden";
    boxSuggestionsElement.style.cssText = "margin-top: 0";
}

/**
 * @method showSuggestionsBar
 * @description show the suggestions separator 
 * @param {} 
 * @returns {}
 */
export const showSuggestionBar = () => {
    boxSuggestionsElement.style.cssText = "margin-top: 20px";
    seperatorElement.style.visibility = "visible";
}

/**
 * @method showSeparatorSearchBar
 * @description show the search separator 
 * @param {} 
 * @returns {}
 */
export const showSeparatorSearchBar = () => {
    separatorSearch.style.visibility = "visible";
}

/**
 * @method hideSeparatorSearchBar
 * @description hide the search separator 
 * @param {} 
 * @returns {}
 */
export const hideSeparatorSearchBar = () => {
    separatorSearch.style.visibility = "hidden";
}


export const showFavoriteIcon = (htmlElement, index) => {
    //.style.cssText = "visibility: visible";
}

export const changeMessageCreation = (firstHtmlElement, secondHtmlElement, boxStep1, step1) => {
    firstHtmlElement.style.display = "none";
    secondHtmlElement.style.display = "block";
    turnOnStep(boxStep1, step1);
}

export const turnOffStep = (boxStep, step) => {
    boxStep.style.background = "white";
    step.style.color = "#572EE5"
}

export const turnOffButton = (HtmlButton) => {
    HtmlButton.style.display = "none";
}

export const turnOnButton = (HtmlButton) => {
    HtmlButton.style.display = "block";
    HtmlButton.style.marginLeft = "45%";
}

export const turnOnStep = (boxStep, step) => {
    boxStep.style.background = "#572EE5";
    step.style.color = "white"
}