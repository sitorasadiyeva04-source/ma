
const productsContainer = document.getElementById('productsContainer');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const sortSelect = document.getElementById('sortSelect');

let products = [];

// Загрузка товаров
async function getProducts() {
    try {
        productsContainer.innerHTML = `
            <div class="loader">
                <div class="spinner"></div>
            </div>
        `;

        const response = await fetch('https://fakestoreapi.com/products');

        if (!response.ok) {
            throw new Error('Ошибка загрузки');
        }

        products = await response.json();

        // Показываем только 12 товаров
        

        showProducts();

    } catch (error) {
        productsContainer.innerHTML =
            '<p class="message">Ошибка загрузки товаров!</p>';
    }
}

// Показ товаров
function showProducts() {
    let result = [...products];

    // Поиск
    result = result.filter(item =>
        item.title.toLowerCase().includes(searchInput.value.toLowerCase())
    );

    // Фильтр по категории
    if (categorySelect.value !== 'all') {
        result = result.filter(item =>
            item.category === categorySelect.value
        );
    }

    // Сортировка по цене
    if (sortSelect.value === 'asc') {
        result.sort((a, b) => a.price - b.price);
    }

    if (sortSelect.value === 'desc') {
        result.sort((a, b) => b.price - a.price);
    }

    productsContainer.innerHTML = '';

    if (result.length === 0) {
        productsContainer.innerHTML =
            '<p class="message">Товары не найдены!</p>';
        return;
    }

    // Создание карточек
    result.forEach(item => {
        productsContainer.innerHTML += `
            <div class="card">
                <img src="${item.image}" alt="${item.title}">

                <h3>${item.title}</h3>

                <p class="category">${item.category}</p>

                <p class="rating">★ ${item.rating.rate}</p>

                <p class="price">$${item.price}</p>

                <button>В корзину</button>
            </div>
        `;
    });
}

// Поиск
searchInput.addEventListener('input', showProducts);

// Фильтр
categorySelect.addEventListener('change', showProducts);

// Сортировка
sortSelect.addEventListener('change', showProducts);

// Запуск
getProducts();

