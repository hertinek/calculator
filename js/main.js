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
		//handleInput(buttonText);
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
	//handleInput(input)
};


//Declare variable "state" (that will eventually have 4 possible values: "Waiting for operand 1", 'Waiting for operand 2", "Error", "Result")

let state = "Waiting for operarand 1";

//Declare variables "operand1", "operator", and "operand2", all with empty strings as starting values

let operand1 = "";
let operator = "";
let operand2 = "";

/*
//Declare handleInput(input) that will be invoked by normalizeInput(). Depending on the variable "state", handleInput() will treat differently the inputs.

"Waiting for operand1";
	- receives digits as strings and add them to operand1 (which is a string too)
	- handle the case of the decimal point (to be used just once)
	- accepts unary operators without leaving the mode:
		- leaves the mode when receives '=' after a unary operator to 'Result' mode
		- calculates with unary operator when receives a binary operator and goes into 'Waiting for operand2' mode
	- 
	- rejects all other inputs

"Waiting for operand2"
"Error"
"Result"
*/




























