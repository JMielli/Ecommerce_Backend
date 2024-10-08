import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const URI = process.env.MONGODB_URI

export default function DatabaseConnect() {
  mongoose.connect(URI, {
	}).then(() => {
		console.log("Conectado ao MongoDB com sucesso!")
	}).catch((err) => {
		console.error("Erro ao conectar ao MongoDB:", err)
	})
}
