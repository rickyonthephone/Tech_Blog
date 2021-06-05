const sequelize = require('../config/connect');
const { users, posts, comments } = require('../models');
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./comments.json');

const seedTechBlogDb = async () => {
    await sequelize.sync({ force: true });
  
    const techBlogUsers = await users.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    for (const tbPosts of postData) {
        await posts.create({
          ...tbPosts,
          user_id: techBlogUsers.id,
        });

    for (const tbComments of commentData) {
        await comments.create ({
           ...tbComments,
           user_id: techBlogUsers.id, 
        }); 
      }
    }
      process.exit(0);
    };

seedTechBlogDb();
