import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
dotenv.config();


const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());;
connectDB();


app.get("/",(req,res) => {
    res.send("Finance Backend API Running");
});
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});
app.use("/api/auth",authRoutes);
app.use("/api/records",recordRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use(errorMiddleware);
