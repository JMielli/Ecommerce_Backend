// Em cartService.js
import Cart from "../models/cartModel.js";
import { Router } from "express";

const router = Router();

// Initialize or retrieve user cart
export const getCart = async (userId) => {
	let cart = await Cart.findOne({ userId });
	if (!cart) {
		cart = await Cart.create({ userId, products: [] });
	}
	return cart;
};

// Add product to the cart
export const addProductToCart = async (userId, product) => {
	try {
		const cart = await getCart(userId);
		cart.products.push(product);
		await cart.save();
		return calculateCartValue(cart);
	} catch (error) {
		throw new Error("Erro ao adicionar produto ao carrinho: " + error.message);
	}
};

// Remove product from the cart
export const removeProductFromCart = async (userId, productId) => {
	try {
		const cart = await getCart(userId);
		cart.products = cart.products.filter((product) => product.id !== productId);
		await cart.save();
		return calculateCartValue(cart);
	} catch (error) {
		throw new Error("Erro ao remover produto do carrinho: " + error.message);
	}
};

// Calculate total value of the cart
const calculateCartValue = (cart) => {
	return cart.products.reduce((total, product) => total + product.price, 0);
};
