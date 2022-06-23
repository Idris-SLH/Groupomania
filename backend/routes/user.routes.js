// PARCOURS UTILISATEURS 
const router = require('express').Router();
const userController = require('../controllers/user.controller')
const authController = require('../controllers/auth.controller')

router.post('/signup', authController.signUp);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.put('/:id', userController.modifyUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;