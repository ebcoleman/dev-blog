// const User = require('./User');
// const Post = require('./Post');
// const Comment = require('./Comment');

// User.hasMany(Post, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Post.belongsTo(User, {
//   foreignKey: 'user_id'
// });

// // below is incorrect
// Comment.belongsTo(Post, {
//     foreignKey: 'user_id'
//   });

// module.exports = { User, Post, Comment };

const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id' // Corrected foreign key
});

module.exports = { User, Post, Comment };
