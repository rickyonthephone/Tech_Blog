const sequelize = require('../config/connect');
const { posts, users, comments } = require('../models');
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedTechBlogDb = async () => {
    await sequelize.sync({ force: true });
        console.log ('\n---------- DATABASE SYNCED ----------\n');
    await users.bulkCreate(userData, 
      {
        individualHooks: true,
        returning: true,
      });
        console.log('\n---------- USERS SEEDED ----------\n');
    await posts.bulkCreate(postData);
        console.log('\n---------- POSTS SEEDED ----------\n');
    await comments.bulkCreate(commentData);
        console.log('\n---------- COMMENTS SEEDED ----------\n');

    process.exit(0);
};


seedTechBlogDb();

module.exports = { seedTechBlogDb };
