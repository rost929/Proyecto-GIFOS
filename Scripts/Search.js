/**
 * Imports
 */
import { searchData, prepareGifsFromSearch, createMoreGifsButton, suggestData } from './API.js';
import { iterateSuggestedArray } from "./Suggestions.js";
/*
Consts
*/
const endpointSearch = "https://api.giphy.com/v1/gifs/search?";
const endpointSuggestions = "https://api.giphy.com/v1/gifs/search/tags?";
const btnElementSearch = document.querySelector(".btnBuscar");
const containerBoxParent = document.querySelector('.boxBtnShowMore');

const limit = 12;
const operacion = 1;

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

function getGifsByWord(idEvent) {
    (idEvent == 1) ? offset += 12: offset = 0;
    const title = word.value;
    searchData(endpointSearch, word.value, limit, offset)
        .then(response => {
            const gifsArray = response.data;
            prepareGifsFromSearch(gifsArray, title);
            containerBoxParent.innerHTML = createMoreGifsButton();
            getElementShowMore();
        })
        .catch((error) => {
            console.log(error)
        });
}


function getElementShowMore() {
    const btnElementShowMore = document.querySelector('.btnShowMore');
    btnElementShowMore.addEventListener('click', function() { getGifsByWord(1) });
}

btnElementSearch.addEventListener('click', function() { getGifsByWord(2) });

word.oninput = () => {
    suggestData(endpointSuggestions, word.value)
        .then(response => {
            iterateSuggestedArray(response.data);
        }).catch((error) => {
            console.log(error)
        });;
}