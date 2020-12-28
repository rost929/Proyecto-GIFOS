import { prepareNoFavouriteResults } from "./No-Findings.js";
import { prepareMyGifos } from "./Card-Markup.js";

const containerFavoriteCards = document.querySelector(".boxCardsFavoritas");
//const containerNoResults = document.querySelector(".boxWithoutResults");

export const loadMyGifos = () => {
    const myGifos = JSON.parse(localStorage.getItem("MYGIFOS"));
    if (myGifos != null && (Object.keys(myGifos).length > 0)) {
        prepareMyGifos(myGifos);
       // containerNoResults.style.margin = "0";
    } else {
        //prepareNoFavouriteResults();
    }
}

loadMyGifos();