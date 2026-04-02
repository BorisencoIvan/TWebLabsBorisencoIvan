document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('tbody');
    
    // Запускаем отрисовку корзины
    renderCart();

    function renderCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        tbody.innerHTML = ''; 

        if (cart.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 20px;"><b>Ваша корзина пуста :(</b></td></tr>`;
            return;
        }

        let totalSum = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            totalSum += itemTotal;

            tbody.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>
                        <button class="qty-btn minus-btn" data-index="${index}" style="padding: 2px 8px; cursor: pointer;">-</button>
                        <span style="margin: 0 10px;">${item.quantity}</span>
                        <button class="qty-btn plus-btn" data-index="${index}" style="padding: 2px 8px; cursor: pointer;">+</button>
                    </td>
                    <td>${item.price} MDL</td>
                    <td>
                        <b>${itemTotal} MDL</b>
                        <button class="remove-btn" data-index="${index}" style="background: #ff4d4d; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; float: right;">Удалить</button>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML += `
            <tr class="total" style="background-color: #f0f0f5;">
                <td colspan="3" align="right" style="padding: 15px;"><b>ИТОГО К ОПЛАТЕ:</b></td>
                <td style="padding: 15px; font-size: 1.2rem; color: #007bff;"><b>${totalSum} MDL</b></td>
            </tr>
        `;

        document.querySelectorAll('.remove-btn').forEach(btn => btn.addEventListener('click', removeItem));
        document.querySelectorAll('.plus-btn').forEach(btn => btn.addEventListener('click', changeQuantity));
        document.querySelectorAll('.minus-btn').forEach(btn => btn.addEventListener('click', changeQuantity));
    }

    function removeItem(e) {
        let index = e.target.getAttribute('data-index');
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function changeQuantity(e) {
        let index = e.target.getAttribute('data-index');
        let cart = JSON.parse(localStorage.getItem('cart'));
        
        if (e.target.classList.contains('plus-btn')) {
            cart[index].quantity += 1;
        } else if (e.target.classList.contains('minus-btn') && cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    // Оформление заказа
    const checkoutBtn = document.querySelector('main > button');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) return alert('Сначала добавьте товары в корзину!');

            // Достаем имя пользователя из памяти браузера (или пишем 'Гость', если он не вошел)
            let userName = localStorage.getItem('userName') || 'Гость';

            fetch('http://localhost:3000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // ТЕПЕРЬ МЫ ОТПРАВЛЯЕМ И КОРЗИНУ, И ИМЯ ПОКУПАТЕЛЯ!
                body: JSON.stringify({ cart: cart, customerName: userName }) 
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Ваш заказ успешно оформлен! Менеджер свяжется с вами.');
                    localStorage.removeItem('cart');
                    renderCart();
                } else {
                    alert('Ошибка: ' + data.message);
                }
            });
        });
    }
});