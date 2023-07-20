const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

// Connect to SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Path to the SQLite file
});

// Define User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalDebt: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
});

// Define Chore model
const Chore = sequelize.define('Chore', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Create tables for User and Chore models (if they don't exist)
sequelize.sync();

const app = express();
app.use(bodyParser.json());

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.post('/users', async (req, res) => {
  const { name, totalDebt } = req.body;
  try {
    const newUser = await User.create({ name, totalDebt });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error adding user.' });
  }
});

app.post('/chores', async (req, res) => {
  const { name, cost } = req.body;
  try {
    const newChore = await Chore.create({ name, cost });
    res.status(201).json(newChore);
  } catch (error) {
    res.status(500).json({ message: 'Error adding chore.' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users.' });
  }
});

app.get('/chores', async (req, res) => {
  try {
    const chores = await Chore.findAll();
    res.status(200).json(chores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chores.' });
  }
});

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
