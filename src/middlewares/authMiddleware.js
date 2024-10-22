// src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
	try {
		const token = req.cookies.token;

		if (!token) {
			return res.status(401).json({ message: "Autenticação necessária" });
		}

		const decoded = jwt.verify(token, SECRET);
		req.user = decoded;

		next();
	} catch (error) {
		res.status(401).json({ message: "Token inválido" });
	}
};
