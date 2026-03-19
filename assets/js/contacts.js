// assets/js/contacts.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Останавливаем перезагрузку страницы
        
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        if (!name || !phone) {
            alert('Пожалуйста, заполните все поля перед отправкой!');
            return;
        }

        // Имитация успешной отправки
        alert(`Спасибо, ${name}! Мы перезвоним вам по номеру ${phone}.`);
        form.reset(); // Очищаем форму
    });
});