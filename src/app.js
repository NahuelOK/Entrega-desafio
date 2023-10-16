import express from 'express'
import ProductManager from './ProductManager.js'

const app = express()

const products = new ProductManager('products.json')

app.get('/', (req, res) => {
  return res.send('<h1> Servidor Express - 3º Desafio </h1>')
})

app.get('/api/products', (req, res) => {
    const { limit } = req.query;
  
    const data = products.getProduct();
  
    let response;
  
    if (limit) {
      response = data.slice(0, limit);
    } else {
      response = data;
    }
  
    res.json({ data: response });
  });
  

app.get('/api/products/:pid', (req, res) => {
  const {pid} = req.params
  return res.json(products.getProductById(parseInt(pid)))
})


app.listen(8080, () => { console.log('listening on port 8080 ...') })