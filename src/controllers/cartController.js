// Em cartController.js
import { Router } from "express";
import {
	addProductToCart,
	removeProductFromCart,
	getCart,
} from "../services/cartService.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Aplica o middleware de autenticação em todas as rotas
router.use(authMiddleware);

// Get user's cart
router.get("/:userId", async (req, res) => {
	try {
		// Verifica se o usuário está tentando acessar seu próprio carrinho
		if (req.user.id !== req.params.userId) {
			return res.status(403).json({ message: "Acesso não autorizado" });
		}
		const cart = await getCart(req.params.userId);
		res.status(200).json(cart);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Add product to user's cart
router.post("/:userId/add", async (req, res) => {
	try {
		// Verifica se o usuário está tentando modificar seu próprio carrinho
		if (req.user.id !== req.params.userId) {
			return res.status(403).json({ message: "Acesso não autorizado" });
		}
		const { product } = req.body;
		const updatedCartValue = await addProductToCart(req.params.userId, product);
		res.status(200).json({
			message: "Produto adicionado ao carrinho",
			totalValue: updatedCartValue,
		});
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Remove product from user's cart
router.delete("/:userId/remove/:productId", async (req, res) => {
	try {
		// Verifica se o usuário está tentando modificar seu próprio carrinho
		if (req.user.id !== req.params.userId) {
			return res.status(403).json({ message: "Acesso não autorizado" });
		}
		const updatedCartValue = await removeProductFromCart(
			req.params.userId,
			req.params.productId,
		);
		res.status(200).json({
			message: "Produto removido do carrinho",
			totalValue: updatedCartValue,
		});
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

export default router;
