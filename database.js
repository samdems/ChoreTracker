import { Sequelize, DataTypes } from 'sequelize';

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

// Connect to PostgreSQL database
export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
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
  TotalAmount: {
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