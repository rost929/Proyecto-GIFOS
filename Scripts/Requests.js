import { API_Key } from "./Constants.js";

/**
 * @method searchData
 * @description Make a request   
 * @param {String, Integer} 
 * @returns {Promise}
 */
export const trendingData = ((URL, limit = 12) => {
    const myLimit2 = limit ? `&limit=${limit}` : '';
    return new Promise((resolve, reject) => {
        fetch(`${URL}&api_key=${API_Key}&limit=${myLimit2}`)
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error))
    });
});

/**
 * @method searchData
 * @description Make a request  
 * @param {String, String, Integer, Integer} 
 * @returns {Promise}
 */

export const searchData = ((URL, word, limit = 12, offset) => {
    const myLimit = limit ? `&limit=${limit}` : '';
    return new Promise((resolve, reject) => {
        fetch(`${URL}&api_key=${API_Key}&q=${word}${myLimit}&offset=${offset}`)
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error))
    });
});

/**
 * @method suggestData
 * @description Make a request  
 * @param {String, String, Integer} 
 * @returns {Promise}
 */

export const suggestData = ((URL, word) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}&api_key=${API_Key}&q=${word}`)
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error))
    });
});

/**
 * @method suggestTermsData
 * @description Make a request  
 * @param {String} 
 * @returns {Promise}
 */

export const suggestTermsData = ((URL) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}&api_key=${API_Key}`)
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error))
    });
});