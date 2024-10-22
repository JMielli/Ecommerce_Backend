import app from "./src/app.js";
import DatabaseConnect from "./src/utils/db.js";

import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;

// Conexão com o Banco de Dados
DatabaseConnect();

app.listen(PORT, () => {
	console.log(`App online em: http://localhost:${PORT}`);
});
