import { Sequelize, DataTypes } from 'sequelize';

// Connect to SQLite database
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Path to the SQLite file
});

// Define User model
export const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalDebt: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  } 
});
export const Log = sequelize.define('log', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  type:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes:{
    type: DataTypes.STRING,
    defaultValue: "",
  }
});
// Define Chore model
export const Chore = sequelize.define('Chore', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

sequelize.sync()
  .then(() => {
    console.log('Tables have been created');
  })
  .catch((error) => {
    console.error('Error creating tables:', error);
  });