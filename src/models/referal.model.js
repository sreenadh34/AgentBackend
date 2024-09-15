const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({
  referrerId: { type: String, required: true },
  referredAgentId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Referral = mongoose.model("Referral", referralSchema);

module.exports = Referral;
