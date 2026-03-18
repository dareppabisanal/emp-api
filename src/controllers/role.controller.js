import { asyncHandler } from "../utils/asyncHandler.js"
import { Role } from "../models/role.model.js";

const addRole = asyncHandler(async (req, res) => {
    const { roleName, deptId } = req.body;

    if (roleName?.trim() === "") {
        return res.status(201).json({
            ok: false,
            message: "Role name is required!",
        });
    }

    if (!deptId) {
        return res.status(201).json({
            ok: false,
            message: "Department is required!",
        });
    }

    const roleExists = await Role.exists({
        roleName: roleName,
        departmentId: deptId,
    })

    if (roleExists) {
        return res.status(201).json({
            ok: false,
            message: "Role already exists!",
        });
    }

    const role = await Role.create({
        roleName, departmentId: deptId
    });

    const roleId = await Role.findById(role._id).select("roleName");

    if (!roleId) {
        return res.status(201).json({
            ok: false,
            message: "Failed to add role!",
        });
    }

    return res.status(201).json({ ok: true, message: "Role created successfully!" });
});

const getAllRoles = asyncHandler(async (req, res) => {
    const roles = await Role.find()
        .populate("departmentId", "deptName")
        .lean();

    res.status(200).json({
        ok: true,
        data: roles,
    });
});

export { addRole, getAllRoles }