export function saveLocalstorage(name, data) {
  localStorage.setItem(`${name}`, JSON.stringify(data));
}

export function displayCards(cards) {
  let cardsWrapper = document.querySelector(".cards-wrapper");
  let btnTotal = document.querySelector(".btn-total");
  let priceTotal = document.querySelector(".price-total-number");
  let html = "";
  if (!cards.length) {
    cardsWrapper.style.border = "none";
    btnTotal.classList.add("btn-disabled");
  }
  let total = cards?.reduce((acc, curr) => {
    return (acc += +curr?.price * +curr?.amount);
  }, 0);
  priceTotal.innerHTML = total;
  cards?.forEach(function (item) {
    let { title, price, description, id, amount } = item;
    html += `
    <div class="product" data-id=${id}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/30/30893.png"
        alt=""
      />
       <div class="product-info">
        <h3>${title}</h3>
          <br />
           <p>
            ${description}
           </p>
            <br />
          <div class="card-number-wrapper">
                  <p class="product-price">${price * amount}$</p>
                  <div data-id=${id}>
                      <button class="btn me-3 btn-minus ${
                        amount == 1 ? "amount-btn-disabled" : ""
                      }">-</button>
                      <p class="product-howmuch">${amount}</p>
                      <button class="btn ms-3 btn-plus">+</button>
                    </div>
                </div>
              </div>
            </div>
        `;
  });
  cardsWrapper.innerHTML = html;
}

export function changeAmount(dataCards){
  let btnMinus = document.querySelectorAll(".btn-minus");
  let btnPlus = document.querySelectorAll(".btn-plus"); 
  btnPlus.forEach(function(item){
    item.addEventListener("click", function(e){
      let id = e.target.closest("[data-id]").dataset.id;
      let card = dataCards.find(item => item.id == id);
      card.amount++;
      saveLocalstorage("cards", dataCards);
      location.reload();
    });
  });
  btnMinus.forEach(function(item){
    item.addEventListener("click", function(e){
      let id = e.target.closest("[data-id]").dataset.id;
      let card = dataCards.find(item => item.id == id);
      card.amount--;
      saveLocalstorage("cards", dataCards);
      location.reload();
    });
  });
}

export function addCard(dataProducts, dataCards) {
  let addBtn = document.querySelectorAll(".buy");
  addBtn.forEach((item) => {
    item.addEventListener("click", function (e) {
      let id = e.target.closest("[data-id]").dataset.id;
      let card = dataProducts.find((item) => item.id == id);
      let unique = dataCards.find((item) => item.id == id);
      if (!unique) {
        dataCards.push(card);
        saveLocalstorage("cards", dataCards);
        location.reload();
      }
    });
  });
}

export function removeCard(dataCards) {
  let removeBtn = document.querySelectorAll(".remove");
  removeBtn.forEach((item) => {
    item.addEventListener("click", function (e) {
      let id = e.target.closest("[data-id]").dataset.id;
      let cards = dataCards.filter((item) => {
        return item.id != id;
      });
      saveLocalstorage("cards", cards);
      location.reload();
    });
  });
}

export function deleteCard(dataProducts, dataCards) {
  let deleteBtn = document.querySelectorAll(".btn-delete");
  deleteBtn.forEach((item) => {
    item.addEventListener("click", function (e) {
      let id = e.target.closest("[data-id]").dataset.id;
      let cardProduct = dataProducts?.filter((item) => {
        return item.id != id;
      });
      let cardCards = dataCards?.filter((item) => {
        return item.id != id;
      });
      saveLocalstorage("products", cardProduct);
      saveLocalstorage("cards", cardCards);
      location.reload();
    });
  });
}

export function editCard(dataProducts, dataCards) {
  let editBtn = document.querySelectorAll(".btn-edit");
  editBtn.forEach((item) => {
    item.addEventListener("click", function (e) {
      let id = e.target.closest("[data-id]").dataset.id;
      let cardfromProduct = dataProducts?.find((item) => {
        return item.id == id;
      });
      let cardfromCards = dataCards?.find((item) => {
        return item.id == id;
      });
      let form = document.querySelector(".editproduct-form");
      form.title.value = cardfromProduct.title;
      form.description.value = cardfromProduct.description;
      form.price.value = cardfromProduct.price;
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        let title = form.title.value;
        let description = form.description.value;
        let price = form.price.value;
        cardfromProduct.title = title;
        cardfromProduct.description = description;
        cardfromProduct.price = price;
        if (cardfromCards) {
          cardfromCards.title = title;
          cardfromCards.description = description;
          cardfromCards.price = price;
        }
        saveLocalstorage("products", dataProducts);
        saveLocalstorage("cards", dataCards);
        location.reload();
      });
    });
  });
}
