document.addEventListener('DOMContentLoaded', () => {
    const ordersList = document.getElementById('ordersList');
    const addOrderForm = document.getElementById('addOrderForm');
    const ordersTable = document.getElementById('ordersTable');

    // Загрузка списка заказов при загрузке страницы
    fetchOrders();

    // Обработка добавления заказа
    addOrderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const status = document.getElementById('status').value;
        addOrder(name, status);
    });

    // Функция для загрузки списка заказов
    function fetchOrders() {
        fetch('get_orders.php')
            .then(response => response.json())
            .then(data => {
                ordersList.innerHTML = '';
                ordersTable.innerHTML = ''; // Очистка таблицы перед обновлением
                data.forEach(order => {
                    const li = document.createElement('li');
                    li.textContent = `${order.name} - ${order.status}`;
                    ordersList.appendChild(li);

                    const row = ordersTable.insertRow();
                    row.innerHTML = `<td>${order.id}</td><td>${order.name}</td><td>${order.status}</td>`;
                });
            });
    }

    // Функция для добавления заказа
    function addOrder(name, status) {
        fetch('add_order.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, status })
        })
        .then(response => {
            if (response.ok) {
                fetchOrders();
                document.getElementById('name').value = '';
                document.getElementById('status').value = '';
            }
        });
    }
});
