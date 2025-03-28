const WorkoutRoutine = require('../models/WorkoutRoutine');
const User = require('../models/User');

module.exports = {
    async createNewWorkoutRoutine(req, res,) {
      try {
        const { userId, exercises, duration, intensity } = req.body;
        console.log(req.body);

        const newWorkoutRoutine = await WorkoutRoutine.create({
            userId,
            exercises,
            duration,
            intensity,


        });

        await newWorkoutRoutine.save();

        await User.findByIdAndUpdate(userId, { $push: { workoutRoutine: newWorkoutRoutine._id } });
  
        res.status(201).json(newWorkoutRoutine);
      } catch (err) {
        res.status(400).json({message: 'Server error'});
      }
    },
  
    async getAllworkoutRoutines(req, res,) {
      try {
        const workoutRoutine = await WorkoutRoutine.find().populate('user').populate('exercises');
        console.log(workoutRoutine);
  
        res.json(workoutRoutine);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  
    async getworkoutRoutine(req, res) {
      try {
        const workoutRoutine = await WorkoutRoutine.findOne({ _id: req.params.workoutRoutineId })
          .select('-__v');
  
        if (!workoutRoutine) {
          return res.status(404).json({ message: 'No routine with that ID' });
        }
  
        res.json(workoutRoutine);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  
    
  
    //remove item
    async removeworkoutRoutine(req, res) {
      try {
        const workoutRoutine = await WorkoutRoutine.findOneAndRemove({ _id: req.params.itemId });
  
        if (!workoutRoutine) {
          return res.status(404).json({ message: 'No item with this id!' });
        }
  
        if (!workoutRoutine) {
          return res
            .status(404)
            .json({ message: 'Item created but no user with this id!' });
        }
  
        res.json({ message: 'Item successfully deleted!' });
      } catch (err) {
        res.status(500).json(err);
      }
    },
  
    
  };