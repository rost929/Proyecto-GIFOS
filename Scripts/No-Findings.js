import { showSeparatorSearchBar } from "./CSS-Controller.js";

const containerSearchTitle = document.querySelector('.boxTitleBusqueda');
const containerWithoutResults = document.querySelector('.boxWithoutResults');
const containerResults = document.querySelector('.boxCardsBusquedas');

/**
 * @method prepareNoResultInfo
 * @description build the elements to notify the user no results during the search
 * @param {String}
 * @return {}
 */
export const prepareNoResultInfo = (wordTitle = "Any search") => {
    containerResults.innerHTML = "";
    showSeparatorSearchBar();
    containerSearchTitle.innerHTML = `<h2 class="titleBusqueda">${wordTitle}</h2>`;
    containerWithoutResults.innerHTML = `<img src="./assets/icon-busqueda-sin-resultado.svg" alt="Sin resultados" class="imgWithoutResults">
                                        <p class="tryAgainMessage">Intenta con otra busqueda.</p>`;
}

/**
 * @method prepareNoFavouriteResults
 * @description build the elements to notify the user no results during the search
 * @param {String}
 * @return {}
 */
export const prepareNoFavouriteResults = () => {
    containerWithoutResults.innerHTML = `<img src="./assets/FavoritesNoResults.jpeg" alt="Sin resultados" class="imgWithoutResults">
                                        <p class="tryAgainMessage">"¡ Guarda tu primer GIFO en Favoritos</p>
                                        <p class="tryAgainMessage">para que se muestre aquí !"</p>`;
}