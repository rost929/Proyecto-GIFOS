// API Key
const API_Key = "cpG5KiG4E7yqmP5WTNd8nnWkzDfvFUWW";

const username = "juamps1697";

//Endpoints
const endpointSearch = "https://api.giphy.com/v1/gifs/search?";
const endpointSuggestions = "https://api.giphy.com/v1/gifs/search/tags?";
const enpointTermsTrending = "https://api.giphy.com/v1/trending/searches?";
const endpointTrending = "https://api.giphy.com/v1/gifs/trending?";
const endpointUpload = "https://upload.giphy.com/v1/gifs?";
const endpointGifById = "https://api.giphy.com/v1/gifs/";

const constant = {
  BASE_URL: "https://api.giphy.com/v1/",
  API_KEY: "?api_key=cpG5KiG4E7yqmP5WTNd8nnWkzDfvFUWW",
  UPLOAD_URL: "https://upload.giphy.com/v1/",
};

//const uploadingEndpoint = "https://upload.giphy.com/v1/gifs?api_key=cpG5KiG4E7yqmP5WTNd8nnWkzDfvFUWW"

const limit = 12;

export {
  endpointGifById,
  endpointSearch,
  endpointSuggestions,
  endpointTrending,
  endpointUpload,
  enpointTermsTrending,
  API_Key,
  username,
  limit,
  constant,
  //uploadingEndpoint
};
