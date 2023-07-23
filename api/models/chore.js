import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

export default sequelize.define('Chore', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
});
