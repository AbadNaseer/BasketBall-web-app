// backend/routes/playerRoutes.js
const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.post('/create', playerController.createPlayer);
router.put('/update/:id', playerController.updatePlayer);
router.delete('/delete/:id', playerController.deletePlayer);

module.exports = router;
