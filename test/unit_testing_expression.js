// Author: Channing Jacobs
// Created: 7/4
// Edit: N/A
// Description: Jasmine test cases for expression. Open unit_tests.html
// to run this test suite and the others in the test folder.
describe("expression", function() {

  describe("handles no operation", function() {
    it("of a single simple value", function() {
      this.equation = [0];
      expect(expression(this.equation)).toBe(0);
    });
    it("of a single large value", function() {
      this.equation = [123456789012345678901234567890];
      expect(expression(this.equation)).toBe(123456789012345678901234567890)
    });
    it("of a single scientific value", function() {
      this.equation = [1234567890123456789012345678901234124348593472508734530];
      expect(expression(this.equation)).toBe(1.2345678901234568e+54)
    });
  });

  describe("handles addition", function() {
    it("of two 0 values", function() {
      var equation = [0,"+",0];
      expect(expression(equation)).toBe(0);
    });
    it("of two small values", function() {
      this.equation = [1,"+",2.000000002];
      expect(expression(this.equation)).toBe(3.000000002);
    });
    it("of one small value and 0", function() {
      this.equation = [0,"+",2.01];
      expect(expression(this.equation)).toBe(2.01);
    });
    it("of one small value and one negative value", function() {
      this.equation = [0,"+",-10.0];
      expect(expression(this.equation)).toBe(-10);
    });
    it("of two large values", function() {
      this.equation = [123123123123123123123,"+",100000000000000];
      expect(expression(this.equation)).toBe(123123223123123130000);
    });
    it("of seven small values", function() {
      this.equation = [0,"+",20,"+",-10,"+",453,"+",19.3234,"+",43242.1,"+",6];
      expect(expression(this.equation)).toBe(43730.4234);
    });
  });

  describe("handles subtraction", function() {
    it("of two 0 values", function() {
      var equation = [0,"-",0];
      expect(expression(equation)).toBe(0);
    });
    it("of two small values", function() {
      this.equation = [5,"-",2.000000002];
      expect(expression(this.equation)).toBe(2.999999998);
    });
    it("of one small value and 0", function() {
      this.equation = [0,"-",2.01];
      expect(expression(this.equation)).toBe(-2.01);
    });
    it("of one small value and one negative value", function() {
      this.equation = [0,"-",-10.0];
      expect(expression(this.equation)).toBe(10);
    });
    it("of two large values", function() {
      this.equation = [123123123123123123123,"-",100000000000000];
      expect(expression(this.equation)).toBe(123123023123123130000);
    });
    it("of seven small values", function() {
      this.equation = [0,"-",20,"-",-10,"-",453,"-",19.3234,"-",43242.1,"-",6];
      expect(expression(this.equation)).toBe(-43730.4234);
    });
  });

  describe("handles multiplication", function() {
    it("of two 0 values", function() {
      var equation = [0,"*",0];
      expect(expression(equation)).toBe(0);
    });
    it("of two small values", function() {
      this.equation = [1,"*",2.000000002];
      expect(expression(this.equation)).toBe(2.000000002);
    });
    it("of one small value and 0", function() {
      this.equation = [0,"*",2.01];
      expect(expression(this.equation)).toBe(0);
    });
    it("of one small value and one negative value", function() {
      this.equation = [2,"*",-10.0];
      expect(expression(this.equation)).toBe(-20);
    });
    it("of two large values", function() {
      this.equation = [123123123123123123123,"*",100000000000000];
      expect(expression(this.equation)).toBe(1.2312312312312314e+34);
    });
    it("of seven small values", function() {
      this.equation = [1,"*",20,"*",-10,"*",453,"*",19.3234,"*",43242.1,"*",6];
      expect(expression(this.equation)).toBe(-454223677198.104);
    });
  });

  describe("handles division", function() {
    it("of two 0 values", function() {
      var equation = [0,"/",0];
      expect(isNaN(expression(equation))).toBe(true);
    });
    it("of two small values", function() {
      this.equation = [1,"/",2.000000002];
      expect(expression(this.equation)).toBe(0.49999999949999996);
    });
    it("of one small value and 0", function() {
      this.equation = [0,"/",2.01];
      expect(expression(this.equation)).toBe(0);
    });
    it("of one small value and one negative value", function() {
      this.equation = [2,"/",-10.0];
      expect(expression(this.equation)).toBe(-0.2);
    });
    it("of two large values", function() {
      this.equation = [123123123123123123123,"/",100000000000000];
      expect(expression(this.equation)).toBe(1231231.2312312312);
    });
    it("of seven small values", function() {
      this.equation = [9999,"/",20,"/",-10,"/",453,"/",19.3234,"/",43242.1,"/",6];
      expect(expression(this.equation)).toBe(-2.201338349792598e-8);
    });
  });

  describe("handles exponents", function() {
    it("of two 0 values", function() {
      var equation = [0,"^",0];
      expect(expression(equation)).toBe(1);
    });
    it("of two small values", function() {
      this.equation = [1,"^",2.000000002];
      expect(expression(this.equation)).toBe(1);
    });
    it("of one small value and 0", function() {
      this.equation = [100,"^",0];
      expect(expression(this.equation)).toBe(1);
    });
    it("of one small value and one negative value", function() {
      this.equation = [80,"^",-10.0];
      expect(expression(this.equation)).toBe(9.313225746154785e-20);
    });
    it("of two large values", function() {
      this.equation = [123123123123123123123,"^",100000];
      expect(expression(this.equation)).toBe(Infinity);
    });
    it("of seven small values", function() {
      this.equation = [5,"^",2,"^",1,"^",2,"^",1,"^",2,"^",6];
      expect(expression(this.equation)).toBe(3.552713678800501e+33);
    });
  });

  describe("handles order of operations", function() {
    it("with add,sub,mult,div,exp", function() {
      var equation = [5,"+",3,"*",4,"-",1,"/",5.2,"^",8];
      expect(expression(equation)).toBe(16.999998129433074);
    });
    it("with add,sub,mult,div,exp and parenthesis", function() {
      var equation = ["(",5,"+",3,")","*",4,"-","(",1,"/",5.2,")","^",8];
      expect(expression(equation)).toBe(31.999998129433074);
    });
  });

});
