$(document).ready(() => {
  var token = window.localStorage.getItem("token").toString();
  if (token != "") {
    var res = TokenVerification(token)
    token = res;
    if (token != "") {
      window.location.replace("../CardPage/CardPage.html");
    }
    else {
      window.location.replace("index.html");
    }
  }
})

$(".RegButton").on("click", (event) => {
  event.preventDefault();
  window.location.replace("Registry/Registry.html")
})

$(".EntButton").on("click", (event) => {
  event.preventDefault();
  window.location.replace("Login/Login.html")
})

function TokenVerification(token) {
  try {
    $.ajax({
      "method": "POST",
      "url": "https://n8n.xpech.ru/webhook/jang/v1/refresh",
      "headers": {
        "Authorization": token
      }
    }).done(
      (responce) => {
        if (responce == " ") {
          token = "";
          return token;
        }
        if (responce.statusCode == 200) {
          token = responce.body.token
          return token;
        }
        else {
          token = "";
          return token;
        }
      }
    )
  }
  catch (exp) {
    return " ";
  }
}