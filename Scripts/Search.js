/**
 * Imports
 */
import { searchData, suggestData } from "./Requests.js";
import { prepareGifCardsBySearch } from "./Card-Markup.js";
import { iterateSuggestedArray } from "./Suggestions.js";
import { endpointSearch, endpointSuggestions, limit } from "./Constants.js";
import { prepareNoResultInfo } from "./No-Findings.js";

/*
Consts
*/
const btnElementSearch = document.querySelector(".btnBuscar");
const containerBoxParent = document.querySelector(".boxBtnShowMore");
const containerNoResults = document.querySelector(".boxWithoutResults");
const word = document.getElementById("buscador");
const containerSuggestions = document.querySelector(".boxSuggestions");

// Variables
let offset = 0;

/**
 * @method getGifsByWord
 * @description get a list of Gifs founded by a word
 * @param {}
 * @returns {}
 */

export function getGifsByWord(idEvent) {
  idEvent == 1 ? (offset = 0) : (offset += 12);
  const title = word.value;
  searchData(endpointSearch, word.value, limit, offset)
    .then((response) => {
      if (response.data.length > 0) {
        containerNoResults.innerHTML = "";
        prepareGifCardsBySearch(response.data, title);
        containerBoxParent.innerHTML = createMoreGifsButton();
        getElementShowMore();
      } else {
        prepareNoResultInfo(title);
      }
    })
    .catch((error) => {
      prepareNoResultInfo(title);
      console.log(error);
    });
}

/**
 * @method createMoreGifsButton
 * @description Create an element button "Show More"
 * @param {}
 * @returns {String}
 */
const createMoreGifsButton = () => {
  return `<button class="btnShowMore">ver mas</button>`;
};

/**
 * @method searchByEtner
 * @description Validates if the key pressed was enter key
 * @param {}
 * @returns {String}
 */
const searchByEtner = (e) => {
    const isEnterKey = e.keyCode === 13;
    console.log(isEnterKey);
    if (isEnterKey === true){
        getGifsByWord(1);
    }
}

const getElementShowMore = () => {
    const btnElementShowMore = document.querySelector(".btnShowMore");
    btnElementShowMore.addEventListener("click", function () {
      getGifsByWord(2);
    });
  };

/**
 * Events
 */

btnElementSearch.addEventListener("click", function () {
  getGifsByWord(1);
});
word.addEventListener("keyup", searchByEtner);

word.oninput = () => {
  suggestData(endpointSuggestions, word.value)
    .then((response) => {
      iterateSuggestedArray(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};


