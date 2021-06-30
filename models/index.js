const users = require('./Users');
const posts = require('./posts');
const comments = require('./comments');

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