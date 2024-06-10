// Functions for operations with binary operators
const addition = (a, b) => a + b;
const subtraction = (a, b) => a - b;
const multiplication = (a, b) => a * b;
const division = (a, b) => {
	if(b === 0) {
	return "error" }
	return a / b;
};
const modulo = (a, b) => {
	if(b === 0) {
	return "error" }
	return a % b;
};

// Functions for operations with unary operators
const percentage = a => a * 0.01;
const square = a => a * a;
function squareRoot(a) {
	if(a < 0) {
	return "error"
	}
	return Math.sqrt(a)
};
function factorial(a) {
	if(!Number.isInteger(a)) {
		return "exceeded"
	}
	if(a > 21) {
		return "exceeded"
	}
	if(a < 0) {
		return "error";
	}
	if (a === 0 || a === 1) {
		return 1;
	}
	let result = 1;
	for (let i = 2; i <= a; i++) {
		result *= i;
	}
	return result;
}

// Different operations depending on the operator received
const operations = {
	"+": (operand1, operand2) => addition(operand1, operand2),
	"-": (operand1, operand2) => subtraction(operand1, operand2),
	"×": (operand1, operand2) => multiplication(operand1, operand2),
	"÷": (operand1, operand2) => division(operand1, operand2),
	"mod": (operand1, operand2) => modulo(operand1, operand2),
	"%": (operand) => percentage(operand),
	"²": (operand) => square(operand),
	"√": (operand) => squareRoot(operand),
	"!": (operand) => factorial(operand),
}

// Listen to keyboard events AND to button events. The keyboard event function must also filter out the unnecessary characters (those other digits and operators, equals, clear all, undo).
document.addEventListener('keydown', event => {
	key = event.key;
	if(/^[0-9*+\-/=.,×XS÷M%V!²]$/.test(key) || key === 'Enter' || key === 'Backspace' || key === 'Escape') {
		normalizeInput(key);
		event.preventDefault();
	};
// Unfocus any focused button
	const activeElement = document.activeElement;
	if (activeElement && activeElement.tagName === 'BUTTON') {
		activeElement.blur();
	}
});
// Function that will take all the inputs given by the keyboard, transform and/or merge them when necessary into new standardized inputs, and feed them to the function handleInput() that will deal with them just as if they were coming from the buttons:
function normalizeInput(rawInput) {
	const map = {
	'*': '×',
	'X': '×',
	'/': '÷',
	',': '.',
	'S': '²',
	'M': 'mod',
	'V': '√',
	'Enter': '=',
	'Backspace': 'C',
	'Escape': 'AC',
	}
	const input = map[rawInput] || rawInput;
	handleInput(input);
	checkInitialZero();
};
const buttons = document.querySelector("#controls");
buttons.addEventListener('click', event => {
	const input = event.target;
	if(input.tagName === 'BUTTON') {
		const buttonText = input.textContent;
		handleInput(buttonText);
	}
});

// Different states of the calculator that will influence how it responds to the inputs:
const STATES = {
	'WAITING_FOR_1': "Waiting-for-operand1",
	'WAITING_FOR_2': "Waiting-for-operand2",
	'ERROR': "Error",
	'RESULT': "Result",
};
let state = STATES.WAITING_FOR_1;//this is how the calculator starts

// Different input values that the calculator will have to work with
let operand1 = "";
let operand2 = "";
let unaryOperator = "";
let binaryOperator = "";

//Two different parts of the screen where information and results will be displayed:
let upperScreen = document.querySelector("#upper-screen");
upperScreen.textContent = "";
let lowerScreen = document.querySelector("#lower-screen");
lowerScreen.textContent = "0";
// Storing initial screen font sizes in case it is changed in the course of the program:
const originalUpperFontSize = window.getComputedStyle(upperScreen).fontSize;
const originalLowerFontSize = window.getComputedStyle(lowerScreen).fontSize;

