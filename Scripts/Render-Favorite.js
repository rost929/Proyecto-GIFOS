import { prepareNoFavouriteResults } from "./No-Findings.js";
import { prepareFavoriteGifs } from "./Card-Markup.js";

const containerFavoriteCards = document.querySelector(".boxCardsFavoritas");
const containerNoResults = document.querySelector(".boxWithoutResults");

export const loadFavoriteCard = () => {
    const favoriteGifs = JSON.parse(localStorage.getItem("FAVORITES"));
    if (favoriteGifs != null && (Object.keys(favoriteGifs).length > 0)) {
        prepareFavoriteGifs(favoriteGifs);
        containerNoResults.style.margin = "0";
    } else {
        prepareNoFavouriteResults();
    }
}

loadFavoriteCard();