const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

const mongoose = require('mongoose')

const Recipe = require('./models/recipe')

mongoose.connect("mongodb+srv://jecastan:10lng0lst0nm@cluster0.sam2k.mongodb.net/groceryPrepPractice?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API calls
const getRecipes = async () => {
  return await Recipe.find({}, '_id title')
}

const getRecipe = async id => {
  return await Recipe.findOne({_id: id})
}

const postRating = async (id, rating) => {
  return await Recipe.findOneAndUpdate(
      { _id: id },
      { $push: {ratings: rating} }
  )
}

router.get('/api/getRecipes', async (req, res) => {

  let recipes = await getRecipes()

  res.json(recipes)
})

router.get('/api/getRecipe/:id', async (req, res) => {
  const id = req.params.id

  let recipes = await getRecipe(id)

  res.json(recipes)
})

router.post('/api/postRating', async (req, res) => {
  const id = req.body.id
  const rating = req.body.rating

  const ratings = await postRating(id, rating)
  res.send()
})

app.use('/.netlify/functions/server', router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);