// Function that checks if the zero displayed by the lower screen corresponds to a zero actually stored in the operand variable. If not (as is the case when calculator is initialized, or enter state "Waiting for operand2), displays the zero in gray:
function checkInitialZero() {
	if( (lowerScreen.textContent === "0" && operand1 === "")
	|| (lowerScreen.textContent === "0" && upperScreen.textContent !== "" && operand2 === "" && state !== STATES.RESULT) ) {
		lowerScreen.classList.add("initial-zero");
	} else {
		lowerScreen.classList.remove("initial-zero");
	};
};
checkInitialZero();

// Function that receives the inputs (keyboard or buttons)
function handleInput(input) {
	if(input === "AC") {
		clearAll(input);
	}
	if(input === "-") {
		handleNegativeSign(input);
	}// only neg sign, for minus as binary operator see farther below
	if(/^[0-9]$/.test(input)) {
		handleDigits(input);
	}
	if(/^[.]$/.test(input)) {
		handleDecimalPoint(input);
	}
	if(/^[%²!√]$/.test(input)) {
		handleUnaryOperators(input);
	}
	if(/^[+\-×÷]$/.test(input) || input === "mod") {
		handleBinaryOperators(input);
	}
	if(input === "C") {
		undoLastAction(input);
	}
	if(input === "=") {
		handleEquals(input);
	}
	checkInitialZero();
};

// Challenge to get out of the error state (see below inside clearAll())
let challengeActive = true;

function clearAll(input) {
	if(state === STATES.WAITING_FOR_1
	|| state === STATES.WAITING_FOR_2
	|| state === STATES.RESULT) {
		operand1 = "";
		operand2 = "";
		binaryOperator = "";
		unaryOperator = "";
		upperScreen.textContent = "";
		lowerScreen.textContent = "0";
		state = STATES.WAITING_FOR_1;
	}
	if(state === STATES.ERROR) {
		if (input === "AC") {
			if(challengeActive) {
				upperScreen.textContent = "You really thought that would be so easy? To get out of the error swamp, give me the first 8 decimals of pi!";
				lowerScreen.textContent = "3.";
				upperScreen.style.fontSize = "15px";
				lowerScreen.style.fontSize = "20px";
			} else if(!challengeActive) { //challenge temporarily deactivated by good answer, see below
				upperScreen.style.fontSize = originalUpperFontSize;
				lowerScreen.style.fontSize = originalLowerFontSize;
				operand1 = "";
				operand2 = "";
				binaryOperator = "";
				unaryOperator = "";
				upperScreen.textContent = "";
				lowerScreen.textContent = "0";
				state = STATES.WAITING_FOR_1;
			}
		} else if(challengeActive && /^[0-9]$/.test(input)) {
			lowerScreen.textContent += input; // Append number to lower screen
			if (lowerScreen.textContent === "3.14159265") {
				upperScreen.textContent = "Good. But don't get yourself in trouble again!";
				challengeActive = false; // Deactivate the challenge
			} else if (lowerScreen.textContent.length > 10) {
				upperScreen.textContent = "Incorrect! Try again.";
				lowerScreen.textContent = "3."; // Reset lower screen
			}
		}
	}
}

function handleNegativeSign(input) {
	if(state === STATES.WAITING_FOR_1){
		if(operand1 === ""
		&& (unaryOperator === ""
		|| unaryOperator === "√") ) {
			operand1 += input;
			lowerScreen.textContent = unaryOperator + operand1;//unaryOperator is here just in case √ is used before, which will result in an error but the calculation should be able to be put anyways - operand1 will consist solely of the negative sign
		}
	}
	if(state === STATES.WAITING_FOR_2) {
		if(operand2 === ""
		&& (unaryOperator === ""
		|| unaryOperator === "√") ) {
			operand2 += input;
			lowerScreen.textContent = unaryOperator + operand2; //unaryOperator is here just in case √ is used before, which will result in an error but the calculation should be able to be put anyways - operand2 will consist solely of the negative sign
		}
	}
}


