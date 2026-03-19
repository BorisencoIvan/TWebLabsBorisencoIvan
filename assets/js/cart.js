// assets/js/cart.js
document.addEventListener('DOMContentLoaded', () => {
    const checkoutBtn = document.querySelector('button');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Спасибо за заказ! Наш менеджер свяжется с вами в ближайшее время.');
            
            // Визуальная очистка корзины после "заказа"
            const tbody = document.querySelector('tbody');
            if (tbody) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="4" style="text-align: center; padding: 30px;">
                            <b>Ваша корзина пуста</b>
                        </td>
                    </tr>
                `;
            }
            checkoutBtn.disabled = true;
            checkoutBtn.style.backgroundColor = '#ccc';
            checkoutBtn.style.cursor = 'not-allowed';
        });
    }
});