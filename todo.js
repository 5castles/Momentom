const todayInfo = document.querySelector(".js-date-info-box"),
    day = todayInfo.querySelector(".day"),
    date = todayInfo.querySelector(".date"),
    month = todayInfo.querySelector(".month"),
    year = todayInfo.querySelector(".year"),
    calendarArea = document.querySelector(".js-calendar-area"),
    calendarBox = calendarArea.querySelector(".js-calendar-box"),
    dayColumn = calendarBox.getElementsByClassName("day-column"),
    previousMonth = calendarArea.querySelector(".pre-month-btn"),
    nextMonth = calendarArea.querySelector(".next-month-btn");
    
const dayObj = {
    0: "SUN",
    1: "MON",
    2: "TUE",
    3: "WED",
    4: "THU",
    5: "FRI",
    6: "SAT"
}
const dayObjKr = {
    0: "일요일",
    1: "월요일",
    2: "화요일",
    3: "수요일",
    4: "목요일",
    5: "금요일",
    6: "토요일"
}
const monthObj = {
    0: "JAN",
    1: "FEB",
    2: "MAR",
    3: "APR",
    4: "MAY",
    5: "JUN",
    6: "JUL",
    7: "AUG",
    8: "SEP",
    9: "OCT",
    10: "NOV",
    11: "DEC"
}
const monthObjKr = {
    0: "1월",
    1: "2월",
    2: "3월",
    3: "4월",
    4: "5월",
    5: "6월",
    6: "7월",
    7: "8월",
    8: "9월",
    9: "10월",
    10: "11월",
    11: "12월"
}
const monthObjReverse ={
    JAN: 0,
    FEB: 1,
    MAR: 2,
    APR: 3,
    MAY: 4,
    JUN: 5,
    JUL: 6,
    AUG: 7,
    SEP: 8,
    OCT: 9,
    NOV: 10,
    DEC: 11
}
const daysInMonth = {
    0: 31,
    1: 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31
}

//현재 날짜 생성 - Obj 프로퍼티 key 대입 - 현재 날짜 정보 표기
//객체 프로퍼티 접근: Obj[key] or Obj.key
function getTodayInfo(){
    const makeDate = new Date();
    const dayNumNow = makeDate.getDay(); // 0~6
    const dateNow = makeDate.getDate();
    const monthNumNow = makeDate.getMonth(); //0~11
    const yearNow = makeDate.getFullYear();
    day.innerText = dayObj[dayNumNow];     
    date.innerText = dateNow;
    month.innerText = monthObj[monthNumNow];
    year.innerText = yearNow;
    //생성한 날의 년,월의 1일 요일 판별하여 1일 표기하기
    checkDay(yearNow, monthNumNow);

}

//해당 날짜의 월 정보, 1일의 요일 정보
function checkDay(year, month){
    //대입 년,월의 1일 날짜 생성 
    const check = new Date(year, month); 
    // 해당 월 1일의 요일
    const dayOfFirstDate = check.getDay();     
    const currentMonth = check.getMonth();
    paintFirstWeek(dayOfFirstDate, currentMonth) 
} 

//첫째 주 날짜 생성하기 - 1일 넘버와 각 요일의 넘버(id) 비교
function paintFirstWeek(dayNumber, month){
    const theFirstDay = [];
    for(i=0; i<7; i++){
        const day = dayColumn[i];
        if(parseInt(day.id) === dayNumber){
            const firstDate = document.createElement("span");
            firstDate.innerText = "1";
            day.appendChild(firstDate);
            theFirstDay.push(firstDate.parentNode);
        } else if(parseInt(day.id) < dayNumber){
            const noDay = document.createElement("span");
            noDay.innerText = "-";
            day.appendChild(noDay);
        } else if(parseInt(day.id) > dayNumber){
            //첫째주 나머지 날짜 생성 -> (첫째날 1) + ((요일number) - (1일의 요일Number))의 값 
            const num = parseInt(day.id) - parseInt(theFirstDay[0].id);
            const days = document.createElement("span");
            days.innerText = 1+num;
            day.appendChild(days)            
        }
    }
    const totalDays = daysInMonth[month]; 
    paintTheRest(totalDays);
 
}
//나머지 날짜 생성
function paintTheRest(total){
    const firstWeek = [];
    for(i=0; i<7; i++){
        const day = dayColumn[i];
        const count = day.lastChild.innerText;

        if(parseInt(count) >= 1){
            const number = document.createElement("span");
            number.innerText = parseInt(count) +7;
            day.appendChild(number);
            firstWeek.push(i);
            while((parseInt(day.lastChild.innerText)+7) <= total){
                const number = document.createElement("span");
                number.innerText = parseInt(day.lastChild.innerText) +7;
                day.appendChild(number);
            }
        } 
    }
    //첫째주 날짜 표기 안된 요일Column 나머지 날짜 생성
    const dayNumOfFirstdate = firstWeek[0];
    for(j=0; j<dayNumOfFirstdate; j++){
        const day = dayColumn[j];
        const number = document.createElement("span");
        number.innerText = 8 - (dayNumOfFirstdate-j);
        day.appendChild(number);
        while((parseInt(day.lastChild.innerText))+7 <= total){
            const number = document.createElement("span");
            number.innerText = parseInt(day.lastChild.innerText) +7;
            day.appendChild(number);
        }
    }
    addEventListenerClickedUpdate();
}

