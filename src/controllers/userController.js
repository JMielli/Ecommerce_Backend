import { Router } from "express";
import {
	createUser,
	loginUser,
	// logoutUser,
	updateUser,
	deleteUser,
} from "../services/userService.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import User from "../models/userModel.js"; // Adicionar import do modelo

const router = Router();

// Mover authMiddleware para depois das rotas públicas
const publicRoutes = () => {
	// Registro
	router.post("/register", async (req, res) => {
		try {
			const result = await createUser(req.body);

			res.cookie("token", result.token, {
				httpOnly: true,
				sameSite: "strict",
				maxAge: 3600000, // 1 hora
				path: "/", // Garantir que o cookie está acessível em todas as rotas
			});

			res.status(201).json({
				message: "Usuário criado com sucesso",
				user: result.user,
			});
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	});

	// Login
	router.post("/login", async (req, res) => {
		try {
			const { email, password } = req.body;
			const result = await loginUser(email, password);

			res.cookie("token", result.token, {
				httpOnly: true,
				sameSite: "strict",
				maxAge: 3600000,
				path: "/",
			});

			res.status(200).json({
				message: "Login realizado com sucesso",
				user: result.user,
			});
		} catch (err) {
			res.status(401).json({ message: err.message });
		}
	});
};

// Aplicar rotas públicas
publicRoutes();

// Aplicar middleware de autenticação para rotas protegidas
router.use(authMiddleware);

// Perfil - Corrigido
router.get("/profile/:userId", async (req, res) => {
	try {
		// Usar o ID do usuário do token de autenticação
		const userId = req.user.id;

		const user = await User.findById(userId).select("-password").lean().exec();

		if (!user) {
			return res.status(404).json({ message: "Usuário não encontrado" });
		}

		res.status(200).json({
			user,
			message: "Perfil carregado com sucesso",
		});
	} catch (error) {
		console.error("Erro ao carregar perfil:", error);
		res.status(500).json({
			message: "Erro ao buscar perfil do usuário",
			error: process.env.NODE_ENV === "development" ? error.message : undefined,
		});
	}
});

// Atualização
router.put("/profile", async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await updateUser(userId, req.body);
		res.status(200).json({
			user,
			message: "Perfil atualizado com sucesso",
		});
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Logout
router.post("/logout", async (req, res) => {
	try {
		const token = req.cookies.token;
		await logoutUser(token);

		res.clearCookie("token", {
			httpOnly: true,
			sameSite: "strict",
			path: "/",
		});

		res.status(200).json({ message: "Logout realizado com sucesso" });
	} catch (error) {
		res.status(500).json({ message: "Erro ao realizar logout" });
	}
});

// Deletar conta
router.delete("/profile", async (req, res) => {
	try {
		const userId = req.user.id;
		await deleteUser(userId);

		res.clearCookie("token", {
			httpOnly: true,
			sameSite: "strict",
			path: "/",
		});

		res.status(204).send();
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Verificação de autenticação
router.get("/check-auth", (req, res) => {
	res.status(200).json({
		message: "Token válido",
		user: req.user,
	});
});

export default router;
