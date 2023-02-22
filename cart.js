let screen = document.getElementById("show");
let gotten = JSON.parse(localStorage.getItem("item"));
let screen2 = document.getElementById("show2");
let totalAmount = document.getElementById("totalAmount");

// let cartArr = JSON.parse(localStorage.getItem("item"));
console.log(gotten);

function show() {
  screen.innerHTML = "";
  gotten.forEach((item, i) => {
    screen.innerHTML += `<div class="cart-item">
             <img class="image" src="${item.image}">
             <p class="title">${item.name}</p>
             <p class="price">${item.price}</p>
             <p class="quantity">${item.quantity}</p>
             <p class="total">${item.total}</p>
             <button onclick="delBtn(${i})"><ion-icon name="trash-outline"></ion-icon></button>
           </div>`;

    screen2.innerHTML = `<button
           type="button"
           id="start-payment-button"
           onclick="makePayment(${item.price})"
         >
           Pay Now
         </button>`;
  });
}
show();

function delBtn(i) {
  gotten.splice(i, 1);
  localStorage.setItem("item", JSON.stringify(gotten));
  show();
}

let deleteAllBtn = document.getElementById("deleteAllBtn");
deleteAllBtn.addEventListener("click", function (i) {
  gotten.splice(0, gotten.length);
  totalAmount.textContent = 0;
  localStorage.setItem("item", JSON.stringify(gotten));
  console.log(gotten);
  show();
});

function makePayment() {
  FlutterwaveCheckout({
    public_key: "FLWPUBK_TEST-6c3a121802519ac79b4fb996f904f56c-X",
    tx_ref: "titanic-48981487343MDI0NzMx",
    amount: cartTotal,
    currency: "USD",
    payment_options: "card, mobilemoneyghana, ussd",
    redirect_url: "https://index.html",
    meta: {
      consumer_id: 23,
      consumer_mac: "92a3-912ba-1192a",
    },
    customer: {
      email: "rose@unsinkableship.com",
      phone_number: "08102909304",
      name: "Rose DeWitt Bukater",
    },
    customizations: {
      title: "RADDEST SHOP",
      description: "Payment for an awesome cruise",
      logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
    },
  });
}

// TOTAL
let cartTotal = 0;
gotten.forEach((element) => {
  cartTotal += element.total;
  totalAmount.textContent = `TOTAL: $ ${cartTotal}`;
});
console.log(cartTotal);
