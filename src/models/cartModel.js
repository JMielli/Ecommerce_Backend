import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
	products: [{ type: [mongoose.Types.ArraySubdocument] }],
	quantity: { type: Number, default: 0, min: [0] },
	value: { type: mongoose.Types.Decimal128 },
});

export default mongoose.models.CartSchema || mongoose.model("Cart", CartSchema);
