const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const ejs = require('ejs');

// Middleware
app.use(bodyParser.json());

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Data storage (replace this with a database in a real-world application)
const users = [];
const chores = [];

// Routes
app.post('/users', (req, res) => {
  const { name, totalDebt } = req.body;
  const newUser = { name, totalDebt };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.post('/chores', (req, res) => {
  const { name, cost } = req.body;
  const newChore = { name, cost };
  chores.push(newChore);
  res.status(201).json(newChore);
});

app.get('/users', (req, res) => {
    res.status(200).json(users);
  });
  
  // Route to get all chores
app.get('/chores', (req, res) => {
  res.status(200).json(chores);
});

app.post('/add-debt/:userId/:choreId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const choreId = parseInt(req.params.choreId);

  const user = users.find((u) => u.id === userId);
  const chore = chores.find((c) => c.id === choreId);

  if (!user || !chore) {
    return res.status(404).json({ message: 'User or chore not found.' });
  }

  user.totalDebt += chore.cost;
  res.status(200).json({ message: `Added ${chore.cost} to ${user.name}'s debt.` });
});

app.post('/make-payment/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { amount } = req.body;

  const user = users.find((u) => u.id === userId);

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
  res.status(200).json({ message: `Paid ${amount} towards ${user.name}'s debt.` });
});

app.get('/users-page', (req, res) => {
    res.render('users', { users });
  });
  
  // Route to render the chores.html page
  app.get('/chores-page', (req, res) => {
    res.render('chores', { chores });
  });


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
