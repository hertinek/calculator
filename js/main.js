//Declare 4 functions for the 4 basic operations that will update and use a and b, plus the modulo operator (not basic, but binary):

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const div = (a, b) => {
	if(b === 0) {
	return error }
	return a / b;
};
const mult = (a, b) => a * b;
const modulo = (a, b) => {
	if(b === 0) {
	return error }
	return a % b;
};

//? Declare functions for unary operations: percentage, square, square root, factorial.

const percent = a => a * 0.01;

const square = a => a * a;

function sqrt(a) {
	if(a < 0) {
	return "error"
	}
	return Math.sqrt(a)
};

function facto(a) {
	if (a < 0) {
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


//Declare function called "calculate" that requires three variables (operand1, operator, operand2) that will each invoke one of the functions for basic operations. This function will be invoked when "equals" value is received (keyboard with enter or button "=" pressed) under "Waiting for operand 2" state, and will receive as arguments the values stored at that moment.


function calculateBinaryOp(operand1, operator, operand2) {
	if(operator === "+") {
		return add(operand1, operand2);
	} else if(operator === "-") {
		return sub(operand1, operand2);
	} else if(operator === "×") {
		return mult(operand1, operand2);
	} else if(operator === "÷") {
		return div(operand1, operand2);
	} else if (operator === "MOD") {
		return modulo(operand1, operand2);
	};
};

function calculateUnaryOp(operand1, operator) {
	if(operator === "%") {
		return percent(operand1);
	} else if(operator === "²") {
		return square(operand1);
	} else if(operator === "√") {
		return sqrt(operand1);
	} else if(operator === "!") {
		return facto(operand1);
	};
};


//Listen to keyboard events AND to button events. The keyboard event function must also filter in only the necessary characters (digits and operators).

document.addEventListener('keydown', event => {
	key = event.key;
	if (/^[0-9*+\-/=.,×XS÷M%V!²]$/.test(key) || key === 'Enter' || key === 'Backspace' || key === 'Escape') {
		normalizeInput(key);
	};
	document.activeElement.blur();
});

const buttons = document.querySelector("#controls");
buttons.addEventListener('click', event => {
	const input = event.target;
	if(input.tagName === 'BUTTON') {
		const buttonText = input.textContent;
		console.log(buttonText);
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
	'M': 'MOD',
	'V': '√',
	'Enter': '=',
	'Backspace': 'C',
	'Escape': 'AC',
	}
	const input = map[rawInput] || rawInput;
	console.log(input);
	handleInput(input);
};


//Declare variable "state" (that will eventually have 4 possible values: "Waiting for operand1", 'Waiting for operand2", "Error", "Result")

let state = "Waiting for operand1";

//Declare variables "operand1", "operator", and "operand2", all with empty strings as starting values

let operand1 = "";
let operator = "";
let operand2 = "";

//Declare two const for the two parts of the screen, upper-screen and lower-screen (and test them upon creation).

let upperScreen = document.querySelector("#upper-screen");
upperScreen.textContent = "Ta mère en string";
let lowerScreen = document.querySelector("#lower-screen");
lowerScreen.textContent = "";

/*
//Declare handleInput(input) that will be invoked by normalizeInput() for inputs from the keyboard, and buttons event listener. Depending on the variable "state", handleInput() will treat differently the inputs.

"Waiting for operand1";
	- receives digits as strings and adds them to operand1 (which is a string too) and outputs the result on the screen, must limit number of inputs on the screen
	- handles the case of the decimal point (to be used just once)
	- accepts unary operators without leaving the mode:
		- leaves the mode when receives '=' after a unary operator to 'Result' mode
		- calculates with unary operator when receives a binary operator, pushes the result into 'operand1' and goes into 'Waiting for operand2' mode
	- accepts binary operators and goes into "Waiting for operand2" mode in that case after having output in the upper part of the screen operand1 and the binary operator
	- 'C': deletes one input/character
	- 'AC': goes back to opening state of the calculator
	- '=': goes into "Result" mode

"Waiting for operand2";
	- receives digits as strings and adds them to operand2 and outputs the result on the screen, must limit number of inputs on the screen
	- handles the case of the decimal point (to be used just once)
	- accepts unary operators without leaving the mode:
		- leaves the mode when receives '=' after a unary operator to 'Result' mode
	- does not accept any other binary operator (the machine is limited to two operands)
	- 'C': deletes one input/character
	- 'AC': goes back to opening state of the calculator
	- '=': goes into "Result" mode	
	
"Error";
	- accepts only 'AC', which brings back to opening state (blank screen, "Waiting for operand1" state)

"Result";
	- accepts unary operators: pushes the result to operand1 and adds the unary operator, and moves to "Waiting for operand1" mode, where it expects either a binary operator, or '='
	- accepts binary operators: pushes the result to operand1 and moves to "Waiting for operand2" mode
	- accepts 'AC', goes back to zero
	- does not accept any other input
	
*/

function handleInput(input) {
	if(state === "Waiting for operand1") {
		if(/^[0-9]$/.test(input)) {
			operand1 = input;
			lowerScreen.textContent += operand1;
		};
//		if(/^[0-9*+\-/=.,×XS÷M%V!²]$/.test(input)) {};
//		if(/^[0-9*+\-/=.,×XS÷M%V!²]$/.test(input)) {};
//		if(/^[0-9*+\-/=.,×XS÷M%V!²]$/.test(input)) {};
//		if(/^[0-9*+\-/=.,×XS÷M%V!²]$/.test(input)) {};
//		if(/^[0-9*+\-/=.,×XS÷M%V!²]$/.test(input)) {};
	};
	
	if(state === "Waiting for operand2") {
	
	};
	
	if(state === "Error") {
	
	};
	
	if(state === "Result") {
	
	};
};




























