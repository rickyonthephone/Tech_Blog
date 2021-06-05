const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');

users.hasMany(posts, {
  foreignKey: 'user_id'
});

posts.belongsTo(users, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

comments.belongsTo(users, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

posts.hasMany(comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

users.hasMany(comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { users, posts, comments };