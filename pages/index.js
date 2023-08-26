// import './index.css';
import Card from "../components/Card.js";
import Section from "../components/Section.js";

const cardList = '.basket__cards';

const createCard = (item) => {
    const card = new Card(item, "#template");
    
    const cardElement = card.generateCard();
  
    return cardElement;
  };
  
  const cards = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        cards.addItem(createCard(item));
      }
    },
    cardList
  );
  cards.renderItems();

// Вставка даанных в хэдер корзины(колличкство товаров)
let result = initialCards.filter(card => card.quantity > 0);

function renderSpanNumber(result) {
    document.querySelector ('.header__span-number').textContent = result.length
}

renderSpanNumber(result);