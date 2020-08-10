import { suggestTermsData } from "./Requests.js";
import { enpointTermsTrending } from "./Constants.js";
import { getGifsByWord } from "./Search.js";

//Consts
const containerSuggestedList = document.querySelector('.listSuggestions');
const conatinerTrendingTerms = document.querySelector('.boxWordsTrending');
const seperatorElement = document.querySelector('.separator');
const boxSuggestionsElement = document.querySelector('.boxSuggestions');
const inputSearchElement = document.querySelector('#buscador');

//Functions

const getTermstrending = () => {
    suggestTermsData(enpointTermsTrending)
        .then(response => {
            const termsArray = response.data.slice(0, 5);
            prepareTrendingTermsElements(termsArray);
        })
        .catch((error) => {
            console.log(error)
        });
}

getTermstrending();

const prepareTrendingTermsElements = (arrayTerms) => {
    let arrayTermsElements = []
    const terms = arrayTerms.map((term, index) => trendingTermsMarkup(term, index)); //allCardsMarkup(gif, index));
    conatinerTrendingTerms.innerHTML = terms.join(" , ");
    arrayTermsElements = arrayTerms.map((term, index) => {
        return document.getElementById('trendingTerm' + index)
    });
    assignEventsTrendingTerms(arrayTermsElements, arrayTerms);
}

const assignEventsTrendingTerms = (arrayElements, arrayTerms) => {
    arrayElements.map((term, index) => {
        term.addEventListener("click", function() {
            getAnchorValue(arrayTerms[index]);
        });
    });
}

const getAnchorValue = (word) => {
    inputSearchElement.value = "";
    inputSearchElement.value = word;
    getGifsByWord(word)
}

/**
 * @method iterateSuggestedArray
 * @description iterates an array to create a new suggested word element
 * @param {} 
 * @returns {}
 */
export const iterateSuggestedArray = (suggestedWords) => {
    // suggestedList = "";
    if (suggestedWords.length > 0) {
        boxSuggestionsElement.style.cssText = "margin-top: 20px";
        seperatorElement.style.visibility = "visible";
        const suggestions = suggestedWords.map((word) => SuggestedWordsMarkup(word.name));
        containerSuggestedList.innerHTML = suggestions.join("");
    } else {
        containerSuggestedList.innerHTML = "";
        seperatorElement.style.visibility = "hidden";
        boxSuggestionsElement.style.cssText = "margin-top: 0";
    }

}

const trendingTermsMarkup = (trendingTerm, index) => {
    return `<a class="infoTrending" id="trendingTerm${index}">${trendingTerm}</a>`
}

const SuggestedWordsMarkup = (suggestedWord) => {
    return (`<li class="itemSuggestion"><i class="icon-icon-search subIcon"></i>
    <div class="boxSuggestion"><label for="" class="suggestion">${suggestedWord}</label></div>
    </li>`);
}