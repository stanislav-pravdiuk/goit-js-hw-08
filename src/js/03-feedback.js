import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea')
}

refs.form.addEventListener('submit', onFormSubmit);
refs.input.addEventListener('input', throttle(onEmailInput, 500));
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));
refs.form.addEventListener('input', e => {
    formData[e.target.name] = e.target.value;
});

populateTextarea();
populateInput();

function onFormSubmit(e) {
    e.preventDefault();
    console.log(formData)
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY)
}

function onEmailInput() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
}

function onTextareaInput() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
}

function populateInput() {
    const savedEmail = localStorage.getItem(STORAGE_KEY);
    const parsedSavedEmail = JSON.parse(savedEmail)
    
    if (savedEmail) {
        
        refs.input.value = parsedSavedEmail.email
    }
}

function populateTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    const parsedSavedMessage = JSON.parse(savedMessage)
    
    if (savedMessage) {
        
        refs.textarea.value = parsedSavedMessage.message
    }
}
