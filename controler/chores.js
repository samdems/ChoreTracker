import { Router } from "express";
import { Chore } from "../database.js";
const app = Router();

app.get('/', async (req, res) => {
    try {
        const chores = await Chore.findAll();
        res.status(200).json(chores);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chores.' });
    }
});

app.post('/', async (req, res) => {
    const { choreName, choreCost } = req.body;
    try {
        const newChore = await Chore.create({ name: choreName, cost: choreCost });
        res.status(201).json(newChore);
    } catch (error) {
        res.status(500).json({ message: 'Error adding chore.' });
    }
});

app.delete('/:id', async (req, res) => {
    const choreId = req.params.id;

    try {
        const chore = await Chore.findByPk(choreId);
        if (!chore) {
            return res.status(404).json({ message: 'Chore not found.' });
        }

        await chore.destroy();
        res.status(200).json({ message: 'Chore deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting chore.' });
    }
});

export default app;
