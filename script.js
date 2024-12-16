function add (a, b) {
    return (a + b);
}


function subtract(a, b) {
    return (a - b);
}


function multiply(a, b) {
    return (a * b);
}


function divide(a, b) {
    return (a / b);
}


function operate(num1, operator, num2) {
    if (operator === '+') {
        return add(num1, num2);
    }
    if (operator === '-') {
        return subtract(num1, num2);
    }
    if (operator === '/') {
        if (num2 === 0) {
            return 'Coughs!';
        } else {
            return divide(num1, num2);
        }
        
    }
    if (operator === '*') {
        return multiply(num1, num2);
    }
}

const keyOne = document.getElementById('keyOne');
const allKeys = document.querySelectorAll('.keypad');
const keyValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const keyValuesString = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operatorString = ['+', '-', '/', '*'];
const entryBox = document.getElementById('entryBox');
const resultBox = document.getElementById('resultBox');
let currentEntry = entryBox.textContent;
let currentResult = resultBox.textContent;
let num1IsNegated = false;
let num2IsNegated = false;


function checkOperatorString(mytext){
    for(let i = 0; i <= operatorString.length - 1; i++){
        if (mytext.includes(operatorString[i])){
            return true;
        }
    }
    return false;
}




allKeys.forEach(function(thiskey) {
    if(keyValuesString.includes(thiskey.textContent)) {
        thiskey.onclick = function() {
            // console.log(thiskey.textContent);
            currentEntry = currentEntry + thiskey.textContent;
            entryBox.textContent = currentEntry;
        }
    }
})

const keyClear = document.getElementById('keyClear');
keyClear.onclick = function() {
    currentEntry = '';
    num1IsNegated = false;
    num2IsNegated = false;
    entryBox.textContent = currentEntry;
    resultBox.textContent = 0;
    console.log('Key Clear');
    console.log(`${currentEntry} : ${currentEntry.length}`);
}

function backSpaceEntry(currentDisplay){
    newDisplay = currentDisplay.slice(0, currentDisplay.length - 1);
    return newDisplay;
}

const keyBack = document.getElementById('keyBack');
keyBack.onclick = function(){
    slicedEntry = backSpaceEntry(currentEntry);
    currentEntry = slicedEntry;
    entryBox.textContent = currentEntry;
    console.log(currentEntry);
    if (currentEntry.length === 0){
        num1IsNegated = false;
        num2IsNegated = false;
    }
    if (!allVariablesPresent(currentEntry)){
        num2IsNegated = false;
    }
}


