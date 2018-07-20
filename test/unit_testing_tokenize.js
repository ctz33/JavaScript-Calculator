//Author: Mike
//Created: 7/4
//Edit: N/A

//TestPlan:
//1. Simple operations: ["2", "2+5", "3-4", "2*5", "2/5", "2^5", "(3+5)", "3.7", "2.0", "027", "7^2"]
//2. replace operations: ["e", "(3)(4)", "√(3)", "√(3+7)", "5E3", "7%", "7(3)","(-3)","3E-5","(3)4","3√(4)","5%√(8)","3e","5%e","3Ee","39^e"]
//3. parenthesis mismatch: ["(3", "(5+7*9", "√(3", "√(3+7", "√(3*√(3)","3)","3+7)"]
//4. special cases: ["3^3^3","12341234123412341234"]

describe("tokenize", function() {
	//Testing simple operations
	describe("Simple Operations", function() {
		var testPlan = ["2", "2+5", "3-4", "2*5", "2/5", "2^5", "(3+5)", "3.7", "2.0", "027", "7^2"];
		it("tokenize " + testPlan[0], function() {
			expect(tokenize(testPlan[0])[0]).toBe(2);
		});

		it("tokenize " + testPlan[1], function() {
			var tokens = tokenize(testPlan[1]);
			expect(tokens[0]).toBe(2);
			expect(tokens[1]).toBe("+");
			expect(tokens[2]).toBe(5);
		});

		it("tokenize " + testPlan[2], function() {
			var tokens = tokenize(testPlan[2]);
			expect(tokens[0]).toBe(3);
			expect(tokens[1]).toBe("-");
			expect(tokens[2]).toBe(4);
		});

		it("tokenize " + testPlan[3], function() {
			var tokens = tokenize(testPlan[3]);
			expect(tokens[0]).toBe(2);
			expect(tokens[1]).toBe("*");
			expect(tokens[2]).toBe(5);
		});

		it("tokenize " + testPlan[4], function() {
			var tokens = tokenize(testPlan[4]);
			expect(tokens[0]).toBe(2);
			expect(tokens[1]).toBe("/");
			expect(tokens[2]).toBe(5);
		});

		it("tokenize " + testPlan[5], function() {
			var tokens = tokenize(testPlan[5]);
			expect(tokens[0]).toBe(2);
			expect(tokens[1]).toBe("^");
			expect(tokens[2]).toBe(5);
		});

		it("tokenize " + testPlan[6], function() {
			var tokens = tokenize(testPlan[6]);
			expect(tokens[0]).toBe("(");
			expect(tokens[1]).toBe(3);
			expect(tokens[2]).toBe("+");
			expect(tokens[3]).toBe(5);
			expect(tokens[4]).toBe(")");
		});

		it("tokenize " + testPlan[7], function() {
			var tokens = tokenize(testPlan[7]);
			expect(tokens[0]).toBe(3.7);
		});

		it("tokenize " + testPlan[8], function() {
			var tokens = tokenize(testPlan[8]);
			expect(tokens[0]).toBe(2.0);
		});

		it("tokenize " + testPlan[9], function() {
			var tokens = tokenize(testPlan[9]);
			expect(tokens[0]).toBe(27);
		});

		it("tokenize " + testPlan[10], function() {
			var tokens = tokenize(testPlan[10]);
			expect(tokens[0]).toBe(7);
			expect(tokens[1]).toBe("^");
			expect(tokens[2]).toBe(2);
		});
	});

	//Replacement
	describe("Replacement Operations", function() {
		var testPlan = ["e", "(3)(4)", "√(3)", "√(3+7)", "5E3", "7%", "7(3)","(-3)","3E-5","(3)4","3√(4)","5%√(8)","3e","5%e","3Ee","39^e"]
		it("tokenize " + testPlan[0], function() {
			var tokens = tokenize(testPlan[0]);
			expect(tokens[0]).toBe(Math.E);
		});

		it("tokenize " + testPlan[1], function() {
			var tokens = tokenize(testPlan[1]);
			expect(tokens[0]).toBe("(");
			expect(tokens[1]).toBe(3);
			expect(tokens[2]).toBe(")");
			expect(tokens[3]).toBe("*");
			expect(tokens[4]).toBe("(");
			expect(tokens[5]).toBe(4);
			expect(tokens[6]).toBe(")");
		});

		it("tokenize " + testPlan[2], function() {
			var tokens = tokenize(testPlan[2]);
			expect(tokens[0]).toBe("(");
			expect(tokens[1]).toBe(3);
			expect(tokens[2]).toBe(")");
			expect(tokens[3]).toBe("^");
			expect(tokens[4]).toBe("(");
			expect(tokens[5]).toBe(0.5);
			expect(tokens[6]).toBe(")");
		});

		it("tokenize " + testPlan[3], function() {
			var tokens = tokenize(testPlan[3]);
			expect(tokens[0]).toBe("(");
			expect(tokens[1]).toBe(3);
			expect(tokens[2]).toBe("+");
			expect(tokens[3]).toBe(7);
			expect(tokens[4]).toBe(")");
			expect(tokens[5]).toBe("^");
			expect(tokens[6]).toBe("(");
			expect(tokens[7]).toBe(0.5);
			expect(tokens[8]).toBe(")");
		});

		it("tokenize " + testPlan[4], function() {
			var tokens = tokenize(testPlan[4]);
			expect(tokens[0]).toBe(5);
			expect(tokens[1]).toBe("*");
			expect(tokens[2]).toBe(10);
			expect(tokens[3]).toBe("^");
			expect(tokens[4]).toBe(3);
		});

		it("tokenize " + testPlan[5], function() {
			var tokens = tokenize(testPlan[5]);
			expect(tokens[0]).toBe(7);
			expect(tokens[1]).toBe("*");
			expect(tokens[2]).toBe(0.01);
		});
		
		it("tokenize " + testPlan[6], function() {
			var tokens = tokenize(testPlan[6]);
			expect(tokens[0]).toBe(7);
			expect(tokens[1]).toBe("*");
			expect(tokens[2]).toBe("(");
			expect(tokens[3]).toBe(3);
			expect(tokens[4]).toBe(")");
		});
		
		it("tokenize " + testPlan[7], function() {
			var tokens = tokenize(testPlan[7]);
			expect(tokens[0]).toBe("(");
			expect(tokens[1]).toBe(0);
			expect(tokens[2]).toBe("-");
			expect(tokens[3]).toBe(3);
			expect(tokens[4]).toBe(")");
		});
		
		it("tokenize " + testPlan[8], function() {
			var tokens = tokenize(testPlan[8]);
			expect(tokens[0]).toBe(3);
			expect(tokens[1]).toBe("*");
			expect(tokens[2]).toBe(0.1);
			expect(tokens[3]).toBe("^");
			expect(tokens[4]).toBe(5);
		});
		
		it("tokenize " + testPlan[9], function() {
			var tokens = tokenize(testPlan[9]);
			expect(tokens[0]).toBe("(");
			expect(tokens[1]).toBe(3);
			expect(tokens[2]).toBe(")");
			expect(tokens[3]).toBe("*");
			expect(tokens[4]).toBe(4);
		});
		
		it("tokenize " + testPlan[10], function() {
			var tokens = tokenize(testPlan[10]);
			expect(tokens[0]).toBe(3);
			expect(tokens[1]).toBe("*");
			expect(tokens[2]).toBe("(");
			expect(tokens[3]).toBe(4);
			expect(tokens[4]).toBe(")");
			expect(tokens[5]).toBe("^");
			expect(tokens[6]).toBe("(");
			expect(tokens[7]).toBe(0.5);
			expect(tokens[8]).toBe(")");
		});
		
		it("tokenize " + testPlan[11], function() {
			var tokens = tokenize(testPlan[11]);
			expect(tokens[0]).toBe(5);
			expect(tokens[1]).toBe("*");
			expect(tokens[2]).toBe(0.01);
			expect(tokens[3]).toBe("*");
			expect(tokens[4]).toBe("(");
			expect(tokens[5]).toBe(8);
			expect(tokens[6]).toBe(")");
			expect(tokens[7]).toBe("^");
			expect(tokens[8]).toBe("(");
			expect(tokens[9]).toBe(0.5);
			expect(tokens[10]).toBe(")");
		});
		
		it("tokenize " + testPlan[12], function() {
			var tokens = tokenize(testPlan[12]);
			expect(tokens[0]).toBe(3);
			expect(tokens[1]).toBe("*");
			expect(tokens[2]).toBe(Math.E);
		});
		
		it("tokenize " + testPlan[13], function() {
			var tokens = tokenize(testPlan[13]);
			expect(tokens[0]).toBe(5);
			expect(tokens[1]).toBe("*");
			expect(tokens[2]).toBe(0.01);
			expect(tokens[3]).toBe("*");
			expect(tokens[4]).toBe(Math.E);
		});
		
		it("tokenize " + testPlan[14], function() {
			var tokens = tokenize(testPlan[14]);
			expect(tokens[0]).toBe(3);
			expect(tokens[1]).toBe("*");
			expect(tokens[2]).toBe(10);
			expect(tokens[3]).toBe("^");
			expect(tokens[4]).toBe(Math.E);
		});
		
		it("tokenize " + testPlan[15], function() {
			var tokens = tokenize(testPlan[15]);
			expect(tokens[0]).toBe(39);
			expect(tokens[1]).toBe("^");
			expect(tokens[2]).toBe(Math.E);
		});
	});

	describe("Tokenize Parenthesis Mismatch", function() {
		var testPlan = ["(3", "(5+7*9", "√(3", "√(3+7", "√(3*√(3)","3)","3+7)"]
		it("tokenize "+testPlan[0], function() {
			spyOn(window, "alert")
			var tokens = tokenize(testPlan[0]);
			expect(window.alert).toHaveBeenCalledWith("Error, Parenthesis Mismatch.")
			expect(tokens[0].toString()).toBe(NaN.toString());
		});

		it("tokenize "+testPlan[1], function() {
			spyOn(window, "alert")
			var tokens = tokenize(testPlan[1]);
			expect(window.alert).toHaveBeenCalledWith("Error, Parenthesis Mismatch.")
			expect(tokens[0].toString()).toBe(NaN.toString());
		});
		
		it("tokenize "+testPlan[2], function() {
			spyOn(window, "alert")
			var tokens = tokenize(testPlan[2]);
			expect(window.alert).toHaveBeenCalledWith("Error, Parenthesis Mismatch.")
			expect(tokens[0].toString()).toBe(NaN.toString());
		});
		
		it("tokenize "+testPlan[3], function() {
			spyOn(window, "alert")
			var tokens = tokenize(testPlan[3]);
			expect(window.alert).toHaveBeenCalledWith("Error, Parenthesis Mismatch.")
			expect(tokens[0].toString()).toBe(NaN.toString());
		});
		
		it("tokenize "+testPlan[4], function() {
			spyOn(window, "alert")
			var tokens = tokenize(testPlan[4]);
			expect(window.alert).toHaveBeenCalledWith("Error, Parenthesis Mismatch.")
			expect(tokens[0].toString()).toBe(NaN.toString());
		});
		
		it("tokenize "+testPlan[5], function() {
			spyOn(window, "alert")
			var tokens = tokenize(testPlan[5]);
			expect(window.alert).toHaveBeenCalledWith("Error, Parenthesis Mismatch.")
			expect(tokens[0].toString()).toBe(NaN.toString());
		});
		
		it("tokenize "+testPlan[6], function() {
			spyOn(window, "alert")
			var tokens = tokenize(testPlan[6]);
			expect(window.alert).toHaveBeenCalledWith("Error, Parenthesis Mismatch.")
			expect(tokens[0].toString()).toBe(NaN.toString());
		});
	});

	describe("Special Cases", function() {
		var testPlan = ["3^3^3","12341234123412341234"]
		it("tokenize " + testPlan[0], function() {
			var tokens = tokenize(testPlan[0]);
			expect(tokens[0]).toBe(3);
			expect(tokens[1]).toBe("^");
			expect(tokens[2]).toBe(3);
			expect(tokens[3]).toBe("^");
			expect(tokens[4]).toBe(3);
		});
		
		it("tokenize " + testPlan[1], function() {
			var tokens = tokenize(testPlan[1]);
			expect(tokens[0]).toBe(12341234123412341234);
			expect(tokens[0]).toBe(12341234123412340000);
			expect(tokens[0]>Number.MAX_SAFE_INTEGER).toBe(true);
		});
	});
});