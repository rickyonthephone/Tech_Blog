const users = require('./users');
const posts = require('./posts');

users.hasMany(posts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

posts.belongsTo(users, {
  foreignKey: 'user_id'
});

module.exports = { users, posts };