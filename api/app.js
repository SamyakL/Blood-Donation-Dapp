import express from "express";
import donorRoutes from "./routes/donorRoutes.js"
const app = express();
app.use(express.json());

app.use("/api/ethereum/donors", donorRoutes);
export default app;