

// Constantes

const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

//Entrada

const products = [
  {
    description: "Destornillador",
    price: 1.75,
    tax: LOWER_TYPE,
    stock: 4,
    units: 0
  },

  {
    description: "Alicates",
    price: 2.15,
    tax: EXEMPT_TYPE,
    stock: 7,
    units: 0
  },

  {
    description: "Tornillos",
    price: 0.25,
    tax: REGULAR_TYPE,
    stock: 18,
    units: 0
  },

  {
    description: "Serrucho",
    price: 3.8,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0
  },

  {
    description: "Clavos",
    price: 0.1,
    tax: LOWER_TYPE,
    stock: 60,
    units: 0
  },

  {
    description: "Martillo",
    price: 3.2,
    tax: LOWER_TYPE,
    stock: 5,
    units: 0
  },

  {
    description: "Taladradora",
    price: 18,
    tax: EXEMPT_TYPE,
    stock: 7,
    units: 0
  },

  {
    description: "Metro",
    price: 1.2,
    tax: LOWER_TYPE,
    stock: 6,
    units: 0
  }
];

let form = document.getElementById("product-list-container");
let button = document.getElementById("calculate");

let isValidInput = () => {
  let isValid = true;
  for (i = 0; i < products.length; i++) {
    if (products[i].units  > 0) {
      isValid = false;
    }
  }
  document.getElementById("calculate").disabled = isValid;
};

isValidInput();

var showProducts = () => {
  var container = document.getElementById("product-list-container");

  for (let i = 0; i < products.length; i++) {
    var description = document.createElement("li");
    description.innerText = "**" + products[i].description + "**";
    description.setAttribute("class", "Description");
    container.appendChild(description);

    var productPrice = document.createElement("h5");
    productPrice.innerText = products[i].price + " €/UD";
    productPrice.setAttribute("class", "product-price");
    container.appendChild(productPrice);

    let inputUnit = document.createElement("input");
    inputUnit.setAttribute("class", "input-unit");
    inputUnit.setAttribute("id", "input-unit-" + i);
    inputUnit.setAttribute("type", "number");
    inputUnit.setAttribute("required", "required");
    inputUnit.setAttribute("min", 0);
    inputUnit.setAttribute("max", products[i].stock);
    inputUnit.addEventListener("change", (event) => {
      products[i].units = event.target.valueAsNumber;
      isValidInput();
    });

    container.appendChild(inputUnit);
  }
};

showProducts();
let totalTaxes;
let subtotal;

function getProductSubtotal() {
  totalTaxes = 0;
  subtotal = 0;
  for (let i = 0; i < products.length; i++) {
    subtotal += products[i].price * products[i].units;
    if (products[i].tax === REGULAR_TYPE) {
      totalTaxes += (subtotal * 21) / 100;
    } else if (products[i].tax === LOWER_TYPE) {
      totalTaxes += (subtotal * 4) / 100;
    }
  }

  return subtotal;
}

getProductSubtotal();

function getTotal(subtotal, totalTaxes) {
  return subtotal + Number(totalTaxes);
}

function getValues() {
  let subtotal = getProductSubtotal();
  let subtotalValue = document.getElementById("subtotal-value");
  subtotalValue.innerHTML = `${subtotal.toFixed(2)}€`;

  let taxes = totalTaxes;
  let ivaValue = document.getElementById("iva-value");
  ivaValue.innerHTML = `${taxes.toFixed(2)}€`;

  let total = getTotal(subtotal, taxes);
  let totalValue = document.getElementById("total-value");
  totalValue.innerHTML = `${total.toFixed(2)}€`;
}

calculate.addEventListener("click", getValues);
