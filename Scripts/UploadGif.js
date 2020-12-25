
import { uploadData } from "./Requests.js";

export const uploadGifo = (endpointUpload, file) => {
    uploadData(endpointUpload, file)
    .then((response) => {
     console.log(response);
    })
    .catch((error) => {;
      console.log(error);
    });
};
