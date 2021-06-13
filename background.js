const body = document.querySelector("body");

const IMG_NUMBER = 12; 

function paintBackground(generatedNumber){
    const img = document.createElement("img");
    img.src = `bgImages/${generatedNumber}.jpg`;
    img.classList.add("backgroundImg");
    console.log(img)
    body.prepend(img);
}

function genNumber(){
    const number = Math.ceil(Math.random() * IMG_NUMBER); 
    return number;
}

function init(){
    const randomNumber = genNumber(); 
    paintBackground(randomNumber);

}

init();