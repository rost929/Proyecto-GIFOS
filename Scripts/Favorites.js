/**
 * @method assignDownloadEvent
 * @description Asigns an event to element button 
 * @param {array, array}
 * @returns {}
 */

export const assignFavoriteEvent = (arrayFavoriteButtons, cards) => {
    arrayFavoriteButtons.forEach((element, index) => {
        element.addEventListener("click", function() {
            addFavoriteCardToLocalStorage(cards[index]);
        });
    });
}

const addFavoriteCardToLocalStorage = (favoriteCard) => {
    let cards = localStorage.getItem("FAVORITES");
    if (cards == null) {
        localStorage.setItem('FAVORITES', favoriteCard);
    } else {
        cards += favoriteCard;
        localStorage.setItem('FAVORITES', cards);
    }
}