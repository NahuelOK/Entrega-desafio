import { Router } from 'express'
import { ProductManager } from '../controllers/ProductManager.js';
const productManager = new ProductManager();

const router = Router()
const products = await productManager.getProducts()

router.get('/', (req, res) => {
  try {
    const limit = req.query.limit
    if (limit === undefined) {
      return res.status(200).json({ products })
    } else if (isNaN(limit) || limit < 1 || limit > products.length) {
      return res.status(400).json({ message: 'El limite es invalido' })
    } 
    const limitedProducts = products.slice(0, limit)
    res.status(200).json(limitedProducts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


router.get('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid) 
    if (isNaN(productId)) return res.status(400).json({ error: 'Error en id' })
    const product = await productManager.getProductsById(productId)
    if (!product) return res.status(404).json({ error: `Id ${productId} no encontrado` })
    return res.status(200).json({ product })
} catch (error) {
    res.status(500).json({ error: error.message })
}
})

router.post('/', async (req, res) => {
  try {
    let { title, description, price, thumbnail, code, category, stock, status } = req.body
    if ( !title || !description || !price || !thumbnail || !code || !stock ) {
      return res.status(400).json({ error: 'Todos los campos requeridos' })
    }
    const addProduct = await productManager.addProduct( title, description, price, thumbnail, code, category, stock, (status = true) )
    if (addProduct) return res.status(201).json({ message: `Producto ${addProduct.id} agregado correctamente`, product: addProduct })
    return res.status(404).json({ error: 'Error en terminar' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

router.put('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid)
    if (req.body.id !== productId && req.body.id !== undefined) {
      return res.status(404).json({ error: "no se modificói el id" })
    }
    const updated = req.body
    const productFind = await products.find(item => item.id === productId)
    if (!productFind) {
      return res.status(404).json({ error: `el producto con el id ${productId} no existe` })
    }
    await productManager.updateProduct(productId, updated)
    res.status(200).json({ message: `correcta actualizacion ${productId}` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid)
    const productFind = await products.find(item => item.id === productId)
    if (!productFind) {
      return res.status(404).json({ error: `El producto con el id: ${productId} no existe` })
    }
    const deleteProduct = await productManager.deleteProduct(productId)
    console.log(deleteProduct)
    res.status(200).json({ message: `Producto con el id: ${productId} se eliminó` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router