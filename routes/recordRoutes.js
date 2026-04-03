import express from "express";
import {createRecord,getRecords,updateRecord,deleteRecord} from "../controllers/recordController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js"
import { validate } from "../middleware/validationMiddleware.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/",
    authMiddleware,authorizeRoles("admin"),
    body("amount").isNumeric().withMessage("Amount must be a number"),
    body("type").isIn(["income","expense"]).withMessage("Type must be income or expense"),
    body("category").notEmpty(),
    body("date").isISO8601(),
    validate,
    createRecord);
router.get("/",authMiddleware,authorizeRoles("admin","analyst","viewer"),getRecords);
router.put("/:id",authMiddleware,authorizeRoles("admin"),
body("amount").optional().isNumeric(),
body("type").optional().isIn(["income","expense"]),
validate,
updateRecord);
router.delete("/:id",authMiddleware,authorizeRoles("admin"),deleteRecord)
export default router;