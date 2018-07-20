// Author: Channing Jacobs
// Created: 7/4
// Edit: N/A
// Description: Adds a secret secondary theme for the calculator. This
// theme can be toggled by clicking the text in the footer of the html page.

// Varaible to remember the current state of theme
var state = 0;

// Listener attached to the footer text
var footer_text = document.getElementById("secret");
footer_text.addEventListener("click", changeTheme);

// Buttons that need to be styled
var buttons = ["ms","mr","m+","m-","mc","(",")","squareroot","square","e","7","8","9","division","c","4","5","6","times","exponentiation","1","2","3","minus","percentage","0","dot","scientific","plus","equal"];

// Create styling in html header to support hover color changes (can't be inlined)
// Another option would be to replace the page css, but this was done as a proof
// of concept (avoiding creation of another css page).
var head = document.getElementsByTagName("head")[0];
var css = ".keyboard-item:hover {background-color: #5c1e19;} .keyboard-item {background-color: #db847d;}";
css = css + " #clear-button { border-top-color: #b87332; background-color: #db847d;} #clear-button:hover { background-color: #b87332;}"
css = css + " .fa-trash-alt { color: #b87332; }"
css = css + " .tooltiptext, .left-tooltiptext {background-color: #b87332;}"
var style = document.createElement("style");
style.appendChild(document.createTextNode(css));

// Change theme based on state
function changeTheme() {
  state = (state + 1) % 2; // state is 0 or 1
  if (state == 0) {
    // BLUE THEME

    // Remove body style
    document.body.removeAttribute("style")
    // // Remove keyboard_items styling
    var keyboard_items = document.getElementsByClassName("keyboard-item");
    var i = 0;
    for(i;i < buttons.length; i++){
      document.getElementById(buttons[i]).removeAttribute("style");
    }
    // Remove memory styling
    document.getElementsByClassName("memory")[0].removeAttribute("style");
    // Remove history styling
    document.getElementsByClassName("history-section")[0].getElementsByTagName("p")[0].removeAttribute("style");
    document.getElementsByClassName("history-section")[0].removeAttribute("style");
    // Revert heart color
    document.getElementsByClassName("fa-heart")[0].removeAttribute("style");
    // Remove backspace color
    document.getElementsByClassName("fa-backspace")[0].removeAttribute("style");
    // Remove styling from header (for hover elements)
    head.removeChild(style);
  } else {
    // RED THEME
    
    // Set body background-color
    document.body.style.backgroundColor = "#5c1e19";
    // Set history background color
    document.getElementsByClassName("history-section")[0].getElementsByTagName("p")[0].style.backgroundColor = "#b87332";
    // Set history Section border color
    document.getElementsByClassName("history-section")[0].style.borderColor = "#b87332";
    // Set memory class background
    document.getElementsByClassName("memory")[0].style.background = "#db847d";
    // Get keyboard item border color and background
    var keyboard_items = document.getElementsByClassName("keyboard-item");
    var i = 0;
    for(i; i < buttons.length; i++){
      document.getElementById(buttons[i]).style.borderColor = "#5c1e19";
    }
    // Change heart color
    document.getElementsByClassName("fa-heart")[0].style.color = "blue";
    // Change backspace color
    document.getElementsByClassName("fa-backspace")[0].style.color = "#5c1e19";
    // Append styling to allow for hover elements
    head.appendChild(style);
  }
}
