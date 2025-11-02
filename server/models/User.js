const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');


const userSchema = new Schema (
    {
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      profileComplete: {
        type: Boolean,
        default: false,
      },
      password: {
        type: String,
        required: true,
      },
      height: [{
        type: String,
        ref: "Height",
        required: true,
      }],
      weight: [{
        type: Number,
        ref: "Weight",
        required: true,
      }],
      fitness_level: [{
        type: String,
        ref: "Curret_Body_Type",
        required: true,
        enum: ['beginner', 'intermediate', 'advanced']
      }],
      goal: [{
        type: String,
        ref: "Goal",
        required: true,
        enum: ['lean', 'strength', 'bulk', 'toned']
      }],
      workout_routine: [{
        type: Schema.Types.ObjectID,
        ref: "WorkoutRoutine"
      }]
    //   createdAt: {
    //     type: Date,
    //     default: Date.now(),
    //     require: true,
    //   },

 }
);

//set-up middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
//check if entered password matches saved password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };


const User = mongoose.model('User', userSchema);




module.exports = User;