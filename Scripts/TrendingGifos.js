/**
 * Imports
 */
import { getGifTrendingDetail, trendingData } from "./API.js";

/*
Consts
*/
const endpointTrending = "https://api.giphy.com/v1/gifs/trending?";
const buttonSiguiente = document.querySelector(".btnSiguiente");
const buttonAtras = document.querySelector(".btnAtras");
const limit = 12;

/**
 * Functions
 */

/**
 * @method desplazarALaDerecha
 * @description desplazamiento de gifs en tendencia hacia la derecha
 * @param {} 
 * @returns {}
 */
function desplazarALaDerecha() {
    document.querySelector(".boxGIFOS").scrollLeft += 300;
}

/**
 * @method desplazarALaIzquierda
 * @description desplazamiento de gifs en tendencia hacia la izquierda
 * @param {} 
 * @returns {}
 */

function desplazarALaIzquierda() {
    document.querySelector(".boxGIFOS").scrollLeft += -300;
}


/**
 * @method getTrendingGifs
 * @description 
 * @param {array} Gifs
 * @returns {}
 */

function getTrendingGifs() {
    trendingData(endpointTrending, limit)
        .then(response => {
            //console.log(response.data)
            const gifsArray = response.data;
            getGifTrendingDetail(gifsArray);
        })
        .catch((error) => {
            console.log(error)
        });
}

getTrendingGifs();

/**
 * Events
 */

buttonSiguiente.addEventListener("mousedown", desplazarALaDerecha);
buttonAtras.addEventListener('mousedown', desplazarALaIzquierda);