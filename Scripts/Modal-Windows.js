const modalWindowElement = document.querySelector(".modalWindow");
const openBtnElement = document.querySelector(".openModalWindow");
const closeBtnElement = document.querySelector(".btnCloseMax");


openBtnElement.addEventListener('click', () => {
    modalWindowElement.style.display = "block";
});

closeBtnElement.addEventListener("click", () => {
    modalWindowElement.style.display = "none";
})