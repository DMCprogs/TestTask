/* События отправки форм */
document.addEventListener('submit', function (evt) {
	let form = evt.target.id;
	submitForms(evt);
})

function submitForms(e) {
    	let form = e.target;
	
	
	e.preventDefault();
    let isFormValid = true;

    
    let validationFields = form.querySelectorAll('[data-rule]');

    // Проходим по полям и проверяем условия
    validationFields.forEach(field => {
        // Получаем значение правила
        let rule = field.getAttribute('data-rule');
        // Проверка требуемого условия
        if (rule.includes('required')) {
            if (!field.value.trim()) {
                isFormValid = false;
                
            } 
        }
    });

    // Если форма не валидна, прерываем выполнение функции
    if (!isFormValid) return false;

    modalShow(document.querySelector('#modal-thanks'));
     // Очистить форму после показа модального окна
     form.reset();
}



