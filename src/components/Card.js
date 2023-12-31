import { deliveryCards } from "../pages/index.js";
import { renderResultData } from "../pages/index.js";
import { initialCards } from "../utils/cards.js";

export default class Card {
    constructor(data, cardSelector) {
      this._title = data.name;
      this._link = data.image;
      this._size = data.size;
      this._color = data.color;
      this._storage = data.storage;
      this._seller = data.seller;
      this._buyQuantity = data.buyQuantity;
      this._quantity = data.quantity;
      this._price = data.price;
      this._fullPrice = data.fullPrice;
      this._id = data.id;
      this._checked = data.checked;
      this._deliveryDate = data.deliveryDate;
      this._deliveryDate2 = data.deliveryDate2;
      this._deliveryQuantity = data.deliveryQuantity;
      this._deliveryQuantity2 = data.deliveryQuantity2;
      this._totalPrice = data.totalPrice;
      this._totalFullPrice = data.totalFullPrice;
      this._cardSelector = cardSelector;
    }
    
    //клонируем template каротчки
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.basket__card')
        .cloneNode(true);

      this._element = cardElement;
    }

    //обновление данных в массиве
    _rewriteArray() {
      const index = initialCards.findIndex((el) => el.id === this._id);

      initialCards[index] = {
        id: this._id,
        name: this._title,
        color: this._color,
        size: this._size,
        storage: this._storage,
        seller:  this._seller,
        image: this._link,
        price: this._price,
        fullPrice: this._fullPrice,
        quantity: this._quantity,
        buyQuantity: this._buyQuantity,
        checked: this._checked,
        deliveryDate: this._deliveryDate,
        deliveryDate2: this._deliveryDate2,
        deliveryQuantity: this._deliveryQuantity,
        deliveryQuantity2: this._deliveryQuantity2,
        totalPrice: this._totalPrice,
        totalFullPrice: this._totalFullPrice,
      };
      initialCards;
    }

    //удаление всех карточек
    _removeCards() {
      const arr = document.querySelectorAll('.delivery__card')
      arr.forEach(element => {
        element.remove();
        element = null;
      });
    }

    // установка цен
    _changePrices() {
      this._quantity > 0 ? this._cardPrice.textContent = (this._price * this._buyQuantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' сом' : null;
      this._quantity > 0 ? this._cardFullPrice.textContent = (this._fullPrice * this._buyQuantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' сом' : null;
      this._quantity > 0 ? this._cardPriceBig.textContent = (this._price * this._buyQuantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' сом' : null;
      this._quantity > 0 ? this._cardFullPriceBig.textContent = (this._fullPrice * this._buyQuantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' сом' : null;
      this._totalPrice = this._price * this._buyQuantity;
      this._totalFullPrice = this._fullPrice *  this._buyQuantity;
    }

    //Установка слушателей
    _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
        this._likeCard();
      });
  
      this._deleteButton.addEventListener('click', () => {
        this._deleteCard();
      });

      this._quantity > 0 ? this._incrementButton.addEventListener('click', () => {
        this._incrementQuantity();
      }) : null;

      this._quantity > 0 ? this._decrementButton.addEventListener('click', () => {
        this._decrementQuantity();
      }) : null;

      this._quantity > 0 ? this._checkbox.addEventListener('click', () => {
        this._checkboxTumbler();
      }) : null;
    }

    //чекбокс
    _checkboxTumbler() {
      this._checkbox.checked == true ? this._checked = true : this._checked = false;

      this._rewriteArray();

      this._removeCards();

      deliveryCards.renderItems();

      renderResultData();
    }
  
    // кнопка like
    _likeCard() {
      this._likeButton.classList.toggle('basket__like_active');
    }
  
    // кнопка Удаления карточек
    _deleteCard() {
      const index = initialCards.map(x => {return x.Id;}).indexOf(this._id);
      initialCards.splice(index, 1);
      let result = initialCards.filter(card => card.quantity > 0);
      let quantity = initialCards.filter(card => card.quantity == 0);

      this._element.id = initialCards.id ? initialCards.filter(card => card.id != this._element.id) : null;
      
      this._element.remove();
      this._element = null;
      
      document.querySelector ('.header__span-number').textContent = result.length;
      quantity.length == 0 ? 
      ( document.querySelector ('.basket__missed-items').textContent = " " ) : 
      ( document.querySelector ('.basket__missed-items').textContent = "Отсутствуют · " + quantity.length + " товара" ); 
      
      result.length == 0 ? document.querySelector('.basket__check-all').classList.add('basket__check-all_hide') : null;

      this._removeCards();

      deliveryCards.renderItems();

      renderResultData();
    }

    // активное и неактивное состояние у кнопок + и-
    _toggleButtonsCondition() {
      this._buyQuantity == this._quantity ? this._incrementButton.disabled = true : this._incrementButton.disabled = false;
      this._buyQuantity == 1 ? this._decrementButton.disabled = true : this._decrementButton.disabled = false;
    }

    //добавить колличество заказываемых товаров
    _incrementQuantity() {
      this._buyQuantity = this._buyQuantity + 1;
      this._cardQuantity.textContent = this._buyQuantity;

      this._toggleButtonsCondition();
      
      this._deliveryQuantity2 > 0 ? this._deliveryQuantity2 = this._deliveryQuantity2 + 1 : this._deliveryQuantity2;
      this._deliveryQuantity2 == 0 || '' ? this._deliveryQuantity = this._deliveryQuantity + 1 : this._deliveryQuantity;
      
      this._changePrices();

      this._rewriteArray();

      this._removeCards();

      deliveryCards.renderItems();

      renderResultData();
    }

    //уменьшить колличество заказываемых товаров
    _decrementQuantity() {
      this._buyQuantity = this._buyQuantity - 1;
      this._cardQuantity.textContent = this._buyQuantity;

      this._toggleButtonsCondition()

      this._deliveryQuantity2 == 0 || '' ? this._deliveryQuantity = this._deliveryQuantity - 1 : this._deliveryQuantity;
      this._deliveryQuantity2 > 0 ? this._deliveryQuantity2 = this._deliveryQuantity2 - 1 : this._deliveryQuantity2;
    
      this._changePrices();

      this._rewriteArray();

      this._removeCards();

      deliveryCards.renderItems();

      renderResultData();
    }
  
    //ыункция создания карточки
    generateCard() {
      this._getTemplate();
      
      this._likeButton = this._element.querySelector('.basket__like');
      this._deleteButton = this._element.querySelector('.basket__delete');
      this._incrementButton = this._element.querySelector('.basket__quantity-btn__increment');
      this._decrementButton = this._element.querySelector('.basket__quantity-btn__decrement');
      this._cardImage = this._element.querySelector('.basket__image');
      this._cardHeader = this._element.querySelector('.basket__card-header');
      this._cardSize = this._element.querySelector('.basket__size');
      this._cardSizeSmall = this._element.querySelector('.basket__size-small');
      this._cardColor = this._element.querySelector('.basket__color');
      this._cardStorage = this._element.querySelector('.basket__storage');
      this._cardSeller = this._element.querySelector('.basket__seller');
      this._cardQuantity = this._element.querySelector('.basket__buy-quantity');
      this._cardPrice = this._element.querySelector('.basket__price');
      this._cardFullPrice = this._element.querySelector('.basket__full-price');
      this._cardPriceBig = this._element.querySelector('.basket__price_big');
      this._cardFullPriceBig = this._element.querySelector('.basket__full-price_big');
      this._cardMistake =  this._element.querySelector('.basket__mistake');
      this._checkbox = this._element.querySelector('.basket__checkbox');
  
      this._cardImage.src = this._link;
      this._cardImage.alt = this._title;
      this._cardHeader.textContent = this._title;
      this._size == "" ? this._cardSize === null : this._cardSize.textContent = "Размер:" + this._size;
      this._size == "" ? this._cardSizeSmall.classList.add('basket__size-small_hidden') : this._cardSizeSmall.textContent = this._size;
      this._color == "" ? this._cardColor === null : this._cardColor.textContent = "Цвет:" + this._color;
      this._quantity > 0 ? this._cardStorage.textContent = this._storage : null;
      this._quantity > 0 ? this._cardSeller.textContent = this._seller : null;
      this._quantity > 0 ? this._cardQuantity.textContent = this._buyQuantity : null;
      this._quantity > 0 ? ( this._quantity < 5 ? this._cardMistake.textContent = "Осталось " + this._quantity + " шт." : this._cardMistake === null ) : null;

      this._changePrices();

      this._rewriteArray();

      renderResultData();

      this._quantity > 0 ? this. _toggleButtonsCondition() : null;

      this._setEventListeners();
  
      return this._element;
    }
  }