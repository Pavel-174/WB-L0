// import './index.css';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import DeliveryList from "../components/DeliveryList.js";
import { FormValidator} from "../components/FormValidator.js";

const activeCardList = '.basket__cards';
const inactiveCardList = '.basket__cards-missed';
const deliveryList = '.delivery__cards';
const formBuyerElement = document.querySelector ('.buyer__form');

let result = initialCards.filter(card => card.quantity > 0);
let quantity = initialCards.filter(card => card.quantity == 0);

const settings = {
  inputSelector: '.buyer__input',
  submitButtonSelector: '',
  // inactiveButtonClass: '',
  // activeButtonClass: '',
  errorInput: 'buyer__input_error'
};

//сортировка массива по уникальному значению дат доставки

let dates = initialCards.map(item => item.deliveryDate);
let dates2 = initialCards.map(item => item.deliveryDate2);
let deliveryDates = dates.concat(dates2);

function sort_unique(arr) {
  if (arr.length === 0) return arr;
  arr = arr.sort(function (a, b) { return a*1 - b*1; });
  let ret = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i-1] !== arr[i]) {
      ret.push(arr[i]);
    }
  }
  return ret;
}

let uniqueDeliveryDates = sort_unique(deliveryDates);

//создание карточек

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

const createDeliveryCard = (item) => {
  const deliveryCard = new DeliveryList(item, "#template3");
    
  const cardElement = deliveryCard.generateCard();
  
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

export const deliveryCards = new Section(
  {
    items: uniqueDeliveryDates.filter(card => card !== ''),
    renderer: (item) => {
      deliveryCards.addItem(createDeliveryCard(item));
    }
  },
  deliveryList
);

activeCards.renderItems();
inactiveCards.renderItems();
deliveryCards.renderItems();

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
  const arr = document.querySelectorAll('.delivery__card')
  arr.forEach(element => {
    element.remove();
    element = null;
  });

  deliveryCards.renderItems();
}

// включение валидации
const validateBuyer = new FormValidator(settings, formBuyerElement);
// document.querySelector('').onclick(validateBuyer.enableValidation());
validateBuyer.enableValidation();