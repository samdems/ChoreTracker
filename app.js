import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {User,Chore} from './database.js'
import userRoute from './controler/Users.js'
import choreRoute from './controler/chores.js'

const app = express();
app.use(bodyParser.json());

app.use('/users',userRoute)
app.use('/chores',choreRoute)
app.post('/add-debt/:userId/:choreId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const choreId = parseInt(req.params.choreId);

  try {
    const user = await User.findByPk(userId);
    const chore = await Chore.findByPk(choreId);

    if (!user || !chore) {
      return res.status(404).json({ message: 'User or chore not found.' });
    }

    user.totalDebt += chore.cost;
    await user.save();

    res.status(200).json({ message: `Added ${chore.cost} to ${user.name}'s debt.` });
  } catch (error) {
    res.status(500).json({ message: 'Error adding debt.' });
  }
});

app.post('/make-payment/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { amount } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than zero.' });
    }

    if (amount > user.totalDebt) {
      return res.status(400).json({ message: 'Payment cannot exceed total debt.' });
    }

    user.totalDebt -= amount;
    await user.save();

    res.status(200).json({ message: `Paid ${amount} towards ${user.name}'s debt.` });
  } catch (error) {
    res.status(500).json({ message: 'Error making payment.' });
  }
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
