import { assignDownloadEvent } from "./Download.js";

//Consts
const containerSearchTitle = document.querySelector('.boxTitleBusqueda');
const containerCardsSearch = document.querySelector('.boxCardsBusquedas');
const containerCardsTrending = document.querySelector('.boxGIFOS');

//Variables
let gifCardsHTML = '';
let arrayGifsTrending = [];
let arrayGifsFound = [];
let arrayDownloadButtons = [];

/**
 * Functions
 */
/**
 * @method prepareGifCardsBySearch
 * @description Iterates the gif array and make a call to allCardsMarkup
 * @param {array} 
 * @returns {}
 */

export const prepareGifCardsBySearch = (gifs, wordTitle = "") => {
    arrayGifsFound = validateEmptyFields(gifs);
    const cards = arrayGifsFound.map((gif, index) => cardMarkup(gif.title, gif.user, gif.gif, index + 12)); //allCardsMarkup(gif, index + 12));
    containerSearchTitle.innerHTML = `<h2 class="titleBusqueda">${wordTitle}</h2>`;
    containerCardsSearch.innerHTML = cards.join("\n");
    arrayDownloadButtons = gifs.map((gif, index) => { return document.getElementById('btnDow' + (index + 12)) });
    console.log(arrayDownloadButtons);
    assignDownloadEvent(arrayDownloadButtons, arrayGifsFound);
};

/**
 * @method prepareTrendingGifCards
 * @description Iterates the gif array and make a call to allCardsMarkup
 * @param {array} 
 * @returns {}
 */

export const prepareTrendingGifCards = (gifs) => {
    arrayGifsTrending = validateEmptyFields(gifs);
    const cards = arrayGifsTrending.map((gif, index) => cardMarkup(gif.title, gif.user, gif.gif, index)); //allCardsMarkup(gif, index));
    containerCardsTrending.innerHTML = cards.join("\n");
    arrayDownloadButtons = gifs.map((gif, index) => {
        return document.getElementById('btnDow' + index)
    });

    assignDownloadEvent(arrayDownloadButtons, arrayGifsTrending);
};


/**
 * @method cardMarkup
 * @description Write the card gif  
 * @param {Object} 
 * @returns {String}
 */

const cardMarkup = (title, username, img, index) => {
    return (
        `<div class="cardGifo">
    <div class="boxBtnFavorite">
        <button class=" btn btnFavoriteGif" id="btnFav${index}"> <img src="./assets/icon-fav-hover.svg" alt="favorito" class="imgFavorite"><img src="./assets/icon-fav-active.svg" alt="favorito Activo" class="imgFavoriteActive" id="btnFavAct${index}"></button>
    </div>
    <div class="boxBtnDownload">
        <a class=" btn btnDownloadGif" id="btnDow${index}"> <img src="./assets/icon-download.svg" alt="Descargar" class="imgDownload"></a>
    </div>
    <div class="boxBtnMaximize">
        <button class=" btn btnMaximizeGif" id="btnMax${index}"> <img src="./assets/icon-max.svg" alt="Maximizar" class="imgMaximize"></button>
    </div>
    <h3 class="userGif">User: ${username}</h3>
    <h3 class="tituloGif">${title}</h3>
    <img class="gifo" src=${img} alt="Gif trending">  
    </div>`
    );
};

/**
 * @method validateEmptyFields
 * @description validates if exists empty fields in user and title attributes
 * @param {array} arrayToValid 
 * @return {array} 
 */
function validateEmptyFields(arrayToValid) {
    let validatedArray = []
    validatedArray = arrayToValid.map((gif) => {
        const { title, username, images } = gif;
        let user, titleGif;
        username == "" ? user = "Anonymous" : user = username;
        title == "" ? titleGif = "Nameless" : titleGif = title;
        return { user: user, title: titleGif, gif: images.downsized.url };
    });
    const existingGifsArray = validatedArray.filter(gif => !!(gif.gif));
    return existingGifsArray;
}