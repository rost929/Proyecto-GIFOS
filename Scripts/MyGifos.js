/**
 * @method addFavoriteGifToLocalStorage
 * @description add a gif to local storage
 * @param {object}
 * @returns {}
 */
export const addMyNewGifToLocalStorage = (gif) => {
  const newGif = { title: "Gif perzonalizado", user: "juamps16", gif: gif };
  console.log("1. File a insertar");
  console.log(newGif);
  const resultsFound = JSON.parse(localStorage.getItem("MYGIFOS"));
  console.log("2. Contenido del LS antes de insertar");
  console.log(resultsFound);
  if (resultsFound == null) {
    let myGifos = [];
    myGifos.push(newGif);
    localStorage.setItem("MYGIFOS", JSON.stringify(myGifos));
  } else {
    resultsFound.push(newGif);
    localStorage.setItem("MYGIFOS", JSON.stringify(resultsFound));
  }

  let newResultsFound = JSON.parse(localStorage.getItem("MYGIFOS"));
  console.log("3. Nuevo contenido en LS");
  console.log(newResultsFound);
};

/**
 * @method assignDownloadEventToMyGifos
 * @description Asigns an event to element button
 * @param {array, array}
 * @returns {}
 */
export const assignDownloadEventMyGifos = (arrayDownloadButtons, arrayGifs) => {
  arrayDownloadButtons.forEach((element, index) => {
    let gifo = arrayGifs[index].gif;
    element.addEventListener("click", function () {
      downloadGif(element, gifo);
    });
  });
};

export function downloadGif(HTMLElement, gifo) {
  //let link = document.createElement("a");
  HTMLElement.href = window.URL.createObjectURL(gifo);
  HTMLElement.setAttribute("download", "");
  //link.style.display = "none";
  //document.body.appendChild(link);
  //link.click();
  //link.remove();
}
