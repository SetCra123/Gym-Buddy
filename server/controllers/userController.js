const User = require('../models/User');
const WorkoutRoutine = require('../models/WorkoutRoutine');
const Exercise = require('../models/Exercise');

// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
    // get a single user by either their id or their username
    async getSingleUser({ user = null, params }, res) {
        const foundUser = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });

        if (!foundUser) {
            return res.status(400).json({ message: 'Cannot find a user with this id!' });
        }

        res.json(foundUser);
    },
    
    async getUsers(req, res) {
        const foundUsers = await User.find();

        if (!foundUsers) {
            return res.status(400).json({ message: 'Cannot find a user with this id!' });
        }

        res.json(foundUsers);
    },
    
    
    
    // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    async createUser({ body }, res) {
        console.log(body)
        const user = await User.create(body);

        if (!user) {
            return res.status(400).json({ message: 'Something is wrong!' });
        }
        const token = signToken(user);
        console.log(user, token);
        res.json({ token, user });
    },
    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    // {body} is destructured req.body
    async login({ body }, res) {
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
        if (!user) {
            return res.status(400).json({ message: "Can't find this user" });
        }


        const correctPw = await user.isCorrectPassword(body.password);

        if (!correctPw) {
            return res.status(400).json({ message: 'Wrong password!' });
        }
        const token = signToken(user);
        res.json({ token, user });
    },



    //remove user
    async removeUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'User created but no user with this id!' });
            }

            res.json({ message: 'User successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },


    async updateUserProfile(req, res) {
      console.log("🟢 Incoming profile update request...");
      console.log("🔑 Authenticated user:", req.user);
      console.log("📦 Request body:", req.body);
    
      try {
        const updates = req.body;
        const user = await User.findById(req.user._id);
        
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
      
        // ✅ Only update fields that are actually provided
        Object.keys(updates).forEach((key) => {
          if (updates[key] !== undefined && updates[key] !== null && updates[key] !== "") {
             user[key] = updates[key];
          }
        });
    
        // ✅ Assign workout only when BOTH goal and fitness_level are set
        if (user.goal && user.fitness_level) {
         const routine = await WorkoutRoutine.findOne({
          goal: user.goal,
          fitness_level: user.fitness_level,
        });

        if (routine) {
          user.workout_routine = [routine._id];
          user.profileComplete = true; // mark as complete only at this stage
        }
      }

    
      const updatedUser = await user.save();
      const populatedUser = await User.findById(updatedUser._id)
        .populate("workout_routine");
        console.log("✅ Sending updated user back to frontend:", populatedUser);
        
      res.json(populatedUser);
    } catch (err) {
      console.error("❌ Error updating user profile:", err);
      res.status(500).json({ message: "Failed to update profile" });
    }
    },


async assignWorkoutRoutine(req, res) {
  try {
    const user = await User.findById(req.user._id)

    if(!user.goal || !user.fitness_level){}
      return res.status(400).json({
        message: "User must have a goal and fitness level before assigning a routine",
      });
    
    // Find a routine that matches goal and fitness
    const routine = await WorkoutRoutine.findOne({
      goal: user.goal,
      fitness_level: user.fitness_level,
    }).populate("excercises");
    if (!routine) {
      return res.status(404).json({ 
        message: `No routine found for goal: ${user.goal} and fitness level: ${user.fitness_level}`,
      });
    }  

    // Assign the routine to the user
    user.workout_routine = routine._id;
    await user.save();

    console.log(`🏋️ Assigned ${routine.name} to ${user.username}`);

    // Return routine details
    res.json({
      message: "Routine assigned successfully!",
      routine,
    });
  } catch (err) {
    console.error("❌ Error assigning routine:", err);
    res.status(500).json({ message: "Failed to assign workout routine" });
  }
},

async updateUserGoal(req, res) {
  try {
    const { goal } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user_.id,
      { goal },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.error("❌ Error updating goal:", err);
    res.status(500).json({message: "Failed to update goal"});
  }

 },

async updateFitnessLevel(req, res){
  try {
    const { fitness_level } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { fitness_level },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.error("❌ Error updating fitness level:", err);
    res.status(500).json({message: "Failed to update fitness level"});
  }
}

};
