
const _main = document.getElementById("main");
let currTheme = localStorage.getItem('theme') || 'dark';
const _toggleBackground = document.querySelector(".toggle-background");
const _toggle = document.querySelector(".toggle");
const _result = document.getElementById("calc-result");
const _buttonsGrid = document.querySelector(".calc-body");
const buttonClickSound = new Audio('./images/button-click.mp3');
buttonClickSound.load();

let firstNumber, secondNumber, symbol, res,
    isDot, isFirstActive, isSymbolChange, isLastEqual;
resetAll();

_main.setAttribute('data-theme', currTheme);

_toggleBackground.addEventListener("click", (e) => handleThemeSwitch(e));
_buttonsGrid.addEventListener("click", (e) => handleButtonsClick(e));

function handleThemeSwitch(e) {
    if(e.target.matches("#theme-one")) {
        _toggle.classList.add("one");
        _toggle.classList.remove("two");
        _toggle.classList.remove("three");
        currTheme = "dark";
    }
    else if(e.target.matches("#theme-two")) {
        _toggle.classList.remove("one");
        _toggle.classList.add("two");
        _toggle.classList.remove("three");
        currTheme = "light";
    }
    else if(e.target.matches("#theme-three")) {
        _toggle.classList.remove("one");
        _toggle.classList.remove("two");
        _toggle.classList.add("three");
        currTheme = "purple";
    }
    _main.setAttribute('data-theme', currTheme);
    localStorage.setItem("theme", currTheme);
}
function handleButtonsClick(e) {
    if(e.target.matches(".key")) {
        buttonClickSound.currentTime = 0;
        buttonClickSound.play();
    }
    else 
        return;
    

    if(e.target.matches(".number")){
        if(isFirstActive) {
            if(res) {
                resetAll();
                res = null 
            }
            firstNumber = firstNumber !== "0" ? firstNumber+e.target.textContent : e.target.textContent;
        }
        else
            secondNumber = secondNumber !== "0" ? secondNumber+e.target.textContent : e.target.textContent;
    }
    else if(!isDot && e.target.matches("#dot-button")) {
        isDot = true;
        if(isFirstActive){
            if(res) {
                resetAll();
                res = null 
            }
            firstNumber = firstNumber ? firstNumber+ "." : "0.";
        }
        else
            secondNumber = Number(secondNumber) ? secondNumber+ "." : "0.";
    }
    else if(e.target.matches("#reset-button"))
        resetAll();
    else if(e.target.matches("#del-button")) {
        let lastChar;
        if(isFirstActive){
            lastChar = firstNumber.charAt(firstNumber.length - 1);
            firstNumber = Number(firstNumber) && firstNumber.length > 1 ? firstNumber.slice(0,-1) : 0;
        }
        else {
            lastChar = secondNumber.charAt(secondNumber.length - 1);
            secondNumber = Number(secondNumber) && secondNumber.length > 1 ? secondNumber.slice(0,-1) : 0;
        }
        if(lastChar === ".") 
            isDot = false;
    }
    else if(e.target.matches(".action")){
        if(res) {
            secondNumber = 0;
            res = null 
        }
        symbol = e.target.textContent;
        isFirstActive = false;
        isSymbolChange = true;
    }
    else if(e.target.matches("#equal-button")){
        if (!secondNumber || !symbol) return;
        res = Calc(parseFloat(firstNumber),parseFloat(secondNumber),symbol);
        if(res === "Error") {
            resetAll();
            _result.textContent = "Error";
            return;
        }
        isFirstActive = true;
        firstNumber = res.toString();
    }

    firstNumber = firstNumber.toString();
    secondNumber = secondNumber.toString();
    _result.textContent = isSymbolChange ? symbol : isFirstActive ? firstNumber : secondNumber;
    isSymbolChange = false;
}
function resetAll() {
    firstNumber = "0";
    secondNumber = "0";
    symbol = null;
    res = null;
    isDot = false;
    isFirstActive = true;
    isSymbolChange = false;
    isLastEqual = false;
    // _result.textContent = 0;
}


function Calc(x,y,symbol){
    switch(symbol){
        case "+":
            return add(x,y);
        case "-":
            return subtract(x,y);
        case "x":
            return multiply(x,y);
        case "/":
            return divide(x,y);
        default:
            console.log("Invalid operator input");
            return "Error";
    }
}
// MATH FUNCTIONS
function add(x,y){
    return x+y;
}
function subtract(x,y){
    return x-y;
}
function multiply(x,y){
    return x*y;
}
function divide(x,y){
    if(y===0)
        return "Error";
    return x/y;
}