// import './index.css';
import Card from "../components/Card.js";
import Section from "../components/Section.js";

const activeCardList = '.basket__cards';
const inactiveCardList = '.basket__cards-missed';
let result = initialCards.filter(card => card.quantity > 0);
let quantity = initialCards.filter(card => card.quantity == 0);

const createActiveCard = (item) => {
  const activeCard = new Card(item, "#template");
    
  const cardElement = activeCard.generateCard();
  
  return cardElement;
};

const createInactiveCard = (item) => {
  const inactiveCard = new Card(item, "#template2");
    
  const cardElement = inactiveCard.generateCard();
  
  return cardElement;
};
  
const activeCards = new Section(
  {
    items: initialCards.filter(card => card.quantity > 0),
    renderer: (item) => {
      activeCards.addItem(createActiveCard(item));
    }
  },
  activeCardList
);

const inactiveCards = new Section(
  {
    items: initialCards.filter(card => card.quantity == 0),
    renderer: (item) => {
      inactiveCards.addItem(createInactiveCard(item));
    }
  },
  inactiveCardList
);

activeCards.renderItems();
inactiveCards.renderItems();

// Вставка даанных в хэдер корзины(колличкство товаров)

function renderSpanNumber(result) {
  document.querySelector ('.header__span-number').textContent = result.length
}

renderSpanNumber(result);

//Вставка колличества отсутствующих товаров

function renderMissedItemNumber(quantity) {
  document.querySelector ('.basket__missed-items').textContent = "Отсутствуют · " + quantity.length + " товара"
}

renderMissedItemNumber(quantity);

//переключатель чекбоксов (чекбокс выбрать все) Чекбокс вызывает событие onClick у всех чекбоксов. Само событие onClick обрабатывается в классе Card

const mainCheckbox = document.getElementById('selectAll');
const checkboxes = document.getElementsByName('checkbox');

mainCheckbox.onclick = function() {
  for (const checkbox of checkboxes) {
    let evt = document.createEvent("HTMLEvents"); 
    
    checkbox.checked = this.checked;
    evt.initEvent('click', true, true ); 
    checkbox.dispatchEvent(evt);
  }
}