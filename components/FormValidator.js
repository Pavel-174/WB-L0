class FormValidator {
    constructor(settings, formElement) {
  
      this._inputSelector = settings.inputSelector;
      // this._submitButtonSelector = settings.submitButtonSelector;
      this._errorInput = settings.errorInput;
  
      this._formElement = formElement;
  
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    _validMail() {
      const _errorElement = this._formElement.querySelector(`#buyer_email-error`);
      const re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
      const myMail = this._formElement.querySelector('#buyer_email').value;
      const valid = re.test(myMail);
      if (valid) _errorElement.textContent = '';
      else if (myMail == '') _errorElement.textContent = 'Укажите электронную почту';
      else _errorElement.textContent = 'Проверьте адрес электронной почты';
      return valid;
    }

    _validPhone() {
      const _errorElement = this._formElement.querySelector(`#buyer_phone-error`);
      const re = /^[\d]{1}\ \[\d]{2,3}\\ [\d]{2,3} [\d]{2,3} [\d]{2,3}$/;
      const myPhone = this._formElement.querySelector('#buyer_phone').value;
      const valid = re.test(myPhone);
      if (valid) _errorElement.textContent = '';
      else if (myPhone == '') _errorElement.textContent = 'Укажите номер телефона' ;
      else _errorElement.textContent = 'Формат: +9 999 999 99 99';
      return valid;
    }  

    _showInputError = (inputElement) => {
      const _errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    
      inputElement.classList.add(this._errorInput);

      this._formElement.querySelector(`#buyer_name-error`) == _errorElement ? _errorElement.textContent = 'Укажите имя' : null;

      this._formElement.querySelector(`#buyer_surname-error`) == _errorElement ? _errorElement.textContent = 'Введите фамилию' : null;

      this._validPhone();

      this._validMail();
    };
  
    _hideInputError = (inputElement) => {
      const _errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  
      inputElement.classList.remove(this._errorInput);
      _errorElement.textContent = '';
    };
  
    _hasInvalidInput () {
      return this._inputList.some((input) => {
        return !input.validity.valid;
      });
    };
  
    _setEventListeners () {
      this._inputList.forEach((inputElement) => {
        inputElement.value ? this._checkInputValidity(inputElement) : '';
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
        });
      });
    };
  
    _checkInputValidity = (inputElement) => {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    };
  
    hideInputErrors() {
      this._inputList.forEach(input => this._hideInputError(input));
    }
  
    enableValidation() {
      this._formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
  
      this._setEventListeners();
    };
    
    resetValidation() {
      this._inputList.forEach(() => {
        this.hideInputErrors()
      });
    }
  }
  
  export {FormValidator}