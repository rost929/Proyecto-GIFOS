//import { cardMarkup } from "./Card-Markup.js";
//import { loadFavoriteCard } from "./Render-Favorite.js";
let arrayFavoriteCards = [];
let arrayFavorites = [];
/**
 * @method assignDownloadEvent
 * @description Asigns an event to element button 
 * @param {array, Integer}
 * @returns {}
 */

export const assignFavoriteEvent = (arrayFavoriteButtons, offset) => {
    arrayFavoriteButtons.forEach((element, index) => {
        arrayFavoriteCards.push(document.querySelector('#cardGifo' + (index + offset)).outerHTML);
        //console.log(arrayFavoriteCards[index]);
        element.addEventListener("click", function() {
            addFavoriteCardToLocalStorage(arrayFavoriteCards[index + offset]);
        });
    });
}

const addFavoriteCardToLocalStorage = (favoriteCard) => {
    let cards = localStorage.getItem("FAVORITES");
    console.log(cards);
    if (cards == null) {
        localStorage.setItem('FAVORITES', favoriteCard);
    } else {
        cards += favoriteCard;
        localStorage.setItem('FAVORITES', cards);
    }
}