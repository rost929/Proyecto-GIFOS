/**
 * Imports
 */
import { searchData, getGifDetail, createMoreGifsButton, suggestData } from './API.js';
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
            console.log(response.data);
            // console.log("offset=", offset);
            //word.value = "";
            const gifsArray = response.data;
            getGifDetail(gifsArray, title, operacion);
            containerBoxParent.innerHTML = createMoreGifsButton();
            getElementShowMore();
            //offset += 12;
        })
        .catch((error) => {
            console.log(error)
        });
}


function getElementShowMore() {
    const btnElementShowMore = document.querySelector('.btnShowMore');
    btnElementShowMore.addEventListener('click', function() { getGifsByWord(1) });
}

/**
 * Events
 */
btnElementSearch.addEventListener('click', function() { getGifsByWord(2) });

//search
word.oninput = () => {
    suggestData(endpointSuggestions, word.value)
        .then(response => {
            //console.log(response.data);
            iterateSuggestedArray(response.data);
        }).catch((error) => {
            console.log(error)
        });;
}