const template = document.querySelector ('#template');
const cardList = document.querySelector ('.basket__cards');

function createCard (element) {
    const item = template.content.cloneNode(true);
    const itemImage = item.querySelector ('.basket__image');
    
    item.querySelector ('.basket__card-header').textContent = element.name

    if (element.size == "") {
        item.querySelector ('.basket__size').textContent = element.size
    } else {item.querySelector ('.basket__size').textContent = "Размер:" + element.size};

    if (element.color == "") {
        item.querySelector ('.basket__color').textContent = element.color
    } else {item.querySelector ('.basket__color').textContent = "Цвет:" + element.color};

    item.querySelector ('.basket__storage').textContent = element.storage

    item.querySelector ('.basket__seller').textContent = element.seller

    itemImage.src = element.image

    itemImage.alt = element.name
  
    return item; 
}

function renderCard(element) {
    if (element.quantity == 0){
      console.log("написать код вместо этого вызова консоли")
    } else {
      cardList.append(createCard(element));
    }
} 

cards.forEach ((element) => {
    renderCard (element);
});
