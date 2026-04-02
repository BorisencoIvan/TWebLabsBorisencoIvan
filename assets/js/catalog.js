document.addEventListener('DOMContentLoaded', () => {
    const mainSection = document.querySelector('main');
    
    // Подготавливаем HTML-структуру
    mainSection.innerHTML = `
        <h2>Выберите категорию:</h2>
        <h3>Ноутбуки</h3><ul id="laptops-list" style="list-style: none; padding: 0;"></ul>
        <h3>Смартфоны</h3><ul id="phones-list" style="list-style: none; padding: 0;"></ul>
    `;

    // Запрашиваем товары из Базы Данных
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const li = document.createElement('li');
                li.style.display = 'flex';
                li.style.justifyContent = 'space-between';
                li.style.alignItems = 'center';
                li.style.marginBottom = '10px';
                li.style.padding = '10px';
                li.style.background = '#f9f9fc';
                li.style.borderLeft = '5px solid #00d2ff';
                li.style.borderRadius = '6px';

                const hitText = product.is_hit ? ' <span style="color:#ff4d4d; font-weight:bold;">(Хит продаж!)</span>' : '';
                
                li.innerHTML = `
                    <span><b>${product.name}</b>${hitText} - ${product.price} MDL</span>
                    <button class="add-to-cart-btn" data-name="${product.name}" data-price="${product.price}" style="padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">В корзину</button>
                `;
                
                if (product.category === 'Ноутбуки') {
                    document.getElementById('laptops-list').appendChild(li);
                } else if (product.category === 'Смартфоны') {
                    document.getElementById('phones-list').appendChild(li);
                }
            });

            // Вешаем событие на все кнопки "В корзину"
            document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const name = e.target.getAttribute('data-name');
                    const price = parseFloat(e.target.getAttribute('data-price'));
                    
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    let existingItem = cart.find(item => item.name === name);
                    
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        cart.push({ name: name, price: price, quantity: 1 });
                    }
                    
                    localStorage.setItem('cart', JSON.stringify(cart));
                    alert(`Товар "${name}" добавлен в корзину!`);
                });
            });
        })
        .catch(error => console.error('Ошибка:', error));
});