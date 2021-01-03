const darkModeAnchor = document.querySelector("#darkMode");
const lightModeAnchor = document.querySelector("#lightMode");

darkModeAnchor.addEventListener("click", changeTheme);
lightModeAnchor.addEventListener("click", changeTheme);


/**
 * @method changeTheme
 * @description Change dark/light theme
 * @param {object} e event information
 */
function changeTheme (e) {
    const body = document.body;
    if(e.target.innerHTML === "Modo Nocturno"){
        localStorage.setItem("DARK-MODE", JSON.stringify(true));
        darkModeAnchor.style.visibility = "hidden";
        lightModeAnchor.style.visibility = "visible";
        body.classList.toggle("darkMode");
    }else{
        localStorage.setItem("DARK-MODE", JSON.stringify(false));
        darkModeAnchor.style.visibility = "visible";
        lightModeAnchor.style.visibility = "hidden";
        body.classList.toggle("darkMode");
    }
}


/**
 * @method darkThemeCheck
 * @description Check if dark mode is active to keep dark UI between pages
 */
function darkThemeCheck() {
    console.log("Entro al metodo darkTheme");
    const body = document.body;
    if(localStorage.getItem("DARK-MODE") === null) {
        console.log("Entré a la condición nula");
        localStorage.setItem("DARK-MODE", JSON.stringify(false));
    }
    if (localStorage.getItem("DARK-MODE") === "true") {
        console.log("entré");
        body.classList.add("darkMode");
        darkModeAnchor.style.visibility = "hidden";
        lightModeAnchor.style.visibility = "visible";
    };
};

darkThemeCheck();