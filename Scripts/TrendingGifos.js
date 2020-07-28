/**
 * Imports
 */
import api from './API.js';

/*
Consts
*/
const endpointTrending = "https://api.giphy.com/v1/gifs/trending?"
const API_Key = "cpG5KiG4E7yqmP5WTNd8nnWkzDfvFUWW";
const divElementContainerCards = document.querySelector('.boxGIFOS');
const btnElement = document.querySelector('.btnProbar');
const limit = 10;
/*
Variables
*/

let trendingGifs = '';

/**
 * @method getgetTrendingGifs
 * @description 
 * @param {array} Gifs
 * @returns {}
 */

function getTrendingGifs() {
    trendingGifs = '';
    const { trendingData } = api;
    trendingData(endpointTrending, API_Key, limit)
        .then(response => {
            console.log(response.data)
            const gifsArray = response.data;
            getGifDetail(gifsArray);
        })
        .catch((error) => {
            console.log(error)
        });
}

/**
 * @method getPokemonDetail
 * @description 
 * @param {array} 
 * @returns {}
 */
const getGifDetail = ((gifs) => {
    // const { pokemonsDetail } = api;
    //let allPromises = []
    gifs.forEach((gif) => {
        const { title, username, images } = gif;
        divElementContainerCards.innerHTML = allCardsMarkup(gif);
    })
});

const allCardsMarkup = ((gif) => {
    const { title, username, images } = gif;
    trendingGifs += cardMarkup(title, username, images.downsized.url);
    return trendingGifs;
});

const cardMarkup = ((title, username, img) => {
    return (
        `<div class="cardGIF">
    <div class="boxBtnFavorite">
        <button class=" btn btnFavoriteGif"> <img src="./assets/icon-fav-hover.svg" alt="favorito" class="imgFavorite"><img src="./assets/icon-fav-active.svg" alt="favorito Activo" class="imgFavoriteActive"></button>
    </div>
    <div class="boxBtnDownload">
        <button class=" btn btnDownloadGif"> <img src="./assets/icon-download.svg" alt="Descargar" class="imgDownload"></button>
    </div>
    <div class="boxBtnMaximize">
        <button class=" btn btnMaximizeGif"> <img src="./assets/icon-max.svg" alt="Maximizar" class="imgMaximize"></button>
    </div>
    <h3 class="userGif">User: ${username}</h3>
    <h3 class="tituloGif">${title}</h3>
    <img class="gif" src=${img} alt="Gif trending">  
    </div>`
    );
});

getTrendingGifs();

//btnElement.addEventListener('click', getTrendingGifs);