allKeys.forEach(function(thisKey) {
        if (operatorString.includes(thisKey.textContent.toString())){
            thisKey.addEventListener('click', function() {
                if( currentEntry.includes('e+')) {
                    let thisLength = currentEntry.length;
                    let checkIndex = thisLength -1;
                    if(allVariablesPresentForLargeNumber){
                        let entryVariables = getVariablesForLargeNumber(currentEntry);
                        let largeOperatorSign = entryVariables[0];
                        let largeNum2 = entryVariables[1];
                        if (num2IsNegated){
                            largeNum2 = largeNum2.replace('—(', '-');
                        }
                        largeNum2 = Number(largeNum2);
                        let largeSignIndex = entryVariables[2];
                        let largeNum1 = currentResult;
                        largeNum1 = Number(largeNum1);
                        console.log(largeNum1);
                        console.log(largeNum2);
                        currentResult = operate(largeNum1, largeOperatorSign, largeNum2)
                        if(currentResult){
                            num2IsNegated = false;
                        }
                        console.log(currentResult);
                        resultBox.textContent = formatResult(currentResult);
                        currentEntry = currentResult + thisKey.textContent;
                        entryBox.textContent = currentEntry;
                    } else if (currentEntry[checkIndex] != '+' || currentEntry[checkIndex] != '-' || currentEntry[checkIndex] != '/' || currentEntry[checkIndex] != '*') {
                        currentEntry = currentResult + thisKey.textContent;
                        entryBox.textContent = currentEntry;
                    }
                } else {
                    if (!allVariablesPresent(currentEntry)){
                        console.log('all variables not present');
                        if(currentEntry.length > 0) {
                            console.log(`Before: ${checkOperatorString(currentEntry)}`);
                            console.log(currentEntry);
                            if (!checkOperatorString(currentEntry)) {
                                    currentEntry += thisKey.textContent;
                                    entryBox.textContent = currentEntry;
                            }
                            console.log(`After: ${checkOperatorString(currentEntry)}`);
                            console.log(currentEntry);
                            console.log('');
                        }
                    } else {
                        console.log(`Before: ${checkOperatorString(currentEntry)}`);
                        let currentVariables = getEntryVariables(currentEntry);

                        let num1 = currentVariables[0];
                        let computeSign = currentVariables[1];
                        let num2 = currentVariables[2];
                        if (num1IsNegated){
                            num1 = num1.replace('—(', '-');
                        }
                        if (num2IsNegated){
                            num2 = num2.replace('—(', '-');
                        }
                        num1 = Number(num1);
                        num2 = Number(num2);
                        currentResult = operate(num1, computeSign, num2);
                        if(currentResult){
                            num2IsNegated = false;
                        }
                        resultBox.textContent = formatResult(currentResult);
                        if (currentResult != 'Coughs!') {
                            currentEntry = currentResult + thisKey.textContent;
                            entryBox.textContent = currentResult + thisKey.textContent;
                        } 

                        console.log(`After: ${checkOperatorString(currentEntry)}`);
                        console.log(currentEntry);
                        console.log('');
                    }
                }


            });
        }
    

});


// What happens when the equal sign key is pressed?
const keyEqual = document.getElementById('keyEqual');
let operatorSign = '';
keyEqual.onclick = function(){
    if( currentEntry.includes('e+')) {
        if(allVariablesPresentForLargeNumber){
            let entryVariables = getVariablesForLargeNumber(currentEntry);
            let largeOperatorSign = entryVariables[0];
            let largeNum2 = entryVariables[1];
            if (num2IsNegated){
                largeNum2 = largeNum2.replace('—(', '-');
            }
            largeNum2 = Number(largeNum2);
            let largeSignIndex = entryVariables[2];
            let largeNum1 = currentResult;
            largeNum1 = Number(largeNum1);
            console.log(largeNum1);
            console.log(largeNum2);
            currentResult = operate(largeNum1, largeOperatorSign, largeNum2)
            if(currentResult){
                num2IsNegated = false;
            }
            console.log(currentResult);
            resultBox.textContent = formatResult(currentResult);
            entryBox.textContent = currentEntry + '=';
        }
    } else {
        console.log("Equal Clicked!");
        justChecking = getEntryVariables(currentEntry)
        console.log(`just checking: ${justChecking}`);
        //check if the current entry contains an operator sign
        const entryVariables = getEntryVariables(currentEntry);
        let num1  = entryVariables[0];
        let operatorSign = entryVariables[1];
        let num2 = entryVariables[2];
        let signIndex = entryVariables[3];
        let currentResult = 0;

        if ( signIndex > 0 && signIndex < currentEntry.length - 1) {
            //do nothing yet
            if(num1.length >= 1 && num2.length >= 1 && signIndex > 0){
                if (num1IsNegated){
                    num1 = num1.replace('—(', '-');
                }
                if (num2IsNegated){
                    num2 = num2.replace('—(', '-');
                }
                num1 = Number(num1);
                num2 = Number(num2);

                currentResult = operate(num1, operatorSign, num2)
                if(currentResult){
                    num2IsNegated = false;
                }
                console.log(currentResult);
                resultBox.textContent = formatResult(currentResult);
                entryBox.textContent = currentEntry + '=';
            } 

        } else if (currentEntry.length > 1 && signIndex === currentEntry.length - 1){
            currentResult = '';
            console.log(currentResult);
            resultBox.textContent = formatResult(currentResult);
        } else {
            if (currentEntry.length < 1){
                currentResult = 0;
            }else {
                currentResult = num1;
            }
            console.log(currentResult);
            resultBox.textContent = formatResult(currentResult);
            entryBox.textContent = currentEntry + '=';
        }
    }

};


