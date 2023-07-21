import { Router } from "express";
import { User,Log } from "../database.js";
const app = Router();

app.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.render("users", { users,error:null,info:null });
  } catch (error) {
    res.render("users", { users:[], error:error,info:null });
  }
});

app.post('/', async (req, res) => {
    const { name, totalDebt } = req.body;
    try {
      const newUser = await User.create({ name, totalDebt });
      const info = `made user ${newUser.name}`
      const users = await User.findAll();
      await Log.create({ name:newUser.name, amount:totalDebt,type:'added',TotalAmount:totalDebt });
      res.render("users", { users,error:null,info });
    } catch (error) {
      console.error(error);
      res.render("users", { users:[], error:error,info:null });
    }
});

app.post('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await Log.create({ name:user.name, TotalAmount:user.totalDebt,type:'delete' });
    await user.destroy();
    const users = await User.findAll();
    res.render("users", { users,error:null,info:'User deleted successfully.' });
  } catch (error) {
    const users = await User.findAll();
    res.render("users", { users,error:'Error deleting user.',info:null });
  }
});

export default app; 