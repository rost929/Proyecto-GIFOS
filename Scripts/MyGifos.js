/**
 * @method addFavoriteGifToLocalStorage
 * @description add a gif to local storage 
 * @param {object}
 * @returns {}
 */
export const addMyNewGifToLocalStorage = (gif) => {
    console.log(gif);
    const newGif = { title: gif.name, user: "juamps16", gif: gif}
    const resultsFound = JSON.parse(localStorage.getItem("MYGIFOS"));
    if (resultsFound == null) {
        let myGifos = []
        myGifos.push(newGif);
        localStorage.setItem('MYGIFOS', myGifos);
    } else {
        resultsFound.push(newGif);
        localStorage.setItem('MYGIFOS', JSON.stringify(resultsFound));
    }

    console.log(resultsFound);
}