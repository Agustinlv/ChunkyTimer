const timerContainerDOM = document.getElementById('timerContainer');
const timerDOM = document.createElement('div');
const startButtonDOM = document.getElementById('startButton');
const resetButtonDOM = document.getElementById('resetButton');
const hideButtonDOM = document.getElementById('hideButton');
const headerDOM = document.getElementById('header');
const hoursDOM = document.getElementById('hours');
const minutesDOM = document.getElementById('minutes');
const secondsDOM = document.getElementById('seconds');
let timer = {hours: 0, minutes: 0, seconds: 0};
let timeString = "";
let pausedTimer = true;
let navbarHidden = false;

timerDOM.id = "timer";

startButtonDOM.addEventListener('click', startTimer);
resetButtonDOM.addEventListener('click', resetTimer);
hideButtonDOM.addEventListener('click', hideNavbar);


function pad(number, padding){
    return String(number).padStart(padding, '0');
};

function hideNavbar(){
    navbarHidden = !navbarHidden;

    if (navbarHidden)
    {
        headerDOM.style.display = "none";
        hideButtonDOM.textContent = "show controls";
        timerDOM.style.height = "98vh";
    }
    else
    {
        headerDOM.style.display = "flex";
        hideButtonDOM.textContent = "hide controls";
        timerDOM.style.height = "90vh";
    };
};

function saveTimer(){
    localStorage.setItem("savedTimer", JSON.stringify(timer));
};

function fetchSavedTimer(){
    let savedTimer = JSON.parse(localStorage.getItem("savedTimer"));

    Object.assign(timer, savedTimer);
    
    setResetFields();
};

function setResetFields(){
    hoursDOM.value = timer.hours;
    
    minutesDOM.value = timer.minutes;
    
    secondsDOM.value = timer.seconds;
};

function startTimer(){
    pausedTimer = !pausedTimer;

    setResetFields();
};

function resetTimer(){
    pausedTimer = true;

    Object.assign(timer, {hours: hoursDOM.value, minutes: minutesDOM.value, seconds: secondsDOM.value});

    saveTimer();
};

function addTime(previousLevel, nextLevel){
    if (timer[`${previousLevel}`] > 59)
    {
        timer[`${previousLevel}`] = 0;

        timer[`${nextLevel}`]++;
    };
};

function runTimer(){
    timer.seconds++;

    addTime("seconds", "minutes");

    addTime("minutes", "hours");

    saveTimer(timer);
};

function timerMain(){
    
    timeString = timer.hours + ":" + pad(timer.minutes, 2) + ":" + pad(timer.seconds, 2);
    
    timerDOM.textContent = timeString;
    
    timerContainerDOM.replaceChildren();
    
    timerContainerDOM.appendChild(timerDOM);
};

fetchSavedTimer();

setInterval(()=>{
    if (!pausedTimer)
    {
        runTimer();
    };
    
    timerMain();
},1000);