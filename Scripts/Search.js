/**
 * Imports
 */
import { searchData, suggestData } from "./Requests.js";
import { prepareGifCardsBySearch } from './Card-Markup.js';
import { iterateSuggestedArray } from "./Suggestions.js";
import { endpointSearch, endpointSuggestions, limit } from "./Constants.js";

/*
Consts
*/

const btnElementSearch = document.querySelector(".btnBuscar");
const containerBoxParent = document.querySelector('.boxBtnShowMore');

// Variables
let word = document.getElementById('buscador');
let offset = 0;
/**
 * functions
 */

/**
 * @method getGifsByWord
 * @description get a list of Gifs founded by a word
 * @param {} 
 * @returns {}
 */

export function getGifsByWord(idEvent) {
    (idEvent == 1) ? offset += 12: offset = 0;
    const title = word.value;
    searchData(endpointSearch, word.value, limit, offset)
        .then(response => {
            const gifsArray = response.data;
            prepareGifCardsBySearch(gifsArray, title);
            containerBoxParent.innerHTML = createMoreGifsButton();
            getElementShowMore();
        })
        .catch((error) => {
            console.log(error)
        });
}

/**
 * @method createMoreGifsButton
 * @description Create an element button "Show More"
 * @param {} 
 * @returns {String}
 */
const createMoreGifsButton = () => { return (`<button class="btnShowMore">ver mas</button>`); }


const getElementShowMore = () => {
    const btnElementShowMore = document.querySelector('.btnShowMore');
    btnElementShowMore.addEventListener('click', function() { getGifsByWord(1) });
}

/**
 * Events
 */

btnElementSearch.addEventListener('click', function() { getGifsByWord(2) });

word.oninput = () => {
    suggestData(endpointSuggestions, word.value)
        .then(response => {
            iterateSuggestedArray(response.data);
        }).catch((error) => {
            console.log(error)
        });;
}