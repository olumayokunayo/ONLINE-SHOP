let screen = document.getElementById("show");
let gotten = JSON.parse(localStorage.getItem("item"));
let screen2 = document.getElementById("show2");
let totalAmount = document.getElementById("totalAmount");

// let cartArr = JSON.parse(localStorage.getItem("item"));
// console.log(gotten);

let checkoutButton;

function show() {
  // Clear the screen
  screen.innerHTML = "";
  screen2.innerHTML = "";

  // Calculate the total price of all items in the cart
  let totalPrice = 0;
  gotten.forEach((element) => {
    totalPrice += element.total;
  });

  // Create the table header
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `
    <th>Image</th>
    <th>Name</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Total</th>
    <th></th>
  `;

  // Create the table body
  const body = document.createElement("tbody");

  // Add a row to the table body for each item in the cart
  gotten.forEach((item, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img class="tableImg" src="${item.image}"></td>
      <td class="tableName">${item.name}</td>
      <td>${item.price}</td>
      <td>
        <button class="minus" onclick="updateQuantity(${i}, parseInt(gotten[${i}].quantity) - 1)"><ion-icon name="remove-outline"></ion-icon></button>
        <span class="quantity">${item.quantity}</span>
        <button class="plus" onclick="updateQuantity(${i}, parseInt(gotten[${i}].quantity) + 1)"><ion-icon name="add-outline"></ion-icon></button>
      </td>
      <td class="total">${item.total}</td>
      <td><button class="del" onclick="delBtn(${i})"><ion-icon name="trash-outline"></ion-icon></button></td>
    `;
    body.appendChild(row);
  });

  // Add the header and body to the table
  const table = document.createElement("table");
  table.appendChild(headerRow);
  table.appendChild(body);

  // Generate the Checkout button with the total price
  checkoutButton = document.createElement("button");
  checkoutButton.className = "chkBtn";
  checkoutButton.type = "button";
  checkoutButton.id = "start-payment-button";
  checkoutButton.innerText = `CHECKOUT ($${totalPrice.toFixed(2)})`;
  checkoutButton.onclick = () => makePayment(totalPrice);

  // Add the table and Checkout button to the screen
  screen.appendChild(table);
  screen2.appendChild(checkoutButton);
}

show();

// Update the quantity and total when the "minus" or "plus" buttons are clicked
function updateQuantity(index, quantity) {
  // Ensure that the quantity value is coerced to a number
  quantity = Number(quantity);
  
  gotten[index].quantity = quantity;
  gotten[index].total = gotten[index].price * quantity;
  const quantityEl = document.querySelectorAll(".quantity")[index];
  quantityEl.innerText = quantity;
  const totalEl = document.querySelectorAll(".total")[index];
  totalEl.innerText = gotten[index].total.toFixed(2);
  // Recalculate the total price and update the Checkout button text
  totalPrice = 0;
  gotten.forEach((element) => {
    totalPrice += element.total;
  });
  checkoutButton.innerText = `CHECKOUT ($${totalPrice.toFixed(2)})`;
}



function delBtn(i) {
  gotten.splice(i, 1);
  localStorage.setItem("item", JSON.stringify(gotten));
  show();
  window.location.reload();
}

let deleteAllBtn = document.getElementById("deleteAllBtn");
deleteAllBtn.addEventListener("click", function (i) {
  gotten.splice(0, gotten.length);
  totalAmount.textContent = 0;
  localStorage.setItem("item", JSON.stringify(gotten));
  // console.log(gotten);
  show();
});

function makePayment() {
  FlutterwaveCheckout({
    public_key: "FLWPUBK_TEST-6c3a121802519ac79b4fb996f904f56c-X",
    tx_ref: "titanic-48981487343MDI0NzMx",
    amount: totalPrice,
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
      title: "Rad Commerce",
      description: "Payment for an awesome cruise",
      logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
    },
  });
}
let totalPrice = 0;
  gotten.forEach((element) => {
    totalPrice += element.total;
  });


// BACK TO HOME

let backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", function () {
  window.location.href = "index.html";
});

