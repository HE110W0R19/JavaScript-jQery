document.querySelector("#color").addEventListener('change',
  (event) => {
    let UserColor = event.target;

    let ColorChecker = /((\#((([a-fA-F]|[0-9])){6}))|(rgb|RGB\((([0-9][0-9]?)|(2[0-5][0-5])|(1[0-9]\d))),\s*?(([0-9][0-9]?)|(2[0-5][0-5])|(1[0-9]\d)),\s*?(([0-9][0-9]?)|(2[0-5][0-5])|(1[0-9]\d))\))/gm

    if (!ColorChecker.test(UserColor.value)) {
      console.log("Wrong input");
      UserColor.setCustomValidity("Wrong color input");
      return;
    }
    res = UserColor.value;
    UserColor.setCustomValidity("");
  });

var res;

document.querySelector("#submit").addEventListener('click', (event) => {
  let window = document.querySelector("form");
  if (!window.checkValidity()) {
    window.reportValidity();
    return;
  }
  console.log(res);
  event.preventDefault();
  document.querySelector(".color-block").style.background = res;
})