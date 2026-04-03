import express from "express";
import {createRecord,getRecords,updateRecord,deleteRecord} from "../controllers/recordController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js"

const router = express.Router();

router.post("/",authMiddleware,authorizeRoles("admin"),createRecord);
router.get("/",authMiddleware,authorizeRoles("admin","analyst","viewer"),getRecords);
router.put("/:id",authMiddleware,authorizeRoles("admin"),updateRecord);
router.delete("/:id",authMiddleware,authorizeRoles("admin"),deleteRecord)
export default router;