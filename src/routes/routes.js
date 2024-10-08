import Router from 'express'

import userController from '../controllers/userController.js'
import productController from '../controllers/productController.js'


const router = Router()

// homepage
router.get('/', (req, res) => {
})

router.use('/user', userController)
router.use('/products', productController)


export default router
