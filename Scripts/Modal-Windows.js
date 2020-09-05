import { downloadGifo } from "./Download.js";
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
    //console.log(arrayButtons);
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

// Events 
closeBtnElement.addEventListener("click", () => {
    modalWindowElement.style.display = "none";
})