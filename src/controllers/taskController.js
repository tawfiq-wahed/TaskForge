const db = require('../config/db');

exports.create = (req, res) => {
    const { title, description } = req.body;

    db.query(
        "INSERT INTO tasks(title,description,user_id) VALUES (?,?,?)",
        [title, description, req.user.id],
        () => res.json({ message: "Task created" })
    );
};

exports.getAll = (req, res) => {
    db.query(
        "SELECT * FROM tasks WHERE user_id=?",
        [req.user.id],
        (err, result) => res.json(result)
    );
};

exports.getAllAdmin = (req, res) => {
    db.query(
        "SELECT * FROM tasks",
        (err, result) => res.json(result)
    );
};


exports.getOne = (req, res) => {
    db.query(
        "SELECT * FROM tasks WHERE id=? AND user_id=?",
        [req.params.id, req.user.id],
        (err, r) => {
            if (r.length === 0) return res.status(403).json({ message: "Denied" });
            res.json(r[0]);
        }
    );
};


exports.update = (req, res) => {
    const { title, description, status } = req.body;

    db.query(
        "UPDATE tasks SET title=?,description=?,status=? WHERE id=? AND user_id=?",
        [title, description, status, req.params.id, req.user.id],
        (err, r) => {
            if (r.affectedRows === 0) return res.status(403).json({ message: "Denied" });
            res.json({ message: "Updated" });
        }
    );
};


exports.remove = (req, res) => {
    db.query(
        "DELETE FROM tasks WHERE id=? AND user_id=?",
        [req.params.id, req.user.id],
        (err, r) => {
            if (r.affectedRows === 0) return res.status(403).json({ message: "Denied" });
            res.json({ message: "Deleted" });
        }
    );
};