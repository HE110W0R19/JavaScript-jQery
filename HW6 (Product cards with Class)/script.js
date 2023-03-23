class New_Card_Image {
  #NewImage;

  constructor(input_url) {
    if (input_url.startsWith("https://") != true &&
      input_url.startsWith("http://") != true) {
      throw new Error("Incorrect Reference in class");
    }
    else {
      this.#NewImage = document.createElement("img");
      this.#NewImage.src = input_url;
    }
    this.#NewImage.classList.add("product-image");
  }

  get NewProdImage() {
    return this.#NewImage;
  }
}

class New_Card_Name {
  #NewName;

  constructor(input_name) {

    if (input_name.length <= 1) {
      throw new Error("Name must be longest");
    }
    else if (typeof (input_name) != "string") {
      throw new Error("Name must be str");
    }
    else {
      this.#NewName = document.createElement("div");
      this.#NewName.innerText = input_name;
    }
    this.#NewName.classList.add("product-name");
  }

  get NewProdName() {
    return this.#NewName;
  }
}

class New_Card_Cost {
  #NewCost;

  constructor(input_cost) {

    if (input_cost <= 0) {
      throw new Error("Price cant be 0, of < 0")
    }
    else if (typeof (input_cost) != "number") {
      throw new Error("Price must be number")
    }
    else {
      this.#NewCost = document.createElement("div");
      this.#NewCost.innerText = input_cost;
    }
    this.#NewCost.classList.add("product-price")
  }

  get NewProdCost() {
    return this.#NewCost;
  }
}

class New_Prod_Node {
  #NewNode;

  constructor(img, name, cost) {
    this.#NewNode = document.createElement("div");
    this.#NewNode.classList.add("product-card");

    let N_Prod_Name =
      new New_Card_Name(name);

    let N_Prod_Image =
      new New_Card_Image(img);

    let N_Prod_Cost =
      new New_Card_Cost(cost);

    this.#NewNode.append(N_Prod_Image.NewProdImage);
    this.#NewNode.append(N_Prod_Name.NewProdName);
    this.#NewNode.append(N_Prod_Cost.NewProdCost);
  }

  get NewProdNode() {
    return this.#NewNode;
  }
}

let NameInput = document.querySelector("#ProdName");
NameInput.addEventListener('change',
  function(event) {
    let input = event.target;
    let InputName = input.value;
    if (InputName.length <= 1) {
      input.setCustomValidity("Name can't be empty! Or name must be long!");
      return;
    }
    input.setCustomValidity("");
  });
NameInput.setCustomValidity("Name can't be empty! Or name must be long!");

let CostInput = document.querySelector("#ProdCost");
CostInput.addEventListener('change',
  function(event) {
    let input = event.target;
    let InputCost = input.value;
    if (!Number(InputCost)) {
      input.setCustomValidity("Price must be number!");
      return;
    }
    input.setCustomValidity("");
  });
CostInput.setCustomValidity("Price must be number!");

let SrcInput = document.querySelector("#ProdImgSrc");
SrcInput.addEventListener('change',
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

SrcInput.setCustomValidity("Incorrect source 2!");

document.querySelector("#AddButton").addEventListener('click', function(event) {
  try {
    let Form = document.querySelector("#InputForm");
    Form.reportValidity();

    let ProductList = document.querySelector(".product-gallery");

    let N_Node = new New_Prod_Node(
      document.querySelector("#ProdImgSrc").value,
      document.querySelector("#ProdName").value,
      parseInt(document.querySelector("#ProdCost").value));

    ProductList.appendChild(N_Node.NewProdNode);
    event.preventDefault();
  }
  catch (exp) {
    console.error(exp.message)
  }
});