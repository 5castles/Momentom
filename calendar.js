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
//객체 프로퍼티 접근: Obj[key]
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
            dateOnCal[j].addEventListener("click", clickedDateUpdate)        
        }
    }
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
function init(){
    getTodayInfo();
    firstColor();
    previousMonth.addEventListener("click", moveToPreviousMonth);
    nextMonth.addEventListener("click", moveToNextMonth);
}

init();