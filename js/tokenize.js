//Author: Mike
//Created: 7/1
//Edit: N/A
//Description: Take a string of equation, put each element (oprator/number) into an array and add necessary operators.
//				Catch parenthesis error.
//Update: N/A
//Return: An array of tokens
function tokenize(equation) {
	equation = sqrt2exp(equation);
	var parenthesis = 0;
	var tokens = new Array();

	//Replace semantic combination of symbols to math functions
	for(var i = 0; i < equation.length; i++) {
		var str = equation[i];
		switch(true) {
			case /\d/.test(str):
				if(tokens[tokens.length - 1] == ")") {
					tokens.push("*")
					tokens.push(str);
				} else if(/\d.*/.test(tokens[tokens.length - 1])) {
					tokens[tokens.length - 1] += str;
				} else {
					tokens.push(str);
				}
				break;
			case /E/.test(str):
				tokens.push("*");
				tokens.push("10");
				tokens.push("^");
				break;
			case /%/.test(str):
				tokens.push("*");
				tokens.push("0.01");
				break;
			case /-/.test(str):
				if(equation[i - 1] == "(" && ((i + 1) < equation.length) && equation[i + 1] == ")") {
					tokens.push(str);
					tokens.push("1")
				} else if(equation[i - 1] == "(") {
					tokens.push("0");
					tokens.push(str)
				} else if(equation[i - 1] == "E") {
					tokens[tokens.length - 2] = "0.1";
				} else {
					tokens.push(str)
				}
				break;
			case /\./.test(str):
				if(/[+\-*\/\(E\^]/.test(equation[i - 1])) {
					tokens.push("0.");
				} else if(/\d.*/.test(tokens[tokens.length - 1])) {
					tokens[tokens.length - 1] += str;
				} else {
					tokens.push(str);
				}
				break;
			case /\(/.test(str):
				if(/\d.*/.test(tokens[tokens.length-1]) || tokens[tokens.length - 1] == ")") {
					tokens.push("*")
				}
				tokens.push(str);
				parenthesis += 1;
				break;
			case /\)/.test(str):
				parenthesis -= 1;
				tokens.push(str);
				break;
			case /e/.test(str):
				if(/\d.*/.test(tokens[tokens.length - 1]) || tokens[tokens.length - 1] == ")") {
					tokens.push("*")
				}
				tokens.push(Math.E);
				break;
			default:
				tokens.push(str);
				break;
		}
	}

	//Replace string of floats/ints to type number
	for(var i = 0; i < tokens.length; i++) {
		var parse2num = parseFloat(tokens[i]);
		if(!isNaN(parse2num)) {
			tokens[i] = parse2num;
		}
	}

	//Parenthesis mismatch
	if(parenthesis != 0) {
		alert("Error, Parenthesis Mismatch.");
		tokens = [NaN]
	}
	return tokens;
}

//Author: Mike
//Created: 7/3
//Edit: N/A
//Description: Take a string of equation, change all √(x) to (x)^(0.5)
//Update: N/A
//Return: equation after changing sqrt to exp
function sqrt2exp(equation) {
	for(var i = 0; i < equation.length; i++) {
		if(equation[i] == "√") {
			equation = equation.slice(0, i) + equation.slice(i + 1, equation.length);
			var endParenIndex = findEndParenIndex(equation, i);
			equation = equation.slice(0, endParenIndex + 1) + "^(0.5)" + equation.slice(endParenIndex + 1, equation.length)
		}
	}
	return equation;
}

//Author: Mike
//Created: 7/3
//Edit: N/A
//Description: Take a string of equation and index of a left parenthesis, find the index of its right parenthesis.
//Update: N/A
//Return: Index of the right parenthesis
function findEndParenIndex(equation, index) {
	var parenthesis = 0;
	for(var i = index; i < equation.length; i++) {
		if(equation[i] == "(") {
			parenthesis++;
		} else if(equation[i] == ")") {
			parenthesis--;
		}
		if(parenthesis == 0) {
			return i;
		}
	}
	if(parenthesis < 0) {
		alert("Root Match Error")
	}
}
