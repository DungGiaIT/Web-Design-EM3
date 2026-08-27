const form = document.getElementById("productForm");
const rows = document.getElementById("productRows");
const products = [];

    function renderProducts() {
        rows.innerHTML = products.map((product, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${product.fullname}</td>
                <td>${product.idPro}</td>
                <td>${product.namePro}</td>
                <td>${product.quantityPro}</td>
                <td>${product.pricePro}</td>
                <td>${product.discount.toFixed(2)}</td>
                <td>${product.amount.toFixed(2)}</td>
                <td>${product.total.toFixed(2)}</td>
            </tr>`).join("");
    }

    function readProduct() {
        const data = new FormData(form);
        const quantity = Number(data.get("quantityPro"));
        const price = Number(data.get("pricePro"));
        const amount = quantity * price;
        const discount = amount * 0.1;
        return {
            fullname: data.get("fullname"),
            idPro: data.get("idPro"),
            namePro: data.get("namePro"),
            quantityPro: quantity,
            pricePro: price,
            discount,
            amount,
            total: amount - discount
        };
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        products.push(readProduct());
        renderProducts();
    });

    document.getElementById("showButton").addEventListener("click", renderProducts);
    document.getElementById("resetButton").addEventListener("click", () => {
        products.length = 0;
        rows.innerHTML = "";
    });

    form.requestSubmit();