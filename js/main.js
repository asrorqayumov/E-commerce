import { addOpen, removeOpen, toggleCardModal, toggleModal } from "./plugins";
import {
  saveLocalstorage,
  displayProducts,
  displayBadge,
  createProduct,
} from "./product";
import { displayCards, addCard, removeCard, productChangeNumber, deleteCard, editCard } from "./cards";
let dataProducts = [...(JSON.parse(localStorage.getItem("products")) || [])];
let dataCards = [...(JSON.parse(localStorage.getItem("cards")) || [])];

document.addEventListener("DOMContentLoaded", () => {
  displayBadge(dataCards);
  if (location.pathname === "/index.html" || location.pathname === "/") {
    displayProducts(dataProducts, dataCards);
    toggleModal();
    addOpen();
    removeOpen();
    createProduct(dataProducts);
    addCard(dataProducts, dataCards);
    removeCard(dataCards);
    deleteCard(dataProducts, dataCards);
    editCard(dataProducts, dataCards);
    toggleCardModal();
  }
  if (location.pathname === "/card.html") {
    displayCards(dataCards);
  }
});
