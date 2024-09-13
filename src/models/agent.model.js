import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    dob: { type: String, required: true },
    address: { type: String, required: true },
    postOffice: { type: String, required: true },
    pincode: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    punchayathMunicipality: { type: String, required: true },
    wardNumber: { type: String, required: true },
    cdsName: { type: String },
    photo: { type: String, required: true },
    agentID: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
