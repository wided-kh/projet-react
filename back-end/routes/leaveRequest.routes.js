const express = require("express");
const router = express.Router();
const leaveRequestController = require("../controllers/leaveRequest.controller");

router.get("/", leaveRequestController.getAllRequests);
router.post("/", leaveRequestController.createRequest);
router.patch("/:id", leaveRequestController.updateLeaveRequestStatus); // Modifier le statut

module.exports = router;
