const weather = document.querySelector(".js-weather");
const API_KEY = "349e173d2cb74aa3e6300bdac3848554";
const COORDS = "coords";


function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json();
        }).then(function(json){
            const temperature = json.main.temp;
            const location = json.name;
            weather.innerText = `${temperature}°C @ ${location}`
        })
}

function saveGeolocation(currentGeo){
    localStorage.setItem(COORDS, JSON.stringify(currentGeo));
}

function getGeoSuccess(position){    //position 관련 공부 필요
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const currentGeolocationObj ={
        latitude: latitude,
        longitude: longitude
    }
    saveGeolocation(currentGeolocationObj);
    getWeather(latitude, longitude);
}

function getGeoFail(){
    console.log(`cannot access the current location of this device.`)
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(getGeoSuccess, getGeoFail)      //navigator.geolocation.getCurrentPosition(성공시 함수, 실패시 함수)   공부필요
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();   
}

init(); 
