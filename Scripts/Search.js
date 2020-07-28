/**
 * Imports
 */
import api from './API.js';

/*
Consts
*/
const endpoint = "https://api.giphy.com/v1/gifs/search?"
const word = "funny";
const API_Key = "&api_key=cpG5KiG4E7yqmP5WTNd8nnWkzDfvFUWW";
//const btnElement = document.querySelector('.btnProbar');

function getRandomGifs() {
    fetch(endpoint + API_Key + "&q=" + word)

    .then(response => {
            return response
        }).then(miJson => {
            console.log(miJson.json());
        })
        .catch(err => {
            console.log(err);
        });
}


//btnElement.addEventListener('click', getRandomGifs);


// fetch("api.giphy.com/v1/gifs/search?&api_key=cpG5KiG4E7yqmP5WTNd8nnWkzDfvFUWW&q=funny")