/**
 * @method assignDownloadEvent
 * @description Asigns an event to element button 
 * @param {array, array}
 * @returns {}
 */
export const assignDownloadEvent = (arrayDownloadButtons, arrayGifs) => {
    arrayDownloadButtons.forEach((element, index) => {
        let imgURL = arrayGifs[index].gif;
        let title = arrayGifs[index].title;
        element.addEventListener("click", function() {
            downloadGifo(imgURL, element, title);
        });
    });
}

/**
 * @method downloadGifo
 * @description Makes a request to download a gif
 * @param {String, HTMLAnchorElement, String} 
 * @returns {}
 */

const downloadGifo = (imageURL, /** @type {HTMLAnchorElement} */ elementAnchorDown, title) => {
    // const newAnchor = document.createElement("a");
    const myRequest = new Request(imageURL);
    if (!elementAnchorDown.getAttribute("href")) {
        fetch(myRequest)
            .then((response) => response.blob())
            .then(function(myBlob) {
                const objectURL = URL.createObjectURL(myBlob);
                elementAnchorDown.href = objectURL;
                elementAnchorDown.download = title + ".gif";
                elementAnchorDown.click();
            }).catch((error) =>
                console.log(error)
            );
    }
}