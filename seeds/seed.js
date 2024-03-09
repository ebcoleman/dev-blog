const fs = require('fs');
const { User, Post, Comment } = require('../models');

const seedDatabase = async () => {
  // Read JSON files
  const userData = JSON.parse(fs.readFileSync('./seeds/users.json', 'utf-8'));
  const postData = JSON.parse(fs.readFileSync('./seeds/posts.json', 'utf-8'));
  const commentData = JSON.parse(fs.readFileSync('./seeds/comments.json', 'utf-8'));

  // Seed Users
  await User.bulkCreate(userData);

  // Seed Posts
  await Post.bulkCreate(postData);

  // Seed Comments
  await Comment.bulkCreate(commentData);
};

seedDatabase().then(() => {
  console.log('Database seeded successfully');
}).catch((error) => {
  console.error('Error seeding database:', error);
});
 