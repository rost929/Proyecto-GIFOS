/**
 * Imports
 */
//import api from './API.js';
import { searchData, getGifDetail } from './API.js';



/*
Consts
*/
const endpointSearch = "https://api.giphy.com/v1/gifs/search?"
const btnElementSearch = document.querySelector(".btnBuscar");
let word = document.getElementById('buscador');
const limit = 12;
const operacion = 1;

/**
 * 
 */
function getGifsByWord() {
    //gifsFounded = '';
    //const { searchData } = api;
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

btnElementSearch.addEventListener('click', getGifsByWord);


// fetch("api.giphy.com/v1/gifs/search?&api_key=cpG5KiG4E7yqmP5WTNd8nnWkzDfvFUWW&q=funny");