//$.get("https://n8n.xpech.ru/webhook/pv111-get-card-proxy?page=2", (response) => {
//console.log(response);
//});

// Image Class =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
class New_Card_Image {
  #NewImage;

  constructor(input_url) {
    if (input_url.startsWith("https://") != true &&
      input_url.startsWith("http://") != true) {
      throw new Error("Incorrect Reference in class");
    }
    else {
      this.#NewImage = $(`<img/>`);
      this.#NewImage.addClass("product_image");
      this.#NewImage.attr('src', input_url);
    }
  }

  get NewProdImage() {
    return this.#NewImage;
  }
}

// Card Name Class =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
class New_Card_Name {
  #NewName;

  constructor(input_name) {

    if (input_name.length == 0) {
      throw new Error("Name must be longest");
    }
    else if (typeof (input_name) != "string") {
      throw new Error("Name must be str");
    }
    this.#NewName = $(`<div">${input_name}</div>`)
    this.#NewName.addClass("product_name");
  }

  get NewProdName() {
    return this.#NewName;
  }
}

// Price Class =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
class New_Card_Price {
  #NewPrice;

  constructor(input_Price) {

    if (!(input_Price > 0)) {
      throw new Error("Price cant be 0, or < 0")
    }
    else if (typeof (input_Price) != "number") {
      throw new Error("Price must be number");
    }
    this.#NewPrice = $(`<div>${input_Price}</div>`);
    this.#NewPrice.addClass("product_price");
  }

  get NewProdPrice() {
    return this.#NewPrice;
  }
}

// Node Class =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
class New_Prod_Node {
  #NewNode;

  constructor(img, name, Price) {
    this.#NewNode = $(`<div></div>`);
    this.#NewNode.addClass("product_card");
    let N_Prod_Name =
      new New_Card_Name(name);

    let N_Prod_Image =
      new New_Card_Image(img);

    let N_Prod_Price =
      new New_Card_Price(Price);

    this.#NewNode.append(N_Prod_Image.NewProdImage);
    this.#NewNode.append(N_Prod_Price.NewProdPrice);
    this.#NewNode.append(N_Prod_Name.NewProdName);
  }
  get NewProdNode() {
    return this.#NewNode;
  }
  static MakeFromObject(obj) {
    return new New_Prod_Node(this.toString(obj.productImage), this.toString(obj.productName), this.toString(obj.productPrice));
  }

  static MakeFromJSON(str) {
    let tmp_obj = JSON.parse(str);
    return this.MakeFromObject(tmp_obj);
  }
}

// Validation +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
$("#ProdName").on('change',
  function(event) {
    let input = event.target;
    let InputName = input.value;
    if (InputName.length <= 1) {
      input.setCustomValidity("Name can't be empty! Or name must be long!");
      return;
    }
    input.setCustomValidity("");
  });
$("#ProdName").get(0).setCustomValidity("Name can't be empty! Or name must be long!");

$("#ProdPrice").on('change',
  function(event) {
    let input = event.target;
    let InputPrice = input.value;
    if (!Number(InputPrice) || !(InputPrice > 0)) {
      input.setCustomValidity("Price must be number!");
      return;
    }
    input.setCustomValidity("");
  });
$("#ProdPrice").get(0).setCustomValidity("Price must be number!");

$("#ProdImgSrc").on('change',
  function(event) {
    let input = event.target;
    let InputSrc = input.value;
    if (InputSrc.startsWith("http://") != true &&
      InputSrc.startsWith("https://") != true) {
      input.setCustomValidity("Incorrect source 1!");
      return;
    }
    input.setCustomValidity("");
  });
$("#ProdImgSrc").get(0).setCustomValidity("Incorrect source 2!");

//=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
function loadCards(card_num) {
  if (card_num > 5) {
    card_num = 5;
  }

  for (let i = 0; i < card_num; i++) {
    $.get(`https://n8n.xpech.ru/webhook/pv111-get-card-proxy?page=${i}`, (response) => {
      let n_card = new New_Prod_Node(response.productImage, response.productName, response.productPrice)
      displayDataCards(n_card);
    });
  }
}

function displayDataCards(card) {
  cards.push(card);
  $(".product_gallery").append(card.NewProdNode);
}
var cards = [];
loadCards(5);
//console.log(cards);
// Send Button Event =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
$("#AddButton").on('click', function(event) {
  try {

    event.preventDefault();
    let Form = $("#InputForm");
    Form.get(0).reportValidity();

    let N_Node = new New_Prod_Node(
      $("#ProdImgSrc").val(),
      $("#ProdName").val(),
      parseInt($("#ProdPrice").val()));

    displayDataCards(N_Node);
    cards.push(N_Node.NewProdNode);
    ProductList.append(N_Node.NewProdNode);
  }
  catch (exp) {
    console.error(exp.message)
  }
});