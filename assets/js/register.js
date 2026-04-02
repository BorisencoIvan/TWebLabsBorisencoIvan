document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;

            // Отправляем данные на сервер
            fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message); // "Вы успешно зарегистрировались!"
                    window.location.href = 'login.html'; // Сразу отправляем на страницу входа
                } else {
                    alert('Ошибка: ' + data.message);
                }
            })
            .catch(error => console.error('Ошибка:', error));
        });
    }
});