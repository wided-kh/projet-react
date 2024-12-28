// controllers/leaveRequest.controller.js

const LeaveRequest = require("../models/leaveRequest.model");

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await LeaveRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des demandes." });
  }
};

exports.createRequest = async (req, res) => {
  const { name, reason, startDate, endDate } = req.body;
  try {
    const newRequest = new LeaveRequest({ name, reason, startDate, endDate });
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la demande." });
  }
};

// Déclaration et exportation de la fonction updateLeaveRequestStatus
exports.updateLeaveRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['accepted', 'refused'].includes(status)) {
    return res.status(400).json({ message: "Statut invalide" });
  }

  try {
    const leaveRequest = await LeaveRequest.findByIdAndUpdate(id, { status }, { new: true });
    if (!leaveRequest) {
      return res.status(404).json({ message: "Demande de congé non trouvée" });
    }
    res.json(leaveRequest);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la demande" });
  }
};
