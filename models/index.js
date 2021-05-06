const User = require('./Users');
const Pet = require('./Pets');

User.hasMany(Pet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Pet.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Pet };