const users = require('./users.js');
const posts = require('./posts.js');
const comments = require('./comments.js');

users.hasMany(posts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

users.hasMany(comments, {
    foreignKey:'user_id',
    onDelete:'CASCADE'
});

posts.belongsTo(users, {
  foreignKey: 'user_id',
});

posts.hasMany(comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

comments.belongsTo(users, {
  foreignKey: 'user_id',
});

comments.belongsTo(posts, {
    foreignKey: 'post_id',
});

module.exports = { users, posts, comments };