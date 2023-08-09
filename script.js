const calculatorDisplay = document.getElementById('calculator-display');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operator');
const clearButton = document.getElementById('clear');

let firstNumber;
let secondNumber;
let chosenOperator;
let askForFirstNumber = true;

clearButton.addEventListener('click', clear);

numbers.forEach(number => {
    number.addEventListener('click', function() {
        if (askForFirstNumber === true) getFirstNumber(this);
        else getSecondNumber(this);
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', function() {
        askForFirstNumber = false;
        getOperator(operator);
    })
})

function operate(firstNumber, chosenOperator, secondNumber) {
    let result;
    switch (chosenOperator) {
        case '+':
            result = add(firstNumber, secondNumber);
            break;
        case '-':
            result = subtract(firstNumber, secondNumber);
            break;
        case '*':
            result = multiply(firstNumber, secondNumber);
            break;
        case '/':
            result = divide(firstNumber, secondNumber);
            break;
    
        default:
            break;
    }
    return result;
}

function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
    return +(firstNumber / secondNumber).toFixed(3);
}

function clear() {
    calculatorDisplay.textContent = '';
}

function populateDisplay(arithmetic) {
    calculatorDisplay.textContent += arithmetic;
}

function getFirstNumber(number) {
    firstNumber = +number.textContent;
    populateDisplay(firstNumber);
}

function getOperator(operator) {
    chosenOperator = ' ' + operator.textContent + ' ';
    populateDisplay(chosenOperator);
}

function getSecondNumber(number) {
    secondNumber = +number.textContent;
    populateDisplay(secondNumber);
}