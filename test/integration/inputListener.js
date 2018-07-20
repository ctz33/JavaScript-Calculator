/*
Author: Gail Chen
Created: 7/4
Edit: N/A
Description: Integration tests functions in inputListener.js
Test plan for printToScreen (invovls invalidToAdd(), evaluate(), update()): checks final equation
  The input will be added to the end of the equation, special cases are identified for differnet inputs bellow.
Placeholder == 0:
1. input is a number from 0 to 9:
  If a nonzero number starts with 0, remove the leading 0 and add input to 0.
  If the equation is ended with %, ) or e, no change to equation.
  input == "5"
  - initial equation == "0", final equation == "5"
  - initial equation == "5+0", final equation == "5+5"
  - initial equation == "10.0", final equation == "10.05"
  - initial equation == "10.5%", final equation == "10.5%"
  - initial equation == "10.5e", final equation == "10.5e"
  - initial equation == "(10.5)", final equation == "(10.5)"
  input == "0":
  - initial equation == "0", final equation == "0"
  - initial equation == "5*0", final equation == "5*0"
  - initial equation == "0.0", final equation == "0.00"
  - initial equation == "10.5%", final equation == "10.5%"
  - initial equation == "10.5e", final equation == "10.5e"
  - initial equation == "(10.5)", final equation == "(10.5)"

2. input is "e":
  If the last character in the equation is a decimal point, replace the decimal point with the input and reset the dotExists flag.
  - initial equation == "", final equation == "e"
  - initial equation == "(", final equation == "(e"
  - initial equation == "10.4-", final equation == "10.4-e"
  - initial equation == "10", final equation == "10e"
  - initial equation == "10E", final equation == "10Ee"
  - initial equation == "2.3", final equation == "2.3e", dotExists == true
  - initial equation == "2.", final equation == "2e", dotExists == false

3. input is in ["+", "*", "/"]:
  If the equation is "", "-", "(-", or ends with "(", the equation doesn't change.
  If the quation is end with a character in ["+", "*", "/", "^", "E", ".", "-"], replace thie character with the input.
  For all:
  - initial equation == "", final equation == ""
  - initial equation == "-", final equation == "-"
  - initial equation == "(-", final equation == "(-"
  - initial equation == "10(", final equation == "10("
  input is "+":
  - initial equation == "10.4-", final equation == "10.4+"
  - initial equation == "10.4+", final equation == "10.4+"
  - initial equation == "10.4*", final equation == "10.4+"
  - initial equation == "10.4", final equation == "10.4+"
  input is "*":
  - initial equation == "10.4-", final equation == "10.4*"
  - initial equation == "10.4/", final equation == "10.4*"
  - initial equation == "10.4^", final equation == "10.4*"
  - initial equation == "10.4", final equation == "10.4*"
  input is "/":
  - initial equation == "10.4-", final equation == "10.4/"
  - initial equation == "10.4E", final equation == "10.4/"
  - initial equation == "104.", final equation == "104/"
  - initial equation == "10.4", final equation == "10.4/"

4. input == "-":
  If the quation is end with a character in ["+", "*", "/", "^", "E", ".", "-"], replace thie character with the input.
  - initial equation == "", final equation == "-"
  - initial equation == "(", final equation == "(-"
  - initial equation == "(-", final equation == "(-"
  - initial equation == "10.4^", final equation == "10.4-"
  - initial equation == "10.4E", final equation == "10.4-"
  - initial equation == "10.4-", final equation == "10.4-"
  - initial equation == "10.4", final equation == "10.4-"
  - initial equation == "10*34", final equation == "10*34-"

5. input is in ["^", "^2"]:
  If the equation doesn't change if the equation is "", "-", "(-", or ends with "(" or "%",
    or is ended with an character in ["-", "+", "*", "/", E", "."] where "%" is before this character.
  If the quation is end with a character in ["+", "*", "/", "^", "E", ".", "-"], replace thie character with the input.
  For both:
  - initial equation == "", final equation == ""
  - initial equation == "-", final equation == "-"
  - initial equation == "(-", final equation == "(-"
  - initial equation == "10(", final equation == "10("
  - initial equation == "10%", final equation == "10%"
  - initial equation == "10%-", final equation == "10%-"
  - initial equation == "10%/", final equation == "10%/"
  input == "^":
  - initial equation == "10.4^2", final equation == "10.4^2^"
  - initial equation == "10.4-", final equation == "10.4^"
  - initial equation == "10.4*", final equation == "10.4^"
  - initial equation == "10.4/", final equation == "10.4^"
  input == "^2":
  - initial equation == "10^", final equation == "10^2"
  - initial equation == "10.4^2", final equation == "10.4^2^2"
  - initial equation == "10.4E", final equation == "10.4^2"
  - initial equation == "104.", final equation == "104^2"

6. input == "E":
  If the equation is "", "-", "(-", or ends with "(", the equation doesn't change.
  If the quation is end with a character in ["+", "*", "/", "^", "E", ".", "-", "%"], replace thie character with the input.
  - initial equation == "", final equation == ""
  - initial equation == "-", final equation == "-"
  - initial equation == "(-", final equation == "(-"
  - initial equation == "10(", final equation == "10("
  - initial equation == "10.4-", final equation == "10.4E"
  - initial equation == "10.4*", final equation == "10.4E"
  - initial equation == "10.4", final equation == "10.4E"
  - initial equation == "10.4%", final equation == "10.4%"

7. input == ".":
  The equation doesn't change if the equation is "", "-", "(-", or ends with "(",
    or the equation is not ended with a number from 0 to 9 or dotExists is true
  - initial equation == "", final equation == ""
  - initial equation == "-", final equation == "-"
  - initial equation == "(-", final equation == "(-"
  - initial equation == "10(", final equation == "10("
  - initial equation == "10", final equation == "10."
  - initial equation == "10.3", final equation == "10.3"
  - initial equation == "10.3+", final equation == "10.3+"
  - initial equation == "10.3e^2", final equation == "10.3^2."

8. input in ["√(", "("]:
  If the equation is ended with the decimal point, replace '.' with the input.
  input == "√(":
  - initial equation == "", final equation == "√("
  - initial equation == "-", final equation == "-√("
  - initial equation == "-12.", final equation == "12√("
  - initial equation == "-12(", final equation == "12(√("
  - initial equation == "-12*", final equation == "12*√("
  - initial equation == "-12%", final equation == "12%√("
  input == "(":
  - initial equation == "", final equation == "("
  - initial equation == "-", final equation == "-("
  - initial equation == "-12.", final equation == "12("
  - initial equation == "-12^", final equation == "-12^("
  - initial equation == "(-12)", final equation == "(-12)("

9. input in [")", "%]":
  The equation doesn't change if the equation is "", "-", "(-",
    or ends with a character in ["(", "-", "+", "*", "/", "^", "E", "."].
  For both:
  - initial equation == "", final equation == ""
  - initial equation == "-", final equation == "-"
  - initial equation == "(-", final equation == "(-"
  - initial equation == "√(", final equation == "√("
  - initial equation == "10(", final equation == "10("
  - initial equation == "10.4-", final equation == "10.48"
  - initial equation == "10.4^", final equation == "10.4^"
  - initial equation == "10.4E", final equation == "10.4E"
  - initial equation == "104.", final equation == "104."
  - initial equation == "10.4%+", final equation == "10.4%+"
  input == ")":
  - initial equation == "(10.4", final equation == "(10.4)"
  - initial equation == "√(234.3", final equation == "√(234.3)"
  - initial equation == "(23*4.3", final equation == "(23*4.3)"
  input == "%":
  - initial equation == "(10.4", final equation == "(10.4%"
  - initial equation == "√(234.3", final equation == "√(234.3%"
  - initial equation == "23*4.3", final equation == "23*4.3%"

10. input == "<-":
  If the equation is ended with '√(', remove '√('; otherwise, remove the last character in the equataion.
  Reset the dotExists flag if the removed character is a decimal point.
  - initial equation == "", final equation == "", final dotExists == false
  - initial equation == "18.93-", final equation == "18.93", final dotExists == true
  - initial equation == "18.93√(", final equation == "18.93", final dotExists == true
  - initial equation == "19.0", final equation == "19.", final dotExists == true
  - initial equation == "19.", final equation == "19", final dotExists == false

11. input == "C":
  Clear the equation and reset dotExists.
  - initial equation == "", final equation == "", final dotExists == false
  - initial equation == "(10.4*23-)", final equation == "", final dotExists == false
  - initial equation == "(", final equation == "", final dotExists == false
  - initial equation == "4.03^", final equation == "", final dotExists == false
  - initial equation == "10.8", final equation == "", final dotExists == false

12. input == "=":
  The equation doesn't change if the equation is "", "-", "(-" or
    equation ends with a character in ["(", "-", "+", "*", "/", "^", "E", "."].
  - initial equation == "", final equation == ""
  - initial equation == "-", final equation == "-"
  - initial equation == "(-", final equation == "(-"
  - initial equation == "√(", final equation == "√("
  - initial equation == "10.4+9.3", final equation == "", result = 19.7
  - initial equation == "10.4*4^3.9", final equation == "", result = 2317.7538197
  - initial equation == "13^2^2", final equation == "", result = 28561
  - initial equation == "10.4^5", final equation == "", result = 121665.29024
  - initial equation == "10.4√(81)", final equation == "", result = 93.6

Placeholder != 0:
  The placeholder will be shown when equation is "".
  The placeholer is always a number with or without a decimal point.
1. placeholder == 0
  - If input is in ["+", *", "/", "^", "^2", "E", ".", ")", "%"], equation == ""
  - If input is in ["-", "(", "√(", "e"] and integers from 0 to 9, equation will be the same as input.

2. placeholder == 10:
  - Inputs that will replace the equation with the input: "(", "e", "√(", numbers from 0 to 9
  - Inputs that will set equation to "": ")"
  - Inputs that will replace the equation with placeholder and add the input to the end of equation: "+", "-", "*", "/", "^", "^2", "E", ".", "%"

3. placeholder == 10.5:
  - Inputs that will replace the equation with the input: "(", "e", "√(", numbers from 0 to 9
  - Inputs that will set equation to "": ")"
  - Inputs that will replace the equation with placeholder and add the input to the end of equation: "+", "-", "*", "/", "^", "^2", "E", "%"
  - Inputs that will set the equation to "10.5": "."

*/
