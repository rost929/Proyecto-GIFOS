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