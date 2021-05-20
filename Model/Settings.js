const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  setting: {
    type: String,

    default:
      '{"main":{},"nutrition":{"dailyDemand":{"kcal":2000,"proteins":120,"fats":55,"carbs":240},"namesOfMeals":{"0":"Breakfast","1":"II Breakfast","2":"Lunch","3":"Snack","4":"Dinner","5":"","6":"","7":"","8":"","9":""},"numberOfMeals":5},"training":{"selectedExercises":[0,1,2,3,5]}}',
  },
  userId: { type: String },
});

module.exports = Setting = mongoose.model('Setting', settingSchema);
