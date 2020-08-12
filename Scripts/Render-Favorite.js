const containerFavoriteCards = document.querySelector(".boxCardsFavoritas");

export const loadFavoriteCard = () => {
    const cards = localStorage.getItem("FAVORITES");
    if (cards != null) {
        containerFavoriteCards.innerHTML += cards;
    }
}

loadFavoriteCard();