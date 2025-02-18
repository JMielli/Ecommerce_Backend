import express from "express";
import cors from "cors";
import routesController from "./routes/routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin: "http://localhost:3000", // URL do frontend React
		credentials: true,
	}),
);

app.use("/", routesController);

export default app;
