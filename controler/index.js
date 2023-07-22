import { Router } from "express";
import { Chore,User,Log } from "../database.js";
const app = Router();


app.get('/add-debt', async(req, res) => {

    const users = await User.findAll();
    const chores = await Chore.findAll();
    res.render('addDebtForm',{users,chores,error:null,info:null}) 
});
app.get('/',(req,res)=>{
  res.send('home')
})

app.post('/add-debt', async (req, res) => {
  const userId = parseInt(req.body.userId);
  const choreId = parseInt(req.body.choreId);

  try {
    const user = await User.findByPk(userId);
    const chore = await Chore.findByPk(choreId);
    const users = await User.findAll();
    const chores = await Chore.findAll();
    if (!user || !chore) {
      res.render("addDebtForm", { users,chores,error:'User or chore not found.',info:null });
    }

    user.totalDebt += chore.cost;
    await Log.create({ name:user.name, amount: chore.cost,type:'add-debt',notes:chore.name,TotalAmount:user.totalDebt });
    await user.save();
    const info= `added debt ${chore.cost} to ${user.name}`
    res.render("addDebtForm", {users:await User.findAll(),chores,error:null,info });
  } catch (error) {
    const users = await User.findAll();
    const chores = await Chore.findAll();
    console.error(error);
    res.render("addDebtForm", { users,chores,error:'Error adding debt.',info:null });
  }
});


app.post('/make-payment', async (req, res) => {
  const userId = parseInt(req.body.userId);
  const { amount } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.render("paymentForm", { users:[],error:'User not found.',info:null });
    }

    if (amount <= 0) {
      return res.render("paymentForm", { users:[],error:'Amount must be greater than zero.',info:null });
    }

    user.totalDebt -= amount;
    await Log.create({ name:user.name, amount:0-amount,type:'make-payment',notes:req.body.notes,TotalAmount:user.totalDebt });
    await user.save();

    const users = await User.findAll();
    const info = `Paid ${amount} towards ${user.name}'s debt.`
        const chores = await Chore.findAll();

    res.render("addDebtForm", { users,chores,error:null,info });
  } catch (error) {
    const users = await User.findAll();
    return res.render("paymentForm", { users,error:'Error making payment.',info:null });
  }
});

export default app