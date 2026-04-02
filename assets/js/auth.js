document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // Достаем имя из памяти браузера
    const userName = localStorage.getItem('userName');
    
    // Понимаем, где мы находимся: на главной (index.html) или в папке pages
    const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    const pathPrefix = isIndex ? 'pages/' : '';

    // Создаем контейнер для наших кнопок
    const authSpan = document.createElement('span');
    authSpan.style.marginLeft = '20px'; // Немного отодвигаем от основных ссылок
    
    if (userName) {
        // ЕСЛИ ПОЛЬЗОВАТЕЛЬ ВОШЕЛ (Показываем Имя и Выход)
        authSpan.innerHTML = `
            <span style="color: #00d2ff;">👤 Привет, <b>${userName}</b>!</span> | 
            <a href="#" id="logout-btn" style="color: #ff4d4d;">Выход</a>
        `;
        nav.appendChild(authSpan);
        
        // Настраиваем кнопку "Выход"
        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('userName'); // Удаляем имя из памяти
            window.location.reload(); // Перезагружаем страницу (кнопки обновятся)
        });
    } else {
        // ЕСЛИ НЕ ВОШЕЛ (Показываем Вход и Регистрацию)
        authSpan.innerHTML = `
            <a href="${pathPrefix}login.html">Вход</a> | 
            <a href="${pathPrefix}register.html">Регистрация</a>
        `;
        nav.appendChild(authSpan);
    }
});