// Author: Gail Chen
// Created: 7/2
// Edit: Channing, Removed hiding memory and updated all functions.
// Description: Handles MS, MR, M+, M-, MC button presses.
function handleMemory() {
	updateMemory(memory); // Node need to display the memory
	document.getElementById("mr").addEventListener("click", handleMR);
	document.getElementById("ms").addEventListener("click", handleMS);
	document.getElementById("m+").addEventListener("click", handleMPlus);
	document.getElementById("m-").addEventListener("click", handleMMinus);
	document.getElementById("mc").addEventListener("click", handleMC);
}

// Author: Gail Chen
// Created: 7/2
// Edit: Channing, rewritten to handle errors in input and expression eval.
// Description: MS(Memory Store) puts the displayed result into the memory
// Require: N/A
// Update: memory
// Return: N/A
function handleMS() {
	var invalid_expression = invalidToAdd("=");
	var placeholder = document.getElementById("equation-container").getAttribute("placeholder");
	if(!invalid_expression) {
		printToScreen("=");
		memory = result;
		updateMemory(memory);
	} else if(placeholder != 0) {
		memory = parseFloat(placeholder);
		updateMemory(memory);
	} else {
		update("ERROR");
	}
}

// Author: Gail Chen
// Created: 7/2
// Edit: Channing, handling decimal values in memory when recalled.
// Description: MR(Memory Recall) uses the number in memory, acts as if you had keyed in that number yourself
// Require: N/A
// Update: memory
// Return: N/A
function handleMR() {

	if(memory > Number.MAX_SAFE_INTEGER) {
		equation = memory.toExponential(5).replace("e+", "E");
	} else {
		equation = memory.toString().replace("e+", "E");
	}
	if(equation.includes(".")) {
		dotExists = true;
	}
	update(equation);
}

// Author: Gail Chen
// Created: 7/2
// Edit: Channing, error handling for invalid expressions.
// Description: M+(Memory Add) adds the result of current equation to the memory
// Require: N/A
// Update: equation, #current-input
// Return: N/A
function handleMPlus() {
	var invalid_expression = invalidToAdd("=");
	if(!invalid_expression) {
		printToScreen("=");
		memory += result;
		updateMemory(memory);
	} else {
		update("ERROR");
	}
}

// Author: Gail Chen
// Created: 7/2
// Edit: Channing, error handling for invalid expressions.
// Description: Handles memory store.
// Require: N/A
// Update: memory
// Return: N/A
function handleMMinus() {
	var invalid_expression = invalidToAdd("=");
	if(!invalid_expression) {
		printToScreen("=");
		memory -= result;
		updateMemory(memory);
	} else {
		update("ERROR");
	}
}

// Author: Gail Chen
// Created: 7/2
// Edit: Channing, updated call to updateMemory.
// Description: MC(Memory Clear) sets the memory to 0
// Require: N/A
// Update: memory
// Return: N/A
function handleMC() {
	memory = 0;
	updateMemory(memory);
}
