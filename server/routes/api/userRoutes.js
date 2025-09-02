const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  login,
  getUsers,
  removeUser,
  updateUserProfile
} = require('../../controllers/userController');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser);

router.route('/login').post(login);
router.route('/').get(getUsers);
router.route('/:userId').delete(removeUser);

router.route('/me').get(authMiddleware, getSingleUser)
                   .put(authMiddleware, updateUserProfile);

module.exports = router;
