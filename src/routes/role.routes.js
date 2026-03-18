import {Router} from "express";
import { addRole, getAllRoles } from "../controllers/role.controller.js";

const router = Router();

router.route("/add").post(addRole)
router.route("/roles").get(getAllRoles)

export default router