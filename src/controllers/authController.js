const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail, getAllUsers } = require('../services/authService');
const generateToken = require('../utils/jwt');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    const exist = await findUserByEmail(email);
    if (exist) return res.status(400).json({ message: "Email exists" });

    const hash = await bcrypt.hash(password, 10);
    await createUser(username, email, hash);

    res.json({ message: "Registered" });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid" });

    const token = generateToken(user);

    res.json({ token });
};

exports.getUsers = async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
};