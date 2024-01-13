const menuEl = document.getElementById("menu-render");

export function renderMenu(array) {
  array.forEach(function (food) {
    menuEl.innerHTML += `
  <div class = 'menu-container'>  
    <div class = 'menu-item'>
      <p class= 'emoji'>${food.emoji}</p>
      <div class= 'food-properties'>
        <p class= 'food-title'>${food.name}</p>
        <p class= 'ingredients'>${food.ingredients}</p>
        <p class= 'price'>$${food.price}</p>
      </div>
      <button class="increment-btn" id=${food.id}>+</button>
    </div>
  </div> 
`;
  });
}
