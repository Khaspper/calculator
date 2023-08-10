const calculatorDisplay = document.getElementById('calculator-display');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operator');
const clearButton = document.getElementById('clear');
const equalButton = document.getElementById('equals');
const deleteButton = document.getElementById('delete');
const percentageButton = document.getElementById('percent');
const numericInput = document.getElementById("calculator-display");

let firstNumber = '';
let secondNumber = '';
let chosenOperator = '';
let answer = '';
let askForFirstNumber = true;
let clearDisplay = false;
let isDecimal = false;

clearButton.addEventListener('click', clear);
clearButton.addEventListener('dblclick', doubleClear);
deleteButton.addEventListener('click', deleteLastNumber);
percentageButton.addEventListener('click', percentage)

numericInput.addEventListener("input", function(event) {
  const inputValue = event.target.textContent;

  // Remove non-numeric characters
  const numericValue = inputValue.replace(/[^0-9]/g, "");

  // Update the input value
  event.target.textContent = numericValue;
});

numbers.forEach(number => {
    number.addEventListener('click', function() {
        if(clearDisplay === true) {
            clearDisplayScreen();
            clearDisplay = false;
        }
        if (askForFirstNumber === true) {
            getFirstNumber(this);
        } 
        else getSecondNumber(this);
    })
});

operators.forEach(operator => {
    operator.addEventListener('click', function() {
        if(secondNumber !== '') {
            firstNumber = operate(firstNumber, chosenOperator, secondNumber);
            secondNumber = '';
            clearDisplayScreen();
            populateDisplay(firstNumber);
        }
        askForFirstNumber = false;
        clearDisplay = true;
        if(firstNumber === '') {
            firstNumber = answer;
            secondNumber = '';
            askForFirstNumber = false;
        }
        getOperator(operator);
    })
});

equalButton.addEventListener('click', function() {
    clearDisplayScreen();
    answer = operate(firstNumber, chosenOperator, secondNumber);
    populateDisplay(answer);
    firstNumber = '';
    secondNumber = '';
});

function operate(firstNumber, chosenOperator, secondNumber) {
    clearDisplay = true;
    firstNumber = +firstNumber;
    secondNumber = +secondNumber;
    askForFirstNumber = true;
    let result;
    switch (chosenOperator) {
        case '+':
            result = add(firstNumber, secondNumber);
            break;
        case '-':
            result = subtract(firstNumber, secondNumber);
            break;
        case 'x':
            result = multiply(firstNumber, secondNumber);
            break;
        case '÷':
            result = divide(firstNumber, secondNumber);
            break;

        default:
            break;
    }
    return result;
}

function add(firstNumber, secondNumber) {
    let sum = firstNumber + secondNumber;
    return sum % 1 !== 0 ? sum.toFixed(3) : sum;
}

function subtract(firstNumber, secondNumber) {
    let sum = firstNumber - secondNumber;
    return sum % 1 !== 0 ? sum.toFixed(3) : sum;
}

function multiply(firstNumber, secondNumber) {
    let product = firstNumber * secondNumber;
    return product % 1 !== 0 ? product.toFixed(3) : product;
}

function divide(firstNumber, secondNumber) {
    let quotient = +(firstNumber / secondNumber);
    return quotient % 1 !== 0 ? quotient.toFixed(3) : quotient;
}

function doubleClear() {
    clearDisplayScreen();
    askForFirstNumber = true;
    isDecimal = false;
    firstNumber = '';
    secondNumber = '';
    chosenOperator = '';
}

function clear() {
    clearDisplayScreen();
    if (askForFirstNumber === true) doubleClear();
    else secondNumber = '';
}

function deleteLastNumber() {
    if(askForFirstNumber === true) {
        firstNumber = firstNumber.slice(0, -1);    
        clearDisplayScreen();
        populateDisplay(firstNumber);
    }
    else {
        secondNumber = secondNumber.slice(0, -1);    
        clearDisplayScreen();
        populateDisplay(secondNumber);
    }
}

function clearDisplayScreen() {
    calculatorDisplay.textContent = '';
}

function populateDisplay(arithmetic) {
    clearDisplayScreen();
    console.log(arithmetic);
    calculatorDisplay.textContent = arithmetic;
}

function getFirstNumber(number) {
    firstNumber += `${number.textContent}`;
    populateDisplay(firstNumber);
}

function getOperator(operator) {
    chosenOperator = operator.textContent;
}

function getSecondNumber(number) {
    secondNumber += `${number.textContent}`;
    populateDisplay(secondNumber);
}

function percentage() {
    if(askForFirstNumber === true) {
        firstNumber = divide(firstNumber, 100);
        clearDisplayScreen();
        populateDisplay(firstNumber);
    }
    else if(askForFirstNumber === false) {
        secondNumber = divide(secondNumber, 100);
        clearDisplayScreen();
        populateDisplay(secondNumber);
    }
}
// DONE
// // TODO: Make it be like 12 + 7 - 5 * 3 = to whatever but basically after the user picks and operator
// // TODO: It evaluates the previous operator and then I think you're done 

// TODO: Sike you still have to change the input to a text input instead of just a regular div

