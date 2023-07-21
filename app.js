import express from 'express';
import bodyParser from 'body-parser';
import {User,Chore,Log} from './database.js'
import userRoute from './controler/Users.js'
import choreRoute from './controler/chores.js'
import logRoute from './controler/logs.js'

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use('/users',userRoute)
app.use('/chores',choreRoute)
app.use('/logs',logRoute)

app.get('/add-debt', async(req, res) => {

  const users = await User.findAll();
  const chores = await Chore.findAll();
  res.render('addDebtForm',{users,chores,error:null,info:null}) 
});

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
    await Log.create({ name:user.name, amount: chore.cost,type:'add-debt',notes:chore.name });
    await user.save();
    const info= `added debt ${chore.cost} to ${user.name}`
    res.render("users", { users,error:null,info });
  } catch (error) {
    const users = await User.findAll();
    const chores = await Chore.findAll();
    console.error(error);
    res.render("addDebtForm", { users,chores,error:'Error adding debt.',info:null });
  }
});

app.get('/payment-form', async (req, res) => {
  try {
    const users = await User.findAll();
    res.render('paymentForm',{users,error:null,info:null}) 
  } catch (error) {
    res.render("paymentForm", { users:[],error:'Error fetching user data.',info:null });
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
    await Log.create({ name:user.name, amount:0-amount,type:'make-payment',notes:req.body.notes });
    await user.save();

    const users = await User.findAll();
    const info = `Paid ${amount} towards ${user.name}'s debt.` 
    res.render("users", { users,error:null,info });
  } catch (error) {
    const users = await User.findAll();
    return res.render("paymentForm", { users,error:'Error making payment.',info:null });
  }
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
