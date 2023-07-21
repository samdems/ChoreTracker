import { Router } from "express";
import { Chore } from "../database.js";
const app = Router();

app.get("/", async (req, res) => {
  try {
    const chores = await Chore.findAll();
    res.render("chores", { chores,error:null,info:null });
  } catch (error) {
    res.render("chores", { chores:[], error,info:null});
  }
});

app.post('/', async (req, res) => {
    const { name, cost } = req.body;
    try {
      const newchore = await Chore.create({ name, cost });
      const chores = await Chore.findAll();
      const info = `new chore made: ${newchore.name}`
      res.render("chores", { chores,error:null,info });
    } catch (error) {
      console.error(error);
      res.render("chores", { chores:[], error,info:null });
    }
});

app.post('/:id', async (req, res) => {
  const choreId = req.params.id;

  try {
    const chore = await Chore.findByPk(choreId);
    if (!chore) {
      return res.status(404).json({ message: 'chore not found.' });
    }

    await chore.destroy();
    const chores = await Chore.findAll();
    const info = `chore removed`
    res.render("chores", { chores,error:null,info });
  } catch (error) {
    const chores = await Chore.findAll();
    res.render("chores", { chores,error:error,info:null });
  }
});

export default app; 