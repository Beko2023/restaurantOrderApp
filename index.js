import { menuArray } from "./data.js";
import { renderMenu } from "./render-menu.js";

const menuEl = document.getElementById("menu-render");
const cartEl = document.getElementById("cart-render");
const orderEl = document.getElementById("order-form");
const paymentStatement = document.getElementById("payment-statement");

//Render Restaurant Menu
renderMenu(menuArray);

//Array of current items
const cart = [];

//Cart total price
let cartTotal = 0;

//Click event to render menu item
menuEl.addEventListener("click", function (e) {
  //Get id of clicked element
  const menuItemId = parseInt(e.target.id);

  //render cart if id's attached to buttons match
  if (menuItemId >= 0 && menuItemId < menuArray.length) {
    renderShoppingCart(menuArray, menuItemId);
  }
});

// Render Shopping Cart
function renderShoppingCart(menu, itemId) {
  cartEl.innerHTML = `
    <div class="shopping-cart" id="shopping-cart">
        <p class="cart-title">Your Order</p>
        <div id="chosen-item">
        </div>
      <div class="total-price">
            <p class= "food-title">Total Cost</p>
            <p class="total-cost" id="total-cost"></p>
      </div>
      <button class="order-btn" id="order-btn">Complete Order</button>
    </div>
    `;

  //update cart array & total price with each click
  cart.push(itemId);
  cartTotal += menu[itemId].price;

  //render clicked items in the cart
  renderItem(cart, menu, itemId);

  document
    .getElementById("chosen-item")
    .addEventListener("click", function (e) {
      //id of clicked element captured
      const menuItemId = parseInt(e.target.id);

      //delete element only if 'remove' is clicked as no other button with specified id below
      if (menuItemId >= 0 && menuItemId < menu.length) {
        //delete element from cart array
        cart.splice(cart.indexOf(menuItemId), 1);
      }

      //remove item price from total price
      cartTotal -= menu[menuItemId].price;

      //clean cart list
      document.getElementById("chosen-item").innerHTML = "";

      //remove shopping cart if cart has no item
      if (cartTotal === 0) {
        document.getElementById("shopping-cart").innerHTML = "";
      }

      //render items in the cart after change
      renderItem(cart, menu, itemId);
    });

  //Pay button clicked, form pops if cart has item
  document.getElementById("order-btn").addEventListener("click", function () {
    if (cart.length > 0) {
      renderForm();
      document.getElementById("order-form").classList.remove("hidden");
    }
  });
}

// Render Item Into Shopping Cart
function renderItem(items, menu, itemId) {
  // For each element in the cart array render item in the cart list
  items.forEach((itemId) => {
    document.getElementById("chosen-item").innerHTML += `
    <div class="item-container">
      <div class="flex-container">
        <p class= "food-title">${menu[itemId].name}</p>
          <button class="remove-btn" id="${itemId}">remove</button>
        </div>
        <div class="flex-container2">
        <p class="price">$${menu[itemId].price}</p>
        </div>
    </div>
    `;
  });
  document.getElementById("total-cost").innerHTML = `$${cartTotal}`;
}

//Render POP UP FORM
function renderForm() {
  document.getElementById("order-form").innerHTML = `
  <h3> Enter Card Details</h3>
  <form id="payment-form">
  <div>
    <input type="text" id="userName" name="name" placeholder="Enter your name" required>
    <input type="text" name="email" placeholder="Enter your card number" required>
    <input type="text" name="cvv" placeholder="Enter CVV" required>
  </div>
    <button type="submit" class="pay-btn" id="pay-btn" data-pay="10">Pay</button>
  </form>
`;
}

orderEl.addEventListener("submit", function (e) {
  e.preventDefault(); //to prevent a submit refresh

  //hiding form after click
  orderEl.style.display = "none";

  //hiding cart after click
  cartEl.style.display = "none";
  //render thank you message
  paymentStatement.innerHTML = `
  Thank you, ${userName.value}! Your order is on its way!`;

  //hide shopping cart
  document.getElementById("payment-statement").classList.remove("hidden");
});
