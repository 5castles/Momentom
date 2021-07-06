const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greeting"),
    section = document.querySelector(".section");
    
const SHOWING_CN = "showing",
    USER_LS = "currentUser";


function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    showGreeting(currentValue);
    saveName(currentValue);
}

function showGreeting(text){
    const date = new Date();
    const hours = date.getHours();
    form.classList.remove(SHOWING_CN);
    section.classList.add(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    if(hours >= 22 || hours <= 3){
        greeting.innerText = `Good Night! ${text}.`;
    } else if(hours > 3 && hours <= 6){
        greeting.innerText = `Up this early? ${text}.`;
    } else if(hours > 6 && hours < 12){
        greeting.innerText = `Good Morning! ${text}.`;
    } else if(hours >= 12 && hours <= 13){
        greeting.innerText = `Time to eat! Enjoy your lunch! ${text}.`;
    } else if(hours > 13 && hours < 18){
        greeting.innerText = `How is it going ${text}?`;
    } else{
        greeting.innerText = `Have a good time! ${text}.`;
    }
    
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    } else{
        showGreeting(currentUser);
    }
}

function init(){
    loadName();
}
init();

