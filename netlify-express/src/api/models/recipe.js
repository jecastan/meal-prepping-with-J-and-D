const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  // an ID attribute will automatically be added on insert
	title: String,
  desc: String,
  catagory: String,
  picture: String,
  ratings: [Number],
  servings: Number,
  ingredients: [{
      ingredient: String,
      amount: Number
    }],
  instructions: [String]
})

const Recipe = mongoose.model('recipes', recipeSchema)

module.exports = Recipe