import {
  changeMessageCreation,
  turnOnStep,
  turnOffStep,
  showElement,
  hideElement,
  showLoadingScreen,
} from "./CSS-Controller.js";

import { refreshCounter, stopCounting } from "./Timer.js";
import { addMyNewGifToLocalStorage } from "./MyGifos.js";
import { downloadGif } from "./MyGifos.js";
//import { uploadGifo } from "./UploadGif.js";
import { endpointUpload, endpointGifById, constant } from "./Constants.js";
import { gifData, uploadData } from "./Requests.js";

const video = document.querySelector("#videoScreen");
const btnCreate = document.querySelector(".btnCreate");
const btnRecord = document.querySelector(".btnRecord");
const btnStop = document.querySelector(".btnStop");
const btnupload = document.querySelector(".btnUpload");

const boxFirstMessage = document.querySelector(".boxFirstMessage");
const boxSecondMessage = document.querySelector(".boxSecondMessage");
const boxUploadMessage = document.querySelector(".boxUploadingGif");
const boxSuccessMessage = document.querySelector(".boxUploadingSuccess");
const step1 = document.querySelector("#step1");
const step2 = document.querySelector("#step2");
const step3 = document.querySelector("#step3");

const boxStep1 = document.querySelector("#boxStep1");
const boxStep2 = document.querySelector("#boxStep2");
const boxStep3 = document.querySelector("#boxStep3");
const boxTimer = document.querySelector(".boxTimer");
const btnRepeat = document.querySelector(".repeatCapture");
const anchorDownload = document.querySelector("#downloadGifCreated");

const btnDownload = document.querySelector("#boxDownloadCreated");
const btnLink = document.querySelector("#boxLinkCreated");

const uploadGifoURL = constant.UPLOAD_URL + "gifs" + constant.API_KEY;

const constraints = {
  audio: false,
  video: {
    width: 480,
    height: 320,
  },
};

let stream;
let chunks = [];
let mediaRecorder;
let initialTime;
let idInterval;
let gifoURL;

let blob = null;

async function startGifCreation() {
  try {
    changeMessageCreation(boxFirstMessage, boxSecondMessage, boxStep1, step1);
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    showVideo(stream);
    turnOffStep(boxStep1, step1);
    hideElement(btnCreate);
    hideElement(boxSecondMessage);
    turnOnStep(boxStep2, step2);
    showElement(btnRecord);
  } catch (e) {
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}

function showVideo(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

function startRecording() {
  showElement(btnStop);
  hideElement(btnRecord);

  let format = { mimeType: "video/webm;codecs=h264" };
  mediaRecorder = new MediaRecorder(stream, format);

  mediaRecorder.start();

  mediaRecorder.onstart = () => {
    initialTime = Date.now();
    idInterval = setInterval(refreshCounter, 1000, initialTime);
  };

  mediaRecorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    blob = new Blob(chunks, { type: "video/webm" });
    chunks = [];
  };
}

function stopRecording() {
  stopCounting(initialTime, idInterval);
  mediaRecorder.stop();
  hideElement(boxTimer);
  hideElement(btnStop);
  showElement(btnRepeat);
  showElement(btnupload);
}

const recordAgain = () => {
  hideElement(btnRepeat);
  hideElement(btnupload);
  showElement(btnRecord);
  showElement(boxTimer);
};

function uploadGif() {
  hideElement(btnRepeat);
  hideElement(btnupload);
  turnOffStep(boxStep2, step2);
  turnOnStep(boxStep3, step3);
  showLoadingScreen(video);
  showElement(boxUploadMessage);
  let gifo = buildGifFile();
  console.log(gifo);
  //setTimeout(() => {
  hideElement(boxUploadMessage);
  const uploadResult = uploadData(uploadGifoURL, gifo);
  console.log(uploadResult);
  uploadResult
    .then((response) => {
      const gifoInfo = response.data;
      const GifoID = gifoInfo.id;
      addMyNewGifToLocalStorage(gifoInfo);
      return gifData(endpointGifById, GifoID);
    })
    .then((response) => {
      gifoURL = response.data.images.original.url;
      console.log(gifoURL);
    })
    .catch((error) => console.log(error));
  downloadGif(anchorDownload, gifo.get("file"));
  showElement(boxSuccessMessage);
  showElement(btnDownload);
  showElement(btnLink);
  // }, 2000);
}

const buildGifFile = () => {
  let form = new FormData();
  form.append("file", blob, "myGif.gif");
  console.log(form.get("file"));
  //let gifCreated = form.get("file");
  return form;
};

const copyLinkGifo = () => {
  const aux = document.createElement("input");
  aux.setAttribute("value", gifoURL);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
};

btnCreate.addEventListener("click", startGifCreation);
btnRecord.addEventListener("click", startRecording);
btnStop.addEventListener("click", stopRecording);
btnRepeat.addEventListener("click", recordAgain);
btnupload.addEventListener("click", uploadGif);
btnLink.addEventListener("click", copyLinkGifo);
