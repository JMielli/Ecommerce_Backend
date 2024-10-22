import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
	zipCode: { type: String, required: true },
	street: { type: String, required: true },
	number: { type: String, required: true },
	complement: { type: String },
	referencePoint: { type: String },
	nicknameAddress: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	birthDate: { type: Date, required: true },
	cpf: { type: String, required: true, unique: true },
	telephone: { type: String, required: true },
	addresses: [addressSchema],
	imgProfile: {
		type: String, // Armazenará a imagem em base64
		default: null,
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
