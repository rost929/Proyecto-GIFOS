/**
 * @method addFavoriteGifToLocalStorage
 * @description add a gif to local storage
 * @param {object}
 * @returns {}
 */
const addMyNewGifToLocalStorage = (newGif) => {
  // const newGif = { title: "Gif perzonalizado", user: "juamps16", gif: gif };
  const gifoId = newGif.id;
  const resultsFound = JSON.parse(localStorage.getItem("MYGIFOS"));
  if (resultsFound == null) {
    let myGifos = [];
    myGifos.push(newGif);
    localStorage.setItem("MYGIFOS", JSON.stringify(myGifos));
  } else {
    resultsFound.push(newGif);
    localStorage.setItem("MYGIFOS", JSON.stringify(resultsFound));
  }
};

/**
 * @method assignDownloadEventToMyGifos
 * @description Asigns an event to element button
 * @param {array, array}
 * @returns {}
 */
const assignDownloadEventMyGifos = (arrayDownloadButtons, arrayGifs) => {
  arrayDownloadButtons.forEach((element, index) => {
    let gifo = arrayGifs[index].images.original.url;
    element.addEventListener("click", function () {
      downloadGif(element, gifo);
    });
  });
};

/**
 * @method downloadGif
 * @description donwload a gif from my Gifos view
 * @param {array}
 * @returns {}
 */
async function downloadGif(HTMLElement, gifo) {
  let fetchResponse = await fetch(gifo);
  let blobObject = await fetchResponse.blob();
  HTMLElement.href = window.URL.createObjectURL(blobObject);
  HTMLElement.download = "MyGif.gif";
}

/**
 * @method downloadGifGenerated
 * @description donwload a gif from the creation view
 * @param {array}
 * @returns {}
 */
function downloadGifGenerated(HTMLElement, gifo) {
  HTMLElement.href = window.URL.createObjectURL(gifo);
  HTMLElement.download = "MyGif.gif";
}

/**
 * @method removeGifo
 * @description remove a gif from the view
 * @param {array}
 * @returns {}
 */
const removeGifo = (arrayMyGifosButtons) => {
  arrayMyGifosButtons.forEach((element, index) => {
    element.addEventListener("click", function () {
      const MyGifoCardSelected = document.querySelector("#cardMyGifo" + index);
      MyGifoCardSelected.remove();
      removeMyGifToLocalStorage(index);
    });
  });
};

/**
 * @method removeFavforiteGifToLocalStorage
 * @description remove a gif from local storage
 * @param {integer}
 * @returns {}
 */
const removeMyGifToLocalStorage = (index) => {
  const resultsFound = JSON.parse(localStorage.getItem("MYGIFOS"));
  const newArray = resultsFound.filter((el, idx) => idx !== index);
  localStorage.setItem("MYGIFOS", JSON.stringify(newArray));
};

export {
  addMyNewGifToLocalStorage,
  assignDownloadEventMyGifos,
  downloadGif,
  downloadGifGenerated,
  removeGifo,
};
