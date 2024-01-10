// backend/controllers/teamController.js
const Team = require('../models/teamModel');

exports.createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    const createdBy = req.user; // Assuming you set the user in the request during authentication

    // Create a new team
    const newTeam = new Team({ name, createdBy });
    await newTeam.save();

    res.status(201).json(newTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const createdBy = req.user; // Assuming you set the user in the request during authentication

    // Check if the team exists and is created by the current user
    const team = await Team.findOne({ _id: id, createdBy });
    if (!team) {
      return res.status(404).json({ error: 'Team not found or unauthorized' });
    }

    // Update the team
    team.name = name;
    await team.save();

    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const createdBy = req.user; // Assuming you set the user in the request during authentication

    // Check if the team exists and is created by the current user
    const team = await Team.findOne({ _id: id, createdBy });
    if (!team) {
      return res.status(404).json({ error: 'Team not found or unauthorized' });
    }

    // Delete the team
    await team.remove();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
