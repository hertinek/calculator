//Declare 4 functions for the 4 basic operations that will update and use a and b, plus the modulo operator (not basic, but binary):

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

//? Declare functions for unary operations: percentage, square, square root, factorial.

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
};


//Declare functions that requires three variable (operand1, operator, operand2) or two variables (operand, operator) that will each invoke one of the functions for basic operations. These functions will be invoked when "equals" value is received (keyboard with enter or button "=" pressed) under "Waiting for operand 2" state, and will receive as arguments the values stored at that moment.


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
};



//Listen to keyboard events AND to button events. The keyboard event function must also filter in only the necessary characters (digits and operators).

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

const buttons = document.querySelector("#controls");
buttons.addEventListener('click', event => {
	const input = event.target;
	if(input.tagName === 'BUTTON') {
		const buttonText = input.textContent;
		handleInput(buttonText);
	}
});

//Declare normalizeInput() that will take all the inputs given by the keyboard, transform and merge them when necessary into new standardized inputs, and feed them to the function handleInput that will deal with them.

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


//Declare variable "state" (that will eventually have 4 possible values: "Waiting for operand1", 'Waiting for operand2", "Error", "Result")

const STATES = {
	'WAITING_FOR_1': "Waiting-for-operand1",
	'WAITING_FOR_2': "Waiting-for-operand2",
	'ERROR': "Error",
	'RESULT': "Result",
};
let state = STATES.WAITING_FOR_1;

//Declare variables "operand1", "binaryOperator", "operand2", and "unaryOperator" all with empty strings as starting values

let operand1 = "";
let binaryOperator = "";
let operand2 = "";
let unaryOperator = "";

//Declare two const for the two parts of the screen, upper-screen and lower-screen.


let upperScreen = document.querySelector("#upper-screen");
upperScreen.textContent = "";
let lowerScreen = document.querySelector("#lower-screen");
lowerScreen.textContent = "0";

// Create function checkInitialZero that checks if the zero displayed by the lower screen corresponds to a zero actually stored in the operand variable. If not (as is the case when calculator is initialized, or enter state "Waiting for operand2), displays the zero in gray.
function checkInitialZero() {
	if( (lowerScreen.textContent === "0" && operand1 === "")
	|| (lowerScreen.textContent === "0" && upperScreen.textContent !== "" && operand2 === "" && state !== STATES.RESULT) ) {
		lowerScreen.classList.add("initial-zero");
	} else {
		lowerScreen.classList.remove("initial-zero");
	};
};
checkInitialZero();



/*
//Declare handleInput(input) that will be invoked by normalizeInput() for inputs from the keyboard, and buttons event listener. Depending on the variable "state", handleInput() will treat differently the inputs.

"Waiting for operand1";
	- receives digits as strings and adds them to operand1 (which is a string too) and outputs the result on the screen, must limit number of inputs on the screen
	- handles the case of the decimal point (to be used just once)
	- accepts unary operators without leaving the state:
		- leaves the state when receives '=' after a unary operator to 'Result' state
		- calculates with unary operator when receives a binary operator, pushes the result into 'operand1' and goes into 'Waiting for operand2' state
	- accepts binary operators and goes into "Waiting for operand2" state in that case after having output in the upper part of the screen operand1 and the binary operator
	- 'C': deletes one input/character
	- 'AC': goes back to opening state of the calculator
	- '=': goes into "Result" state

"Waiting for operand2";
	- receives digits as strings and adds them to operand2 and outputs the result on the screen, must limit number of inputs on the screen
	- handles the case of the decimal point (to be used just once)
	- accepts unary operators without leaving the state:
		- leaves the state when receives '=' after a unary operator to 'Result' state
	- does not accept any other binary operator (the machine is limited to two operands)
	- 'C': deletes one input/character
	- 'AC': goes back to opening state of the calculator
	- '=': goes into "Result" state	
	
"Error";
	- accepts only 'AC', which brings back to opening state (blank screen, "Waiting for operand1" state)

"Result";
	- accepts unary operators: pushes the result to operand1 and adds the unary operator, and moves to "Waiting for operand1" state, where it expects either a binary operator, or '='
	- accepts binary operators: pushes the result to operand1 and moves to "Waiting for operand2" state
	- accepts 'AC', goes back to zero
	- does not accept any other input
	
*/

let challengeActive = true;
const originalUpperFontSize = window.getComputedStyle(upperScreen).fontSize;
const originalLowerFontSize = window.getComputedStyle(lowerScreen).fontSize;

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
	};
};

function handleNegativeSign(input) {
	if(state === STATES.WAITING_FOR_1){
		if(operand1 === ""
		&& (unaryOperator === "" || unaryOperator === "√") ) {
			operand1 += input;
			lowerScreen.textContent = unaryOperator + operand1;//unaryOperator is here just in case √ is used before, which will result in an error but the calculation should be able to be put anyways - operand1 will consist solely of the negative sign
		}
	}	
};


function handleDecimalPoint(input) {
	if(state === STATES.WAITING_FOR_1){
		if(operand1 === "") {
			operand1 = "0.";
			lowerScreen.textContent = operand1;
		} else if(!operand1.includes(".") && operand1 !== "-") {
			operand1 += input;
			lowerScreen.textContent = unaryOperator + operand1;
		};
	};
};


function handleDigits(input) {
	if(state === STATES.WAITING_FOR_1) {
		if(operand1 !== "0"
		&& !/^[%²!]$/.test(unaryOperator)) 
			operand1 += input;
			lowerScreen.textContent = unaryOperator + operand1;
	}
}

