import { downloadGifo } from "./Download.js";
import {  downloadGif} from "./MyGifos.js";
const modalWindowElement = document.querySelector(".modalWindow");
const closeBtnElement = document.querySelector(".btnCloseMax");
const btnFavMax = document.querySelector("#btnFavMax");
const btnDowMax = document.querySelector("#btnDowMax");


let imageMax = document.querySelector(".imageMax");
let userMax = document.querySelector(".userMax");
let titleMax = document.querySelector(".titleMax");

/**
 * @method assignMaxEvent
 * @description add a maximize event 
 * @param {object}
 * @returns {}
 */
export const assignMaxEvent = (arrayButtons, arrayGifs) => {
    arrayButtons.forEach((element, index) => {
        element.addEventListener("click", function() {
            imageMax.setAttribute("src", arrayGifs[index].gif)
            userMax.innerHTML = arrayGifs[index].title;
            titleMax.innerHTML = arrayGifs[index].user;
            /*   btnDowMax.addEventListener("click", function() {
                  downloadGifo(arrayGifs[index].gif, element, arrayGifs[index].title)
              }) */
            modalWindowElement.style.display = "block";
        });
    });
}

export const assignMaxEventMyGifos = (arrayButtons, arrayGifs) => {
    arrayButtons.forEach((element, index) => {
        element.addEventListener("click", function() {
            imageMax.setAttribute("src", arrayGifs[index].images.original.url)
            userMax.innerHTML = "My Gifo";
            titleMax.innerHTML = "juamps16";  
            btnDowMax.addEventListener("click", function() {
                downloadGif(element,arrayGifs[index].images.original.url)
              })
            modalWindowElement.style.display = "block";
        });
    });
  }

// Events 
closeBtnElement.addEventListener("click", () => {
    modalWindowElement.style.display = "none";
})