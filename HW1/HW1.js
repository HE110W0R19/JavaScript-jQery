"use strict";

var a = parseFloat(prompt("Enter a: "));
var b = parseFloat(prompt("Enter b: "));
var c = parseFloat(prompt("Enter c: "));

var D = parseFloat(Math.pow(b, 2) - 4 * a * c);

if (D == 0) {
  alert(-b / (2 * a));
}

else if (D < 0) {
  alert("No solution!");
}

else {
  var x1 = (-b + Math.sqrt(D)) / (2 * a);
  var x2 = (-b - Math.sqrt(D)) / (2 * a);
  alert("X1 " + x1 + " ; " + "X2 " + x2);
}