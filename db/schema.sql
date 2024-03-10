DROP DATABASE IF EXISTS blog_db;
CREATE DATABASE blog_db;

USE blog_db;

-- Create the `user` table
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Create the `post` table
CREATE TABLE post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_title VARCHAR(255) NOT NULL,
    post_body TEXT,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Create the `comment` table
CREATE TABLE comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment_body TEXT NOT NULL,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    post_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE
);
