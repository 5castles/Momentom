const body = document.querySelector("body");
const img = document.createElement("img");
const IMG_NUMBER = 9; 


function genNumber(){
    const number = Math.ceil(Math.random() * IMG_NUMBER); 
    return number;
}
function paintBackground(generatedNumber){
    img.src = `bgImages/${generatedNumber}.jpg`;
    img.classList.add("backgroundImg");
    console.log(img)
}
function paint(){
    body.prepend(img);
}
function init(){
    const randomNumber = genNumber(); 
    paintBackground(randomNumber);
    img.addEventListener("load", paint)
}

init();