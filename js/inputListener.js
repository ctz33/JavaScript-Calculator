// Author: Gail Chen
// Created: 7/1
// Edit: Gail 7/2 update corresponding to design of buttons in index.html
// Edit: Gail 7/3 add documentation
// Description: Using buttons and keyboard to enter the equation.

// Key codes for acceptable keyboard inputs.
var KEY_CODE = [43, 45, 42, 47, 40, 41, 69, 101, 13, 61, 8, 46, 37, 94, 8730, 99];

// Author: Gail Chen
// Created: 7/2
// Edit: N/A
// Description: Get valid inputs from keyboard or buttons.
// Require: N/A
// Update: equation, #equation-container, result, dotExists
// Return: N/A
function getInput() {
	update(equation); // Update the equation in #equation-container
	handleMemory(); // Active buttons associated with memory.

	// Active keyboard for inputs.
	document.addEventListener("keypress", keyboardInput, true);

	// Active buttons for inputs.
	var backSpace = document.getElementsByClassName('fa-backspace');
	backSpace[0].addEventListener("click", buttonInput);
	var buttons = document.getElementsByClassName("keyboard-item");
	for(i = 5; i < buttons.length; i++) {
		buttons[i].addEventListener("click", buttonInput);
	}
}

// Author: Mike
// Created: 7/3
// Edit: N/A
// Description: Use keyboard "enter" in the equation-container to click "=" button
// Require: N/A
// Update: equation, #equation-container, #history-container
// Return: N/A
function enterEvaluateHandling(event) {
	if(event.keyCode == 13) {
		document.getElementById("equal").click();
	}
}

// Author: Mike
// Created: 7/3
// Edit: N/A
// Description: Restrict invalid input in the input field
// Require: N/A
// Update: equation, #equation-container
// Return: N/A
function inputKeyHandling(event) {
	var textArea = document.getElementById("equation-container");
	var inputIndex = textArea.selectionStart - 1;
	if(inputIndex < 0) {
		inputIndex = 0;
	}
	if(!/\d|[\+\-\*\/\^\%\(\)\.E]/.test(textArea.value[inputIndex])) {
		textArea.value = textArea.value.slice(0, inputIndex) + textArea.value.slice(inputIndex + 1, textArea.value.length);
		textArea.selectionStart = inputIndex;
		textArea.selectionEnd = inputIndex;
	}
}

// Author: Gail Chen
// Created: 7/2
// Edit: N/A
// Description: Get inputs from buttons.
// Require: N/A
// Update: equation, #equation-container, result, dotExists
// Return: N/A
function buttonInput() {
	printToScreen(this.getAttribute("name"));
}

// Author: Gail Chen
// Created: 7/1
// Edit: N/A
// Description: Get acceptable keyboard inputs. Only numbers and operator keys are acceptable.
// Require: N/A
// Update: equation, #equation-container
// Return: N/A
function keyboardInput(event) {
	var keyCode = event.which || event.keyCode;
	if(keyCode != 0) {
		// Prevent the user from entering unacceptable inputs.
		if(!((keyCode <= 57) && (keyCode >= 48)) && !KEY_CODE.includes(keyCode)) {
			event.preventDefault();
		} else {
			// Get keyboard input and click the corresponding button.
			if((keyCode <= 57) && (keyCode >= 48)) {
				var input = String.fromCharCode(keyCode);
				document.getElementById(input).click();
			} else {
				switch(keyCode) {
					case 43:
						document.getElementById("plus").click();
						break;
					case 45:
						document.getElementById("minus").click();
						break;
					case 42:
						document.getElementById("times").click();
						break;
					case 47:
						document.getElementById("division").click();
						break;
					case 40:
						document.getElementById("(").click();
						break;
					case 41:
						document.getElementById(")").click();
						break;
					case 69:
						document.getElementById("scientific").click();
						break;
					case 101:
						document.getElementById("e").click();
						break;
					case 13: //enter
					case 61:
						document.getElementById("equal").click();
						break;
					case 8: // backspace
						event.preventDefault();
						document.getElementsByClassName('fa-backspace')[0].click();
						break;
					case 46:
						document.getElementById("dot").click();
						break;
					case 37:
						document.getElementById("percentage").click();
						break;
					case 94:
						document.getElementById("exponentiation").click();
						break;
					case 8730:
						document.getElementById("squareroot").click();
						break;
					case 99:
						document.getElementById("c").click();
						break;
				}
			}
		}
	}
}

