//import { loadFavoriteCard } from "./Render-Favorite.js";
/**
 * @method assignFavoriteEvent
 * @description Asigns an event to element button 
 * @param {array, array}
 * @returns {}
 */

export const assignFavoriteEvent = (arrayFavoriteButtons, gifsArray, counter = 0) => {
    arrayFavoriteButtons.forEach((element, index) => {
        element.addEventListener("click", function() {
            //const favoriteActive = document.querySelector("#btnFavAct" + index);
            //favoriteActive.style.visibility = "visible";
            const currentCard = document.querySelector("#cardGifo" + (index + counter));
            currentCard.remove();
            addFavoriteGifToLocalStorage(gifsArray[index]);
        });
    });
}

/**
 * @method addFavoriteGifToLocalStorage
 * @description add a gif to local storage 
 * @param {object}
 * @returns {}
 */
const addFavoriteGifToLocalStorage = (gif) => {
    const newGif = { title: gif.title, user: gif.user, gif: gif.gif }
    const resultsFound = JSON.parse(localStorage.getItem("FAVORITES"));
    if (resultsFound == null) {
        let favoriteGifs = []
        favoriteGifs.push(newGif);
        localStorage.setItem('FAVORITES', JSON.stringify(favoriteGifs));
    } else {
        resultsFound.push(newGif);
        localStorage.setItem('FAVORITES', JSON.stringify(resultsFound));
    }
}


export const removeFavorite = (arrayFavoriteButtons) => {
    arrayFavoriteButtons.forEach((element, index) => {
        element.addEventListener("click", function() {
            const favoriteCardSelected = document.querySelector("#cardGifoFav" + index);
            favoriteCardSelected.remove();
            removeFavforiteGifToLocalStorage(index);
        });
    });
}

/**
 * @method removeFavforiteGifToLocalStorage
 * @description add a gif to local storage 
 * @param {object}
 * @returns {}
 */
const removeFavforiteGifToLocalStorage = (index) => {
    const resultsFound = JSON.parse(localStorage.getItem("FAVORITES"));
    const newArray = resultsFound.filter((el, idx) => idx !== index);
    localStorage.setItem("FAVORITES", JSON.stringify(newArray));

}