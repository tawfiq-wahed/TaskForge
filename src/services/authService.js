const db = require('../config/db');

const createUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO users (username,email,password) VALUES (?,?,?)",
            [username, email, password],
            (err, res) => err ? reject(err) : resolve(res)
        );
    });
};

const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM users WHERE email=?",
            [email],
            (err, res) => err ? reject(err) : resolve(res[0])
        );
    });
};

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT id,username,email,role FROM users",
            (err, res) => err ? reject(err) : resolve(res)
        );
    });
};

module.exports = { createUser, findUserByEmail, getAllUsers };