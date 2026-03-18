import mongoose, { Schema } from "mongoose"
import { Role } from "../models/role.model.js";

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

departmentSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());

  const roleExists = await Role.exists({
    departmentId: doc._id,
  });

  if (roleExists) {
    throw new Error("Cannot delete: roles exist");
  }

  next();
});

export const Department = mongoose.model("Department", departmentSchema);