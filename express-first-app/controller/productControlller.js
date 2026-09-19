const products = [
  { id: 1, name: 'Laptop- vnuk', price: 1500 },
  { id: 2, name: 'Điện thoại', price: 800 },
  { id: 3, name: 'Tai nghe', price: 100 }
];

const getProducts = async(req, res) =>{
  res.render('products',{products});
};

const getProductById = async(req, res)=>{
  const product = products.find(p => p.id == req.params.id);
  if (product){
    res.send(`<h1>${product.name}</h1> <p>Gia: ${product.price}</p>`)
  }else{
    res.send("<h1>Khong co san pham trong danh sach</h1>");
  }
}

module.exports = {getProducts,getProductById}