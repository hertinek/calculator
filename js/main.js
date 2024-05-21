//Declare variables for a and b both being NaN

//Declare 4 functions for the 4 basic operations that will update and use a and b

//? Declare functions for single-operand operations: percentage, exponentiation, square root, factorial, modulo.

//Declare variable "state" (that will eventually have 4 possible values: "Waiting for operand 1", 'Waiting for operand 2", "Error", "Result")

//Declare function called "calculate" that requires three variables (operand1, operator, operand2) that will invoke one of the functions for basic operations. This function will be invoked when "equals" value is received (keyboard with enter or button "=" pressed) under "Waiting for operand 2" state, and will receive as arguments the values stored at that moment.

//Declare variables "operand1", "operator", and "operand2", all with empty strings as starting values

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
