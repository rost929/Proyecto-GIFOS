/**
 * Imports
 */
import { searchData, getGifDetail } from './API.js';

/*
Consts
*/
const endpointSearch = "https://api.giphy.com/v1/gifs/search?"
const btnElementSearch = document.querySelector(".btnBuscar");
const limit = 12;
const operacion = 1;

// Variables
let word = document.getElementById('buscador');

/**
 * functions
 */

/**
 * @method getGifsByWord
 * @description get a list of Gifs founded by a word
 * @param {} 
 * @returns {}
 */

function getGifsByWord() {
    const title = word.value;
    searchData(endpointSearch, word.value, limit)
        .then(response => {
            console.log(response.data)
            word.value = "";
            const gifsArray = response.data;
            getGifDetail(gifsArray, title, operacion);
        })
        .catch((error) => {
            console.log(error)
        });
}

/**
 * Events
 */
btnElementSearch.addEventListener('click', getGifsByWord);