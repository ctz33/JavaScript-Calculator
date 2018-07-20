// Author: Ariel Zhu
// Created: 7/3/18
// Edit: N/A
// Description: set up calculator home page

katex.render("\\sqrt{x}", squareroot);
katex.render("x^2", square);
katex.render("\\div", division);
katex.render("\\times", times);
katex.render("x^y", exponentiation);
katex.render("-", minus);
katex.render("+", plus);
katex.render("=", equal);

//Author: Mike
//Created: 7/3
//Edit: N/A
//Description: Setup clear button listener
var clearBtn = document.getElementById('clear-button');
clearBtn.addEventListener("click", clearHistory, false);

//Author: Mike
//Created: 7/1
//Edit: N/A
//Description: Memory button handling
var mp = document.getElementById('m+');
mp.addEventListener("mouseenter", showM, false);
mp.addEventListener("mouseleave", hideM, false);
var mm = document.getElementById("m-");
mm.addEventListener("mouseenter", showM, false);
mm.addEventListener("mouseleave", hideM, false);
var mc = document.getElementById("mc");
mc.addEventListener("mouseenter", showM, false);
mc.addEventListener("mouseleave", hideM, false);
var mr = document.getElementById("mr");
mr.addEventListener("mouseenter", showM, false);
mr.addEventListener("mouseleave", hideM, false);
var mr = document.getElementById("ms");
ms.addEventListener("mouseenter", showM, false);
ms.addEventListener("mouseleave", hideM, false);
