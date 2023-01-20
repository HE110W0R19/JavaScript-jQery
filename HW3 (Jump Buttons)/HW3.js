function GetIntRand(num) {
  return Math.floor(Math.random() * num);
}

function ButtonIsPress(event) {
  
  let Y_Window_Size =
    document.getElementsByTagName('html')[0].clientHeight - 50;
  //  50 - button height

  let X_Window_Size =
    document.getElementsByTagName('html')[0].clientWidth - 50;
  //  50 - button width

  //alert("X size: " + X_Window_Size + "  " + "Y size: " + Y_Window_Size);

  console.log(event.target)

  event.target.style.top = "" + GetIntRand(Y_Window_Size) + "px";
  event.target.style.left = "" + GetIntRand(X_Window_Size) + "px";

  event.target.style.backgroundColor =
    "rgb(" + GetIntRand(255) + "," + GetIntRand(255) + "," + GetIntRand(255) + ")";
}

var Buttons = document.getElementsByClassName("JumpButtons");

for (let tmp of Buttons) {
  tmp.addEventListener('click', ButtonIsPress);
}