//모든 날짜 addEventListener 추가
function addEventListenerClickedUpdate(){
    for(i=0; i<7; i++){
        const dateOnCal = dayColumn[i].querySelectorAll("span")
        //dataOnCal 마지막요소에 unidentified 있는데. 이것을 제외하지 않으면 아래에서 addEventListener 작동이 안된다. 
        //왜 unidentified가 마지막에 있는지 지금은 모르겠지만 일단 함수를 실행시키기 위해서 (.length-1)를 통해 마지막요소는 빼주었다.
        for(j=1; j<=dateOnCal.length -1; j++){ 
            dateOnCal[j].addEventListener("click", clickedDateUpdate);
            dateOnCal[j].addEventListener("click", updateLists);
        }
    }
}

function updateLists(event){
    const dateInformation = `${date.innerText}${month.innerText}${year.innerText}`;
    const checkLocalToDo = localStorage.getItem(`${dateInformation}${TODO_THING}`);
    const checkLocalDone = localStorage.getItem(`${dateInformation}${DONE}`);
    
    //일단 페인트 리스트 다 리셋 먼저하고
    while(toDoList.firstChild){
        toDoList.removeChild(toDoList.firstChild);
    }
    while(doneList.firstChild){
        doneList.removeChild(doneList.firstChild);
    }
    loadToDo();
    loadDone();
    //로컬스토리지 데이터 있으면 그것만 화면에 paint 
    
}

//클릭 날짜 메인화면 표기 
function clickedDateUpdate(event){
    const clicked = event.target;
    colorUpdate(clicked);
    const clickedDayNum = parseInt(clicked.parentNode.id);
    const clickedDate = clicked.innerText;

    date.innerText = clickedDate;
    day.innerText = dayObj[clickedDayNum];   
}

//현재 캘린더 클린  **.removeChild() 모양 확인!
function cleanCalendar(){
    for(i=0; i<7; i++){
        let yes = dayColumn[i];
        while(yes.firstElementChild !== yes.lastElementChild){
            yes.removeChild(yes.lastChild)
        }        
    }
}


