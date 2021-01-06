import { prepareNoFavouriteResults } from "./No-Findings.js";
import { prepareMyGifos } from "./Card-Markup.js";
import { constant } from "./Constants.js";
import { getData } from "./Requests.js";

const containerFavoriteCards = document.querySelector(".boxCardsFavoritas");
//const containerNoResults = document.querySelector(".boxWithoutResults");

/**
 * @method getGifosIds
 * @description Get gifos IDs dfrom local storage
 * @returns {string} stringIds
 */
function getGifosIds() {
  let stringIds = [];
  const uploadedGifos = JSON.parse(localStorage.getItem("MYGIFOS")) || [];
  uploadedGifos.forEach((gifo) => {
    stringIds.push(gifo.id);
  });
  stringIds = stringIds.join();
  return stringIds;
}

/**
 * @method downloadMyGifos
 * @description Download Gifo Data from Giphy
 */
function downloadMyGifos() {
  const gifosIds = getGifosIds();
  const completeURL = `${constant.BASE_URL}gifs${constant.API_KEY}&ids=${gifosIds}`;
  console.log(completeURL);
  const downloadMyGifos = getData(completeURL);
  downloadMyGifos
    .then((gifosData) => {
      console.log("Segundo Mensaje");
      window.myGifosInfo = gifosData.data;
      console.log(window.myGifosInfo);
      prepareMyGifos(gifosData.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

downloadMyGifos();
