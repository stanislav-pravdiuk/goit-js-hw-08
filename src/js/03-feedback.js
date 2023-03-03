import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
}

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

populateText();

function onFormSubmit(e) {
    e.preventDefault();
    console.log(formData);
    formData = {};
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function onInput(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}


function populateText() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        formData = JSON.parse(savedData);
    };
    
    const entries = Object.entries(formData);
    
    entries.forEach(function (el) {
        const [key,value] = el;
        refs.form[key].value = value;
    });
    
}
