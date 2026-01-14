import express from "express";
const router = express.Router();

import {
  deleteDepartmentController,
  departmentStatsController,
  getDepartmentRevenueController,
  getDoctorsByDepartmentController,
  newDepartmentController,
  updateDepartmentController,
  getPatientsByDepartmentController,
  getAllAppointmentController,
  getPublicDepartmentsController,
} from "../../controllers/department/index.controller.js";

//! Get all departments ,  access level : admin
router.get("/all", getAllAppointmentController);

//! Public department dropdown (id + name only) access level: public
router.get("/public", getPublicDepartmentsController);

//! Add a new department ,  access level:admin
router.post("/new", newDepartmentController);

//! Update a department, access level:admin
router.put("/update/:departmentId", updateDepartmentController);

//! Delete a department,access level:admin
router.delete("/delete/:departmentId", deleteDepartmentController);

//! Get stats for all departments (total doctors, total patients)  ,  access level:admin
router.get("/stats", departmentStatsController);

//! Get doctors in a specific department , access level:admin
router.get("/:departmentId/doctors", getDoctorsByDepartmentController);

//! Get patients in a specific department , access level:admin
router.get("/:departmentId/patients", getPatientsByDepartmentController);

//! Get total revenue for a department ,access level:admin
router.get("/:departmentId/revenue", getDepartmentRevenueController);

export default router;
