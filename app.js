let operator = "";
let previousValue = "";
let displayValue = "";

let displayScreen = document.querySelector(".current");
let previousScreen = document.querySelector(".previous");

let clear = document.querySelector(".clear");
let del = document.querySelector(".delete");
let equal = document.querySelector(".equals");
let decimal = document.querySelector(".decimal");

let numbers = document.querySelectorAll(".num");
let operators = document.querySelectorAll(".operator");
const calc = document.querySelector("#calculator");


for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", function(e) {
    appendNumber(e.target.textContent);
    displayScreen.textContent = displayValue;
  })
}

function appendNumber(num) {
  displayValue += num;
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

