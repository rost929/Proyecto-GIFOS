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
let arrayDownloadButtons = [];

/**
 * Functions
 */

/**
 * @method searchData
 * @description Make a request   
 * @param {String, Integer} 
 * @returns {Promise}
 */
export const trendingData = ((URL, limit = 12) => {
    const myLimit2 = limit ? `&limit=${limit}` : '';
    return new Promise((resolve, reject) => {
        fetch(`${URL}&api_key=${API_Key}&limit=${myLimit2}`)
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error))
    });
});

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

export const getGifDetail = (gifs, wordTitle = "") => {
    gifsFounded = '';
    //let imagesArray = [];
    gifs.forEach((gif, index) => {
        index += 12;
        containerSearchTitle.innerHTML = `<h2 class="titleBusqueda">${wordTitle}</h2>`;
        containerCardsSearch.innerHTML = allCardsMarkupSearch(gif, index);
    });
};

/**
 * @method allCardsMarkupSearch
 * @description Execute the calling to cardMarkup and concatenate the results as string 
 * @param {String} gif dnksndkds 
 * @returns {String} 
 */

const allCardsMarkupSearch = (gif, index) => {
    const { title, username, images } = gif;
    let user, titleGif = "";
    username == "" ? user = "Anonymous" : user = username;
    title == "" ? titleGif = "Nameless" : titleGif = title;
    gifsFounded += cardMarkup(titleGif, user, images.original.url, index);
    return gifsFounded;
};

/**
 * @method getGifTrendingDetail
 * @description Iterates the gif array and make a call to allCardsMarkup
 * @param {array} 
 * @returns {}
 */

export const getGifTrendingDetail = (gifs) => {
    //trendingGifs = '';
    arrayDownloadButtons = [];
    arrayGifsTrending = validateEmptyFields(gifs);
    const cards = arrayGifsTrending.map((gif, index) => allCardsMarkupTrend(gif, index));
    containerCardsTrending.innerHTML = cards.join("\n");
    arrayDownloadButtons = gifs.map((gif, index) => { return document.getElementById('btnDow' + index) });
    assignDownloadEvent(arrayDownloadButtons);
};

/**
 * @method validateEmptyFields
 * @description validates if exists empty fields in user and title attributes
 * @param {array} arrayToValid 
 * @return {array} 
 */
function validateEmptyFields(arrayToValid) {
    let validatedArray = []
    validatedArray = arrayToValid.map((gif) => {
        const { title, username, images } = gif;
        let user, titleGif;
        username == "" ? user = "Anonymous" : user = username;
        title == "" ? titleGif = "Nameless" : titleGif = title;
        return { user: user, title: titleGif, gif: images.downsized.url };
    });
    return validatedArray;
}


/**
 * @method allCardsMarkupTrend
 * @description Execute the calling to cardMarkup and concatenate the results as string 
 * @param {Object, integer} 
 * @returns {String}
 */

const allCardsMarkupTrend = (gif, index) => {
    trendingGifs = '';
    trendingGifs += cardMarkup(gif.title, gif.user, gif.gif, index);
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
        <a class=" btn btnDownloadGif" id="btnDow${index}"> <img src="./assets/icon-download.svg" alt="Descargar" class="imgDownload"></a>
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
 * @method assignDownloadEvent
 * @description Asigns an event to element button 
 * @param {} 
 * @returns {}
 */
const assignDownloadEvent = (arrayDownloadButtons) => {
    arrayDownloadButtons.forEach((element, index) => {
        let imgURL = arrayGifsTrending[index].gif;
        element.addEventListener("click", function() {
            // console.log("clickeado");
            downloadGifo(imgURL, element);
        });
    });
}

const downloadGifo = (imageURL, /** @type {HTMLAnchorElement} */ elementAnchorDown) => {
    // const newAnchor = document.createElement("a");
    const myRequest = new Request(imageURL);
    if (!elementAnchorDown.getAttribute("href")) {
        fetch(myRequest)
            .then((response) => response.blob())
            .then(function(myBlob) {
                //    console.log(new Date());
                const objectURL = URL.createObjectURL(myBlob);
                elementAnchorDown.href = objectURL;
                elementAnchorDown.download = "Gifo.gif";
                elementAnchorDown.click();
            }).catch((error) =>
                console.log(error)
            );
    }
}