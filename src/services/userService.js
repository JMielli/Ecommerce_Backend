// src/services/userService.js
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1h";

export const createUser = async (userData) => {
	const existingUser = await User.findOne({ email: userData.email });
	if (existingUser) {
		throw new Error("Email já está em uso");
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(userData.password, salt);

	const user = await User.create({
		...userData,
		password: hashedPassword,
	});

	const token = jwt.sign(
		{
			id: user._id,
			email: user.email,
			name: user.name,
		},
		SECRET,
		{ expiresIn: JWT_EXPIRES_IN },
	);

	return {
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
		},
		token,
	};
};

export const getUserProfile = async (userId) => {
	try {
		const user = await User.findById(userId).select("-password");
		if (!user) {
			throw new Error("Usuário não encontrado");
		}
		return user;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const loginUser = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error("Email ou senha inválidos");
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw new Error("Email ou senha inválidos");
	}

	const token = jwt.sign(
		{
			id: user._id,
			email: user.email,
			name: user.name,
		},
		SECRET,
		{ expiresIn: JWT_EXPIRES_IN },
	);

	return {
		token,
	};
};

export const updateUser = async (id, updateData) => {
	if (updateData.password) {
		const salt = await bcrypt.genSalt(10);
		updateData.password = await bcrypt.hash(updateData.password, salt);
	}

	const user = await User.findByIdAndUpdate(id, updateData, {
		new: true,
	}).select("-password");

	if (!user) {
		throw new Error("Usuário não encontrado");
	}

	return user;
};

export const deleteUser = async (id) => {
	const user = await User.findByIdAndDelete(id);
	if (!user) {
		throw new Error("Usuário não encontrado");
	}
	return;
};

export const logoutUser = async () => {};
