const duration = document.querySelector(".timer");

export const refreshCounter = (initialTime) => {
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
  
export  const stopCounting = (initialTime,idInterval) => {
    clearInterval(idInterval);
    initialTime = null;
    duration.textContent = "00:00:00";
  };
  