// DISPLAY API ON SCREEN
let screen = document.getElementById("show");

fetch("https://fakestoreapi.com/products/")
  .then((res) => res.json())
  .then((json) => {
    // console.log(json);
    for (let index = 0; index < json.length; index++) {
      const element = json[index];
      // console.log(element);
      screen.innerHTML += `<div class="itemContainer">
      <div class="item" data-bs-toggle="modal" data-bs-target="#exampleModal-${element.id}">
    <img src="${element.image}" class="img" />
    <p class="title"> ${element.title}</p>
    <div class="priceCart">
    <p class="price">$${element.price}</p>
    </div>
    </div>
    </div>
    </div>

    <div class="modal fade" id="exampleModal-${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
        <h1>Description</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <img src="${element.image}" class="img" />
        <p class="title"> ${element.title}</p>
        <p class="price">$${element.price}</p>
        <p class="desc">${element.description}</p>
        <div class="qtyDiv">
          <p class="quantity">Quantity: </p> 
          <div class="sumDiv">
            <button class="minus" onclick="minusBtn(${element.id})">-</button>
            <input type="text" id="inputNum-${element.id}" value="1">
             <button class="plus" onclick="plusBtn(${element.id})">+</button>
          </div>
        </div>
        </div>
        <div class="modal-footer">
        <button class="buyBtn" onclick="buyBtn(${element.id})"><span class="material-symbols-outlined">
        add_shopping_cart
        </span>ADD TO CART</button>
        </div>
      </div>
    </div>
  </div>
   `;
    }
  });

// BUY BUTTON
function buyBtn(id) {
  const modal = document.querySelector(`#modal-${id}`);
  let inputNum = document.getElementById(`inputNum-${id}`);
  fetch("https://fakestoreapi.com/products/")
    .then((res) => res.json())
    .then((json) => {
      let cartArr = JSON.parse(localStorage.getItem("item")) || [];
      let itemInCart = false;
      for (let i = 0; i < cartArr.length; i++) {
        const item = cartArr[i];
        if (item.id == id) {
          itemInCart = true;
          item.quantity =  parseInt(item.quantity) + parseInt(inputNum.value);
          item.total += item.price * parseInt(inputNum.value);
          break;
        }
      }
      if (!itemInCart) {
        for (let index = 0; index < json.length; index++) {
          const product = json[index];
          if (product.id == id) {
            let item = {
              id: product.id,
              name: product.title,
              image: product.image,
              quantity: inputNum.value,
              price: product.price,
              total: product.price * inputNum.value,
            };
            cartArr.push(item);
            break;
          }
        }
      }
      localStorage.setItem("item", JSON.stringify(cartArr));
      count();
      updateTotal();
      // modal.style.display = "none";
      alert(
        `(${inputNum.value}) ${cartArr[cartArr.length - 1].name} have been added to cart!`
      );
    });
}

// QUANTITY BUTTONS
let min = 1;
let max = 10;

function plusBtn(productID) {
  let inputNum = document.getElementById(`inputNum-${productID}`);

  if (!inputNum.value) {
    inputNum.value = 1;
  } else {
    inputNum.value = parseInt(inputNum.value) + 1;
    // console.log(inputNum.value);
  }
  if (inputNum.value >= max) {
    inputNum.value = max;
    // console.log(inputNum.value);
    alert("Max limit reached!");
    return;
  }
}

function minusBtn(productID) {
  let inputNum = document.getElementById(`inputNum-${productID}`);
  if (!inputNum.value) {
    inputNum.value = 1;

    // console.log(inputNum.value);
  } else {
    inputNum.value = parseInt(inputNum.value) - 1;
  }
  if (inputNum.value <= min) {
    inputNum.value = min;
    // console.log(inputNum.value);
    alert("Min limit reached!");
  }
}
// CAROUSEL

let imagesArr = [
  "./images/shop1.jpg",
  "./images/shop2.jpg",
  "./images/shop3.jpg",
  "./images/shop4.jpg",
  "./images/shop5.jpg",
  "./images/shop9.jpg",
  "./images/shop10.jpg",
];
let index = 0;
let mainImage = document.getElementById("mainImage");
let prevBtn = document.getElementById("btnLeft");
let nextBtn = document.getElementById("btnRight");

// Prev Button
prevBtn.addEventListener("click", function () {
  index--;
  mainImage.setAttribute("src", imagesArr[index]);
  if (index == 0) {
    index = 6;
  }
});

// Next Button

nextBtn.addEventListener("click", function () {
  index++;
  mainImage.setAttribute("src", imagesArr[index]);
  if (index == 6) {
    index = 0;
  }
});

function load() {
  setInterval(() => {
    index++;
    mainImage.setAttribute("src", imagesArr[index]);
    if (index == 6) {
      index = 0;
    }
  }, 3000);
}
load();
//  CATEGORIES
let updateShow = document.querySelector(".update");
let showingOf = document.querySelector(".showingOf");
let mensShow = document.getElementById("mensShow");
let womensShow = document.getElementById("womensShow");
let jeweleryShow = document.getElementById("jeweleryShow");
let electShow = document.getElementById("electShow");

let mensBtn = document.getElementById("mensBtn");
let womensBtn = document.getElementById("womensBtn");
let jeweleryBtn = document.getElementById("jeweleryBtn");
let electBtn = document.getElementById("electBtn");

