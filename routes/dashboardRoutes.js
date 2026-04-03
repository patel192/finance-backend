import express from "express"
import {getSummary,getCategoryTotals,getRecentRecords} from "../controllers/dashboardController.js";

import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/summary",authMiddleware,getSummary);
router.get("category-totals",authMiddleware,getCategoryTotals);
router.get("/recent",authMiddleware,getRecentRecords);

export default router;