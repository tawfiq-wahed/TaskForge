const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

const {
    create,
    getAll,
    getAllAdmin,
    getOne,
    update,
    remove
} = require('../controllers/taskController');

router.post('/', auth, create);
router.get('/', auth, getAll);

router.get('/admin/all', auth, role('admin'), getAllAdmin);

router.get('/:id', auth, getOne);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

module.exports = router;