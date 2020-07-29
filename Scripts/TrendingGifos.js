/**
 * Imports
 */
import api from './API.js';
import { getGifDetail } from "./API.js";

/*
Consts
*/
const endpointTrending = "https://api.giphy.com/v1/gifs/trending?";
const limit = 12;


/**
 * @method getgetTrendingGifs
 * @description 
 * @param {array} Gifs
 * @returns {}
 */

function getTrendingGifs() {
    //trendingGifs = '';
    const { trendingData } = api;
    trendingData(endpointTrending, limit)
        .then(response => {
            console.log(response.data)
            const gifsArray = response.data;
            getGifDetail(gifsArray);
        })
        .catch((error) => {
            console.log(error)
        });
}

getTrendingGifs();