function moveToNextMonth(){
    cleanCalendar();
    const yearNow = year.innerText;
    //현재 브라우저화면 1월~11월 month Num +1 -> 다음달 Date 생성
    const currentMonthNumber = monthObjReverse[month.innerText];
    if(currentMonthNumber !== 11){
        const makeNextMonth = new Date(yearNow, currentMonthNumber+1);
        //
        const dayNum = makeNextMonth.getDay(); // 0~6
        const dateOfNext = makeNextMonth.getDate();
        const monthNum = makeNextMonth.getMonth(); //0~11
        const yearOfNext = makeNextMonth.getFullYear();
        
        day.innerText = dayObj[dayNum];     
        date.innerText = dateOfNext;
        month.innerText = monthObj[monthNum];
        year.innerText = yearOfNext;

        checkDay(yearOfNext, monthNum);
    } 
    //현재 브라우저화면이 12월 일때 year Num +1 -> 다음 년도 1월 Date 생성
        else if(currentMonthNumber === 11){
        const yearNow = year.innerText;
        const makeNextMonth = new Date(parseInt(yearNow)+1, 0); // 1월
        
        const dayNum = makeNextMonth.getDay(); // 0~6
        const dateOfNext = makeNextMonth.getDate();
        const monthNum = makeNextMonth.getMonth(); //0~11
        const yearOfNext = makeNextMonth.getFullYear();
        
        day.innerText = dayObj[dayNum];     
        date.innerText = dateOfNext;
        month.innerText = monthObj[monthNum];
        year.innerText = yearOfNext;
        checkDay(yearOfNext, monthNum);
        
    }  
    firstDateColor(); 
}
function moveToPreviousMonth(){
    cleanCalendar();
    const yearNow = year.innerText;
    //현재 브라우저화면 2월~12월 month Num -1 -> 이전달 Date 생성
    const currentMonthNumber = monthObjReverse[month.innerText];
    if(currentMonthNumber !== 0){
        const makePreviousMonth = new Date(yearNow, currentMonthNumber-1);
        //
        const dayNum = makePreviousMonth.getDay(); // 0~6
        const dateOfPre = makePreviousMonth.getDate();
        const monthNum = makePreviousMonth.getMonth(); //0~11
        const yearOfPre = makePreviousMonth.getFullYear();
    
        day.innerText = dayObj[dayNum];     
        date.innerText = dateOfPre;
        month.innerText = monthObj[monthNum];
        year.innerText = yearOfPre;

        checkDay(yearOfPre, monthNum)
    }   
    //현재 브라우저화면이 1월 일때 year Num -1 -> 이전 년도 12월 Date 생성
        else if(currentMonthNumber === 0){
        const yearNow = year.innerText;
        const makePreviousMonth = new Date(parseInt(yearNow)-1, 11) // 12월 

        const dayNum = makePreviousMonth.getDay(); // 0~6
        const dateOfPre = makePreviousMonth.getDate();
        const monthNum = makePreviousMonth.getMonth(); //0~11
        const yearOfPre = makePreviousMonth.getFullYear();
    
        day.innerText = dayObj[dayNum];     
        date.innerText = dateOfPre;
        month.innerText = monthObj[monthNum];
        year.innerText = yearOfPre;

        checkDay(yearOfPre, monthNum)
    }
    firstDateColor();
}

function colorUpdate(anything){
    for(i=0; i<7; i++){
        const dateOnCal = dayColumn[i].querySelectorAll("span")
        //dataOnCal 마지막요소에 unidentified 있는데. 이것을 제외하지 않으면 아래에서 addEventListener 작동이 안된다. 
        //왜 unidentified가 마지막에 있는지 지금은 모르겠지만 일단 함수를 실행시키기 위해서 (.length-1)를 통해 마지막요소는 빼주었다.
        for(j=1; j<=dateOnCal.length -1; j++){ 
            dateOnCal[j].classList.remove("clicked");
        }
    }
    anything.classList.add("clicked");
}
//페이지 로드 시 달력에 날짜 빨간색 색칠업데이트 
function firstColor(){
    for(i=0; i<7; i++){
        const dateOnCal = dayColumn[i].querySelectorAll("span")
         //dataOnCal 마지막요소에 unidentified 있는데. 이것을 제외하지 않으면 아래에서 addEventListener 작동이 안된다. 
        //왜 unidentified가 마지막에 있는지 지금은 모르겠지만 일단 함수를 실행시키기 위해서 (.length-1)를 통해 마지막요소는 빼주었다.
        for(j=1; j<=dateOnCal.length -1; j++){ 
            const makeDate = new Date();
            const dateNow = makeDate.getDate();
            if(parseInt(dateOnCal[j].innerText) === dateNow){
                colorUpdate(dateOnCal[j]);
            }
        }
    }
}
function firstDateColor(){
    for(i=0; i<7; i++){
        const dateOnCal = dayColumn[i].querySelectorAll("span")
         //dataOnCal 마지막요소에 unidentified 있는데. 이것을 제외하지 않으면 아래에서 addEventListener 작동이 안된다. 
        //왜 unidentified가 마지막에 있는지 지금은 모르겠지만 일단 함수를 실행시키기 위해서 (.length-1)를 통해 마지막요소는 빼주었다.
        for(j=1; j<=dateOnCal.length -1; j++){ 
            if(parseInt(dateOnCal[j].innerText) === 1){
                colorUpdate(dateOnCal[j]);
            }
        }
    }
}

function init1(){
    getTodayInfo();
    firstColor();
    previousMonth.addEventListener("click", moveToPreviousMonth);
    nextMonth.addEventListener("click", moveToNextMonth);
}

init1();


////////////////////////////////////////////////////////////////////


const  toDoForm = document.querySelector(".js-todoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-todoList"),
    doneList = document.querySelector(".js-doneList");
