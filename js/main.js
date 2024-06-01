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


//Declare functions that requires three variable (operand1, operator, operand2) or two variables (operand, operator) that will each invoke one of the functions for basic operations. These functions will be invoked when "equals" value is received (keyboard with enter or button "=" pressed) under "Waiting for operand 2" state, and will receive as arguments the values stored at that moment.


const operations = {
	"+": (operand1, operand2) => addition(operand1, operand2),
	"-": (operand1, operand2) => subtraction(operand1, operand2),
	"×": (operand1, operand2) => multiplication(operand1, operand2),
	"÷": (operand1, operand2) => division(operand1, operand2),
	"MOD": (operand1, operand2) => modulo(operand1, operand2),
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
});

const buttons = document.querySelector("#controls");
buttons.addEventListener('click', event => {
	const input = event.target;
	if(input.tagName === 'BUTTON') {
		const buttonText = input.textContent;
		handleInput(buttonText);
		//console.log("input from buttons", buttonText);
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
	//console.log("input from keyboard", input);
	handleInput(input);
};


//Declare variable "state" (that will eventually have 4 possible values: "Waiting for operand1", 'Waiting for operand2", "Error", "Result")

const STATES = {
	'WAITING_FOR_1': "Waiting-for-operand1",
	'WAITING_FOR_2': "Waiting-for-operand2",
	'ERROR': "Error",
	'RESULT': "Result",
};
let state = STATES.WAITING_FOR_1;

//Declare variables "operand1", "operator", and "operand2", all with empty strings as starting values

let operand1 = "";
let operator = "";
let operand2 = "";

//Declare two const for the two parts of the screen, upper-screen and lower-screen (and test them upon creation).

let upperScreen = document.querySelector("#upper-screen");
upperScreen.textContent = "Ta mère en string";
let lowerScreen = document.querySelector("#lower-screen");
lowerScreen.textContent = operand1 || "0";

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
//block to work with: if(/^[0-9*+\-/=.,×XS÷M%V!²]$/.test(input)) {};
function handleInput(input) {
	if(state === STATES.WAITING_FOR_1){
		if(operand1 === "" && input === "-") {
			operand1 += input;
			lowerScreen.textContent = operand1;
		};
		if(operand1 === "" && input === "√") {
			operand1 += input;
			lowerScreen.textContent = operand1;
		};
		if(/^[0-9]$/.test(input)) {
			operand1 += input;
			lowerScreen.textContent = operand1;
		};
		if(/^[.]$/.test(input)) {
			if(operand1 === "") {
				operand1 = "0."
				lowerScreen.textContent = operand1;
			} else if (!operand1.includes(".")) {
				operand1 += input;
				lowerScreen.textContent = operand1;
			};
		};
		if(operand1 !== "-" && operand1 !== "" && (/^[+\-×÷]$/.test(input) || input === "MOD") ) {
			operator = input;
			upperScreen.textContent = operand1 + " " + operator;
			lowerScreen.textContent = "";
			state = STATES.WAITING_FOR_2;
			console.log(state);
		};
/*
		if(/^[%²√!]$/.test(input)) {
			operator = input;
			if(operator === "√") {
				lowerScreen.textContent = operator + operand1;
			} else {
				lowerScreen.textContent = operand1 + operator;
			};
		};
*/		
	};

	if(state === STATES.WAITING_FOR_2) {
	
	};
	
	if(state === STATES.ERROR) {
	
	};
	
	if(state === STATES.RESULT) {
	
	};
};




























