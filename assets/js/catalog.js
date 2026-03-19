// assets/js/catalog.js
document.addEventListener('DOMContentLoaded', () => {
    const productItems = document.querySelectorAll('ul li');
    
    productItems.forEach(item => {
        item.addEventListener('click', () => {
            // Кратковременная подсветка выбранного товара
            const originalBg = item.style.backgroundColor;
            item.style.backgroundColor = '#e6f7ff';
            
            setTimeout(() => {
                item.style.backgroundColor = originalBg;
            }, 300);
        });
    });
});