const dateInfo = document.querySelector(".date");
const monthInfo = document.querySelector(".month");
const yearInfo = document.querySelector(".year");
const addForSpecificDateForm = document.querySelector(".addToDoForOtherDay-box");
const addBtn = document.querySelector(".addBtn-box");
const addCloseBtn = addForSpecificDateForm.querySelector("span i");
const addPopUpText = addForSpecificDateForm.querySelector(".popUpText");


const TODO_THING = "PENDING";
const DONE = "FINISHED";

let ToDos = [];
let Done = [];
let AddingToDos = [];

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
    const dateInformation = `${dateInfo.innerText}${monthInfo.innerText}${yearInfo.innerText}`;

    if(toDoList === unorderList){
        const cleanToDos = ToDos.filter(function(anything){
            return anything.id !== parseInt(li.id);    
        })
        ToDos = cleanToDos;
        save(`${dateInformation}${TODO_THING}`, JSON.stringify(ToDos));
    }   else if (doneList === unorderList){
            const cleanDone = Done.filter(function(anything){
            return anything.id !== parseInt(li.id);
        })
    Done = cleanDone;
    save(`${dateInformation}${DONE}`, JSON.stringify(Done));
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
    const dateInformation = `${dateInfo.innerText}${monthInfo.innerText}${yearInfo.innerText}`;
    console.log(exportDone, exportDone[0].text)
    paintDone(exportDone[0].text, dateInformation);      //array.filter () return 결과는 array data [] 로 나온다. 고생했으니 꼭 기억하자.
    

    const remainToDo = ToDos.filter(function(anything){     //to-do List 로컬스토리지 업데이트(id 넘버링 포함)
        return anything.id !== parseInt(li.id);
    })
    ToDos = remainToDo;
    for(i=0; i<ToDos.length; i++){
        ToDos[i].id = i+1;
        toDoList.childNodes[i].id = ToDos[i].id;         //toDoList.li #id 넘버링 업데이트!!!!
    }
    save(`${dateInformation}${TODO_THING}`, JSON.stringify(ToDos));
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
    const dateInformation = `${dateInfo.innerText}${monthInfo.innerText}${yearInfo.innerText}`;
    paintToDo(exportToDo[0].text, dateInformation);

    const remainDone = Done.filter(function(anything){      //Done List 로컬스토리지 업데이트(#id 넘버링 포함)
        return anything.id !== parseInt(li.id);
    })
    Done = remainDone;
    for(i=0; i<Done.length; i++){
        Done[i].id = i+1;
        doneList.childNodes[i].id = Done[i].id;         //doneList.li #id 넘버링 업데이트!!!!
    }

    save(`${dateInformation}${DONE}`, JSON.stringify(Done));
    
}



function paintToDo(text, dateData){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const finishBtn = document.createElement("button");
    const newId = ToDos.length + 1;                    
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
        id: newId,
        date: dateData
    }
    ToDos.push(ToDoObj);
    save(`${dateData}${TODO_THING}`, JSON.stringify(ToDos));
    //로컬 스토리지로 저장하는것 까지 완료.    -> 새로고침 시 로컬 + 지우기.
}
function loadPaintToDo(text, dateData){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const finishBtn = document.createElement("button");
    const newId = ToDos.length + 1;                    
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
        id: newId,
        date: dateData
    }
    ToDos.push(ToDoObj);
    save(`${dateData}${TODO_THING}`, JSON.stringify(ToDos));
    
    //로컬 스토리지로 저장하는것 까지 완료.    -> 새로고침 시 로컬 + 지우기.
}


function paintDone(text, dateData){
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
    span.style.textDecorationLine = "line-through";
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(switchBtn);
    doneList.appendChild(li);
    const doneObj = {
        text: text,
        id: newId,
        date: `${dateInfo.innerText}${monthInfo.innerText}${yearInfo.innerText}`
    }
    Done.push(doneObj);
    save(`${dateData}${DONE}`, JSON.stringify(Done));
    //로컬 스토리지로 저장하는것 까지 완료.    -> 새로고침 시 로컬 + 지우기.
}
function loadPaintDone(text, dateData){
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
    span.style.textDecorationLine = "line-through";
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(switchBtn);
    doneList.appendChild(li);
    const doneObj = {
        text: text,
        id: newId,
        date: dateData
    }
    Done.push(doneObj);
    save(`${dateData}${DONE}`, JSON.stringify(Done));
    //로컬 스토리지로 저장하는것 까지 완료.    -> 새로고침 시 로컬 + 지우기.
}

