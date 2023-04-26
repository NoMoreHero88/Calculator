let calcInfo = {};

function add(a,b){
    return Number(a)+Number(b);
}

function subtract(a,b){
    return Number(a)-Number(b);
}

function multiply(a,b){
    return Number(a)*Number(b);
}

function divide(a,b){
    return Number(a)/Number(b);
}

function operate(a, operator, b){
    let result;
    if(operator === '+'){
        result = add(a,b);
    }else if(operator === '-'){
        result = subtract(a,b);
    }else if(operator === '*'){
        result = multiply(a,b);
    }else if(operator === '/'){
        result = divide(a,b);
    }
    return result;
}

const checkCalcContent = (calcContent) => {
    if (Object.keys(calcContent).length === 0){
        return 0;
    } else if (Object.keys(calcContent).length === 1){
        return 1;
    } else if (Object.keys(calcContent).length === 2){
        return 2;
    } else {
        return 3;
    }
};

function appendNum(numBut){
    if(resultDisplayed == true){
        calcInfo = {};
        resultDisplayed = false;
    }if(checkCalcContent(calcInfo) == 0){
        calcInfo.firstNum = numBut;
        currentInput.textContent = displayInput();
    }else if(checkCalcContent(calcInfo) == 1){
        calcInfo.firstNum += numBut;
        currentInput.textContent = displayInput();
    }else if (checkCalcContent(calcInfo) == 2){
        calcInfo.secondNum = numBut;
        currentInput.textContent = displayInput();
    }else {
        calcInfo.secondNum += numBut;
        currentInput.textContent = displayInput();
    }
}

const numButtons = document.querySelectorAll('.number');

numButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        appendNum(e.target.id);
    });
})

function appendOperator(operator){
    if(checkCalcContent(calcInfo) == 3){
        let temp = operate(calcInfo.firstNum, calcInfo.operator, calcInfo.secondNum);
        let result = Math.round((temp + Number.EPSILON)*10000)/10000
        resultDisplay.textContent = result;
        calcInfo = {firstNum:result};
    }
    if(checkCalcContent(calcInfo) == 1){
        resultDisplayed = false;
        if (operator == "plus" || operator == '+'){
            calcInfo.operator = "+";
            currentInput.textContent = displayInput();
        }else if(operator == "minus" || operator == '-'){
            calcInfo.operator = "-";
            currentInput.textContent = displayInput();
        }else if(operator == "multiply" || operator == '*'){
            calcInfo.operator = "*";
            currentInput.textContent = displayInput();
        }else if(operator == "divide" || operator == '/'){
            calcInfo.operator = "/";
            currentInput.textContent = displayInput();
        }
    }

}

function displayInput(){
    let currentInput;
    if (checkCalcContent(calcInfo) == 3){
        currentInput = String(calcInfo.firstNum + calcInfo.operator + calcInfo.secondNum);
    }else if(checkCalcContent(calcInfo) == 2){
        currentInput = String(calcInfo.firstNum + calcInfo.operator);
    }else if(checkCalcContent(calcInfo == 1) && calcInfo.firstNum == undefined){
        currentInput = '';
    }else if(checkCalcContent(calcInfo) == 1){
        currentInput = String(calcInfo.firstNum)
    }else {
        currentInput = '';
    }
    return currentInput;
}

const operatorButtons = document.querySelectorAll('.operator');

operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        appendOperator(e.target.id);
    });
});

const equalBut = document.querySelector('#equal');
const currentInput = document.querySelector('#currentInputDisp');
const resultDisplay = document.querySelector('#resultDisplay');


equalBut.addEventListener('click', getResult);

function getResult(){
    if(checkCalcContent(calcInfo) == 3){
        if (calcInfo.operator == '/' && calcInfo.secondNum == "0"){
            resultDisplay.textContent = "ERROR: Cannot divide by 0"
        }else{
            let temp = operate(calcInfo.firstNum, calcInfo.operator, calcInfo.secondNum);
            let result = Math.round((temp + Number.EPSILON)*10000)/10000
            resultDisplay.textContent = result;
            calcInfo = {firstNum:result};
            resultDisplayed = true;
        }
    }
}

const clearBtn = document.querySelector('#clear');
let resultDisplayed = false;

clearBtn.addEventListener('click', () => {
    calcInfo = {};
    currentInput.textContent = '';
    resultDisplay.textContent = '';
})

const delBtn = document.querySelector('#delete');

delBtn.addEventListener('click', deleteLast);

function deleteLast(){
    if (checkCalcContent(calcInfo) == 3){
        calcInfo.secondNum = calcInfo.secondNum.slice(0,-1);
        if(calcInfo.secondNum == ''){
            delete calcInfo.secondNum;
        }
        currentInput.textContent = displayInput();
    }else if(checkCalcContent(calcInfo) == 2){
        delete calcInfo.operator;
        currentInput.textContent = displayInput();
    }else if(checkCalcContent(calcInfo) == 1){
        calcInfo.firstNum = calcInfo.firstNum.toString()
        if(resultDisplayed == true){
            resultDisplayed = false;
        }
        calcInfo.firstNum = calcInfo.firstNum.slice(0,-1);
        if(calcInfo.firstNum == ''|| calcInfo.firstNum == '-'){
            delete calcInfo.firstNum;
        }
        currentInput.textContent = displayInput();
        resultDisplay.textContent = '';
        resultDisplayed = true;
    }
}

document.documentElement.addEventListener("keydown",(e) => {
        if(e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/'){
            appendOperator(e.key);
            e.preventDefault();
        }else if(e.key == 'Enter'){
            debugger;
            getResult();
            e.preventDefault();
        }else if(e.key == 'Backspace'){
            deleteLast();
        }else if(e.key >= 0 && e.key <= 9 && e.key !== ' '){
            if(resultDisplayed == true){
                calcInfo = {};
                resultDisplayed = false;
            }if(checkCalcContent(calcInfo) == 0){
                calcInfo.firstNum = e.key;
                currentInput.textContent = displayInput();
            }else if(checkCalcContent(calcInfo) == 1){
                calcInfo.firstNum += e.key;
                currentInput.textContent = displayInput();
            }else if (checkCalcContent(calcInfo) == 2){
                calcInfo.secondNum = e.key;
                currentInput.textContent = displayInput();
            }else {
                calcInfo.secondNum += e.key;
                currentInput.textContent = displayInput();
            }
        }
});