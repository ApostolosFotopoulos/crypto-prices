import { getCoins, getCoin } from "../controllers/coinsController.js";
import express from "express";
const router = express.Router();

router.route("/coins/markets/:page").get(getCoins);
router.route("/coins/:id").get(getCoin);

export default router;
