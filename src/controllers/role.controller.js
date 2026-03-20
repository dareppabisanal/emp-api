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

const deleteRole = asyncHandler(async (req, res) => {

    try {
        const { roleId } = req.body;

        const deleted = await Role.findByIdAndDelete(roleId);

        if (!deleted) {
            return res.status(201).json({
                message: "Role not found",
                ok: false
            });
        }

        res.status(200).json({
            message: "Role deleted successfully",
            ok: true
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
            ok: true
        });
    }
});

const updateRole = asyncHandler(async (req, res) => {
    try {
        const { roleId, roleName, deptId } = req.body;

        if (!deptId) {
            return res.status(201).json({
                ok: false,
                message: "Department is required!",
            });
        }

        if (roleName?.trim() === "") {
            return res.status(201).json({
                ok: false,
                message: "Role name is required!",
            });
        }

        const roleExists = await Role.exists({
            departmentId: deptId,
            roleName: roleName
        })

        if (roleExists) {
            return res.status(201).json({
                ok: false,
                message: "Role already exists!",
            });
        }

        const updatedRole = await Role.findByIdAndUpdate(
            roleId,
            { departmentId: deptId },
            { roleName: roleName },
            { runValidators: true }
        );

        if (!updatedRole) {
            return res.status(201).json({ message: "Role not found!" });
        }

        res.json({ ok: true, message: "Role updated successfully!" });

    } catch (err) {
        res.status(500).json({
            message: err.message,
            ok: true
        });
    }
});

export { addRole, getAllRoles, deleteRole, updateRole }