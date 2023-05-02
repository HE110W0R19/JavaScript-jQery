$(".submit-login").on("click", (event) => {
  let r_form = $(".login-form").get(0);
  event.preventDefault();
  r_form.reportValidity();

  if (!r_form.checkValidity()) {
    return;
  }

  let data = {};
  data.identity = r_form.identity.value;
  data.password = r_form.password.value;

  $.ajax({
    "method": "POST",
    "url": "https://n8n.xpech.ru/webhook/jang/v1/auth",
    "data": data
  }).done((resp) => {
    //console.log("success");
    window.localStorage.setItem("token", `${resp.body.token}`);
    window.location.replace("../CardPage/CardPage.html");
  }).fail((resp) => {
    let resp_txt = JSON.parse(resp.responceText);
    let d_error = resp_txt.body.data;

    if (Object.keys(d_error).length > 0) {
      for (let tmp in d_error) {
        r_form[tmp].setCustomValidity(d_error[tmp].message)
      }
    }
    else {
      $(".WrongEnterMessage").css("display", "flex");
    }
    r_form.reportValidity();
  })
})