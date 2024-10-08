import { Router } from "express"
import {
	listProducts,
   productById, 
} from "../services/productService.js"

const router = Router()

router.get("/", async (req, res) => {
	try {
		const productList = await listProducts()
		res.send(productList)
	} catch (err) {
		res.status(err.status).send(err)
	}
})

router.get("/:productId", async (req, res) => {
	try {
		const product = await productById(req.params.productId)
		res.send(product)
	} catch (err) {
      res.status(err.status).send(err)
   }
})

   


export default router