function getOperatorSign(mytext) {
    mytext = mytext.slice(1);
    for(let i = 0; i < operatorString.length; i++){
        if (mytext.includes(operatorString[i])){
            operatorSign = operatorString[i];
            return operatorSign;
        }
    }
    return false;
}

function getOperatorSignIndex(mytext) {
    const thisSign = getOperatorSign(mytext);
    for (let i = 1; i < mytext.length; i++){
        if (mytext[i] === thisSign) {
            return i;
        }
    }
    return -1;
}



function getEntryVariables(mytext) {
    thisSign = getOperatorSign(mytext);
    const signIndex = getOperatorSignIndex(mytext);
    let num1 = '';
    if (signIndex < 1) {
        num1 = mytext;
        if (mytext.length < 1) {
            num1 = '';
        }  
    } else {
        num1 = mytext.slice(0, signIndex);
    }

    let num2 = '';
    if (signIndex < 0 || signIndex === mytext.length - 1) {
        num2 = '';
    } else {
        num2 = mytext.slice(signIndex + 1, mytext.length);
    }
    //return an array of variables.
    return [num1, thisSign, num2, signIndex];

}


function allVariablesPresent(mytext) {
    const entryVariables = getEntryVariables(mytext);
    const num1 = entryVariables[0];
    const num2 = entryVariables[2];
    const thisSign = entryVariables[1];
    const signIndex = entryVariables[3];

    if (num1.length > 0 && num2.length > 0 && signIndex >= 0) {
        return true;
    } else {
        return false;
    }
}

const keyPercent = document.getElementById('keyPercent');

keyPercent.onclick = function() {
    const entryVariables = getEntryVariables(currentEntry);
    let num1 = entryVariables[0];
    let num2 = entryVariables[2];
    const thisSign = entryVariables[1];
    if (num1IsNegated){
        num1 = num1.replace('—(', '-');
    }
    if (num2IsNegated){
        num2 = num2.replace('—(', '-');
    }
    num1 = Number(num1);
    num2 = Number(num2);
    // const signIndex = entryVariables[3];
    if (allVariablesPresent(currentEntry)){
        //do the operation, get result and apply percent to result.
        currentResult = operate(num1, thisSign, num2);
        if(currentResult){
            num2IsNegated = false;
        }
        if (currentResult != 'Coughs') {
            currentResult = currentResult / 100;
            resultBox.textContent = formatResult(currentResult);
            entryBox.textContent = '';
            currentEntry = '';

        } else {
            resultBox.textContent = formatResult(currentResult);
            entryBox.textContent = '';
            currentEntry = '';
        }
    } else {
        if (checkOperatorString(currentEntry)) {
            //do nothing
        } else {
            //apply percent to num1
            currentResult = num1 / 100;
            resultBox.textContent = formatResult(currentResult);
            entryBox.textContent = '';
            currentEntry = '';


        }
    }
}


const keyDecimal = document.getElementById('keyPeriod');


function checkforDecimal(mytext) {
    if (mytext.includes('.'))  {
        return true;
    } else {
        return false;
    }
}


keyDecimal.onclick = function(){
    const entryVariables = getEntryVariables(currentEntry);
    let num1 = entryVariables[0];
    let num2 = entryVariables[2];
    const thisSign = entryVariables[1];
    let signIndex = entryVariables[3];
    if (allVariablesPresent(currentEntry)){
        if (!num2.includes('.')) {
            currentEntry = currentEntry + '.';
            entryBox.textContent = currentEntry;
        };
    } else {
        if(currentEntry.length === 0){
            currentEntry = '0.';
            entryBox.textContent = currentEntry;
        }
        if(num1.length >= 1 && signIndex === -1){
            if (!num1.includes('.')) {
                currentEntry = currentEntry + '.';
                entryBox.textContent = currentEntry;
            };
        }
        if(num1.length >= 1 && signIndex === currentEntry.length - 1 ) {
            currentEntry = currentEntry + '0.';
            entryBox.textContent = currentEntry;
        }
    }
}


