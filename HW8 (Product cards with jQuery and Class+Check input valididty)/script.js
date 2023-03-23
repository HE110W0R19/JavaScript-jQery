// Image Class =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
class New_Card_Image {
  constructor(input_url) {
    if (input_url.startsWith("https://") != true &&
      input_url.startsWith("http://") != true) {
      throw new Error("Incorrect Reference in class");
    }
    else {
      this.NewImage = $(`<img/>`);
      this.NewImage.addClass("product_image");
      this.NewImage.attr('src', input_url);
    }
  }

  get NewProdImage() {
    return this.NewImage;
  }
}

// Card Name Class =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
class New_Card_Name {
  constructor(input_name) {

    if (input_name.length == 0) {
      throw new Error("Name must be longest");
    }
    else if (typeof (input_name) != "string") {
      throw new Error("Name must be str");
    }
    this.NewName = $(`<div>${input_name}</div>`)
    this.NewName.addClass("product_name");
  }

  get NewProdName() {
    return this.NewName;
  }
}

// Price Class =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
class New_Card_Price {
  constructor(input_Price) {

    if (!(input_Price > 0)) {
      throw new Error("Price cant be 0, or < 0")
    }
    else if (typeof (input_Price) != "number") {
      throw new Error("Price must be number");
    }
    this.NewPrice = $(`<div>${input_Price}</div>`);
    this.NewPrice.addClass("product_price");
  }

  get NewProdPrice() {
    return this.NewPrice;
  }
}

// Node Class =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
class New_Prod_Node {
  constructor(img, name, Price) {
    this.NewNode = $(`<div></div>`);
    this.NewNode.addClass("product_card");
    let N_Prod_Name =
      new New_Card_Name(name);

    let N_Prod_Image =
      new New_Card_Image(img);

    let N_Prod_Price =
      new New_Card_Price(Price);

    this.NewNode.append(N_Prod_Image.NewProdImage);
    this.NewNode.append(N_Prod_Price.NewProdPrice);
    this.NewNode.append(N_Prod_Name.NewProdName);
  }

  static MakeDIV(inner_html) {
    this.NewNode = $(`<div></div>`);
    this.NewNode.addClass("product_card");
    this.NewNode.append(inner_html);
    return this.NewNode;
  }

  static MakeFromJSON(str) {
    let tmp_obj = JSON.parse(str);
    return this.MakeFromHTML(tmp_obj);
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
function loadCards() {
  let Buff_data = window.sessionStorage.getItem("cards-item");
  //console.log(Buff_data)

  if (Buff_data == null) {
    return [];
  }

  let Buff_cards = JSON.parse(Buff_data);
  console.log(Buff_cards);
  let res = [];

  for (let card of Buff_cards) {
    res.push(card);
  }
  return res;
}

function displayDataCards(card) {
  $(".product_gallery").append(New_Prod_Node.MakeDIV(card));
}

var cards = loadCards();
console.log(cards);
cards.forEach((card) => displayDataCards(card));

function saveCards() {
  window.sessionStorage.setItem("cards-item", JSON.stringify(cards));
}
// Send Button Event =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
$("#AddButton").on('click', function(event) {
  try {

    event.preventDefault();
    let Form = $("#InputForm");
    Form.get(0).reportValidity();

    //let ProductList = $(".product_gallery");

    let N_Node = new New_Prod_Node(
      $("#ProdImgSrc").val(),
      $("#ProdName").val(),
      parseInt($("#ProdPrice").val()));

    cards.push(N_Node.NewNode[0].innerHTML);
    saveCards();
    $(".product_gallery").append(N_Node.NewNode);
  }
  catch (exp) {
    console.error(exp.message)
  }
});