function handleDecimalPoint(input) {
	if(state === STATES.WAITING_FOR_1){
		if(operand1 === "") {
			operand1 = "0.";
			lowerScreen.textContent = operand1;
		} else if(!operand1.includes(".") && operand1 !== "-") {
			operand1 += input;
			lowerScreen.textContent = unaryOperator + operand1;//keep unaryOperator if it exists, if it's empty it won't show on the screen
		};
	}
	if(state === STATES.WAITING_FOR_2) {
		if(operand2 === "") {
			operand2 = "0.";
			lowerScreen.textContent = operand2;
		} else if(!operand2.includes(".") && operand2 !== "-") {
			operand2 += input;
			lowerScreen.textContent = unaryOperator + operand2; //same, keep unaryOperator if it exists, if it's empty it won't show on the screen
		}
	}
}

function handleDigits(input) {
	if(state === STATES.WAITING_FOR_1) {
		if(operand1 !== "0"// don't add digits after 0
		&& !/^[%²!]$/.test(unaryOperator)) {
			operand1 += input;
			lowerScreen.textContent = unaryOperator + operand1;
		}
	}
	if(state === STATES.WAITING_FOR_2) {
		if(operand2 !== "0"
		&& !/^[%²!]$/.test(unaryOperator)) {
			operand2 += input;
			lowerScreen.textContent = unaryOperator + operand2;	
		}
	}
	if(state === STATES.ERROR) {
		clearAll(input);// necessary to give the answer to the challenge
	}
}

function handleUnaryOperators(input) {
	if(state === STATES.WAITING_FOR_1) {
		if(input === "√" && operand1 === "") {
			unaryOperator = input;
			lowerScreen.textContent = unaryOperator;
		} else if(input !== "√" && unaryOperator === ""
		&& operand1 !== "" && operand1 !== "-") {
			unaryOperator = input;
			lowerScreen.textContent += unaryOperator;
		}
	}
	if(state === STATES.WAITING_FOR_2) {
		if(input === "√" && operand2 === "") {
			unaryOperator = input;
			lowerScreen.textContent = unaryOperator;
		} else if(input !== "√" && unaryOperator === ""
		&& operand2 !== "" && operand2 !== "-") {
			unaryOperator = input;
			lowerScreen.textContent += unaryOperator;
		}
	}
	if(state === STATES.RESULT) {
		unaryOperator = input;
		operand1 = result;
		operand2 = "";
		upperScreen.textContent = "";
		if(input === "√") {
			lowerScreen.textContent = unaryOperator + operand1;
		} else {
			lowerScreen.textContent = operand1 + unaryOperator;
		}
		state = STATES.WAITING_FOR_1;
	}
}

function handleBinaryOperators(input) {
	if(state === STATES.WAITING_FOR_1) {
// note that binary operators (including modulo) are not active in state "waiting for operand2" 
		if(operand1 !== "-" && operand1 !== "") {
			binaryOperator = input;
			if(unaryOperator !== "") {
				result = operations[unaryOperator](+operand1);
				if(result === "error"
				|| result === "exceeded") {
					if(result === "error"){
						upperScreen.textContent = "Invalid operation";
					} else if(result === "exceeded") {
						upperScreen.textContent = "Operation limit exceeded";
					}
					lowerScreen.textContent = "Press AC to exit";
					upperScreen.style.fontSize = "20px";
					lowerScreen.style.fontSize = "23px";
					state = STATES.ERROR;
					challengeActive = true;
					checkInitialZero();
					return
				} else {
					operand1 = result;
					upperScreen.textContent = operand1 + " " + binaryOperator;
					lowerScreen.textContent = "0";
					state = STATES.WAITING_FOR_2;
					unaryOperator = ""; //in case it should be used later
				}
			} else {
				upperScreen.textContent = operand1 + " " + binaryOperator;
				lowerScreen.textContent = "0";
			}
			checkInitialZero();
			state = STATES.WAITING_FOR_2;
			return
		}
	}
	if(state === STATES.RESULT) {
		operand1 = result;
		operand2 = "";
		binaryOperator = input;
		upperScreen.textContent = operand1 + " " + binaryOperator;
		lowerScreen.textContent = "0";
		state = STATES.WAITING_FOR_2;
	}
}

