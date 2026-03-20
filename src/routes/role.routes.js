import {Router} from "express";
import { addRole, deleteRole, getAllRoles, updateRole } from "../controllers/role.controller.js";

const router = Router();

router.route("/add").post(addRole)
router.route("/roles").get(getAllRoles)
router.route("/delete").post(deleteRole)
router.route("/update").post(updateRole)

export default router