let carousel = document.querySelector(".carousel");
function fetchCategory(categoryName, url){
  fetch(url)
  .then((res) => res.json())
  .then((json) => {
    screen.innerHTML = "";
     let filteredData = json.filter((element)=>element.category.toLowerCase()===categoryName.toLowerCase())
    //  console.log(filteredData);
    filteredData.forEach((element) => {
      screen.innerHTML += `<div class="itemContainer">
      <div class="item" data-bs-toggle="modal" data-bs-target="#exampleModal-${element.id}">
    <img src="${element.image}" class="img" />
    <p class="title"> ${element.title}</p>
    <div class="priceCart">
    <p class="price">$${element.price}</p>
    </div>
    </div>
    </div>
    </div>

    <div class="modal fade" id="exampleModal-${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
        <h1>Description</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <img src="${element.image}" class="img" />
        <p class="title"> ${element.title}</p>
        <p class="price">$${element.price}</p>
        <p class="desc">${element.description}</p>
        <div class="qtyDiv">
          <p class="quantity">Quantity: </p> 
          <div class="sumDiv">
            <button class="minus" onclick="minusBtn(${element.id})">-</button>
            <input type="text" id="inputNum-${element.id}" value="1">
             <button class="plus" onclick="plusBtn(${element.id})">+</button>
          </div>
        </div>
        </div>
        <div class="modal-footer">
        <button class="buyBtn" onclick="buyBtn(${element.id})"><span class="material-symbols-outlined">
        add_shopping_cart
        </span>ADD TO CART</button>
        </div>
      </div>
    </div>
  </div>`;
                updateShow.textContent = `${categoryName} categories`;
                showingOf.textContent = `Showing 1-${filteredData.length} of ${filteredData.length} results`
                mainImage.style.display = "none"
                carousel.style.display = "none"
    })
    })}

// MEN'S CATEGORY
mensBtn.addEventListener("click", function () {
  fetchCategory("Men's clothing", "https://fakestoreapi.com/products/")
});

// WOMEN'S CATEGORY
womensBtn.addEventListener("click", function () {
 fetchCategory("Women's clothing","https://fakestoreapi.com/products/")
});

// JEWERELY CATEGORY
jeweleryBtn.addEventListener("click", function () {
 fetchCategory("jewelery", "https://fakestoreapi.com/products/") 
});

// ELECTRONICS CATEGORY
electBtn.addEventListener("click", function () {
  fetchCategory("electronics", "https://fakestoreapi.com/products/")
});

// COUNT
function count() {
  let count = document.getElementById("count");
  let cartArr = JSON.parse(localStorage.getItem("item")) || [];
  count.textContent = cartArr.length;
  // console.log(cartArr);
}
count();

// UPDATE TOTAL
function updateTotal() {
  let cartTotal = 0;
  let totalBill = document.getElementById("totalBill");
  let gotten = JSON.parse(localStorage.getItem("item"));
  // console.log(gotten);
  if(gotten){
  gotten.forEach((element) => {
    // console.log(element);
    cartTotal += element.total;
    totalBill.textContent = `$ ${cartTotal.toFixed(2)}`;
  });
  }

  // console.log(cartTotal);
}
updateTotal();




// ACCOUNT

let accountBtn = document.getElementById("accountBtn");
let signUpPage = document.getElementById("signUpPage");

accountBtn.addEventListener("click", function(){
  signUpPage.classList.toggle("signUpPageDiv");
 
})



// SIGN IN

let signInBtn = document.getElementById("signInBtn");

signInBtn.addEventListener("click", function(){
  window.location.href = "signup.html";
})

let signAccountBtn = document.getElementById("signAccountBtn");

signAccountBtn.addEventListener("click", function(){
  window.location.href = "signup.html";
})

let ordersBtn = document.getElementById("ordersBtn");

ordersBtn.addEventListener("click", function(){
  window.location.href = "cart.html"
})


let checkoutBtn = document.getElementById("checkoutBtn");
checkoutBtn.addEventListener("click", function(){
  window.location.href = "cart.html"
})

// SEARCH BUTTON

let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", performSearch);

function performSearch(){
screen.innerHTML = "";
  let searchValue = searchInput.value.trim().toLowerCase();

  fetch("https://fakestoreapi.com/products/")
  .then((res) => res.json())
  .then((json) => { 
    for (let i = 0; i < json.length; i++) {
      const element = json[i];
      console.log(element);

      if(element.title.toLowerCase().includes(searchValue) || element.description.toLowerCase().includes(searchValue) || element.category.toLowerCase().includes(searchValue)){
        screen.innerHTML += `
        <div class="itemContainer">
      <div class="item" onclick="btnOpen(${element.id})" data-bs-toggle="modal" data-bs-target="#exampleModal-${element.id}">
    <img src="${element.image}" class="img" />
    <p class="title"> ${element.title}</p>
    <div class="priceCart">
    <p class="price">$${element.price}</p>
    </div>
    </div>
    </div>
    </div>

    <div class="modal fade" id="exampleModal-${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
        <h1>Description</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="screen3">
        <img src="${element.image}" class="img" />
        <p class="title"> ${element.title}</p>
        <p class="price">$${element.price}</p>
        <p class="desc">${element.description}</p>
        <div class="qtyDiv">
          <p class="quantity">Quantity: </p> 
          <div class="sumDiv">
            <button class="minus" onclick="minusBtn(${element.id})">-</button>
            <input type="text" id="inputNum-${element.id}" value="1">
             <button class="plus" onclick="plusBtn(${element.id})">+</button>
          </div>
        </div>
        </div>
        <div class="modal-footer">
        <button class="buyBtn" onclick="buyBtn(${element.id})"><span class="material-symbols-outlined">
        add_shopping_cart
        </span>ADD TO CART</button>
        </div>
      </div>
    </div>
  </div>`
      }
    }});
  }





