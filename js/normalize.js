// Author: Ariel Zhu
// Created: 7/3/18
// Edit: N/A
// Description: normalize numbers and scientific notations to 5 deminal precision.
// result is a number
function normalize(result) {
	if(result.toString().includes("e")) {
		result = parseFloat(result.toPrecision(6));
	} else {
		result = parseFloat(result.toFixed(5));
	}
	return result;
}