function handleUnaryOperators(input) {
	if(state === STATES.WAITING_FOR_1) {
		if(input === "√" && operand1 === "") {
			unaryOperator = input;
			lowerScreen.textContent = unaryOperator;
		} else if(unaryOperator === "" && operand1 !== "" && operand1 !== "-") {
			unaryOperator = input;
			lowerScreen.textContent += unaryOperator;
		}
	}
}

function handleBinaryOperators(input) {
	if(state === STATES.WAITING_FOR_1) {
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
					state = STATES.ERROR;
					challengeActive = true;
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
}


function handleInput(input) {
	
	if(input === "AC") {
		clearAll(input);
	}


	if(state === STATES.WAITING_FOR_1){
	
	
		if(input === "-") {
			handleNegativeSign(input);
		}// only neg sign, for - as binary operator see farther below

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






		if(input === "=" && operand1 !== "") {
			if(unaryOperator === "%"
			|| unaryOperator === "²"
			|| unaryOperator === "√"
			|| unaryOperator === "!") {
				result = operations[unaryOperator](+operand1);
				if(result === "error"
				|| result === "exceeded") {
					if(result === "error"){
						upperScreen.textContent = "Invalid operation";
					} else if (result = "exceeded") {
						upperScreen.textContent = "Operation limit exceeded";
					}
					lowerScreen.textContent = "Press AC to exit";
					state = STATES.ERROR;
					challengeActive = true;	
				} else {
					upperScreen.textContent = lowerScreen.textContent;
					lowerScreen.textContent = result;
					state = STATES.RESULT;
				}
			};	
			
		};
	};
// The state "Waiting for operand2" is characterized by:
//	- operand1 is not empty and is outputted on upperScreen alongside binaryOperator
//	- unaryOperator is empty and ready to use regardless of whether it was used previously
//	- starts with Operand2 as empty string



	if(state === STATES.WAITING_FOR_2) {
		if(input === "-"
		&& operand2 === ""
		&& (unaryOperator === "" || unaryOperator === "√") ) {
			operand2 += input;
			lowerScreen.textContent = unaryOperator + operand2; //unaryOperator is here just in case √ is used before, which will result in an error but the calculation should be able to be put anyways - operand2 will consist solely of the negative sign
		};
		if(input === "√" && operand2 === "") {
			unaryOperator = input;
			lowerScreen.textContent = unaryOperator;
		};
		if(/^[0-9]$/.test(input)
		&& operand2 !== "0"
		&& !/^[%²!]$/.test(unaryOperator)) {
			operand2 += input;
			lowerScreen.textContent = unaryOperator + operand2;
		};
		if(/^[.]$/.test(input)) {
			if(operand2 === "") {
				operand2 = "0.";
				lowerScreen.textContent = operand2;
			} else if(!operand2.includes(".") && operand2 !== "-") {
				operand2 += input;
				lowerScreen.textContent = unaryOperator + operand2; //same, keep unaryOperator if it exists, if it's empty it won't show on the screen
			};
		};

		
		if(/^[%²!]$/.test(input)) {
			if(unaryOperator === "" && operand2 !== "" && operand2 !== "-") {
			unaryOperator = input;
			lowerScreen.textContent += unaryOperator;
			};
		};
// note that binary operators (including mod) are not active in this state
// undo last action unless if last action is press binary operator > to be handled in state2 -- don't forget! Do it here:
		if(input === "C") {
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
		};
		if(input === "=" && operand2 !== "") {
			if(unaryOperator === "%"
			|| unaryOperator === "²"
			|| unaryOperator === "√"
			|| unaryOperator === "!") {
				result = operations[unaryOperator](+operand2);
				if(result === "error"
				|| result === "exceeded") {
						if(result === "error"){
							upperScreen.textContent = "Invalid operation";
						} else if (result = "exceeded") {
							upperScreen.textContent = "Operation limit exceeded";
						}
						lowerScreen.textContent = "Press AC to exit";
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
		};
	};


	if (state === STATES.ERROR) {
		if (input === "AC") {
			if (challengeActive) {
				upperScreen.textContent = "You really thought that would be so easy? To get out of the error swamp, give me the first 8 decimals of pi!";
				lowerScreen.textContent = "3.";
				upperScreen.style.fontSize = "15px";
				lowerScreen.style.fontSize = "20px";
			} else {
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
		} else if (challengeActive && /^[0-9]$/.test(input)) {
			lowerScreen.textContent += input; // Append number to lower screen
			if (lowerScreen.textContent === "3.14159265") {
				upperScreen.textContent = "Good. But don't get yourself in trouble again!";
				challengeActive = false; // Deactivate the challenge
			} else if (lowerScreen.textContent.length > 10) {
				upperScreen.textContent = "Incorrect! Try again.";
				lowerScreen.textContent = "3."; // Reset lower screen
			}
		}
	};

//offer here the possibility to keep working from the result:
//	it will be transfered to operand1 which will be outputted on upper screen if a binary operator is inputted
//	user can add a unary operator to the result to modify it before it is outputted as described above 
	if(state === STATES.RESULT) {
		if(/^[√%²!]$/.test(input)) {
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
		};
		if(/^[+\-×÷]$/.test(input)|| input === "mod") {
			operand1 = result;
			operand2 = "";
			binaryOperator = input;
			upperScreen.textContent = operand1 + " " + binaryOperator;
			lowerScreen.textContent = "0";
			state = STATES.WAITING_FOR_2;
		};
	};
	checkInitialZero();
};




























