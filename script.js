const currentTime = document.querySelector("h1"),
content = document.querySelector(".content"),
selectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button"),
ringtone = document.getElementById("ringtone");

let alarmTime, isAlarmSet = false;

for(let i = 12; i > 0; i--){
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i = 59; i >= 0; i--){
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i = 2; i > 0; i--){
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = h >= 12 ? "PM" : "AM";

    h = h == 0 ? 12 : h > 12 ? h - 12 : h;

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;
    
    if(isAlarmSet && alarmTime == `${h}:${m}:${ampm}`){
        ringtone.play();
    }
}, 1000);

function setAlarm(){
    if(isAlarmSet){
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        isAlarmSet = false;
    } else {
        let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`;
        if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
            return alert("Please select a valid alarm time.");
        }
        isAlarmSet = true;
        alarmTime = time;
        content.classList.add("disable");
        setAlarmBtn.innerText = "Clear Alarm";
    }
}

setAlarmBtn.addEventListener("click", setAlarm);
