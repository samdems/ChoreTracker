import { Router } from "express";
import { Chore } from "../database.js";
const app = Router();

app.get("/", async (req, res) => {
  try {
    const chores = await Chore.findAll();
    res.render("chores", { chores });
  } catch (error) {
    res.render("chores", { chores:[], error });
  }
});

app.post('/', async (req, res) => {
    const { name, cost } = req.body;
    try {
      const newchore = await Chore.create({ name, cost });
      const chores = await Chore.findAll();
      res.render("chores", { chores });
    } catch (error) {
      console.error(error);
      res.render("chores", { chores:[], error });
    }
});

app.delete('/:id', async (req, res) => {
  const choreId = req.params.id;

  try {
    const chore = await Chore.findByPk(choreId);
    if (!chore) {
      return res.status(404).json({ message: 'chore not found.' });
    }

    await chore.destroy();
    res.status(200).json({ message: 'chore deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting chore.' });
  }
});

export default app; 