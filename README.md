# calculator
Personal project with The Odin Project

This calculator handles:
	- operations with two operands:
		- addition
		- multiplication
		- subtraction
		- division
		- modulo
	- operations with one operand:
		- percentage
		- square
		- square root
		- factorial
		
Available buttons on the calculator (that represent the 23 possible inputs received by the calculator):
	- 10 digits (0 to 9)
	- decimal point (.)
	- 5 binary operators (+ - × ÷ and modulo operator (mod))
	- 4 unary operators :
		- percentage (%)
		- square (²)
		- square root (√)
		- factorial (!)
	- Clear (C)
	- All Clear (AC)
	- equals (=)


	
Available keys on the keyboard (tested) (some give the exact same inputs as the buttons, and some are 'normalized' by a function into one of the inputs corresponding to a button):
	- 10 digits (0 to 9), both on number row and numeric keypad
	- point and comma (. ,)
	- binary operators:
		+ - / *
		×, or letter X as an alternative
		÷
		capital M key (for mod)
	- unary operators:
		% (percentage)
		² or capital S key (for square)
		capital V key (for square root)
		! (factorial)
	- other signs:
		=
		'Enter' keys (both keyboard and numeric pad, for '=')
		'Backspace' key (for 'C')
		'Escape' key (for 'AC')
	Note that the total number of actual keys that it represents cannot be asserted because of the different physical keyboards that users can have (mainly with or without a number keypad) but also the mapping that is used by their operating system.

Currently working on fonts.
Characters to check : 0-9*+-/=.,×XS÷M%V!²√ lorem ipsum dolor

New bug: apparently I can write 3 + ! + 1 and that gives !31

Bug 25! suivi de binary operator produit un message d'erreur dont on sort sans challenge.

Things to keep in mind (to implement later for instance, or just be mindful about):
	- create animation when clicking buttons, to be mirrored with keyboard keys
	- create a chart with instructions and information about the calculator, to be displayed next to it
	- leave a tiny space every three digits
	- add a font for buttons and digits to standardize outputs on different navigators
	
	
	
	
