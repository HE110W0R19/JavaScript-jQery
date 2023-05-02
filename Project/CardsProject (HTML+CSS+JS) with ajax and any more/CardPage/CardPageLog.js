var token = window.localStorage.getItem("token").toString();

let CardsArray = [];

if (token != "") {
  let tmp = TokenVerification(token);
  let tmp_token = tmp;
  if (tmp_token == "") {
    window.location.replace("index.html");
  }
  else {
    LoadCards(token);
  }
}

async function LoadCards(Token) {
  GetCardList(Token).then((responce) => {
    let tmp = responce.body.items

    if (tmp.length == 0) {
      CardsArray = tmp
      $(".prod_galery").text("Empty item");
    }

    else {
      for (let item of tmp) {
        CardsArray.push(ProdCard.fromObj(item));
      }
      CardsArray.forEach(CreateCardDiv)
    };

  }).catch((responce) => {
    console.log(responce);
  });
}

function CreateCardDiv(Card) {
  let NewNode = $("<div></div>");
  NewNode.addClass("prod_card");
  NewNode.append(Card.getCardNode());
  $(".prod_gallery").append(NewNode);

  //Close Button
  let CloseButtonNode = $("<input>");
  CloseButtonNode.addClass("DeleteCardButton");
  CloseButtonNode.attr("type", "button").attr("value", "Delete");
  NewNode.append(CloseButtonNode);

  CloseButtonNode.on('click', (event) => {
    event.preventDefault();
    DeleteCard(token, Card).then((resp) => {
      console.log(resp);
      NewNode.remove();
      CardsArray = CardsArray.filter((elem) => elem != Card);

      if (CardsArray.length < 1) {
        $(".prod_gallery").text("You don't have cards! ;(");
      }
    })
  })
}

$("#CreateButton").on('click', function(event) {
  let form = $(".CreateCardForm").get(0);
  event.preventDefault();
  form.reportValidity();

  if (!form.checkValidity())
    return;

  let data = new FormData(form);
  var resp = TokenVerification(token);
  let tmp_token = resp;
  if (tmp_token == "") {
    window.location.replace("../Login/Login.html");
  }
  else {
    CreateCard(token, data).then(responce => {
      if (responce.statusCode == 200) {
        let item = ProdCard.fromObj(responce.body);
        let items = $(".prod_gallery");
        if (CardsArray.length == 0) {
          items.text("");
        }
        CreateCardDiv(item);
        CardsArray.push(item);

        for (let index of $(".CreateCardForm").get(0).elements) {
          if (index.name != '')
            index.value = "";
        }
      }
    }).catch((resp) => {
      console.log(resp);
    })
  }
})

$(".ExitButton").on('click', (event) => {
  event.preventDefault();
  window.localStorage.clear();
  window.location.replace("../index.html");
})