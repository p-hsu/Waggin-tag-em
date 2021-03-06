
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
class Image extends Model {}

Image.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    }
    // pet_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //       model: 'pet',
    //       key: 'id'
    //   }
  // }
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'image',
  }
);

module.exports = Image;