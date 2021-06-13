const clockContainer = document.querySelector(".js-clock"),
    time = clockContainer.querySelector("h1");



function getTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    time.innerText = `${hours < 10 ? `0${hours}` : `${hours}`}:${
        minutes < 10 ? `0${minutes}` : `${minutes}`}`;
}

function init(){
    getTime();
    setInterval(getTime, 1000);
}

init();