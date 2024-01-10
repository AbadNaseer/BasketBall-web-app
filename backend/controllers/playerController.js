// backend/controllers/playerController.js
const Player = require('../models/playerModel');

exports.createPlayer = async (req, res) => {
  try {
    const { name, position } = req.body;
    const createdBy = req.user; // Assuming you set the user in the request during authentication

    // Create a new player
    const newPlayer = new Player({ name, position, createdBy });
    await newPlayer.save();

    res.status(201).json(newPlayer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position } = req.body;
    const createdBy = req.user; // Assuming you set the user in the request during authentication

    // Check if the player exists and is created by the current user
    const player = await Player.findOne({ _id: id, createdBy });
    if (!player) {
      return res.status(404).json({ error: 'Player not found or unauthorized' });
    }

    // Update the player
    player.name = name;
    player.position = position;
    await player.save();

    res.status(200).json(player);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const createdBy = req.user; // Assuming you set the user in the request during authentication

    // Check if the player exists and is created by the current user
    const player = await Player.findOne({ _id: id, createdBy });
    if (!player) {
      return res.status(404).json({ error: 'Player not found or unauthorized' });
    }

    // Delete the player
    await player.remove();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
