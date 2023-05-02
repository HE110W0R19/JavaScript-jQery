//START REQUESTS LIST
async function GetCardList(token) {
  return $.ajax({
    "method": "GET",
    "url": "https://n8n.xpech.ru/webhook/pv111/v1/cards/list",
    "headers": {
      "Authorization": token
    }
  })
}

async function CreateCard(token, data) {
  return $.ajax({
    "method": "POST",
    "url": "https://n8n.xpech.ru/webhook/pv111/v1/cards/create",
    "data": data,
    "contentType": false,
    "processData": false,
    "headers": {
      "Authorization": token
    }
  })
}

async function DeleteCard(token, RemoveCard) {
  return $.ajax({
    "method": "POST",
    "url": "https://n8n.xpech.ru/webhook/pv111/v1/card/delete",
    "headers": {
      "Authorization": token
    },
    "data": {
      "card_id": RemoveCard.Id
    }
  })
}

async function TokenVerification(token) {
  try {
    $.ajax({
      "method": "POST",
      "url": "https://n8n.xpech.ru/webhook/jang/v1/refresh",
      "headers": {
        "Authorization": token
      }
    }).done(
      (responce) => {
        if (responce == "") {
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
//END REQUESTS LIST