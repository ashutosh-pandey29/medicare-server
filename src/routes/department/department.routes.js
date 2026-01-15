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
  getAllDepartmentController,
  getPublicDepartmentsController,
  getDepartmentByIdController
} from "../../controllers/department/index.controller.js";

import { payloadValidator } from "../../middlewares/validator.middleware.js";
import { departmentValidationSchema } from "../../Schemas/department.schema.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizedRole } from "../../middlewares/role.middleware.js";

//! Public department dropdown (id + name only) access level: public
router.get("/public", getPublicDepartmentsController);

//! Get all departments ,  access level : admin
router.get("/all", authMiddleware, authorizedRole("admin"), getAllDepartmentController);

//! GET DEPARTMENT BY ID

router.get("/:departmentId" ,  authMiddleware ,  authorizedRole("admin") ,  getDepartmentByIdController)

//! Add a new department ,  access level:admin
router.post(
  "/new",
  authMiddleware,
  authorizedRole("admin"),
  payloadValidator(departmentValidationSchema),
  newDepartmentController
);

//! Update a department, access level:admin
router.put(
  "/update/:departmentId",
  authMiddleware,
  authorizedRole("admin"),
  payloadValidator(departmentValidationSchema),
  updateDepartmentController
);

//! Delete a department,access level:admin
router.delete(
  "/delete/:departmentId",
  authMiddleware,
  authorizedRole("admin"),
  deleteDepartmentController
);

//! Get stats for all departments (total doctors, total patients)  ,  access level:admin
router.get("/stats", authMiddleware, authorizedRole("admin"), departmentStatsController);

//! Get doctors in a specific department , access level:admin
router.get(
  "/:departmentId/doctors",
  authMiddleware,
  authorizedRole("admin"),
  getDoctorsByDepartmentController
);

//! Get patients in a specific department , access level:admin
router.get(
  "/:departmentId/patients",
  authMiddleware,
  authorizedRole("admin"),
  getPatientsByDepartmentController
);

//! Get total revenue for a department ,access level:admin
router.get(
  "/:departmentId/revenue",
  authMiddleware,
  authorizedRole("admin"),
  getDepartmentRevenueController
);

export default router;
