// assets/js/index.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Главная страница ElectroWorld MD успешно загружена.');
    
    const catalogBtn = document.querySelector('main a button');
    if (catalogBtn) {
        catalogBtn.addEventListener('click', () => {
            console.log('Перенаправление в каталог товаров...');
        });
    }
});