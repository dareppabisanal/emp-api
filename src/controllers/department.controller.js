import { asyncHandler } from "../utils/asyncHandler.js"
import { Department } from "../models/department.model.js";

const addDepartment = asyncHandler(async (req, res) => {
    const { deptName } = req.body;

    if (deptName?.trim() === "") {
        return res.status(201).json({
            ok: false,
            message: "Department name is required!",
        });
    }

    const deptExists = await Department.exists({
        deptName
    })

    if (deptExists) {
        return res.status(201).json({
            ok: false,
            message: "Department already exists!",
        });
    }

    const dept = await Department.create({
        deptName
    });

    const deptId = await Department.findById(dept._id).select("deptName");

    if (!deptId) {
        return res.status(201).json({
            ok: false,
            message: "Failed to add department!",
        });
    }

    return res.status(201).json({ ok: true, message: "Department created successfully!" });
});

const getAllDepartments = asyncHandler(async (req, res) => {
    const departments = await Department.find();

    res.status(200).json({
        ok: true,
        data: departments,
    });
});

const updateDepartment = asyncHandler(async (req, res) => {
    try {
        const { deptId, deptName } = req.body;

        if (deptName?.trim() === "") {
            return res.status(201).json({
                ok: false,
                message: "Department name is required!",
            });
        }

        const deptExists = await Department.exists({
            deptName
        })

        if (deptExists) {
            return res.status(201).json({
                ok: false,
                message: "Department already exists!",
            });
        }

        const updatedDept = await Department.findByIdAndUpdate(
            deptId,
            { deptName: deptName },
            { runValidators: true }
        );

        if (!updatedDept) {
            return res.status(404).json({ message: "Department not found!" });
        }

        res.json({ ok: true, message: "Department updated successfully!" });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            ok: true
        });
    }
});

const deleteDepartment = asyncHandler(async (req, res) => {

    try {
        const { deptId } = req.body;

        const deleted = await Department.findByIdAndDelete(deptId);

        if (!deleted) {
            return res.status(404).json({
                message: "Department not found",
                ok: false
            });
        }

        res.status(200).json({
            message: "Department deleted successfully",
            ok: true
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
            ok: true
        });
    }
});

export { addDepartment, getAllDepartments, updateDepartment, deleteDepartment }