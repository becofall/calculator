let operator = null;
let secondValue = "";
let firstValue = "";
let canResetScreen = false;

let displayScreen = document.querySelector(".current");
let secondaryScreen = document.querySelector(".previous");
let clear = document.querySelector(".clear");
let del = document.querySelector(".delete");
let equal = document.querySelector(".equals");
let decimal = document.querySelector(".decimal");
let numbers = document.querySelectorAll(".num");
let operators = document.querySelectorAll(".operator");

clear.addEventListener("click", clearScreen);
del.addEventListener("click", deleteNum);
equal.addEventListener("click", evaluate);
decimal.addEventListener("click", appendDecimal);

numbers.forEach((number) =>
  number.addEventListener("click", () => appendNumber(number.textContent)));

operators.forEach((operator) => 
  operator.addEventListener("click", () => setOperation(operator.textContent)));

//append number to display when number pressed
function appendNumber(num) {
  if (displayScreen.textContent === "0" || canResetScreen) {
    resetScreen();
  }
  if (displayScreen.textContent.length <= 13) {
    displayScreen.textContent += num;
  }
}

function appendDecimal() {
  if(canResetScreen) {
    resetScreen();
  }
  if(displayScreen.textContent == "") {
    displayScreen.textContent = "0";
  }
  if(displayScreen.textContent.includes(".")) {
    return;
  }
  displayScreen.textContent += ".";
}

//when an operator(+-*/) is pressed
function setOperation(currentOperator) {
  if(operator !== null) {
    evaluate();
  }
  firstValue = Number(displayScreen.textContent);
  operator = currentOperator;
  secondaryScreen.textContent = `${firstValue} ${operator}`;
  canResetScreen = true;
}

//when equals is pressed
function evaluate() {
  if(operator === null || canResetScreen) {
    return;
  }
  //can't divide by zero exception
  if(operator === "/" && displayScreen.textContent === "0") {
    displayScreen.textContent = "ERROR";
    return;
  }

  secondValue = Number(displayScreen.textContent);
  console.log()
  let result = roundValue(operate(operator, firstValue, secondValue));
  console.log(result);
  
  //for if result doesn't fit on display
  if(result.toString().length > 14) {
    displayScreen.textContent = roundValue(operate(operator, firstValue, secondValue)).toPrecision(9);
    secondaryScreen.textContent = `${firstValue} ${operator} ${secondValue} = `
    operator = null;
    return;
  }
  
  displayScreen.textContent = roundValue(operate(operator, firstValue, secondValue));
  secondaryScreen.textContent = `${firstValue} ${operator} ${secondValue} = `
  operator = null;
}

//when clear button is pressed
function clearScreen() {
  displayScreen.textContent = "";
  secondaryScreen.textContent = "";
  firstValue = "";
  secondValue = "";
  operator = null;
}

function resetScreen() {
  displayScreen.textContent = "";
  canResetScreen = false;
}

function deleteNum() {
  displayScreen.textContent = displayScreen.textContent.toString().slice(0, -1);
}

function roundValue(num) {
  return Math.round(num * 1000) / 1000;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch(operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      if(num2 === 0) {
        return null;
      } else {
        return divide(num1, num2);
      }
    default:
      return null;
  }
}

