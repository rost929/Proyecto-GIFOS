const darkModeAnchor = document.querySelector("#darkMode");

darkModeAnchor.addEventListener("click", () => {
    const body = document.body;
    body.classList.toggle("darkMode");
});