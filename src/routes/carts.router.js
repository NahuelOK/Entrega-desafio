import { Router } from 'express'
import { cartManager } from '../controllers/CartManager.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const addCart = await cartManager.addCart()
    res.json({ message: 'Prodructo agregado', addCart })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid)
    const productId = parseInt(req.params.pid)

    if (productId <= 0) {
      return res.status(404).json({ error: "producto invalido" })
    }
    const cart = await cartManager.addProductsToCart(cartId, productId)

    if (!cart) {
      return res.status(404).json({ error: `${cartId} No existe` })
    }
    res.status(200).json(cart)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

router.get('/:cid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid)
    const cart = await cartManager.getCartsById(cartId)

    if (!cart) {
      return res.status(404).json({ error: ` ${cartId} No existe` })
    }
    res.status(200).send(cart)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

export default router