$(".submit-registration").on("click", (event) => {
  let form = $(".reg-form");
  event.preventDefault();
  form[0].reportValidity();

  if (!form[0].checkValidity()) {
    return;
  }

  let data = {};
  data.username = form[0].username.value;
  data.email = form[0].email.value;
  data.password = form[0].password.value;
  data.passwordConfirm = form[0].passwordConfirm.value;

  $.ajax({
    "method": "POST",
    "url": "https://n8n.xpech.ru/webhook/jang/v1/register",
    "data": data
  }).done(
    (response) => {
      console.log("Registry done!")
      form.hide();
      $(".RegReady").css("display", "flex");
      setTimeout(() => {
        window.location.replace("../Login/Login.html")
      }, 2000)
    }
  ).fail(
    (response) => {
      console.log("Registry fail!")
      let r_form = form[0];

      let response_text = JSON.parse(response.responseText);

      let errors_data = response_text.body.data;

      for (let field in errors_data) {
        r_form[field].setCustomValidity(errors_data[field].message)
      }

      r_form.reportValidity()
    }
  )
})