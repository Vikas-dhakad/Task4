document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: 'Laptop', category: 'electronics', price: 700, rating: 4.5, image: 'https://example.com/laptop.jpg' },
        { id: 2, name: 'T-shirt', category: 'fashion', price: 20, rating: 4.0, image: 'https://example.com/tshirt.jpg' },
        { id: 3, name: 'Vacuum Cleaner', category: 'home', price: 150, rating: 4.8, image: 'https://example.com/vacuum.jpg' },
        { id: 4, name: 'Headphones', category: 'electronics', price: 100, rating: 4.2, image: 'https://example.com/headphones.jpg' }
    ];

    function displayProducts(filteredProducts) {
        const productSection = document.getElementById('products');
        productSection.innerHTML = '';
        filteredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <p>Rating: ${product.rating}</p>
            `;
            productSection.appendChild(productDiv);
        });
    }

    function filterAndSortProducts() {
        const categoryFilters = Array.from(document.querySelectorAll('.filter-category:checked')).map(checkbox => checkbox.value);
        const maxPrice = document.querySelector('.filter-price').value;
        const sortCriteria = document.getElementById('sortCriteria').value;

        let filteredProducts = products.filter(product => {
            return (categoryFilters.length === 0 || categoryFilters.includes(product.category)) && product.price <= maxPrice;
        });

        if (sortCriteria === 'price') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortCriteria === 'rating') {
            filteredProducts.sort((a, b) => b.rating - a.rating);
        }

        displayProducts(filteredProducts);
    }

    document.querySelectorAll('.filter-category, .filter-price, #sortCriteria').forEach(element => {
        element.addEventListener('input', filterAndSortProducts);
    });

    document.getElementById('priceRange').addEventListener('input', function() {
        document.getElementById('priceValue').textContent = `$${this.value}`;
    });

    displayProducts(products);  // Initial display of products
});
