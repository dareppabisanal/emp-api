import mongoose, { Schema } from "mongoose"

const roleSchema = new Schema(
    {
        roleName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export const Role = mongoose.model("Role", roleSchema);