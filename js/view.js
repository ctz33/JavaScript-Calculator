//Author: Mike
//Created: 7/1
//Edit: N/A
//Description: update the equation field with given equation
//Update: #equation-container
//Return: N/A
function update(equation) {
	var equationField = document.getElementById("equation-container"); //Which equation
	// equationField.innerHTML=equation;
	equationField.value = equation;

}

//Author: Mike
//Created: 7/1
//Edit: N/A
//Description: Add a history record (equation + result) to the history-container
//Update: #history-container
//Return: N/A
function addHistory(equation, result) {
	var historyContainer = document.getElementById("history-container");

	//Create a record
	var line = document.createElement("div");
	line.setAttribute("class", "history-line");
	var eqContainer = document.createElement("P");
	var result2String = result.toString();
	if(result > Number.MAX_SAFE_INTEGER) {
		result2String = result.toExponential(5);
	}
	eqContainer.innerHTML = equation + " = " + result2String.replace("e+", "E");
	eqContainer.setAttribute("class", "eq-container")
	var removeButton = document.createElement("I");
	removeButton.setAttribute("class", "far fa-trash-alt remove-button");

	//Append the record to the historyContainer
	line.appendChild(removeButton);
	line.appendChild(eqContainer);
	historyContainer.appendChild(line);

	//Setup remove button listener
	removeButton.addEventListener("click", removeHistory);

	//If there is no record in the history container, then let clear button appear
	var currentLines = historyContainer.children;
	if(currentLines.length >= 1) {
		changeClearButtonOpacity(1);
	}

	historyContainer.scrollTop = historyContainer.scrollHeight
}

//Author: Mike
//Created: 7/1
//Edit:N/A
//Description: Remove a history record through event from history-container
//Update: #history-container
//Return: N/A
function removeHistory(event) {
	var line = event.target.parentNode;
	var historyContainer = line.parentNode;
	historyContainer.removeChild(line);
	var currentLines = historyContainer.getElementsByClassName("history-line");
	if(currentLines.length == 0) {
		changeClearButtonOpacity(0);
	}
}

//Author: Mike
//Created: 7/1
//Edit: N/A
//Description: Remove all history records in the history-container
//Update: #history-container
//Return: N/A
function clearHistory() {
	var historyContainer = document.getElementById("history-container");
	var children = historyContainer.getElementsByClassName("history-line");
	while(children.length > 0) {
		historyContainer.removeChild(children[0]);
	}
	changeClearButtonOpacity(0);
}

//Author: Mike
//Created: 7/1
//Edit: N/A
//Description: Change clear button opacity
//Update: #clear-button.opacity
//Return: N/A
function changeClearButtonOpacity(opacity) {
	var clearButton = document.getElementById("clear-button");
	clearButton.style.opacity = opacity;
}

//Author: Mike
//Created: 7/3
//Edit: N/A
//Description: Update the place holder of the equation-container
//Update: #equation-container
//Return: N/A
function updatePlaceholder(result) {
	var equationContainer = document.getElementById("equation-container");
	if(result == Infinity) {
		result = 0;
	} else if(result.toString() == "NaN") {
		result = 0;
	}
	if(result > Number.MAX_SAFE_INTEGER) {
		equationContainer.setAttribute("placeholder", result.toExponential(5).replace("e+", "E"));
	} else {
		result = result.toString().replace("e+", "E");
		equationContainer.setAttribute("placeholder", result);
	}
}

// Author: Gail Chen
// Created: 7/2
// Edit: N/A
// Description: Update memory in the view
// Require: N/A
// Update: #current-memory
// Return: N/A
function updateMemory(memory) {
	if(memory > Number.MAX_SAFE_INTEGER) {
		document.getElementById("current-memory").innerHTML = memory.toExponential(5).replace("e+", "E");
	} else {
		document.getElementById("current-memory").innerHTML = memory.toString().replace("e+", "E");
	}

}

// Author: Mike
// Created: 7/3
// Edit: N/A
// Description: show memory illustration
// Require: N/A
// Update: #current-memory, #equation-container
// Return: N/A
function showM(event) {
	var equationField = document.getElementById("equation-container");
	var memoryField = document.getElementById("current-memory");
	switch(event.target.id) {
		case "m+":
			equationField.value = "Memory+(" + equationField.value + ")"
			break;
		case "m-":
			equationField.value = "Memory-(" + equationField.value + ")"
			break;
		case "mc":
			memoryField.innerHTML = 0;
			break;
		case "mr":
			if(memory > Number.MAX_SAFE_INTEGER) {
				equationField.value = memory.toExponential(5).replace("e+", "E");
			} else {
				equationField.value = memory.toString().replace("e+", "E");
			}
			break;
		case "ms":
			var placeholder = document.getElementById("equation-container").getAttribute("placeholder");
			if(equation != "") {
				memoryField.innerHTML = "= " + equation;
			} else if(placeholder != 0) {
				memoryField.innerHTML = "= " + placeholder;
			}
			break;
		default:
			break;
	}
}

// Author: Mike
// Created: 7/3
// Edit: N/A
// Description: hide memory illustration
// Require: N/A
// Update: #current-memory, #equation-container
// Return: N/A
function hideM(event) {
	var equationField = document.getElementById("equation-container")
	var memoryField = document.getElementById("current-memory");
	switch(event.target.id) {
		case "m+":
		case "m-":
		case "mr":
			equationField.value = equation;
			break;
		case "mc":
		case "ms":
			if(memory > Number.MAX_SAFE_INTEGER) {
				memoryField.innerHTML = memory.toExponential(5).replace("e+", "E");
			} else {
				memoryField.innerHTML = memory.toString().replace("e+", "E");
			}
			break;
		default:
			break;
	}
}
