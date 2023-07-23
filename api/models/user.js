import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

export default sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalDebt: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  } 
});