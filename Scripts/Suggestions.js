import { suggestTermsData } from "./Requests.js";
import { enpointTermsTrending } from "./Constants.js";

//Consts
const containerSuggestedList = document.querySelector('.listSuggestions');
const seperatorElement = document.querySelector(".separator");
const boxSuggestionsElement = document.querySelector(".boxSuggestions");


//Variables
let suggestedList = '';

//Functions

const getTermstrending = () => {
    suggestTermsData(enpointTermsTrending)
        .then(response => {
            const termssArray = response.data;
            console.log(termssArray);
            // prepareGifsFromSearch(termssArray, title);
        })
        .catch((error) => {
            console.log(error)
        });
}

getTermstrending();


/**
 * @method iterateSuggestedArray
 * @description iterates an array to create a new suggested word element
 * @param {} 
 * @returns {}
 */
export const iterateSuggestedArray = (suggestedWords) => {
    suggestedList = "";
    if (suggestedWords.length > 0) {
        boxSuggestionsElement.style.cssText = "margin-top: 20px";
        seperatorElement.style.visibility = "visible";
        suggestedWords.forEach((word) => {
            containerSuggestedList.innerHTML = allSuggestedWordsMarkup(word);
        });
    } else {
        containerSuggestedList.innerHTML = "";
        seperatorElement.style.visibility = "hidden";
        boxSuggestionsElement.style.cssText = "margin-top: 0";
    }

}

const allSuggestedWordsMarkup = (word) => {
    suggestedList += SuggestedWordsMarkup(word.name);
    return suggestedList;
}

const SuggestedWordsMarkup = (suggestedWord) => {
    return (`<li class="itemSuggestion"><i class="icon-icon-search subIcon"></i>
    <div class="boxSuggestion"><label for="" class="suggestion">${suggestedWord}</label></div>
    </li>`);
}