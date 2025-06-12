const Exercise = require('../models/Exercise');

module.exports = {
    //get all exercises
    async getAllExercises(req, res,) {
      try {
        const userId = req.user.id;
        const allUserExcercises = await Exercise.find({ user: userId }).sort({ date: -1 });
        res.json(allUserExcercises);
        
        //const allExercises = await Exercise.find();
         //res.json(allExercises);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    //get single exercise
    async getExercise(req, res) {
      try {
        const currentExercise = await Exercise.findOne({ _id: req.params.exerciseId })
        .select('-__v');

        if (!currentExercise)  {
            return res.status(404).json({message: 'No exercise with that ID'});
        }

        res.json(currentExercise);
      } catch (err) {
        res.status(500).json(err);
      } 
    },
    //create new exercise
    async createExercise(req, res) {
      try {
        const dbExerciseData = await Exercise.create(req.body);
        res.json(dbExerciseData);
      } catch (err) {
        res.status(500).json(err);
      } 
    },
    //update an exercise
    async updateExercise(req, res) {
        try {
            const exercise = await Exercise.findOneAndUpdate(
                {_id: req.params.exerciseId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!exercise) {
                return res.status(404).json({message:'No exercise with this id!' });
            }
        res.json(exercise);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
    },
    //delete an exercise
    async removeExercise(req, res) {
      try {
        const exercise = await Exercise.findOneAndRemove({ _id: req.params.exerciseId});

        if (!exercise) {
            return res.status(404).json({ message: 'No exercise with this id!' });
          }

          if (!exercise) {
            return res
              .status(404)
              .json({ message: 'Exercise created but no era with this id!' });
      }
      res.json ({ message: 'Exercise successfully deleted!'})
      } catch (err) {
        res.status(500).json(err);
      }
},

};