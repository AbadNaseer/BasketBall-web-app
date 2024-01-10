// routes/teamRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const teamController = require('../controllers/teamController');

// Apply the middleware to the relevant routes
router.post('/create', authMiddleware, teamController.createTeam);
router.put('/update/:teamId', authMiddleware, teamController.updateTeam);
router.delete('/delete/:teamId', authMiddleware, teamController.deleteTeam);

module.exports = router;
