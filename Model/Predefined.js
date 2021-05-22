const mongoose = require('mongoose');

const predefinedSchema = new mongoose.Schema({
  predefined: {
    type: String,
    default:
      '[{"id":0,"name":"Cottage cheese","weight":100,"proteins":20,"fats":10,"carbs":15,"kcal":250},{"id":1,"name":"Skyr","weight":1000,"proteins":200,"fats":0,"carbs":120,"kcal":1000},{"id":2,"name":"Potatos","weight":100,"proteins":9,"fats":2,"carbs":80,"kcal":126},{"id":3,"name":"Coca Cola","weight":100,"proteins":0,"fats":0,"carbs":100,"kcal":400},{"id":4,"name":"Banana","weight":100,"proteins":5,"fats":3,"carbs":52,"kcal":173}]',
  },
  userId: { type: String },
});

module.exports = Predefined = mongoose.model('Predefined', predefinedSchema);
