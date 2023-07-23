import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

export default sequelize.define('Log', {
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