function undoLastAction() {
	if(state === STATES.WAITING_FOR_1) {
	// undo last action unless last action is press binary operator > to be handled in state2
		if(/[²%!]$/.test(unaryOperator)) {
			unaryOperator = "";
			lowerScreen.textContent = lowerScreen.textContent.slice(0, -1);
		} else if(operand1.length > 1
			&& /[0-9.]$/.test(operand1)) {
			lowerScreen.textContent = lowerScreen.textContent.slice(0, -1);
			operand1 = operand1.slice(0, -1);
		} else if(/^[0-9\-]$/.test(operand1)
			|| (unaryOperator === "√" && operand1 === "") ) {
			unaryOperator = "";
			operand1 = "";
			lowerScreen.textContent = "0";
		}
	}
	if(state === STATES.WAITING_FOR_2) {
		if(binaryOperator !== "" && operand2 === "" && unaryOperator === "") {
			binaryOperator = "";
			upperScreen.textContent = "";
			lowerScreen.textContent = operand1;
			state = STATES.WAITING_FOR_1;
		} else if(/[²%!]$/.test(unaryOperator)) {
			unaryOperator = "";
			lowerScreen.textContent = lowerScreen.textContent.slice(0, -1);
		} else if(operand2.length > 1
			&& /[0-9.]$/.test(operand2)) {
			lowerScreen.textContent = lowerScreen.textContent.slice(0, -1);
			operand2 = operand2.slice(0, -1);
		} else if(/^[0-9\-]$/.test(operand2)
			|| (unaryOperator === "√" && operand2 === "") ) {
			unaryOperator = "";
			operand2 = "";
			lowerScreen.textContent = "0";
		}
	}
}

function handleEquals(input) {
	if(state === STATES.WAITING_FOR_1) {
		if(operand1 !== "" && operand1 !== "-") {
			if(unaryOperator !== "") {
				result = operations[unaryOperator](+operand1);
				if(result === "error"
				|| result === "exceeded") {
					if(result === "error"){
						upperScreen.textContent = "Invalid operation";
					} else if (result = "exceeded") {
						upperScreen.textContent = "Operation limit exceeded";
					}
					lowerScreen.textContent = "Press AC to exit";
					upperScreen.style.fontSize = "20px";
					lowerScreen.style.fontSize = "23px";
					state = STATES.ERROR;
					challengeActive = true;	
				} else {
					upperScreen.textContent = lowerScreen.textContent;
					lowerScreen.textContent = result;
					state = STATES.RESULT;
				}
			}
		}
	}	
	if(state === STATES.WAITING_FOR_2) {
		if(operand2 !== "") {
			if(unaryOperator !== "") {
				result = operations[unaryOperator](+operand2);
				if(result === "error"
				|| result === "exceeded") {
						if(result === "error"){
							upperScreen.textContent = "Invalid operation";
						} else if (result = "exceeded") {
							upperScreen.textContent = "Operation limit exceeded";
						}
						lowerScreen.textContent = "Press AC to exit";
						upperScreen.style.fontSize = "20px";
						lowerScreen.style.fontSize = "23px";
						state = STATES.ERROR;
						challengeActive = true;
				} else {
					operand2 = result;
					upperScreen.textContent = operand1 + " " + binaryOperator + " " + operand2;
					result = operations[binaryOperator](+operand1, +operand2);
					lowerScreen.textContent = result;
					state = STATES.RESULT;
				}
			} else {
				result = operations[binaryOperator](+operand1, +operand2);
				upperScreen.textContent = +operand1 + " " + binaryOperator + " " + +operand2;
				lowerScreen.textContent = result;
				state = STATES.RESULT;
			}
		}
	}
}






