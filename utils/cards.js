let initialCards = [
    {
        id: 6,
        name: 'Карандаши цветные Faber-Castell "Замок, набор 24 цвета, заточенные, шестигранные, Faber-Castell',
        color: "белый",
        size: "",
        storage: "Коледино WB",
        seller: "OOO Вайлдберриз",
        image: "./images/Frame277132128.jpg",
        price: "494 сом",
        fullPrice: "950 сом",
        quantity: 0,
        buyQuantity: 1,
        checked: false,
        deliveryDate: '',
        deliveryDate2: '',
    },
    {
        id: 5,
        name: "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe",
        color: "прозрачный",
        size: "",
        storage: "Коледино WB",
        seller: "OOO Мегапрофстиль",
        image: "./images/Frame277132129.jpg",
        price: "2 100 047 сом",
        fullPrice: "2 300 047 сом",
        quantity: "0",
        buyQuantity: 200,
        checked: false,
        deliveryDate: '',
        deliveryDate2: '',
    },
    {
        id: 4,
        name: "Футболка UZcotton мужская",
        color: "белый",
        size: "56",
        storage: "Коледино WB",
        seller: "OOO Вайлдберриз",
        image: "./images/Frame3853.jpg",
        price: "522 сом",
        fullPrice: "1051 сом",
        quantity: 0,
        buyQuantity: 1,
        checked: false,
        deliveryDate: '',
        deliveryDate2: '',
    },
    {
        id: 3,
        name: "Футболка UZcotton мужская",
        color: "белый",
        size: "56",
        storage: "Коледино WB",
        seller: "OOO Вайлдберриз",
        image: "./images/Frame3853.jpg",
        price: "522 сом",
        fullPrice: "1051 сом",
        quantity: 2,
        buyQuantity: 1,
        checked: true,
        deliveryDate: '5—6 февраля',
        deliveryDate2: '',
    },
    {
        id: 2,
        name: "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe",
        color: "прозрачный",
        size: "",
        storage: "Коледино WB",
        seller: "OOO Мегапрофстиль",
        image: "./images/Frame277132129.jpg",
        price: "2 100 047 сом",
        fullPrice: "2 300 047 сом",
        quantity: "201",
        buyQuantity: 200,
        checked: true,
        deliveryDate: '5—6 февраля',
        deliveryDate2: '6—7 февраля',
    },
    {
        id: 1,
        name: 'Карандаши цветные Faber-Castell "Замок, набор 24 цвета, заточенные, шестигранные, Faber-Castell',
        color: "белый",
        size: "",
        storage: "Коледино WB",
        seller: "OOO Вайлдберриз",
        image: "./images/Frame277132128.jpg",
        price: "494 сом",
        fullPrice: "950 сом",
        quantity: 1,
        buyQuantity: 1,
        checked: true,
        deliveryDate: '5—6 февраля',
        deliveryDate2: '',
    },
]

//сортировка массива по уникальному значению

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