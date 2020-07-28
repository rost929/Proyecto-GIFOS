const api = {
    trendingData: ((URL, key) => {
        return new Promise((resolve, reject) => {
            fetch(`${URL}&api_key=${key}`)
                .then((response) => resolve(response.json()))
                .catch((error) => reject(error))
        });
    }),
    trendingData: ((URL, key, limit) => {
        return new Promise((resolve, reject) => {
            fetch(`${URL}&api_key=${key}&limit=${limit}`)
                .then((response) => resolve(response.json()))
                .catch((error) => reject(error))
        });
    })
};

export default api;