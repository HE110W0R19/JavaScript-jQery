class ProdDivText {
  static CreateProdText(ClassName, text) {
    let NewNode = $("<div></div>");
    NewNode.text(text);
    NewNode.addClass(ClassName);
    return NewNode;
  }
}

class ProdTitle {
  Title

  constructor(title) {
    if (typeof (title) != "string" || title.length == 0) {
      throw new Error("Name must be long");
    }
    this.Title = title;
  }

  getTitleNode() {
    return ProdDivText.CreateProdText("prod_name", this.Title);
  }
}

class ProdCost {
  Cost

  constructor(money) {
    if (typeof (money) == "string" || money.length != 0) {
      let num = parseInt(money);
      if (Number.isInteger(num)) {
        money = num;
      }
    }
    if (typeof (money) == "number") {
      if (money < 0) {
        throw new Error("Price must be > 0");
      }
      this.Cost = money;
    }
    else
      throw new Error("Price error");
  }

  getCostNode() {
    return ProdDivText.CreateProdText("prod_price", this.Cost);
  }
}

class ProdImage {
  ImageURL

  constructor(ID, IDcollection, prodImage) {
    if (typeof (IDcollection) == "string" &&
      IDcollection.length != 0 &&
      typeof (prodImage) == "string" &&
      prodImage.length != 0 &&
      typeof (ID) == "string" && ID.length != 0) {

      this.ImageURL = "https://jang.xpech.ru/api/files/" + IDcollection + "/" + ID + "/" + prodImage;

    }
    else {
      throw new Error("Image Error");
    }
  }

  getImageNode() {
    let NewImgNode = $("<img></img>");
    NewImgNode.addClass("prod_image");
    NewImgNode.attr("src", this.ImageURL);
    return NewImgNode;
  }
}

class ProdCard {
  #Price
  #Img
  #Title
  Id

  constructor(ID, PRICE, IMG, TITLE) {
    if (typeof (ID) == "string" && ID.length != 0)
      this.Id = ID;

    if (PRICE instanceof ProdCost)
      this.#Price = PRICE;
    else
      this.#Price = new ProdCost(PRICE);

    if (IMG instanceof ProdImage)
      this.#Img = IMG;
    else
      this.#Img = new ProdImage(IMG);

    if (TITLE instanceof ProdTitle)
      this.#Title = TITLE;
    else
      this.#Title = new ProdTitle(TITLE);
  }

  getCardNode() {
    let NewCardNode = $("<div></div>");
    NewCardNode.append(this.#Img.getImageNode());
    NewCardNode.append(this.#Title.getTitleNode());
    NewCardNode.append(this.#Price.getCostNode());
    return NewCardNode;
  }

  static fromObj(obj) {
    return new ProdCard(obj.id, obj.productPrice, new ProdImage(obj.id, obj.collectionId, obj.productImage), obj.productName);
  }
}