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
import { uploadGifo } from "./UploadGif.js";
import { endpointUpload } from "./Constants.js";
import { toBase64 } from "./Requests.js";

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
const duration = document.querySelector(".timer");
const btnRepeat = document.querySelector(".repeatCapture");
const anchorDownload = document.querySelector("#downloadGifCreated");

const btnDownload = document.querySelector("#boxDownloadCreated");
const btnLink = document.querySelector("#boxLinkCreated");

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
  hideElement(duration);
  hideElement(btnStop);
  showElement(btnRepeat);
  showElement(btnupload);
}

const recordAgain = () => {
  hideElement(btnRepeat);
  hideElement(btnupload);
  showElement(btnRecord);
  showElement(duration);
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
  let fileConverted = toBase64(gifo);
  console.log(fileConverted);
  setTimeout(() => {
    hideElement(boxUploadMessage);
    addMyNewGifToLocalStorage(fileConverted);
    downloadGif(anchorDownload, gifo);
    // uploadGifo(endpointUpload, gifoFile);
    showElement(boxSuccessMessage);
    showElement(btnDownload);
    showElement(btnLink);
  }, 2000);
}

const buildGifFile = () => {
  let form = new FormData();
  form.append("file", blob, "myGif.webm");
  let gifCreated = form.get("file");
  return gifCreated;
};

btnCreate.addEventListener("click", startGifCreation);
btnRecord.addEventListener("click", startRecording);
btnStop.addEventListener("click", stopRecording);
btnRepeat.addEventListener("click", recordAgain);
btnupload.addEventListener("click", uploadGif);
