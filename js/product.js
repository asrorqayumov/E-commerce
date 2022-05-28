export function saveLocalstorage(name, data) {
  localStorage.setItem(`${name}`, JSON.stringify(data));
}

export function toLowercase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function Card(title, price, description) {
  this.title = title;
  this.price = price;
  this.description = description;
  this.id = Math.round(Math.random() * 1000000);
  this.number = 1;
}

export function haveCard(id, dataCards) {
  let card = dataCards.find((item) => item?.id == id);
  return card ? true : false;
}

export function displayProducts(dataProducts, dataCards) {
  let productsWrapper = document.querySelector(".products-wrapper");
  let html = "";
  let modalHtml = ` 
  <div class="card-modal-overlay">
  <div class="modal-container">
    <button class="close-btn close-btn-top">
      <i class="fas fa-times"></i>
    </button>
    <form action="" class="editproduct-form">
      <p class="py-4 modal-title">Edit product</p>
      <div class="group my-5">
        <input required name="title" type="text" class="input" />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Title</label>
      </div>
      <div class="group my-5">
        <input  required name="price" type="number" class="input" />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Price</label>
      </div>
      <div class="group">
        <textarea
          required
          class="textarea my-5"
          placeholder="Description"
          name="description"
        ></textarea>
      </div>
      <button class="btn btn-submit my-5">Edit</button>
    </form>
  </div>
</div>
  `;

  dataProducts?.forEach(function (item) {
    let { title, price, description, id } = item;
    let isCard = haveCard(id, dataCards);
    html += `
    <div class="card my-5" data-id=${id}>
    <div class="card-container">
      <div class="top"></div>
      <div class="bottom ${isCard ? `clicked` : ""}">
        <div class="left">
          <div class="details">
            <h4 class="">${toLowercase(title)}</h4>
            <p class="price">${price}$</p>
          </div>
          <div class="buy" data-id=${id}>
            <i class="fa-solid fa-cart-plus"> </i>
          </div>
        </div>
        <div class="right">
          <div class="done"><i class="material-icons">done</i></div>
          <div class="details">
            <h4 class="pt-1"> ${toLowercase(title)}  Added</h4>
          </div>
          <div class="remove" data-id=${id}><i class="material-icons">clear</i></div>
        </div>
      </div>
    </div>
    <div class="inside">
      <div class="icon"><i class="material-icons">info_outline</i></div>
      <div class="contents">
        <p class="description">
          ${description ? description : ""}
        </p>
        <div class="btn-group" data-id=${id} >
          <button class="btn btn-edit me-3 card-modal-btn"><i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
    </div>
  </div>
      `;
  });
   productsWrapper.innerHTML = modalHtml + html;
}

export function displayBadge(dataCards) {
  let badge = document.querySelectorAll(".badge");
  badge.forEach((item) => {
    item.innerHTML = dataCards.length
      ? dataCards.length
      : (item.style.display = "none");
  });
}

export function createProduct(dataProducts) {
  let form = document.querySelector(".addproduct-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let card = new Card(
      form.title.value,
      form.price.value,
      form.description.value
    );
    dataProducts.push(card);
    saveLocalstorage("products", dataProducts);
    location.reload();
    displayProducts(dataProducts);
  });
}
