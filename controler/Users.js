import { Router } from "express";
import { User } from "../database.js";
const app = Router();

app.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.render("users", { users });
  } catch (error) {
    res.render("users", { users:[], error });
  }
});

app.post('/', async (req, res) => {
    const { name, totalDebt } = req.body;
    try {
      const newUser = await User.create({ name, totalDebt });
      const users = await User.findAll();
      res.render("users", { users });
    } catch (error) {
      console.error(error);
      res.render("users", { users:[], error });
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