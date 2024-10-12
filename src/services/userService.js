import User from "../models/userModel.js";

export const listUsers = async () => {
	const users = await User.find();
	return users;
};

export const createUser = async (user) => {
	const createdUser = await User.create(user);
	return createdUser;
};

export const deleteUser = async (id) => {
	await User.findByIdAndDelete(id);
	return;
};

export const updateUser = async (id, newBody) => {
	await User.findByIdAndUpdate(id, newBody);
};
