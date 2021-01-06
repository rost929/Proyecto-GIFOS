/**
 * @method addFavoriteGifToLocalStorage
 * @description add a gif to local storage
 * @param {object}
 * @returns {}
 */
export const addMyNewGifToLocalStorage = (newGif) => {
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
export const assignDownloadEventMyGifos = (arrayDownloadButtons, arrayGifs) => {
  arrayDownloadButtons.forEach((element, index) => {
    let gifo = arrayGifs[index].images.original.url;
    element.addEventListener("click", function () {
      downloadGif(element, gifo);
    });
  });
};

export async function downloadGif(HTMLElement, gifo) {
  let fetchResponse = await fetch(gifo);
  let blobObject = await fetchResponse.blob();
  HTMLElement.href = window.URL.createObjectURL(blobObject);
  HTMLElement.download = "MyGif.gif";
}

export function downloadGifGenerated (HTMLElement, gifo){
  HTMLElement.href = window.URL.createObjectURL(gifo);
  HTMLElement.download = "MyGif.gif";
}

export const removeGifo = (arrayMyGifosButtons) => {
  arrayMyGifosButtons.forEach((element, index) => {
      element.addEventListener("click", function() {
          const MyGifoCardSelected = document.querySelector("#cardMyGifo" + index);
          MyGifoCardSelected.remove();
          removeMyGifToLocalStorage(index);
      });
  });
}

/**
* @method removeFavforiteGifToLocalStorage
* @description add a gif to local storage 
* @param {object}
* @returns {}
*/
const removeMyGifToLocalStorage = (index) => {
  const resultsFound = JSON.parse(localStorage.getItem("MYGIFOS"));
  const newArray = resultsFound.filter((el, idx) => idx !== index);
  localStorage.setItem("MYGIFOS", JSON.stringify(newArray));

}
