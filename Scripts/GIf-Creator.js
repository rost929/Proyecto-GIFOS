import {
  changeMessageCreation,
  turnOnStep,
  turnOffStep,
  showElement,
  hideElement
} from "./CSS-Controller.js";

const video = document.querySelector("#videoScreen");
const btnCreate = document.querySelector(".btnCreate");
const btnRecord = document.querySelector(".btnRecord");
const btnStop = document.querySelector(".btnStop");
const btnupload = document.querySelector(".btnUpload");

const boxFirstMessage = document.querySelector(".boxFirstMessage");
const boxSecondMessage = document.querySelector(".boxSecondMessage");
const step1 = document.querySelector("#step1");
const step2 = document.querySelector("#step2");
const step3 = document.querySelector("#step3");

const boxStep1 = document.querySelector("#boxStep1");
const boxStep2 = document.querySelector("#boxStep2");
const boxStep3 = document.querySelector("#boxStep3");
const duration = document.querySelector(".timer");
const btnRepeat = document.querySelector(".repeatCapture");

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
let seg = 0;
let min = 0;
let hour = 0;

async function startGifCreation() {
  try {
    changeMessageCreation(boxFirstMessage, boxSecondMessage, boxStep1, step1);
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    showVideo(stream);
    turnOffStep(boxStep1, step1);
    hideElement(btnCreate);
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
    idInterval = setInterval(refreshCounter, 1000);
  };

  mediaRecorder.ondataavailable = (e) => {
    console.log(e.data);
    chunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    /* alert("Grabación finalizada");
    let blob = new Blob(chunks, { type: "video/webm" });
    chunks = [];
    downloadGif(blob); */
  };
}

function stopRecording() {
  stopCounting();
  mediaRecorder.stop();
  hideElement(duration);
  hideElement(btnStop);
  showElement(btnRepeat);
  showElement(btnupload);
}

const refreshCounter = () => {
  duration.innerHTML = secondsAtTime((Date.now() - initialTime) / 1000);
  console.log(duration.textContent);
};

const secondsAtTime = (seconds) => {
  let hours = Math.floor(seconds / 60 / 60);
  seconds -= hours * 60 * 60;
  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  seconds = parseInt(seconds);
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  return `${hours}:${minutes}:${seconds}`;
};

const stopCounting = () => {
  clearInterval(idInterval);
  initialTime = null;
  duration.textContent = "00:00:00";
};

function downloadGif(blob) {
  let link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "video.webm");
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function uploadGif () {
  hideElement(btnRepeat)
  turnOffStep(boxStep2, step2);
  turnOnStep(boxStep3,step3);
}

const recordAgain = () => {
  hideElement(btnRepeat);
  hideElement(btnupload);
  showElement(btnRecord);
  showElement(duration);
}


btnCreate.addEventListener("click", startGifCreation);
btnRecord.addEventListener("click", startRecording);
btnStop.addEventListener("click", stopRecording);
btnupload.addEventListener("click",uploadGif);
btnRepeat.addEventListener("click", recordAgain);
