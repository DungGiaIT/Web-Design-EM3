const FALLBACK_IMAGE = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="220" viewBox="0 0 300 220"><rect width="300" height="220" fill="#eeeeee"/><text x="150" y="112" text-anchor="middle" font-family="Arial" font-size="18" fill="#777">No image</text></svg>'
)}`;

export class Product {
    constructor({
        id,
        name = "",
        image = "",
        description = "",
        quantity = 10,
        price = 0,
        country = "Vietnam"
    }) {
        this.id = id;
        this.name = name;
        this.image = image || FALLBACK_IMAGE;
        this.description = description;
        this.quantity = Number(quantity) || 10;
        this.price = Number(price) || 0;
        this.country = country;
    }

    get formattedPrice() {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(this.price);
    }
}