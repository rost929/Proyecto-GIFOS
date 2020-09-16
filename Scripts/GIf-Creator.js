import { changeMessageCreation, turnOnStep, turnOffStep, turnOffButton, turnOnButton } from "./CSS-Controller.js";

const video = document.querySelector("#videoScreen");
const btnCreate = document.querySelector(".btnCreate");
const btnRecord = document.querySelector(".btnRecord");
const boxFirstMessage = document.querySelector(".boxFirstMessage");
const boxSecondMessage = document.querySelector(".boxSecondMessage");
const step1 = document.querySelector("#step1");
const step2 = document.querySelector("#step2");
const step3 = document.querySelector("#step3");

const boxStep1 = document.querySelector("#boxStep1");
const boxStep2 = document.querySelector("#boxStep2");
const boxStep3 = document.querySelector("#boxStep3");


const constraints = {
    audio: false,
    video: {
        width: 480,
        height: 320
    }
};

// Access webcam
async function startGifCreation() {
    try {
        changeMessageCreation(boxFirstMessage, boxSecondMessage, boxStep1, step1);
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
        turnOffStep(boxStep1, step1);
        turnOffButton(btnCreate);
        turnOnStep(boxStep2, step2);
        turnOnButton(btnRecord);
    } catch (e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    }
}

// Success
function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;
}

btnCreate.addEventListener("click", startGifCreation);