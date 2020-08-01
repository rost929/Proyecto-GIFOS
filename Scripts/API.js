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

/**
 * Objects
 */

const api = {
    /**
     * @method searchData
     * @description Make a request 
     * @param {String, String} 
     * @returns {Promise}
     */
    searchData: ((URL, word) => {
        return new Promise((resolve, reject) => {
            fetch(`${URL}&api_key=${API_Key}&q=${word}`)
                .then((response) => resolve(response.json()))
                .catch((error) => reject(error))
        });
    }),
    /**
     * @method searchData
     * @description Make a request   
     * @param {String, String, Integer} 
     * @returns {Promise}
     */
    searchData: ((URL, word, limit) => {
        return new Promise((resolve, reject) => {
            fetch(`${URL}&api_key=${API_Key}&q=${word}&limit=${limit}`)
                .then((response) => resolve(response.json()))
                .catch((error) => reject(error))
        });
    }),
    /**
     * @method searchData
     * @description Make a request   
     * @param {String, Integer} 
     * @returns {Promise}
     */
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

/**
 * Functions
 */

/**
 * @method searchData
 * @description Make a request  
 * @param {String, String, String} 
 * @returns {Promise}
 */

export const searchData = ((URL, word, limit = 12, offset) => {
    const myLimit = limit ? `&limit=${limit}` : '';
    return new Promise((resolve, reject) => {
        fetch(`${URL}&api_key=${API_Key}&q=${word}${myLimit}&offset=${offset}`)
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error))
    });
});

/**
 * @method getGifDetail
 * @description Iterates the gif array and make a call to allCardsMarkup
 * @param {array} 
 * @returns {}
 */

export const getGifDetail = (gifs, wordTitle, operacion) => {
    gifsFounded = '';
    let imagesArray = [];
    gifs.forEach((gif) => {
        const { title, username, images } = gif;
        if (operacion === 1) {
            containerSearchTitle.innerHTML = `<h2 class="titleBusqueda">${wordTitle}</h2>`;
            containerCardsSearch.innerHTML = allCardsMarkupSearch(gif);
        } else {
            containerCardsTrending.innerHTML = allCardsMarkupTrend(gif);
            imagesArray.push(images.original.url);
        }
    });
    //(operacion == 1) ? containerBoxParent.innerHTML = createMoreGifsButton(): "Funciona";
    // console.log(imagesArray);
};

/**
 * @method allCardsMarkupSearch
 * @description Execute the calling to cardMarkup and concatenate the results as string 
 * @param {String} gif dnksndkds 
 * @returns {String} 
 */

const allCardsMarkupSearch = (gif) => {
    const { title, username, images } = gif;
    let user, titleGif = "";
    username == "" ? user = "Anonymous" : user = username;
    title == "" ? titleGif = "Nameless" : titleGif = title;
    gifsFounded += cardMarkup(titleGif, user, images.original.url);
    return gifsFounded;
};

/**
 * @method allCardsMarkupSearch
 * @description Execute the calling to cardMarkup and concatenate the results as string 
 * @param {Object} 
 * @returns {String}
 */

const allCardsMarkupTrend = (gif) => {
    const { title, username, images } = gif;
    let user, titleGif = "";
    username == "" ? user = "Anonymous" : user = username;
    title == "" ? titleGif = "Nameless" : titleGif = title;
    trendingGifs += cardMarkup(titleGif, user, images.downsized.url);
    return trendingGifs;
};

/**
 * @method cardMarkup
 * @description Write the card gif  
 * @param {Object} 
 * @returns {String}
 */

const cardMarkup = (title, username, img) => {
    return (
        `<div class="cardGifo">
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
};

/**
 * @method createMoreGifsButton
 * @description Create an element button
 * @param {} 
 * @returns {String}
 */
export const createMoreGifsButton = () => {
    return (`<button class="btnShowMore">ver mas</button>`);
}