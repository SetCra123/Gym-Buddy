const WorkoutRoutine = require('../models/WorkoutRoutine');
const User = require('../models/User');


module.exports = {
    async createNewWorkoutRoutine(req, res,) {
      try {
        const { userId, exercises, duration, intensity, difficulty, goal } = req.body;
        console.log(req.body);

        const newWorkoutRoutine = await WorkoutRoutine.create({
            userId,
            exercises,
            duration,
            intensity,
            difficulty,
            goal,


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

    async getUserWorkout(req, res) {
      try {
        const { userId } = req.params;  // from URL
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Ensure the user has required profile info
        if (!user.fitness_level || !user.goal) {
          return res.status(400).json({ message: "User profile incomplete" });
        }
    
        // Find workout routine based on profile
        const workoutRoutine = await WorkoutRoutine.findOne({
          fitnessLevel: user.fitness_level,
          goal: user.goal,
        }).populate("exercises");
    
        if (!workoutRoutine) {
          return res.status(404).json({ message: "No workout found for this user" });
        }
    
        res.json(workoutRoutine);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      }
    },
  
    
  
    //remove item
    async removeworkoutRoutine(req, res) {
      try {
        const workoutRoutine = await WorkoutRoutine.findOneAndRemove({ _id: req.params.workoutRoutineId });
  
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