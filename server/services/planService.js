
function generateWorkoutPlan(analysis) {
    const { bodyFat, muscleDistribution } = analysis;
  
    if (bodyFat > 20) {
      return {
        goal: "Fat Loss",
        split: "Full Body",
        exercises: ["Squats", "Push-ups", "Burpees"],
      };
    }
  
    return {
      goal: "Muscle Gain",
      split: "Push/Pull/Legs",
      exercises: ["Bench Press", "Deadlift", "Pull-ups"],
    };
  }
  
  function generateNutritionPlan(analysis) {
    return {
      calories: 2400,
      protein: "180g",
      carbs: "220g",
      fats: "70g",
    };
  }
  
  module.exports = { generateWorkoutPlan, generateNutritionPlan };