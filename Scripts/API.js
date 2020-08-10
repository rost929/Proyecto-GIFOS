//Consts
const containerSearchTitle = document.querySelector('.boxTitleBusqueda');
const containerCardsSearch = document.querySelector('.boxCardsBusquedas');
const containerCardsTrending = document.querySelector('.boxGIFOS');


//Variables
let trendingGifs = '';
let gifsFound = '';
let arrayGifsTrending = [];
let arrayGifsFound = [];
let arrayDownloadButtons = [];

/**
 * Functions
 */

/**
 * @method prepareGifsFromSearch
 * @description Iterates the gif array and make a call to allCardsMarkup
 * @param {array} 
 * @returns {}
 */

export const prepareGifsFromSearch = (gifs, wordTitle = "") => {
    arrayDownloadButtons = [];
    arrayGifsFound = validateEmptyFields(gifs);
    const cards = arrayGifsFound.map((gif, index) => allCardsMarkupSearch(gif, index + 12));
    containerSearchTitle.innerHTML = `<h2 class="titleBusqueda">${wordTitle}</h2>`;
    containerCardsSearch.innerHTML = cards.join("\n");
    arrayDownloadButtons = gifs.map((gif, index) => { return document.getElementById('btnDow' + (index + 12)) });
    console.log(arrayDownloadButtons);
    // debugger;
    assignDownloadEvent(arrayDownloadButtons);
};

/**
 * @method allCardsMarkupSearch
 * @description Execute the calling to cardMarkup and concatenate the results as string 
 * @param {String} gif dnksndkds 
 * @returns {String} 
 */

const allCardsMarkupSearch = (gif, index) => {
    gifsFound = '';
    gifsFound += cardMarkup(gif.title, gif.user, gif.gif, index);
    return gifsFound;
};

/**
 * @method prepareTrendingGifDetails
 * @description Iterates the gif array and make a call to allCardsMarkup
 * @param {array} 
 * @returns {}
 */

export const prepareTrendingGifDetails = (gifs) => {
    //trendingGifs = '';
    arrayDownloadButtons = [];
    arrayGifsTrending = validateEmptyFields(gifs);
    const cards = arrayGifsTrending.map((gif, index) => allCardsMarkupTrend(gif, index));
    containerCardsTrending.innerHTML = cards.join("\n");
    arrayDownloadButtons = gifs.map((gif, index) => { return document.getElementById('btnDow' + index) });
    assignDownloadEvent(arrayDownloadButtons, 1);
};

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
 * @method assignDownloadEvent
 * @description Asigns an event to element button 
 * @param {array} 
 * @returns {}
 */
const assignDownloadEvent = (arrayDownloadButtons, operation) => {
    if (operation == 1) {
        arrayDownloadButtons.forEach((element, index) => {
            let imgURL = arrayGifsTrending[index].gif;
            element.addEventListener("click", function() {
                downloadGifo(imgURL, element);
            });
        });
    } else {
        arrayDownloadButtons.forEach((element, index) => {
            let imgURL = arrayGifsFound[index].gif;
            element.addEventListener("click", function() {
                downloadGifo(imgURL, element);
            });
        });
    }
}

/**
 * @method downloadGifo
 * @description Makes a request to download a gif
 * @param {String, HTMLAnchorElement} 
 * @returns {}
 */

const downloadGifo = (imageURL, /** @type {HTMLAnchorElement} */ elementAnchorDown) => {
    // const newAnchor = document.createElement("a");
    const myRequest = new Request(imageURL);
    if (!elementAnchorDown.getAttribute("href")) {
        fetch(myRequest)
            .then((response) => response.blob())
            .then(function(myBlob) {
                const objectURL = URL.createObjectURL(myBlob);
                elementAnchorDown.href = objectURL;
                elementAnchorDown.download = "Gifo.gif";
                elementAnchorDown.click();
            }).catch((error) =>
                console.log(error)
            );
    }
}