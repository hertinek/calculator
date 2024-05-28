//Declare 4 functions for the 4 basic operations that will update and use a and b

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const div = (a, b) => a / b;
const mult = (a, b) => a * b;

//? Declare functions for single-operand operations: percentage, square, square root, factorial, modulo.

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
}

const modulo = (a, b) => a % b;
	


//Declare variable "state" (that will eventually have 4 possible values: "Waiting for operand 1", 'Waiting for operand 2", "Error", "Result")

let state = "Waiting for operarand 1"

//Declare function called "calculate" that requires three variables (operand1, operator, operand2) that will each invoke one of the functions for basic operations. This function will be invoked when "equals" value is received (keyboard with enter or button "=" pressed) under "Waiting for operand 2" state, and will receive as arguments the values stored at that moment.


function calculate(operand1, operator, operand2) {
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


//Declare variables "operand1", "operator", and "operand2", all with empty strings as starting values

let operand1 = "";
let operator = "";
let operand2 = "";

//Listen to Keyboard events AND to button events, both eventually calling the same function handleInput(input) to declare right after. The keyboard event function will have to return a normalizedInput for his handleInput(), to be sure that the input corresponds to the same id of the buttons (who will be named after regular methematical operators). The keyboard event function must also filter in only the necessary characters (digits and operators).

//Declare handleInput(input) that will be invoked by the preceding functions described previously. Depending on the variable "state", handleInput() will treat differently the inputs.








/*
	document.addEventListener('keydown', event => {
		key = event.key;
		if (/^[0-9*+\-/=]$/.test(key) || key === 'Enter') {
			//code handleInput(key);
		};
	});
	
	
	const buttons = document.querySelector('.buttons');
	buttons.addEventListener('click', event => {
		const input = event.target;
		if(input.tagName === 'BUTTON') {
			const buttonId = target.id;
			handleInput(buttonId);
		}
	});
	
	
*/
