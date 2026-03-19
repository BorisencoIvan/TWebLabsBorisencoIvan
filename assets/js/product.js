// assets/js/product.js
document.addEventListener('DOMContentLoaded', () => {
    const pricePerItem = 15000; // Цена за единицу
    const quantityInput = document.querySelector('input[type="number"]');
    const priceDisplay = document.querySelector('h3:last-of-type');
    const form = document.querySelector('form');

    // Динамический пересчет стоимости
    quantityInput.addEventListener('input', (e) => {
        let quantity = parseInt(e.target.value);
        
        // Защита от ввода неверных значений
        if (quantity < 1 || isNaN(quantity)) {
            quantity = 1;
            e.target.value = 1;
        } else if (quantity > 5) {
            quantity = 5;
            e.target.value = 5;
        }
        
        const total = pricePerItem * quantity;
        // Форматируем число (например, 30 000 MDL)
        priceDisplay.innerHTML = `Цена: ${total.toLocaleString('ru-RU')} MDL`;
    });

    // Обработка покупки
    form.addEventListener('submit', (e) => {
        // Оставляем стандартное поведение формы (переход в корзину), 
        // но перед этим показываем уведомление
        alert(`Товар SuperBook Pro X1 (${quantityInput.value} шт.) добавлен в корзину!`);
    });
});