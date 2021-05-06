
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
class Pet extends Model {}

Pet.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sex: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    about_me: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    about_you: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pet',
  }
);

module.exports = Pet;