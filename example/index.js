const MultiSelect = require('../lib/index.js');

const btnGetValue = document.querySelector('.btn-1');
const btnDestroySelect = document.querySelector('.btn-2');
const result = document.querySelector('#result');


const mockOptions = {
    options: [
        {id: 1, name: "JavaScript"},
        {id: 2, name: "Angular"},
        {id: 3, name: "VueJs"},
        {id: 4, name: "React"},
        {id: 5, name: "Svelte"},
        {id: 6, name: "Ember"},
        {id: 7, name: "Redux"},
    ],
    placeholder: "Select something option",
    notFoundoption: "Option not found...",
};

const multiSelect = "#multiselect";
if (multiSelect) {
    const select = new MultiSelect(multiSelect, mockOptions);
    window.select = select;
}

const getValueCb = () => {
    result.innerHTML = ``;
    result.insertAdjacentHTML('afterbegin', select.getValues().map((select) => (`<span>${select.name}</span>`)).join('\n'))
}
const destroyCb = () => {
    select.destroy()
    result.innerHTML = `Select has been destroyed`;
}

btnGetValue.addEventListener('click', getValueCb)
btnDestroySelect.addEventListener('click', destroyCb)
