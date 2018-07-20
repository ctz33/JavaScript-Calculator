//Author: Mike
//Created: 7/4
//Edit: N/A

//TestPlan:
//1. update equation-container:3+7*36
//2. update memory
//	2.1 update small numbers: 367
//	2.2 update scientific number: 3.5e+72
//	2.3 update large number: 12341234123412341234
//3. add history
//	3.1 add small number:"3+5", 8
//	3.2 add large number: "12341234123412341234", 1.23412e+19
//	3.3 add extra-large number: "1234123412341234123412341234", 1.23412e+27
//4. remove history
//5. clear history
//6. update placeholder
//	6.1 update small numbers: 35
//	6.2 update NaN
//	6.3 update Infinity
//	6.4 update large number: 12341234123412341234

describe("view", function() {
	var body;
	var equationContainer;
	var memoryContainer;
	var historyContainer;
	var clearBtn
	beforeAll(function() {
		body = document.getElementsByTagName("body")[0];
		equationContainer = document.createElement("input");
		equationContainer.id = "equation-container";
		memoryContainer = document.createElement("div");
		memoryContainer.id = "current-memory";
		historyContainer = document.createElement("div");
		historyContainer.id = "history-container";
		clearBtn = document.createElement("button");
		clearBtn.id = "clear-button";

		body.appendChild(equationContainer);
		body.appendChild(memoryContainer);
		body.appendChild(historyContainer);
		body.appendChild(clearBtn);
    var dummyMemory = document.createElement('div');
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyMemory);
	})

	it("Update equation", function() {
		var eq = "3+7*36";
		update(eq);
		expect(document.getElementById("equation-container").value).toBe("3+7*36")
	});

	describe("Update memory", function() {
		var testPlan = [367, 3.5e+72, 12341234123412341234]
		it("update small number", function() {
			updateMemory(testPlan[0]);
			expect(document.getElementById("current-memory").innerHTML).toBe("367");
		});

		it("update scientific number", function() {
			updateMemory(testPlan[1]);
			expect(document.getElementById("current-memory").innerHTML).toBe("3.50000E72");
		});

		it("update large number", function() {
			updateMemory(testPlan[2]);
			expect(document.getElementById("current-memory").innerHTML).toBe("1.23412E19");
		});
	});

	describe("Add history", function() {
		var testPlanEquation = ["3+5", "12341234123412341234", "1234123412341234123412341234"]
		var testPlanResult = [8, 1.23412e+19, 1.23412e+27];

		beforeAll(function() {
			addHistory(testPlanEquation[0], testPlanResult[0]);
			addHistory(testPlanEquation[1], testPlanResult[1]);
			addHistory(testPlanEquation[2], testPlanResult[2]);
		});

		it("Add small number", function() {
			expect(document.getElementById("history-container").children[0].className).toBe("history-line");
			expect(document.getElementById("history-container").children[0].children[0].tagName).toBe("I");
			expect(document.getElementById("history-container").children[0].children[0].className).toBe("far fa-trash-alt remove-button");
			expect(document.getElementById("history-container").children[0].children[1].tagName).toBe("P");
			expect(document.getElementById("history-container").children[0].children[1].className).toBe("eq-container");
			expect(document.getElementById("history-container").children[0].children[1].innerHTML).toBe("3+5 = 8");
			expect(document.getElementById("clear-button").style.opacity).toBe("1");
		});

		it("Add large number", function() {
			expect(document.getElementById("history-container").children[1].className).toBe("history-line");
			expect(document.getElementById("history-container").children[1].children[0].tagName).toBe("I");
			expect(document.getElementById("history-container").children[1].children[0].className).toBe("far fa-trash-alt remove-button");
			expect(document.getElementById("history-container").children[1].children[1].tagName).toBe("P");
			expect(document.getElementById("history-container").children[1].children[1].className).toBe("eq-container");
			expect(document.getElementById("history-container").children[1].children[1].innerHTML).toBe("12341234123412341234 = 1.23412E19");
			expect(document.getElementById("clear-button").style.opacity).toBe("1");
		});

		it("Add extra-large number", function() {
			expect(document.getElementById("history-container").children[2].className).toBe("history-line");
			expect(document.getElementById("history-container").children[2].children[0].tagName).toBe("I");
			expect(document.getElementById("history-container").children[2].children[0].className).toBe("far fa-trash-alt remove-button");
			expect(document.getElementById("history-container").children[2].children[1].tagName).toBe("P");
			expect(document.getElementById("history-container").children[2].children[1].className).toBe("eq-container");
			expect(document.getElementById("history-container").children[2].children[1].innerHTML).toBe("1234123412341234123412341234 = 1.23412E27");
			expect(document.getElementById("clear-button").style.opacity).toBe("1");
		});

		afterAll(function() {
			body.removeChild(historyContainer);
			historyContainer = document.createElement("div");
			historyContainer.id = "history-container";
			body.appendChild(historyContainer);
		});
	});

	describe("Remove History", function() {
		var testPlanEquation = ["3+5", "12341234123412341234", "1234123412341234123412341234"]
		var testPlanResult = [8, 1.23412e+19, 1.23412e+27];
		beforeAll(function() {
			addHistory(testPlanEquation[0], testPlanResult[0]);
			addHistory(testPlanEquation[1], testPlanResult[1]);
			addHistory(testPlanEquation[2], testPlanResult[2]);
		});

		it("Remove history", function() {
			var removeEvent = document.createEvent("MouseEvent");
			removeEvent.initEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
			document.getElementById("history-container").children[0].children[0].dispatchEvent(removeEvent);
			expect(document.getElementById("history-container").children[0].className).toBe("history-line");
			expect(document.getElementById("history-container").children[0].children[0].tagName).toBe("I");
			expect(document.getElementById("history-container").children[0].children[0].className).toBe("far fa-trash-alt remove-button");
			expect(document.getElementById("history-container").children[0].children[1].tagName).toBe("P");
			expect(document.getElementById("history-container").children[0].children[1].className).toBe("eq-container");
			expect(document.getElementById("history-container").children[0].children[1].innerHTML).toBe("12341234123412341234 = 1.23412E19");
			expect(document.getElementById("clear-button").style.opacity).toBe("1");
			document.getElementById("history-container").children[0].children[0].dispatchEvent(removeEvent);
			document.getElementById("history-container").children[0].children[0].dispatchEvent(removeEvent);
		});

		afterAll(function() {
			body.removeChild(historyContainer);
			historyContainer = document.createElement("div");
			historyContainer.id = "history-container";
			body.appendChild(historyContainer);
		});
	});

	describe("Clear History", function() {
		var testPlanEquation = ["3+5", "12341234123412341234", "1234123412341234123412341234"]
		var testPlanResult = [8, 1.23412e+19, 1.23412e+27];
		beforeAll(function() {
			addHistory(testPlanEquation[0], testPlanResult[0]);
			addHistory(testPlanEquation[1], testPlanResult[1]);
			addHistory(testPlanEquation[2], testPlanResult[2]);
		});
		it("Clear history", function() {
			clearHistory();
			expect(document.getElementById("history-container").children.length).toBe(0);
			expect(document.getElementById("clear-button").style.opacity).toBe("0");
		});
		afterAll(function() {
			body.removeChild(historyContainer);
			historyContainer = document.createElement("div");
			historyContainer.id = "history-container";
			body.appendChild(historyContainer);
		});
	});

	describe("Update placeholder", function() {
		var testPlan = [35, NaN, Infinity, 12341234123412341234]
		it("update small number", function() {
			updatePlaceholder(testPlan[0])
			expect(document.getElementById("equation-container").getAttribute("placeholder")).toBe("35");
		});

		it("update NaN", function() {
			updatePlaceholder(testPlan[1]);
			expect(document.getElementById("equation-container").getAttribute("placeholder")).toBe("0");
		});

		it("update Infinity", function() {
			updatePlaceholder(testPlan[2]);
			expect(document.getElementById("equation-container").getAttribute("placeholder")).toBe("0");
		});

		it("update Large Number", function() {
			updatePlaceholder(testPlan[3]);
			expect(document.getElementById("equation-container").getAttribute("placeholder")).toBe("1.23412E19");
		});
	});
  describe("it should update Memory", function() {
    it("should update memory", function() {
      updateMemory('2.567')
      expect(document.getElementById("current-memory").innerHTML).toEqual('2.567');
    });
    it("should update e+ to E", function() {
      updateMemory('2.34e+10')
      expect(document.getElementById("current-memory").innerHTML).toEqual('2.34E10');
    });
  });


});
