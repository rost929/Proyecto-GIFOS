import { assignDownloadEvent } from "./Download.js";
import {
  showSeparatorSearchBar,
  hideSuggestionsBar,
} from "./CSS-Controller.js";
import { assignFavoriteEvent, removeFavorite } from "./Favorites.js";
import { assignMaxEvent , assignMaxEventMyGifos} from "./Modal-Windows.js";
import { assignDownloadEventMyGifos, removeGifo } from "./MyGifos.js";
import { username } from "./Constants.js";
//Consts
const containerSearchTitle = document.querySelector(".boxTitleBusqueda");
const containerCardsSearch = document.querySelector(".boxCardsBusquedas");
const containerCardsTrending = document.querySelector(".boxGIFOS");
const containerFavoriteCards = document.querySelector(".boxCardsFavoritas");
const containerMyGifs = document.querySelector(".boxCardsMisGifs");

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
  let idCounter = parseInt(localStorage.getItem("ID-COUNTER"));
  console.log("ID counter " + idCounter);
  const arrayGifsFound = validateEmptyFields(gifs);
  const cards = arrayGifsFound.map((gif, index) =>
    cardMarkup(gif.title, gif.user, gif.gif, index + idCounter)
  );
  hideSuggestionsBar();
  showSeparatorSearchBar();
  containerSearchTitle.innerHTML = `<h2 class="titleBusqueda">${wordTitle}</h2>`;
  containerCardsSearch.innerHTML = cards.join("\n");
  let arrayDownloadButtons = arrayGifsFound.map((gif, index) => {
    return document.querySelector("#btnDow" + (index + idCounter));
  });
  let arrayFavoriteButtons = arrayGifsFound.map((gif, index) => {
    return document.querySelector("#btnFav" + (index + idCounter));
  });
  let arrayMaxButtons = arrayGifsFound.map((gif, index) => {
    return document.querySelector("#btnMax" + (index + idCounter));
  });
  console.log(arrayMaxButtons);
  assignFavoriteEvent(arrayFavoriteButtons, arrayGifsFound, idCounter);
  assignDownloadEvent(arrayDownloadButtons, arrayGifsFound);
  assignMaxEvent(arrayMaxButtons, arrayGifsFound);
  idCounter += 12;
  localStorage.setItem("ID-COUNTER", idCounter);
};

/**
 * @method prepareTrendingGifCards
 * @description Iterates the gif array and make a call to allCardsMarkup
 * @param {array}
 * @returns {}
 */

export const prepareTrendingGifCards = (gifs) => {
  let arrayGifsTrending = validateEmptyFields(gifs);
  const cards = arrayGifsTrending.map((gif, index) =>
    cardMarkup(gif.title, gif.user, gif.gif, index)
  );
  containerCardsTrending.innerHTML = cards.join("\n");
  const arrayDownloadButtons = arrayGifsTrending.map((gif, index) => {
    return document.querySelector("#btnDow" + index);
  });
  const arrayFavoriteButtons = arrayGifsTrending.map((gif, index) => {
    return document.querySelector("#btnFav" + index);
  });
  const arrayMaxButtons = arrayGifsTrending.map((gif, index) => {
    return document.querySelector("#btnMax" + index);
  });
  assignFavoriteEvent(arrayFavoriteButtons, arrayGifsTrending);
  assignDownloadEvent(arrayDownloadButtons, arrayGifsTrending);
  assignMaxEvent(arrayMaxButtons, arrayGifsTrending);
  localStorage.setItem("ID-COUNTER", 12);
};

export const prepareFavoriteGifs = (arrayFavoriteGifs) => {
  const cards = arrayFavoriteGifs.map((gif, index) =>
    cardFavoriteMarkup(gif.title, gif.user, gif.gif, index)
  );
  containerFavoriteCards.innerHTML = cards.join("\n");
  const arrayDownloadButtons = arrayFavoriteGifs.map((gif, index) => {
    return document.querySelector("#btnDowA" + index);
  });
  const arrayFavoriteButtons = arrayFavoriteGifs.map((gif, index) => {
    return document.querySelector("#btnFavA" + index);
  });
  const arrayMaxButtons = arrayFavoriteGifs.map((gif, index) => {
    return document.querySelector("#btnMaxA" + index);
  });
  removeFavorite(arrayFavoriteButtons);
  assignDownloadEvent(arrayDownloadButtons, arrayFavoriteGifs);
  assignMaxEvent(arrayMaxButtons, arrayFavoriteGifs);
  //localStorage.setItem("ID-COUNTER", 12);
};

