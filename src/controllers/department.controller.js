import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
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

    return res.status(201).json({ ok: true, message: "Department created successfully!"});
})

export { addDepartment }