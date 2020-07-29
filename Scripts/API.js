/*
Consts
*/

const API_Key = "cpG5KiG4E7yqmP5WTNd8nnWkzDfvFUWW";
const containerCardsSearch = document.querySelector('.boxCardsBusquedas');
const containerCardsTrending = document.querySelector('.boxGIFOS');
const containerSearchTitle = document.querySelector('.boxTitleBusqueda');

/*
Variables
*/
let trendingGifs = '';
let gifsFounded = '';


const api = {
    searchData: ((URL, word) => {
        return new Promise((resolve, reject) => {
            fetch(`${URL}&api_key=${API_Key}&q=${word}`)
                .then((response) => resolve(response.json()))
                .catch((error) => reject(error))
        });
    }),
    searchData: ((URL, word, limit) => {
        return new Promise((resolve, reject) => {
            fetch(`${URL}&api_key=${API_Key}&q=${word}&limit=${limit}`)
                .then((response) => resolve(response.json()))
                .catch((error) => reject(error))
        });
    }),
    trendingData: ((URL, limit = 12) => {
        const myLimit2 = limit ? `&limit=${limit}` : '';
        return new Promise((resolve, reject) => {
            fetch(`${URL}&api_key=${API_Key}&limit=${myLimit2}`)
                .then((response) => resolve(response.json()))
                .catch((error) => reject(error))
        });
    })
};

export default api;

export const searchData = ((URL, word, limit = 12) => {
    const myLimit = limit ? `&limit=${limit}` : '';
    return new Promise((resolve, reject) => {
        fetch(`${URL}&api_key=${API_Key}&q=${word}${myLimit}`)
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error))
    });
});


/**
 * @method getGifDetail
 * @description Funcion para iterar el array obtenido del JSON
 * @param {array} 
 * @returns {}
 */

export const getGifDetail = (gifs, wordTitle, operacion) => {
    gifsFounded = '';
    gifs.forEach((gif) => {
        const { title, username, images } = gif;
        if (operacion === 1) {
            containerSearchTitle.innerHTML = `<h2 class="titleBusqueda">${wordTitle}</h2>`;
            containerCardsSearch.innerHTML = allCardsMarkupSearch(gif);
            //titleMarkup(gif);
        } else {
            containerCardsTrending.innerHTML = allCardsMarkupTrend(gif);
        }

    })
};

const allCardsMarkupSearch = (gif) => {
    const { title, username, images } = gif;
    gifsFounded += cardMarkup(title, username, images.downsized.url);
    return gifsFounded;
};

const allCardsMarkupTrend = (gif) => {
    const { title, username, images } = gif;
    trendingGifs += cardMarkup(title, username, images.downsized.url);
    return trendingGifs;
};

const titleMarkup = (title) => {

}

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
    <img class="gifo" src=${img} alt="Gif trending">  
    </div>`
    );
});