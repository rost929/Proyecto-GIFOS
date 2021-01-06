import { prepareNoMyGifosResults } from "./No-Findings.js";
import { prepareMyGifos } from "./Card-Markup.js";
import { constant } from "./Constants.js";
import { getData } from "./Requests.js";

const containerNoResults = document.querySelector(".boxWithoutResults");

/**
 * @method getGifosIds
 * @description Get gifos IDs dfrom local storage
 * @returns {string} stringIds
 */
function getGifosIds(myGifos) {
  let stringIds = [];
  myGifos.forEach((gifo) => {
    stringIds.push(gifo.id);
  });
  stringIds = stringIds.join();
  return stringIds;
}

/**
 * @method downloadMyGifos
 * @description Download Gifo Data from Giphy
 */
function downloadMyGifos(myGifos) {
  const gifosIds = getGifosIds(myGifos);
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

function loadMyGifos () {
  const myGifos = JSON.parse(localStorage.getItem("MYGIFOS"));
  if (myGifos != null && (Object.keys(myGifos).length > 0)) {
    downloadMyGifos(myGifos);
      containerNoResults.style.margin = "0";
  } else {
    prepareNoMyGifosResults();
  }
}

loadMyGifos();
