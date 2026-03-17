import {Router} from "express";
import { addDepartment } from "../controllers/department.controller.js";

const router = Router();

router.route("/add").post(addDepartment)

export default router