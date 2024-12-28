// models/leaveRequest.model.js

const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["en attente", "accepté", "refusé"], // Etats possibles : en attente, accepté, refusé
    default: "en attente", // Par défaut, la demande est en attente
  },
});

module.exports = mongoose.model("LeaveRequest", leaveRequestSchema);
