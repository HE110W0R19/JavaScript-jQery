"use strict";

//------------Task_№1------------  
//var input = prompt("Enter numbers (separated by spaces):");
//var TotalArr = input.split(" ");

function Find_Max_Elem_1(arr) {
  if (arr.length == 0) {
    alert("Wrong input!");
  }
  else {
    let max = parseInt(arr[0]);
    for (let i = 1; i < arr.length; ++i) {
      max < parseInt(arr[i]) ? max = parseInt(arr[i]) : null;
    }
    return max;
  }
}

function Find_Max_Elem_2(...arr) {
  if (arr.length == 0) {
    alert("Wrong input!");
  }
  else {
    let max = parseInt(arr[0]);
    for (let tmp of arr) {
      max < parseInt(tmp) ? max = parseInt(tmp) : null;
    }
    return max;
  }
}

//alert("For classic: "+Find_Max_Elem_1(TotalArr));
//alert("For of: "+Find_Max_Elem_2(1,2,3,4,5));

//------------Task_№2------------
function Euclid_algorithm_1(num1, num2) {
  while (num1 != 0 && num2 != 0) {
    num1 > num2 ? num1 = num1 % num2 : num2 = num2 % num1;
  }
  return num1 + num2;
}

function Euclid_algorithm_2(num1, num2) {
  if (num1 != 0 && num2 != 0) {
    num1 > num2 ? num1 = num1 % num2 : num2 = num2 % num1;
    return Euclid_algorithm_2(num1, num2);
  }
  return num1 + num2;
}

//alert("Euclid classic: " + Euclid_algorithm_1(12, 8));
//alert("Euclid recursion: " + Euclid_algorithm_2(12, 8));

//------------Task_№3------------
//var input = prompt("Enter numbers (separated by spaces):");
//var TotalArr = input.split(" ");
var TotalArr = [1, 2, 3, 4, 5];

function Jumbled_Arr(arr) {
  if (arr.length == 0) {
    alert("Wrong input!");
  }
  var JumArr = [];
  for (let rnd = arr.length-1; rnd >= 0; --rnd) {
    let RandPos = Math.floor(Math.random() * rnd);
    JumArr.push(parseInt(arr[RandPos]));
    arr.splice(RandPos, 1);
  }
  return JumArr;
}

//alert("Input array: " + TotalArr);
//alert("Jumbled array: " + Jumbled_Arr(TotalArr));