function formatResult(entryNumber) {
    let numberText = entryNumber.toString();
    if (!numberText.includes('e+')) {
        if (numberText.length >= 10) {
            return entryNumber.toPrecision(10);
        } else {
            return entryNumber;
        }
    } else {
        let entryNumberDigit = Number(entryNumber);
        return entryNumberDigit.toPrecision(10);
    }
}

// function formatLargeNumber(entryNumber) {
//     numberText = entryNumber.toString();
//     if(numberText.includes('e+')){

//     }

// }

function getVariablesForLargeNumber(entryBoxValue) {
    //only return num2, presentOperator and operatorindex.
    const entryBoxValueReplaced = entryBoxValue.replace('e+', 'mm');
    thisSign = getOperatorSign(entryBoxValueReplaced);
    const signIndex = getOperatorSignIndex(entryBoxValueReplaced);


    let num2 = '';
    if (signIndex < 0 || signIndex === entryBoxValueReplaced.length - 1) {
        num2 = '';
    } else {
        num2 = entryBoxValueReplaced.slice(signIndex + 1, entryBoxValueReplaced.length);
    }
    
    //return an array of variables.
    return [thisSign, num2, signIndex];
}



function allVariablesPresentForLargeNumber(entryBoxValue) {
    const entryBoxValueReplaced = entryBoxValue.replace('e+', 'mm');
    const entryVariables = getEntryVariables(entryBoxValueReplaced);
    const num2 = entryVariables[1];
    const thisSign = entryVariables[0];
    const signIndex = entryVariables[2];
    

    if (num2.length > 0 && signIndex >= 0) {
        return true;
    } else {
        return false;
    }
}



const keyNegate = document.getElementById('keyNegate');

keyNegate.onclick = function() {
    // check state of current entry
    // how many variables are present?
    // if all variables are present, only alter num2
    // if only num1 is present, alter num1
    const entryVariables = getEntryVariables(currentEntry);
    let num1 = entryVariables[0];
    let num2 = entryVariables[2];
    const thisSign = entryVariables[1];
    let signIndex = entryVariables[3];
    console.log(`num1isNegated : ${num1IsNegated}`);
    console.log(`num2isNegated : ${num2IsNegated} `);
    console.log(`num1 : ${num1}`);
    console.log(`num2 : ${num2}`);
    console.log(`thisSign : ${thisSign}`);
    console.log(`signIndex : ${signIndex}`);
    
    if (allVariablesPresent(currentEntry)) {
        // alter num 2
        if (num2IsNegated === false){
            num2 = `—(${num2}`;
            num2IsNegated = true;
            currentEntry = `${num1}${thisSign}${num2}`;
            entryBox.textContent = currentEntry;
        } else {
            num2 = num2.replace('—(', '');
            num2IsNegated = false;
            currentEntry = `${num1}${thisSign}${num2}`;
            entryBox.textContent = currentEntry;
        }

    } else {
        //if only num1 is present, alter num1;
        if(num1IsNegated === false){
            if (currentEntry.length >= 1 && thisSign === false && !currentEntry.includes('e')){
                // num1 = `(—${num1}`;
                num1IsNegated = true;
                currentEntry = '—(' + num1;
                entryBox.textContent = currentEntry;
                console.log(`Num1 Block1 : ${currentEntry}`);
            }
        } else {
            if (currentEntry.length >= 1 && signIndex === -1 && !currentEntry.includes('e')){
                num1 = num1.replace('—(', '');
                num1IsNegated = false;
                currentEntry = `${num1}`;
                entryBox.textContent = currentEntry;
                console.log(`Num1 Block2 : ${currentEntry}`);
            }
        }

    }
}


