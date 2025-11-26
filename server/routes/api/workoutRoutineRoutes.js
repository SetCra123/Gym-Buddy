const router = require('express').Router();
const {
  savecompletedWorkoutRoutine,
  getcompletedWorkoutRoutine,
  createNewWorkoutRoutine,
  getAllworkoutRoutines,
  removeworkoutRoutine,
  getUserWorkout,
} = require('../../controllers/workoutRoutineController');



router.route('/').post(createNewWorkoutRoutine);
router.route('/').get(getAllworkoutRoutines);
router.route('/user/:userId').get(getUserWorkout)
                    .delete(removeworkoutRoutine);
//POST a saved workout
router.route('/save').post(savecompletedWorkoutRoutine);

//GET user completed workouts
router.route('/:userId').get(getcompletedWorkoutRoutine);



module.exports = router;
