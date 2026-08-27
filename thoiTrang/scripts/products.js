var nu = [
    { id: 1, name: "Áo nữ", price: 450000 ,img: "./../images/nu1.png"},
    { id: 2, name: "Quần nữ", price: 320000 ,img: "./../images/nu2.png"},
    { id: 3, name: "Váy nữ", price: 480000 ,img: "./../images/nu3.png"},
    { id: 4, name: "Áo khoác nữ", price: 680000 ,img: "./../images/nu4.png"}
];

var nam = [
    { id: 1, name: "Áo sơ mi nam", price: 350000 ,img: "./../images/nam1.png"},
    { id: 2, name: "Quần nam", price: 400000 ,img: "./../images/nam2.png"},
    { id: 3, name: "Áo khoác nam", price: 750000 ,img: "./../images/nam3.png"},
    { id: 4, name: "Giày nam", price: 1200000 ,img: "./../images/nam4.png"}
];

function loadProducts(){
    for (var i = 0; i < nu.length; i++) {
        var product = nu[i];
        var productHTML = `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: ${product.price.toLocaleString()} VND</p>
                <button onclick="buyProduct('${product.name}')">Mua</button>
            </div>
        `;
        document.getElementById("women").innerHTML += productHTML;
    }

    for (var i = 0; i < nam.length; i++) {
        var product = nam[i];
        var productHTML = `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: ${product.price.toLocaleString()} VND</p>
                <button onclick="buyProduct('${product.name}')">Mua</button>
            </div>
        `;
        document.getElementById("men").innerHTML += productHTML;
    }
}

function buyProduct(productName) {
    alert("Đã mua " + productName);
}