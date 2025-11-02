const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  login,
  getUsers,
  removeUser,
  updateUserProfile,
  assignWorkoutRoutine,
  updateUserGoal,
  updateFitnessLevel
} = require('../../controllers/userController');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser);

router.route('/login').post(login);
router.route('/').get(getUsers);
router.route('/:userId').delete(removeUser);

router.route('/me').get(authMiddleware, getSingleUser);
router.route('/me').put(authMiddleware, updateUserProfile);
router.route('/assign-routine').put(authMiddleware, assignWorkoutRoutine);
router.route('/update-goal').put(authMiddleware, updateUserGoal);
router.route('/update-fitness').put(authMiddleware, updateFitnessLevel);

module.exports = router;