export const prepareMyGifos = (arrayMyGifos) => {
  const cards = arrayMyGifos.map((gif, index) =>
    cardMyGifosMarkup("My Gif", username, gif.images.original.url, index)
  );
  containerMyGifs.innerHTML = cards.join("\n");
  const arrayDownloadButtons = arrayMyGifos.map((gif, index) => {
    return document.querySelector("#btnDowM" + index);
  });
  const arrayMaxButtons = arrayMyGifos.map((gif, index) => {
    return document.querySelector("#btnMaxM" + index);
  });
  const arrayDeleteButtons = arrayMyGifos.map((gif, index) => {
    return document.querySelector("#btnDelM" + index);
  });
  assignDownloadEventMyGifos(arrayDownloadButtons, arrayMyGifos);
  assignMaxEventMyGifos(arrayMaxButtons, arrayMyGifos);
  removeGifo(arrayDeleteButtons);
  //localStorage.setItem("ID-COUNTER", 12);
};

/**
 * @method cardMarkup
 * @description Write the card gif
 * @param {Object}
 * @returns {String}
 */

export const cardMarkup = (title, username, img, index) => {
  return `<div class="cardGifo" id=cardGifo${index}>
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
    </div>`;
};

/**
 * @method cardFavoriteMarkup
 * @description Write the favorite  gifs cards
 * @param {Object}
 * @returns {String}
 */

export const cardFavoriteMarkup = (title, username, img, index) => {
  return `<div class="cardGifo" id=cardGifoFav${index}>
    <div class="boxBtnFavorite">
        <button class=" btn btnFavoriteGif" id="btnFavA${index}"><img src="./assets/icon-fav-active.svg" alt="favorito Activo" class="imgFavoriteSaved" id="btnFavAct${index}"></button>
    </div>
    <div class="boxBtnDownload">
        <a class=" btn btnDownloadGif" id="btnDowA${index}"> <img src="./assets/icon-download.svg" alt="Descargar" class="imgDownload"></a>
    </div>
    <div class="boxBtnMaximize">
        <button class=" btn btnMaximizeGif" id="btnMaxA${index}"> <img src="./assets/icon-max.svg" alt="Maximizar" class="imgMaximize"></button>
    </div>
    <h3 class="userGif">User: ${username}</h3>
    <h3 class="tituloGif">${title}</h3>
    <img class="gifo" src=${img} alt="Gif trending">  
    </div>`;
};

/**
 * @method cardMyGifosMarkup
 * @description Write the favorite  gifs cards
 * @param {Object}
 * @returns {String}
 */

export const cardMyGifosMarkup = (title, username, img, index) => {
  return `<div class="cardGifo" id=cardMyGifo${index}>
    <div class="boxBtnDelete">
        <button class=" btn btnDeleteGif" id="btnDelM${index}"><img src="./assets/icon_trash.svg" alt="Eliminar" class="imgDeleteActive" id="btnDelete${index}"></button>
    </div>
    <div class="boxBtnDownload">
        <a class=" btn btnDownloadGif" id="btnDowM${index}"> <img src="./assets/icon-download.svg" alt="Descargar" class="imgDownload"></a>
    </div>
    <div class="boxBtnMaximize">
        <button class=" btn btnMaximizeGif" id="btnMaxM${index}"> <img src="./assets/icon-max.svg" alt="Maximizar" class="imgMaximize"></button>
    </div>
    <h3 class="userGif">User: ${username}</h3>
    <h3 class="tituloGif">${title}</h3>
    <img class="gifo" src=${img} alt="Gif trending">  
    </div>`;
};

/**
 * @method validateEmptyFields
 * @description validates if exists empty fields in user and title attributes
 * @param {array} arrayToValid
 * @return {array}
 */
function validateEmptyFields(arrayToValid) {
  let validatedArray = [];
  validatedArray = arrayToValid.map((gif) => {
    const { title, username, images } = gif;
    let user, titleGif;
    username == "" ? (user = "Anonymous") : (user = username);
    title == "" ? (titleGif = "Nameless") : (titleGif = title);
    return { user: user, title: titleGif, gif: images.downsized.url };
  });
  const existingGifsArray = validatedArray.filter((gif) => !!gif.gif);
  return existingGifsArray;
}

const resetArrayEvents = () => {
  arrayDownloadButtons = [];
  arrayFavoriteButtons = [];
};
