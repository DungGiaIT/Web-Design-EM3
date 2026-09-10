class Product{
    id = 0;
    name = "";
    price = 0;
    constructor(id, name, price){
        this.id = id;
        this.name = name;
        this.price = price;
    }

    displayInfo(){
        console.log(`Project ID: ${this.id}, Name: ${this.name}, Price: ${this.price}`)
    }
}

const product1 = new Product(1, "laptop", 2000);
const product2 = new Product(1, "TV", 2000);

product1.displayInfo();
product2.displayInfo();