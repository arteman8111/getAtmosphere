import { getHeight } from './utils.js';
import { getAcceleration } from './utils.js';
import { getTemperature } from './utils.js';
import { getPressure } from './utils.js';
import { getDensity } from './utils.js';
import { getSpeed } from './utils.js';

// Функция ввода высоты 
let form = document.querySelector('.form');
let formInput = document.querySelector('.form__input');
// Шаблон для вывода
let formTemplate = document.querySelector('#template').content;
let formInputTemplate = formTemplate.querySelector('.boxConstant')
// бокс, где отображается значение вывода
let getValue = document.querySelector('.block__value_1')

// Cоздание вывода значения
form.addEventListener('submit', function (evt) {
    evt.preventDefault();  // Отменяем отправку формы;

    // Получаем текст из поля
    let valueText = Number(formInput.value);

    // Клониурем шаблон вывода
    let valueBox = formInputTemplate.cloneNode(true);
    let valueIndex = valueBox.querySelectorAll('.valueIndex');
    let valueConstant = valueBox.querySelectorAll('.valueConstant');
    let titleHeight = valueBox.querySelector('.titleHeight');
    let boxValue = valueBox.querySelectorAll('.boxValue')

    // Записываем входное значение
    titleHeight.textContent = valueText;

    // Записываем геопотенциальную высоту
    valueConstant[0].textContent = getHeight(valueText).height;
    if (!getHeight(valueText).index == 0) {
        valueIndex[0].textContent = getHeight(valueText).index;
    } else {
        boxValue[0].textContent = ''
    };

    // Записываем ускорение свободного падения
    valueConstant[1].textContent = getAcceleration(valueText);

    // Записываем температуру
    valueConstant[2].textContent = getTemperature(valueText).value;

    // Записываем давление
    valueConstant[3].textContent = getPressure(valueText).value;
    if (!getPressure(valueText).index == 0) {
        valueIndex[1].textContent = getPressure(valueText).index;
    } else {
        boxValue[1].textContent = ''
    };

    // Записывем плотность
    valueConstant[4].textContent = getDensity(valueText).value;
    if (!getDensity(valueText).index == 0) {
        valueIndex[2].textContent = getDensity(valueText).index;
    } else {
        boxValue[2].textContent = ''
    };

    // Записываем скорость звука
    valueConstant[5].textContent = getSpeed(valueText);

    //Добавляем это на страницу
    getValue.append(valueBox);
    valueBox.scrollIntoView({behavior: "smooth"});
    // Чистим содержимое поля ввода 
    formInput.value = '';
})