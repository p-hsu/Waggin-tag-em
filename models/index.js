const User = require('./Users');
const Pet = require('./Pets');
const Image = require('./images');

User.hasMany(Pet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Pet.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Image, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Image.belongsTo(User, {
  foreignKey: 'user_id'
})

Image.hasOne(Pet, {
  foreignKey: 'image_id'
})

Pet.belongsTo(Image, {
  foreignKey: 'image_id',
})
//Image belongs to Pet, Pet hasOne Image, Pet -> user

module.exports = { User, Pet, Image };