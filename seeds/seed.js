const sequelize = require('../config/connect');
const { users, posts, comments } = require('../models');
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./comments.json');

const seedTechBlogDb = async () => {
    await sequelize.sync({ force: true });
    await users.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
      });
    await posts.bulkCreate(postData)
    await comments.bulkCreate(commentData)

    process.exit(0);
};


seedTechBlogDb();
