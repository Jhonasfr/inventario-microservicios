
const express = require('express');
const fs = require('fs');
const axios = require('axios');
const app = express();
app.use(express.json());

const FILE_PATH = './products.json';
const CALCULATOR_URL = 'http://calculator-service:5000/calculate';

function loadProducts() {
  if (!fs.existsSync(FILE_PATH)) return [];
  return JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
}

function saveProducts(products) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(products, null, 2));
}

app.post('/products', async (req, res) => {
  const { code, name, price, quantity } = req.body;
  if (!code || !name || price == null || quantity == null)
    return res.status(400).json({ error: 'Campos incompletos.' });

  const products = loadProducts();
  if (products.find(p => p.code === code))
    return res.status(409).json({ error: 'Código duplicado.' });

  const response = await axios.post(CALCULATOR_URL, { price, quantity });
  const totalValue = response.data.total;

  const product = { code, name, price, quantity, totalValue };
  products.push(product);
  saveProducts(products);

  res.status(201).json(product);
});

app.get('/products', (req, res) => {
  const products = loadProducts();
  res.json(products);
});

app.put('/products/:code', async (req, res) => {
  const { code } = req.params;
  const { price, quantity } = req.body;

  let products = loadProducts();
  const product = products.find(p => p.code === code);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado.' });

  if (price != null) product.price = price;
  if (quantity != null) product.quantity = quantity;

  const response = await axios.post(CALCULATOR_URL, {
    price: product.price,
    quantity: product.quantity
  });

  product.totalValue = response.data.total;
  saveProducts(products);
  res.json(product);
});

app.listen(3000, () => {
  console.log('Product Service en puerto 3000');
});