var all = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", "=", "C", "^", "^2", "E", "e", "(", ")", "%", "√(", ".", "<-"];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var operator = ["+", "-", "*", "/", "^", "^2", "E", ".", "(", ")", "%", "√("];
// Operators that start the term
var startOp = ["(", "√(", "-"];
// Operators that operate two numbers/terms
var midOp = ["+", "*", "/", "^", "E", "."];
// Operators that end the term.
var endOp = ["^2", ")", "%"];
// Operator that will clean the #equation-container
var clear = ["=", "C"];
var others = ["<-"];

// Author: Gail Chen
// Created: 7/3
// Edit: N/A
// Description: Checks if users' input is valid to be added to the end of equation.
// Require: input is a string
// Update: N/A
// Return: invalidToAdd
function invalidToAdd(input) {
	var last = equation.slice(-1); // The last character of the equation.
	var last2 = equation.slice(-2); // The last two characters of the equation, for checking '^2' and '√('.
	var twoBefore = equation.charAt(equation.length - 2); // The second-to-last character of the equation.

	// Inputs will not be added to the end of the equation in following situations:
	// 1. add an input that is not a number or one of ["(", "√(", "-", "e"] to an empty equation
	// 2. add a decimal point when the equation is not ended with a number or the number already has a decimal point
	// 3. add a number after %, ) or e
	// 4. add an operator in midOp or endOp or '=' after (
	// 5. add ) or % after an operator in startOp or midOp
	// 6. add ^, ^2, E after %
	// 7. add ^, ^2 after an operator in ["+", "-", "*", "/", "^", "E", ".", "^2"] where there is a % before the operator
	// 8. add an operator in endOp or midOp to an equation that is "-" or "(-"
	// 9. enter "=" when equation is empty or the equation ends with an operator in startOp or midOp
  var invalidToAdd = (equation == "" && !(numbers.includes(input) || startOp.includes(input) || input === "e")) ||
		(!(numbers.includes(last) && dotExists == false) && input == ".") ||
		(numbers.includes(input) && (endOp.includes(last) || last == "e" )) ||
		(last == "(" && (endOp.includes(input) || midOp.includes(input) || input == "=")) ||
		([")", "%"].includes(input) && (startOp.includes(last) || midOp.includes(last))) ||
		(["^", "^2", "E"].includes(input) && last == "%") ||
		(["^", "^2"].includes(input) && (twoBefore == "%" && ["+", "-", "*", "/", "E", "."].includes(last))) ||
		((endOp.includes(input) || midOp.includes(input)) && last == "-" && ["", "("].includes(twoBefore)) ||
		(input == "=" && (equation == "" || midOp.includes(last) || startOp.includes(last)));
	if(document.getElementById("equation-container").getAttribute("placeholder") != 0) {
		invalidToAdd = true;
	}
	return invalidToAdd;
}

// Author: Gail Chen
// Created: 7/1
// Edit: 7/3 Gail modified switch cases to handle ignored cases
// Description: Adjust the inputs to an create an acceptable equation
// then print the result of the calculation and update the history list.
// Require: N/A
// Update: equation, #equation-container, #history-container
// Return: N/A
function printToScreen(input) {
	var last = equation.slice(-1); // The last character of the equation.
	var last2 = equation.slice(-2); // The last two characters of the equation, for checking '^2' and '√('.
	var twoBefore = equation.charAt(equation.length - 2); // The second-to-last character of the equation.
	var cutLast = equation.substring(0, equation.length - 1); // Remove the equation's last character.
	var cutLast2 = equation.substring(0, equation.length - 2); // Remove the equation's last 2 characters.
	var invalid = invalidToAdd(input); // Checks if the input is valid to be added to the end of equation.

	switch(input) {
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			clearPlaceholder();
			if(invalidToAdd(input)) return;
			// If a nonzero number starts with 0, remove the leading 0.
			if(last == "0" && !numbers.includes(twoBefore) && twoBefore != ".") {
				equation = cutLast;
			}
			break;

		case "e":
			clearPlaceholder()
			if(invalidToAdd(input)) return;
			// If the last character in the equation is a decimal point,
			// replace the decimal point with the input and reset the dotExists flag.
			if(last == ".") {
				equation = cutLast;
				dotExists = false;
			}
			break;

		case "+":
		case "-":
		case "*":
		case "/":
		case "^":
		case "^2":
		case "E":
			// If the equation is ended with '-' or an operator in mipDop, replace that operator with the input.
			handlePlaceholder()
			if(invalidToAdd(input)) return;
			var last = equation.slice(-1);
			if(midOp.includes(last) || last == "-") {
				equation = cutLast;
			}
			break;

		case ".":
			handlePlaceholder()
			if(invalidToAdd(input)) return;
			break;

		case "√(":
		case "(": // If the equation is ended with the decimal point, replace '.' with the input.
			clearPlaceholder();
			if(invalidToAdd(input)) return;
			var last = equation.slice(-1);
			if(last == ".") {
				equation = cutLast;
			}
			break;

		case "%":
			handlePlaceholder()
			if(invalidToAdd(input)) return;
			break;
		case ")":
			clearPlaceholder()
			if(invalidToAdd(input)) return;
			break;

		case "<-":
			handlePlaceholder();
			if(invalidToAdd(input)) return;
			last = equation.slice(-1);
			cutLast = equation.substring(0, equation.length - 1);

			// If the equation is ended with '√(', remove '√(';
			// otherwise, remove the last character in the equataion.
			if(last2 == "√(") {
				equation = cutLast2;
			} else {
				equation = cutLast;
			}

			// Reset the dotExists flag if the removed character is a decimal point.
			if(last == ".") {
				dotExists = false;
			}
			break;

		case "C":
			clearPlaceholder();
			if(invalidToAdd(input)) return;
			equation = ""; // Clear the equation.
			dotExists = false; // Reset the dotExists flag.
			break;

		case "=":
			if(invalidToAdd(input)) return;
			result = normalize(evaluate()); // Evaluate the equation and update the result.
			updatePlaceholder(result); // Update the placeholder with the calculated result.
			addHistory(equation, result); // Add the equation and its result to the history.
			equation = ""; // Clear the equation;
			dotExists = false; // Reset the dotExists flag.
			break;
	}
	// If the input doesn't clear the equation or delete the last character of the equation,
	// add the input to the end of the equation.
	if(!clear.includes(input) && input != "<-") {
		equation += input;
		// If the input is in ["+", "-", "*", "/", "(", ")", "^", "^2", '√('] which means
		// a new number will be entered after it, then reset the dotExists flag.
		if(["+", "-", "*", "/", "(", ")", "^", "^2", '√(', "E"].includes(input)) {
			dotExists = false;
		}

		// If the input is a decimal point, set dotExists flag to 1.
		if(input == ".") {
			dotExists = true;
		}
	}

	// Display the resulting equation to #equation-container.
	update(equation);
}

// Author: Mike
// Created: 7/3
// Edit: N/A
// Description: Put placeholder as the equation, update view and set set placeholder to 0
// Require: N/A
// Update: #equation-container, equation
// Return: N/A
function handlePlaceholder() {
	var inputfield = document.getElementById("equation-container");
	var placeholder = inputfield.getAttribute("placeholder");
	if(placeholder != 0) {
		//Change equation to placeholder
		equation = placeholder.toString();
		if(equation.includes(".")) {
			dotExists = true;
		}
		update(equation);
		//Change placeholder to 0
		inputfield.setAttribute("placeholder", 0);
	}
}

// Author: Mike
// Created: 7/3
// Edit: N/A
// Description: change placeholder to 0
// Require: N/A
// Update: #equation-container
// Return: N/A
function clearPlaceholder() {
	var inputfield = document.getElementById("equation-container");
	var placeholder = inputfield.getAttribute("placeholder");
	inputfield.setAttribute("placeholder", 0);
}
