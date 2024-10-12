import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
	},

	birthDate: {
		type: Date,
		required: true,
	},

	cpf: {
		type: String,
		required: true,
		unique: true,
	},

	telephone: {
		type: String,
		required: true,
		unique: true,
	},

	addresses: [
		{
			zipCode: {
				type: String,
				required: true,
			},

			street: {
				type: String,
				required: true,
			},

			number: {
				type: Number,
				required: true,
			},

			complement: {
				type: String,
			},

			referencePoint: {
				type: String,
			},

			nicknameAddress: {
				type: String,
				required: true,
			},
		},
	],

	cart: [
		{
			products: {
				type: [mongoose.Types.ArraySubdocument],
			},

			quantity: {
				type: Number,
				default: 0,
				min: [0],
			},

			value: {
				type: mongoose.Types.Decimal128,
			},
		},
	],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
