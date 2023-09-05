class FormValidator {
    constructor(settings, formElement) {
  
      this._inputSelector = settings.inputSelector;
      // this._submitButtonSelector = settings.submitButtonSelector;
      this._errorInput = settings.errorInput;
  
      this._formElement = formElement;
  
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }
  
    _showInputError = (inputElement) => {
      const _errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    
      inputElement.classList.add(this._errorInput);

      this._formElement.querySelector(`#buyer_name-error`) == _errorElement ? _errorElement.textContent = 'Укажите имя' : null;

      this._formElement.querySelector(`#buyer_surname-error`) == _errorElement ? _errorElement.textContent = 'Введите фамилию' : null;

      this._formElement.querySelector('#buyer_email-error') == _errorElement ? _errorElement.textContent = 'Укажите электронную почту' : null;

      this._formElement.querySelector('#buyer_phone-error') == _errorElement ? _errorElement.textContent = 'Укажите номер телефона' : null;
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