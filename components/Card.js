
export default class Card {
    constructor(data, cardSelector) {
      this._title = data.name;
      this._link = data.image;
      this._size = data.size;
      this._color = data.color;
      this._storage = data.storage;
      this._seller = data.seller;
      this._cardSelector = cardSelector;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.basket__card')
        .cloneNode(true);
  
      this._element = cardElement;
    }
  
    //Установка слушателей
    _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
        this._likeCard();
      });
  
      this._deleteButton.addEventListener('click', () => {
        this._deleteCard();
      });
    }
  
    // кнопка like
    _likeCard() {
      this._likeButton.classList.toggle('basket__like_active');
    }
  
    // кнопка Удаления карточек
    _deleteCard() {
      this._element.remove();
      this._element = null;
    }
  
    generateCard() {
      this._getTemplate();

      this._likeButton = this._element.querySelector('.basket__like');
      this._deleteButton = this._element.querySelector('.basket__delete');
      this._cardImage = this._element.querySelector('.basket__image');
      this._cardHeader = this._element.querySelector('.basket__card-header');
      this._cardSize = this._element.querySelector('.basket__size');
      this._cardColor = this._element.querySelector('.basket__color');
      this._cardStorage = this._element.querySelector('.basket__storage');
      this._cardSeller = this._element.querySelector('.basket__seller');
  
      this._cardImage.src = this._link;
      this._cardImage.alt = this._title;
      this._cardHeader.textContent = this._title;
      this._size == "" ? this._cardSize === null: this._cardSize.textContent = "Размер:" + this._size;
      this._color == "" ? this._cardColor === null: this._cardColor.textContent = "Цвет:" + this._color;
      this._cardStorage.textContent = this._storage;
      this._cardSeller.textContent = this._seller;

      this._setEventListeners();
  
      return this._element;
    }
  }