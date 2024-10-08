import Product from "../models/productModel.js";

export const listProducts = async () => {
	const products = await Product.find();
	return products;
};

export const productById = async (id) => {
	const product = await Product.findById(id);
	return product;
};
