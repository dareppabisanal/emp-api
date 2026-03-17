import mongoose, { Schema } from "mongoose"

const departmentSchema = new Schema(
    {
        deptName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        }
    },
    { 
        timestamps: true
    }
);

export const Department = mongoose.model("Department", departmentSchema);