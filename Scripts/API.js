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
let arrayGifsTrending = [];

/**
 * Objects
 */

const api = {
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
 * @param {String, String, Integer, Integer} 
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
 * @method suggestData
 * @description Make a request  
 * @param {String, String, Integer} 
 * @returns {Promise}
 */

export const suggestData = ((URL, word) => {
    // const myLimit = limit ? `&limit=${limit}` : '';
    return new Promise((resolve, reject) => {
        fetch(`${URL}&api_key=${API_Key}&q=${word}`)
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

export const getGifDetail = (gifs, wordTitle = "", operacion = "") => {
    gifsFounded = '';
    //let imagesArray = [];
    gifs.forEach((gif, index) => {
        const { title, username, images } = gif;
        if (operacion === 1) {
            containerSearchTitle.innerHTML = `<h2 class="titleBusqueda">${wordTitle}</h2>`;
            containerCardsSearch.innerHTML = allCardsMarkupSearch(gif);
        } else {
            containerCardsTrending.innerHTML = allCardsMarkupTrend(gif, index);
            // assignEventButtons();
        }
    });
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

const allCardsMarkupTrend = (gif, index) => {
    const { title, username, images } = gif;
    let user, titleGif = "";
    username == "" ? user = "Anonymous" : user = username;
    title == "" ? titleGif = "Nameless" : titleGif = title;
    arrayGifsTrending.push({ user: user, title: title, gif: images.downsized.url });
    trendingGifs += cardMarkup(titleGif, user, images.downsized.url, index);
    return trendingGifs;
};

/**
 * @method cardMarkup
 * @description Write the card gif  
 * @param {Object} 
 * @returns {String}
 */

const cardMarkup = (title, username, img, index) => {
    return (
        `<div class="cardGifo">
    <div class="boxBtnFavorite">
        <button class=" btn btnFavoriteGif" id="btnFav${index}"> <img src="./assets/icon-fav-hover.svg" alt="favorito" class="imgFavorite"><img src="./assets/icon-fav-active.svg" alt="favorito Activo" class="imgFavoriteActive" id="btnFavAct${index}"></button>
    </div>
    <div class="boxBtnDownload">
        <button class=" btn btnDownloadGif" id="btnDow${index}"> <img src="./assets/icon-download.svg" alt="Descargar" class="imgDownload"></button>
    </div>
    <div class="boxBtnMaximize">
        <button class=" btn btnMaximizeGif" id="btnMax${index}"> <img src="./assets/icon-max.svg" alt="Maximizar" class="imgMaximize"></button>
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


/**
 * @method assignEventButtons
 * @description Create an element button and assign an event
 * @param {} 
 * @returns {String}
 */

const assignEventButtons = () => {
    arrayGifsTrending.forEach((gif, index) => {
        let btnElementFav = document.getElementById('btnDow' + index);
        btnElementFav.addEventListener('click', showInformation);
    });
}


const showInformation = () => {
    console.log("funciona");
}