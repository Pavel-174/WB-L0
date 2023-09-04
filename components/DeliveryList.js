export default class DeliveryList {
    constructor(date, cardSelector) {
      this._title = date;
      this._cardSelector = cardSelector;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.delivery__card')
        .cloneNode(true);

      this._element = cardElement;
    }

    _createCard(initialCards) {
      this.liEl = document.createElement('li');
      this.liEl.setAttribute('class', 'delivery__card-image');
    
      this.imageEl = document.createElement('img');
      this.imageEl.setAttribute('class', 'delivery__image');
      this.imageEl.src = initialCards.image;
      this.imageEl.alt = initialCards.name;

      this.quantityEl = document.createElement('span');
      this.quantityEl.textContent = initialCards.buyQuantity;
      initialCards.buyQuantity < 2 ? this.quantityEl.setAttribute('class', 'delivery__quantity_hidden') : this.quantityEl.setAttribute('class', 'delivery__quantity');
    
      this.liEl.append(this.quantityEl, this.imageEl);
    
      this.listEl = this._element.querySelector('.delivery__image-list');
      this.listEl.append(this.liEl);
    }

    _createImages() {
      for (const initialCard of initialCards) {
        this._title == initialCard.deliveryDate & initialCard.checked == true ? this._createCard(initialCard) : null;
        this._title == initialCard.deliveryDate2 & initialCard.checked == true ? this._createCard(initialCard) : null;
      }
    }
  
    generateCard() {

      this._getTemplate();
  
      this._date = this._element.querySelector('.delivery__date');

      this._createImages();

      this._date.textContent = this._title;
  
      return this._element.querySelectorAll('.delivery__image').length > 0 ? this._element : "";
    }
  }