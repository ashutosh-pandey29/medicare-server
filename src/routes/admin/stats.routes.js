import express from "express";
import { getStatsController } from "../../controllers/admin/stats/getStats.controller.js";
import { patientGraphController, revenueGraphController } from "../../controllers/admin/stats/getGraphs.controller.js";

const router = express.Router();

router.get("/get" ,  getStatsController);
router.get("/revenue" ,  revenueGraphController);
router.get("/patient" ,  patientGraphController);


export default router;