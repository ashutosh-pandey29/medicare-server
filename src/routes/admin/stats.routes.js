import express from "express";
import { getStatsController } from "../../controllers/admin/stats/getStats.controller.js";

const router = express.Router();

router.get("/get" ,  getStatsController);



export default router;