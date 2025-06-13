const router = require('express').Router();
const {
  createExercise,
  getExercise,
  getAllExercises,
  updateExercise,
  removeExercise,
} = require('../../controllers/exerciseController');



router.route('/').post(createExercise);
router.route('/').get(getAllExercises);
router.route('/current-exercise').get(getExercise);
router.route('/:Id').delete(removeExercise);
router.route('/:Id').put(updateExercise);


module.exports = router;
