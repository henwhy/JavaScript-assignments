async function getProducts() {
    let url = 'https://fakestoreapi.com/products';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

function filterProducts(products) {
    let filter = document.getElementById("categoryFilter").value;

    let filteredProducts;

    if (filter === "all") {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product =>
            product.category === filter
        );
    }

    renderProductCards(filteredProducts);
}

async function renderProducts() {
    let products = await getProducts();

    let categoryFilter = document.getElementById("categoryFilter");

    categoryFilter.addEventListener("change", function() {
        filterProducts(products);
    });

    filterProducts(products);
}

async function renderProductCards(products) {
        let productDiv = document.getElementById("products");

        productDiv.innerHTML = "";

        products.forEach(product => {

        let productcontainer = document.createElement('div');
        productcontainer.className = 'productContainer';

        let header = document.createElement('p');
        header.className = 'header';
        header.innerHTML = product.title;

        let productInfo = document.createElement('div');
        productInfo.className = 'productInfo';

        let image = document.createElement('img');
        image.src = product.image;
        image.className = 'productImage';

        let text = document.createElement('p');
        text.className = 'text';
        text.innerHTML = product.description;

        let category = document.createElement('p');
        category.className = 'category';
        category.innerHTML = product.category;

        let price = document.createElement('p');
        price.className = 'price';

        price.innerHTML = new Intl.NumberFormat('fi-FI', {
            style: 'currency',
            currency: 'EUR'
        }).format(product.price);

        let rating = document.createElement('p');
        rating.className = 'rating';
        rating.innerHTML = 'Rating: ' + product.rating.rate;

        productInfo.appendChild(image);
        productInfo.appendChild(text);

        let productBottom = document.createElement('div');
        productBottom.className = 'productBottom';

        productBottom.appendChild(category);

        let priceRating = document.createElement('div');
        priceRating.className = 'priceRating';

        priceRating.appendChild(price);
        priceRating.appendChild(rating);

        productBottom.appendChild(priceRating);

        productcontainer.appendChild(header);
        productcontainer.appendChild(productInfo);
        productcontainer.appendChild(productBottom);

        productDiv.appendChild(productcontainer);
    });
}

renderProducts();