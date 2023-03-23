document.querySelector("#AddButton").addEventListener(
  'click',
  (event) => {
    let ProductList = document.querySelector(".product-gallery");

    //Make node
    let NewProdNode = document.createElement("div");
    NewProdNode.classList.add("product-card");

    //Image
    let NewProdImg = document.createElement("img");
    NewProdImg.src = document.getElementById("ProdImgSrc").value;
    NewProdImg.classList.add("product-image");

    //Name
    let NewProdName = document.createElement("div");
    if (document.getElementById("ProdName").value.length <= 1) {
      NewProdName.innerText = "*Very long text*";
    }
    else {
      NewProdName.innerText = document.getElementById("ProdName").value;
    }
    NewProdName.classList.add("product-name");

    //Cost
    let NewProdCost = document.createElement("div");
    if(parseInt(document.querySelector("#ProdCost").value) <= 0){
      NewProdCost.innerText = "Free";
    }
    else{
      NewProdCost.innerText = document.querySelector("#ProdCost").value;
    }
    NewProdCost.classList.add("product-price");

    //Add elements
    NewProdNode.append(NewProdImg);
    NewProdNode.append(NewProdCost);
    NewProdNode.append(NewProdName);
    ProductList.appendChild(NewProdNode);
    event.preventDefault()
  }
)