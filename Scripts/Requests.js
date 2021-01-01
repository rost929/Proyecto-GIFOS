import { API_Key, username } from "./Constants.js";

/**
 * @method searchData
 * @description Make a request
 * @param {String, Integer}
 * @returns {Promise}
 */
const trendingData = (URL, limit = 12) => {
  const myLimit2 = limit ? `&limit=${limit}` : "";
  return new Promise((resolve, reject) => {
    fetch(`${URL}&api_key=${API_Key}&limit=${myLimit2}`)
      .then((response) => resolve(response.json()))
      .catch((error) => reject(error));
  });
};

/**
 * @method searchData
 * @description Make a request
 * @param {String, String, Integer, Integer}
 * @returns {Promise}
 */

const searchData = (URL, word, limit = 12, offset) => {
  const myLimit = limit ? `&limit=${limit}` : "";
  return new Promise((resolve, reject) => {
    fetch(`${URL}&api_key=${API_Key}&q=${word}${myLimit}&offset=${offset}`)
      .then((response) => resolve(response.json()))
      .catch((error) => reject(error));
  });
};

/**
 * @method suggestData
 * @description Make a request
 * @param {String, String, Integer}
 * @returns {Promise}
 */

const suggestData = (URL, word) => {
  return new Promise((resolve, reject) => {
    fetch(`${URL}&api_key=${API_Key}&q=${word}`)
      .then((response) => resolve(response.json()))
      .catch((error) => reject(error));
  });
};

/**
 * @method suggestTermsData
 * @description Make a request
 * @param {String}
 * @returns {Promise}
 */

const suggestTermsData = (URL) => {
  return new Promise((resolve, reject) => {
    fetch(`${URL}&api_key=${API_Key}`)
      .then((response) => resolve(response.json()))
      .catch((error) => reject(error));
  });
};

/**
 * @method uploadData
 * @description Make a request
 * @param {String}
 * @returns {Promise}
 */

/* const uploadData = (URL, gifo) => {
  return new Promise((resolve, reject) => {
    fetch(`${URL}$api_key=${API_Key}`, {
      method: "POST",
      body: gifo
    })
      .then((response) => resolve(response.json()))
      .catch((error) => reject(error));
  });
}; */

/**
 * @description Upload Gifos created by user
 * @param {string} URL
 * @param {string} gifoData
 * @returns {promise}
 */
function uploadData(URL, gifoData) {
  return new Promise((resolve, reject) => {
    fetch(URL, { method: "POST", body: gifoData })
      .then((response) => {
        resolve(response.json());
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function gifData(URL, gifoId) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}${gifoId}?api_key=${API_Key}`)
      .then((response) => {
        resolve(response.json());
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export {
  searchData,
  suggestData,
  suggestTermsData,
  trendingData,
  uploadData,
  gifData,
};
