const  toDoForm = document.querySelector(".js-todoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-todoList"),
    doneList = document.querySelector(".js-doneList");
   

const TODO_THING = "PENDING";
const DONE = "FINISHED";

let ToDos = [];
let Done = [];

function save(title, text){
    localStorage.setItem(title, text);
}


//지우기 기능 필요한 것 1.HTML 지우기
//지우기 기능 필요한 것 2.로컬스토리지에서 지우고 + 저장하기.   
function handleClick(event){
    const clickedBtn = event.target;
    const li = clickedBtn.parentNode;
    const unorderList = li.parentNode;
    unorderList.removeChild(li);

    if(toDoList === unorderList){
        const cleanToDos = ToDos.filter(function(anything){
            return anything.id !== parseInt(li.id);    
        })
        ToDos = cleanToDos;
        save(TODO_THING, JSON.stringify(ToDos));
    }   else if (doneList === unorderList){
            const cleanDone = Done.filter(function(anything){
            return anything.id !== parseInt(li.id);
        })
    Done = cleanDone;
    save(DONE, JSON.stringify(Done));
    }
}

function handleFinish(event){
    const clickedBtn = event.target;
    const li = clickedBtn.parentNode;
    const unorderList = li.parentNode;
    unorderList.removeChild(li);

    const exportDone = ToDos.filter(function(anything){
        return anything.id === parseInt(li.id);
    })
    console.log(exportDone, exportDone[0].text)
    paintDone(exportDone[0].text);      //array.filter () return 결과는 array data [] 로 나온다. 고생했으니 꼭 기억하자.
    

    const remainToDo = ToDos.filter(function(anything){     //to-do List 로컬스토리지 업데이트(id 넘버링 포함)
        return anything.id !== parseInt(li.id);
    })
    ToDos = remainToDo;
    for(i=0; i<ToDos.length; i++){
        ToDos[i].id = i+1;
        toDoList.childNodes[i].id = ToDos[i].id;         //toDoList.li #id 넘버링 업데이트!!!!
    }
    save(TODO_THING, JSON.stringify(ToDos));
}


function handleSwitch(event){
    const clickedBtn = event.target;
    const li = clickedBtn.parentNode;
    const unorderList = li.parentNode;
    unorderList.removeChild(li);
    console.log(li)
    const exportToDo = Done.filter(function(anything){    //// 삭제된 li 와  같은 id를 가지고 있는 항목 배열생성
        return anything.id === parseInt(li.id);
    })
    paintToDo(exportToDo[0].text);

    const remainDone = Done.filter(function(anything){      //Done List 로컬스토리지 업데이트(#id 넘버링 포함)
        return anything.id !== parseInt(li.id);
    })
    Done = remainDone;
    for(i=0; i<Done.length; i++){
        Done[i].id = i+1;
        doneList.childNodes[i].id = Done[i].id;         //doneList.li #id 넘버링 업데이트!!!!
    }

    save(DONE, JSON.stringify(Done));
    
}



function paintToDo(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const finishBtn = document.createElement("button");
    const newId = ToDos.length + 1;                             ////////////////////////////////////////////////////////
    li.id = newId;
    deleteBtn.innerHTML = "✖";
    deleteBtn.addEventListener("click", handleClick);
    finishBtn.innerHTML = "✔";
    finishBtn.addEventListener("click", handleFinish)
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(finishBtn);
    toDoList.appendChild(li);
    const ToDoObj = {
        text: text,
        id: newId
    }
    ToDos.push(ToDoObj);
    save(TODO_THING, JSON.stringify(ToDos));
    //로컬 스토리지로 저장하는것 까지 완료.    -> 새로고침 시 로컬 + 지우기.
}



function paintDone(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const switchBtn = document.createElement("button");
    const newId = Done.length + 1;
    li.id = newId;
    deleteBtn.innerHTML = "✖";
    deleteBtn.addEventListener("click", handleClick);
    switchBtn.innerHTML = "🔄";
    switchBtn.addEventListener("click", handleSwitch); 
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(switchBtn);
    doneList.appendChild(li);
    const doneObj = {
        text: text,
        id: newId
    }
    Done.push(doneObj);
    save(DONE, JSON.stringify(Done));
    //로컬 스토리지로 저장하는것 까지 완료.    -> 새로고침 시 로컬 + 지우기.
}

function toDoHandleSubmit(event){
    event.preventDefault();
    const thingToDo = toDoInput.value;
    paintToDo(thingToDo);
    toDoInput.value = "";
}

function loadToDo(){
    const loadedToDos = localStorage.getItem(TODO_THING);
    // JSON.stringify 한 것을 다시 parse 해준 뒤, refresh 했을때 로컬스토리지에 있는 값은 화면에 리스트를 유지하도록 만든다.
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(anything){
            paintToDo(anything.text);
        })
    } 
    
}

function loadDone(){
    const loadedDone = localStorage.getItem(DONE);
    if(loadedDone !== null){   // 로컬스토리지 값 있으면 refresh 할때 리스트 유지 ,  loadToDo 뒤 else if 형태로 두면 둘다 스토리지 데이터 있을때 앞쪽 함수만 실행되서 따로 둬야한다.
        const parsedDone = JSON.parse(loadedDone);
        parsedDone.forEach(function(anything){
            paintDone(anything.text);
        })
    }
}

function init(){
    loadToDo();
    loadDone();
    toDoForm.addEventListener("submit", toDoHandleSubmit);
}

init();