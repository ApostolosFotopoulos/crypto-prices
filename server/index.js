import express from "express";
import cors from "cors";
import "dotenv/config";

// Routes
import coinsRoutes from "./routes/coins.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/", coinsRoutes);

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
