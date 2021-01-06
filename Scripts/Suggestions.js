import { suggestTermsData } from "./Requests.js";
import { enpointTermsTrending } from "./Constants.js";
import { getGifsByWord } from "./Search.js";
import { showSuggestionBar, hideSuggestionsBar } from "./CSS-Controller.js";

//Consts
const containerSuggestedList = document.querySelector(".listSuggestions");
const conatinerTrendingTerms = document.querySelector(".boxWordsTrending");
const inputSearchElement = document.querySelector("#buscador");

//Functions

/**
 * @method getTermstrending
 * @description Make request to get the trending terms and start the process of creation
 * @param {}
 * @returns {}
 */
const getTermstrending = () => {
  suggestTermsData(enpointTermsTrending)
    .then((response) => {
      const termsArray = response.data.slice(0, 5);
      prepareTrendingTermsElements(termsArray);
    })
    .catch((error) => {
      console.log(error);
    });
};

getTermstrending();

/**
 * @method prepareTrendingTermsElements
 * @description Prepares the building of the terms and the assignment of events for each term
 * @param {Array}
 * @returns {}
 */
const prepareTrendingTermsElements = (arrayTerms) => {
  let arrayTermsElements = [];
  const terms = arrayTerms.map((term, index) =>
    trendingTermsMarkup(term, index)
  ); //allCardsMarkup(gif, index));
  conatinerTrendingTerms.innerHTML = terms.join(" , ");
  arrayTermsElements = arrayTerms.map((term, index) => {
    return document.getElementById("trendingTerm" + index);
  });
  assignEventsTrendingTerms(arrayTermsElements, arrayTerms);
};

/**
 * @method iterateSuggestedArray
 * @description iterates an array to create a new suggested word element
 * @param {}
 * @returns {}
 */
export const iterateSuggestedArray = (suggestedWords) => {
  if (suggestedWords.length > 0) {
    let arraySuggestionsElements = [];
    showSuggestionBar();
    const suggestions = suggestedWords.map((word, index) =>
      suggestedWordMarkup(word.name, index)
    );
    containerSuggestedList.innerHTML = suggestions.join("");
    arraySuggestionsElements = suggestedWords.map((term, index) => {
      return document.getElementById("suggestion" + index);
    });
    const words = suggestedWords.map((word) => {
      return word.name;
    });
    assignEventsTrendingTerms(arraySuggestionsElements, words);
  } else {
    hideSuggestionsBar();
  }
};

/**
 * @method trendingTermsMarkup
 * @description writes an returns the HTML body of a new term in trending
 * @param {String, Integer}
 * @returns {String}
 */

const trendingTermsMarkup = (trendingTerm, index) => {
  return `<a class="infoTrending" id="trendingTerm${index}">${trendingTerm}</a>`;
};

/**
 * @method suggestedWordMarkup
 * @description writes an returns the HTML body of a new suggestion
 * @param {String}
 * @returns {String}
 */
const suggestedWordMarkup = (suggestedWord, index) => {
  return `<li class="itemSuggestion"><i class="icon-icon-search subIcon"></i>
    <div class="boxSuggestion"><a class="suggestion" id="suggestion${index}">${suggestedWord}</a></div>
    </li>`;
};

/**
 * @method assignEventsTrendingTerms
 * @description Assigns the events for each trending term created
 * @param {Array, Array}
 * @returns {}
 */
const assignEventsTrendingTerms = (arrayElements, arrayTerms) => {
  arrayElements.map((term, index) => {
    term.addEventListener("click", function () {
      getAnchorValue(arrayTerms[index]);
    });
  });
};

/**
 * @method getAnchorValue
 * @description Recieves a term to make a request to obtain new gifs associated with that term
 * @param {String}
 * @returns {}
 */
const getAnchorValue = (term) => {
  inputSearchElement.value = "";
  inputSearchElement.value = term;
  hideSuggestionsBar();
  getGifsByWord(1);
};
