let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
let shouldResetBuffer = false;
const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            shouldResetBuffer = false;
            break;
        case '=':
            if (previousOperator === null) return;
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            shouldResetBuffer = true;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.slice(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    const intBuffer = parseFloat(buffer);
    
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else if (!shouldResetBuffer) {
        // Only perform operation if we're not already waiting for new input
        flushOperation(intBuffer);
    }
    
    previousOperator = symbol;
    shouldResetBuffer = true;
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        if (intBuffer === 0) {
            buffer = "Error";
            runningTotal = 0;
            previousOperator = null;
            shouldResetBuffer = true;
            return;
        }
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (shouldResetBuffer) {
        buffer = numberString;
        shouldResetBuffer = false;
    } else if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        if (!event.target.classList.contains('calc-button')) return;
        buttonClick(event.target.innerText.trim());
    });
}

init();