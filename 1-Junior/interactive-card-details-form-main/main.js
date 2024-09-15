// root styles
const rootStyles = getComputedStyle(document.documentElement);
const redColor = rootStyles.getPropertyValue('--red').trim();
const purpleColor = rootStyles.getPropertyValue('--purple').trim();
//containers
const inputContainer = document.getElementById('input-container')
const thxContainer = document.getElementById('thx-container');
// Inputs
const nameInput = document.getElementById('name-input');
const  numberInput = document.getElementById('number-input');
const monthInput = document.getElementById('month-input');
const yearInput = document.getElementById('year-input');
const cvcInput = document.getElementById('cvc-input');
let prevNumberVal = "";
// Errors
const errorName = document.getElementById('error-name');
const errorNumber = document.getElementById('error-number');
const errorDate = document.getElementById('error-date');
const errorCvc = document.getElementById('error-cvc');
let isYearErr = false;
let isMonthErr = false;
// Card Display
const cardNumber = document.getElementById('card-number');
const cardName = document.getElementById('card-name');
const cardDate = document.getElementById('card-date');
const cardCvc = document.getElementById('card-cvc');
// Eye
const eyeImg = document.getElementById('eye-icon');
const blurs = document.getElementsByClassName('blur-overlay');
let isEyeOpen = true;

function nameOnInput() {
    if(nameInput.value === ""){
        cardName.textContent = 'Jane Appleseed';
        errorName.style.display = 'block';
        nameInput.style.borderColor = redColor;
    }
    else {
        cardName.textContent = nameInput.value;
        errorName.style.display = 'none';
        nameInput.style.borderColor = purpleColor;
    }
}
function numberOnInput() {
    if(numberInput.value === "" || !(/^[\d\s]+$/.test(numberInput.value))) {
        cardNumber.textContent = '0000 0000 0000 0000';
        errorNumber.style.display = 'block';
        numberInput.style.borderColor = redColor;
        prevNumberVal = "";
        if(errorNumber.value === "")
            errorNumber.textContent = 'Can\'t be blank';
        else
            errorNumber.textContent = 'Wrong format, numbers only';
        return;
    }
    numberInput.style.borderColor = purpleColor;
    errorNumber.style.display = 'none';
    
    let res = '';
    let input = numberInput.value.replace(/\s+/g, "");

    for (let i = 0; i < input.length; i++) {
        res += input[i];
        if ((i + 1) % 4 === 0 && i < input.length - 1) 
            res += " ";
    }

    numberInput.value = res;
    cardNumber.textContent = res;
    prevNumberVal = res;
}
function monthOnInput() {
    if(monthInput.value === "" || parseInt(monthInput.value) > 12 || parseInt(monthInput.value) < 1 
        || !(/^\d+$/.test(monthInput.value))){
        cardDate.textContent = '00' + cardDate.textContent.slice(cardDate.textContent.indexOf("/"));
        errorDate.style.display = 'block';
        monthInput.style.borderColor = redColor;
        isMonthErr = true;
        if(monthInput.value === "")
            errorDate.textContent = 'Can\'t be blank';
        else
            errorDate.textContent = 'Invalid Month or Year';
    }
    else {
        isMonthErr = false;
        cardDate.textContent = monthInput.value + cardDate.textContent.slice(cardDate.textContent.indexOf("/"));
        if(!isMonthErr && !isYearErr) errorDate.style.display = 'none';
        monthInput.style.borderColor = purpleColor;
    }
}
function yearOnInput() {    
    if(yearInput.value === ""  || parseInt(yearInput.value) < parseInt(new Date().getFullYear().toString().slice(-2))
        || !(/^\d+$/.test(yearInput.value))){
        cardDate.textContent = cardDate.textContent.slice(0, cardDate.textContent.indexOf("/") + 1) + '00';
        errorDate.style.display = 'block';
        yearInput.style.borderColor = redColor;
        isYearErr = true;
        if(yearInput.value === "")
            errorDate.textContent = 'Can\'t be blank';
        else
            errorDate.textContent = 'Invalid Month or Year';
    }
    else {
        isYearErr = false;
        cardDate.textContent =  cardDate.textContent.slice(0, cardDate.textContent.indexOf("/") + 1) + yearInput.value;
        if(!isMonthErr && !isYearErr) errorDate.style.display = 'none';
        yearInput.style.borderColor = purpleColor;
    }
}
function cvcOnInput() {
    if(cvcInput.value === "" || !(/^\d+$/.test(cvcInput.value))){ //only numbers
        cardCvc.textContent = '000';
        errorCvc.style.display = 'block';
        cvcInput.style.borderColor = redColor;
        if(cvcInput.value === "")
            errorCvc.textContent = 'Can\'t be blank';
        else
        errorCvc.textContent = 'Wrong format, numbers only';
    }
    else {
        cardCvc.textContent = cvcInput.value;
        errorCvc.style.display = 'none';
        cvcInput.style.borderColor = purpleColor;
    }
}

function handleConfirmButtonClick() {
    if(errorName.style.display === 'none' && nameInput.value !== '' &&
        errorNumber.style.display === 'none' && numberInput.value.length === 19 &&
        errorDate.style.display === 'none' && monthInput.value.length === 2 && yearInput.value.length === 2 &&
        errorCvc.style.display === 'none' && cvcInput.value.length === 3){
            inputContainer.style.display = 'none';
            thxContainer.style.display = 'flex';
        }
}

function toggleBlurEye() {
    if(isEyeOpen){
        eyeImg.style.backgroundImage = "url('./images/eye-icon-closed.png')";
        for(element of blurs)
            element.style.display = 'block';
    }
    else {
        eyeImg.style.backgroundImage = "url('./images/eye-icon-open.png')";
        for(element of blurs)
            element.style.display = 'none';
    }
    isEyeOpen = !isEyeOpen;
}