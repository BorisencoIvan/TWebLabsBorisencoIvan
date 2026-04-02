document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Добро пожаловать, ${data.name}!`);
                
                // ВАЖНО: Сохраняем имя пользователя в память браузера!
                localStorage.setItem('userName', data.name);
                
                window.location.href = '../index.html';
            } else {
                alert('Ошибка: ' + data.message);
            }
        });
    });
});