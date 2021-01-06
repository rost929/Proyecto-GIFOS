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
import { downloadGifGenerated } from "./MyGifos.js";
import { endpointGifById, constant } from "./Constants.js";
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
let initialTime;
let idInterval;
let gifoURL;
let gifo;

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
    const recorder = createRecorder(stream);
    btnRecord.addEventListener("click", () => startRecording(recorder));
    btnStop.addEventListener("click", () => stopRecording(recorder));
  } catch (e) {
    console.log(e);
  }
}

function showVideo(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

function createRecorder(stream) {
  const recorder = RecordRTC(stream, {
    type: "gif",
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: function () {
      console.log("Record Starting");
    },
  });
  recorder.camera = stream;
  return recorder;
}

function startRecording(recorder) {
  showElement(btnStop);
  hideElement(btnRecord);
  recorder.startRecording();
  initialTime = Date.now();
  idInterval = setInterval(refreshCounter, 1000, initialTime);
}

function stopRecording(recorder) {
  stopCounting(initialTime, idInterval);
  hideElement(boxTimer);
  hideElement(btnStop);
  showElement(btnRepeat);
  showElement(btnupload);
  recorder.stopRecording(() => buildGifFile(recorder));
  video.srcObject = null;
  recorder.camera.stop();
  recorder = null;
}

const buildGifFile = (recorder) => {
  let form = new FormData();
  form.append("file", recorder.getBlob(), "myGif.gif");
  console.log(form.get("file"));
  gifo = form;
};

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
      downloadGifGenerated(anchorDownload, gifo.get("file"));
      hideElement(boxUploadMessage);
      showElement(boxSuccessMessage);
      showElement(btnDownload);
      showElement(btnLink);
    })
    .catch((error) => console.log(error));
}

const copyLinkGifo = () => {
  const aux = document.createElement("input");
  aux.setAttribute("value", gifoURL);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
};

btnCreate.addEventListener("click", startGifCreation);
btnRepeat.addEventListener("click", recordAgain);
btnupload.addEventListener("click", uploadGif);
btnLink.addEventListener("click", copyLinkGifo);
