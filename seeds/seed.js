const sequelize = require('../config/connect');
const { users, posts } = require('../models');
const userData = require('./userData.json');
const postData = require('./postData.json');


const seedTechBlogDb = async () => {
    await sequelize.sync({ force: true });
  
    const techBlogUsers = await users.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    for (const tbposts of postData) {
        await posts.create({
          ...tbposts,
          user_id: techBlogUsers.id,
        });
      }
    
      process.exit(0);
    };

seedTechBlogDb();