function toDoHandleSubmit(event){
    event.preventDefault();
    const thingToDo = toDoInput.value;
    const dateInfomation = `${date.innerText}${month.innerText}${year.innerText}`;
    paintToDo(thingToDo, dateInfomation);
    toDoInput.value = "";
}

function loadToDo(){
    //리스트 클린 리셋하고나서
    while(ToDos.length != 0){
        ToDos.pop();
    }
    while(AddingToDos.length != 0){
        AddingToDos.pop();
    }
    const loadedToDos = localStorage.getItem(`${date.innerText}${month.innerText}${year.innerText}${TODO_THING}`);
    // JSON.stringify 한 것을 다시 parse 해준 뒤, refresh 했을때 로컬스토리지에 있는 값은 화면에 리스트를 유지하도록 만든다.
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(anything){
            loadPaintToDo(anything.text, anything.date);
        })
    } 
    
}

function loadDone(){
    //리스트 클린 리셋하고나서
    while(Done.length != 0){
        Done.pop();
    }
    const loadedDone = localStorage.getItem(`${date.innerText}${month.innerText}${year.innerText}${DONE}`);
    if(loadedDone !== null){   // 로컬스토리지 값 있으면 refresh 할때 리스트 유지 ,  loadToDo 뒤 else if 형태로 두면 둘다 스토리지 데이터 있을때 앞쪽 함수만 실행되서 따로 둬야한다.
        const parsedDone = JSON.parse(loadedDone);
        parsedDone.forEach(function(anything){
            loadPaintDone(anything.text, anything.date);
        })
    }
}

function handleSubmitForAddingToDoForOtherDay(event){
    event.preventDefault();
    const addForm = event.target;
    console.log(addForm)
    const dateForAdding = addForm.querySelector("input");
    const addInput = addForm.querySelector("div input:first-child");
    const addInputValue = addInput.value;

    //input type="date" 값 나눠서 로컬스토리지 날짜정보 순서에 맞게 조합
    const yearForAdding = dateForAdding.value.slice(0, 4);
    const monthNumForAdding = dateForAdding.value.slice(6, 7);
    const dateNumForAdding = dateForAdding.value.slice(8, 10);
    const addingDateInformation = `${parseInt(dateNumForAdding)}${monthObj[parseInt(monthNumForAdding)-1]}${yearForAdding}`;
    const currentDate =`${date.innerText}${month.innerText}${year.innerText}` 
    const newId = AddingToDos.length +1;
    const addingToDoObj={
        text: addInputValue,
        id: newId,
        date: addingDateInformation
    }
    AddingToDos.push(addingToDoObj);
    const existedLocal = localStorage.getItem(`${addingDateInformation}${TODO_THING}`);

    if(existedLocal !== null && currentDate === addingDateInformation){
        paintToDo(addingToDoObj.text, addingToDoObj.date);
    } else if(existedLocal === null && currentDate === addingDateInformation){
        paintToDo(addingToDoObj.text, addingToDoObj.date);
    } else if(existedLocal !== null && currentDate !== addingDateInformation){
        const parsedExistedLocal = JSON.parse(existedLocal);
        parsedExistedLocal.push(addingToDoObj);
        for(i=0; i < parsedExistedLocal.length; i++){
            parsedExistedLocal[i].id = i+1;
        } 
        save(`${addingDateInformation}${TODO_THING}`, JSON.stringify(parsedExistedLocal));
    } else{
        save(`${addingDateInformation}${TODO_THING}`, JSON.stringify(AddingToDos))
        AddingToDos.pop();
    }

    addPopUpText.animate([ { opacity: 0, color: "#FFFFFF"},
        { opacity: .8, color: "#FFFFFF"},
        { opacity: 0, color: "#FFFFFF"} ],
      1500);
    addPopUpText.innerText =`completed to add it on ${addingDateInformation}!`;
    addInput.value = "";
}


function handleClickAddBtn(){
    addBtn.classList.add("no-showing");
    addForSpecificDateForm.classList.remove("no-showing");
}

function handleClickCloseAddBox(){
    addBtn.classList.remove("no-showing");
    addForSpecificDateForm.classList.add("no-showing");
}

function init2(){
    loadToDo();
    loadDone();
    toDoForm.addEventListener("submit", toDoHandleSubmit);
    addForSpecificDateForm.addEventListener("submit", handleSubmitForAddingToDoForOtherDay);
    addBtn.addEventListener("click", handleClickAddBtn);
    addCloseBtn.addEventListener("click", handleClickCloseAddBox);
}

init2();