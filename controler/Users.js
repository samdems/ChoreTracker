import { Router } from "express";
import { User } from "../database.js";
const app = Router();

app.get('/', async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users.' });
    }
});

app.post('/', async (req, res) => {
    const { name, totalDebt } = req.body;
    try {
      const newUser = await User.create({ name, totalDebt });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Error adding user.' });
    }
});

app.delete('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user.' });
  }
});

export default app; 