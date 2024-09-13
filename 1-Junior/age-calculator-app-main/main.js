const _hr = document.getElementById('line-break');
const _arrowImg = document.getElementById("arrow-img");
const _dayInput = document.getElementById("day-input");
const _monthInput = document.getElementById("month-input");
const _yearInput = document.getElementById("year-input");
const _dayLabel = document.getElementById("days");
const _monthLabel = document.getElementById("months");
const _yearLabel = document.getElementById("years");
const _dayErr = document.getElementById("error-day");
const _monthErr = document.getElementById("error-month");
const _yearErr = document.getElementById("error-year");


function handleDisplayAgeClick() {
    _dayErr.style.display = _monthErr.style.display = _yearErr.style.display = 'none';
    let days, months, years;
    console.log("Clicked");
    const [ birthDay, birthMonth, birthYear ] = [ parseInt(_dayInput.value), parseInt(_monthInput.value), parseInt(_yearInput.value)];
    if(!checkValidInputs(birthDay, birthMonth, birthYear))
        days = months = years = "- -";
    else {
        ({ years, months, days} = calcAge(birthDay, birthMonth, birthYear));    
    
        if( years < 0 || months < 0 || days < 0) {
            _monthErr.textContent = 'Must be a valid month';
            _monthErr.style.display = 'block';
            _dayErr.textContent = 'Must be a valid day';
            _dayErr.style.display = 'block';
        }
    }
    _dayLabel.textContent = days;
    _monthLabel.textContent = months;
    _yearLabel.textContent = years;

}

function checkValidInputs(birthDay, birthMonth, birthYear) {
    let flag = true;
    if(isNaN(birthDay)) {
        _dayErr.textContent = 'This field is required';
        _dayErr.style.display = 'block';
        flag = false;
    }
    if(isNaN(birthMonth)) {
        _monthErr.textContent = 'This field is required';
        _monthErr.style.display = 'block';
        flag = false;
    }
    if(isNaN(birthYear)) {
        _yearErr.textContent = 'This field is required';
        _yearErr.style.display = 'block';
        flag = false;
    }
    if(!flag) return false;
    if(birthYear > new Date().getFullYear()){
        _yearErr.textContent = 'Must be a valid year';
        _yearErr.style.display = 'block';
        flag = false;
    }
    if (birthMonth < 1 || birthMonth > 12) {
        _monthErr.textContent = 'Must be a valid month';
        _monthErr.style.display = 'block';
        flag = false;
    }
    const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    let maxDays;
    switch (birthMonth) {
        case 2:
        maxDays = isLeapYear(new Date().getFullYear()) ? 29 : 28;
        break;
        case 4:
        case 6:
        case 9:
        case 11:
        maxDays = 30;
        break;
        default:
        maxDays = 31;
    }
    if (birthDay < 1 || birthDay > maxDays) {
        _dayErr.textContent = 'Must be a valid day';
        _dayErr.style.display = 'block';
        flag = false;
    }
    
    return flag;
}

function calcAge(birthDay, birthMonth, birthYear ) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // Months are 0-based
    const currentDay = today.getDate();

    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    const currentDate = new Date(currentYear, currentMonth - 1, currentDay);

    const millisecondsDifference = currentDate - birthDate;
    const daysDifference = millisecondsDifference / (1000 * 60 * 60 * 24);

    const years = Math.floor(daysDifference / 365);
    const months = Math.floor((daysDifference % 365) / 30);
    const days = Math.floor((daysDifference % 365) % 30);
    return { years, months, days };
}

