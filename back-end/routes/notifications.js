const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Routes pour gérer les notifications
router.get('/', notificationController.getNotifications);
router.post('/', notificationController.addNotification);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
