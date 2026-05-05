const db = require('../config/db');

const createTask = (title, desc, userId) => {
    return db.promise().query(
        "INSERT INTO tasks(title,description,user_id) VALUES (?,?,?)",
        [title, desc, userId]
    );
};

const getUserTasks = (userId) => {
    return db.promise().query(
        "SELECT * FROM tasks WHERE user_id=?",
        [userId]
    );
};

const getAllTasks = () => {
    return db.promise().query("SELECT * FROM tasks");
};

module.exports = { createTask, getUserTasks, getAllTasks };