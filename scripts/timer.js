const timerContainerDOM = document.getElementById('timerContainer');
const timerDOM = document.createElement('div');
const startButtonDOM = document.getElementById('startButton');
const resetButtonDOM = document.getElementById('resetButton');
const hoursDOM = document.getElementById('hours');
const minutesDOM = document.getElementById('minutes');
const secondsDOM = document.getElementById('seconds');
let timer = {hours: 0, minutes: 0, seconds: 0};
let timeString = "";
let pausedTimer = true;

startButtonDOM.addEventListener('click', startTimer);
resetButtonDOM.addEventListener('click', resetTimer);

function pad(number, padding){
    return String(number).padStart(padding, '0');
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

function runTimer(){
    timer.seconds++;

    if (timer.seconds > 59)
    {
        timer.seconds = 0;
        
        timer.minutes++;
    };

    if (timer.minutes > 59)
    {
        timer.minutes = 0;

        timer.hours++;
    };

    saveTimer(timer);
};

function timerMain(){
    
    timeString = pad(timer.hours, 2) + ":" + pad(timer.minutes, 2) + ":" + pad(timer.seconds, 2);
    
    timerDOM.id = "timer";
    
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