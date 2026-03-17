import {Router} from "express";
import { addDepartment, getAllDepartments, updateDepartment, deleteDepartment } from "../controllers/department.controller.js";

const router = Router();

router.route("/add").post(addDepartment)
router.route("/departments").get(getAllDepartments)
router.route("/update").post(updateDepartment)
router.route("/delete").post(deleteDepartment)

export default router