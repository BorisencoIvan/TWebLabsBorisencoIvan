document.addEventListener('DOMContentLoaded', () => {
    const pricePerItem = 15000;
    const productName = 'SuperBook Pro X1';
    
    const quantityInput = document.querySelector('input[type="number"]');
    const priceDisplay = document.querySelector('h3:last-of-type');
    const form = document.querySelector('form');

    quantityInput.addEventListener('input', (e) => {
        let quantity = parseInt(e.target.value);
        if (quantity < 1 || isNaN(quantity)) e.target.value = 1;
        else if (quantity > 5) e.target.value = 5;
        
        priceDisplay.innerHTML = `Цена: ${(pricePerItem * e.target.value).toLocaleString('ru-RU')} MDL`;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        let quantity = parseInt(quantityInput.value);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let existingItem = cart.find(item => item.name === productName);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name: productName, price: pricePerItem, quantity: quantity });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`Товар ${productName} (${quantity} шт.) успешно добавлен в корзину!`);
        window.location.href = 'cart.html';
    });
});