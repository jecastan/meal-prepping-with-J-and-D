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
  return await Recipe.find({}, '_id title catagory')
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

const createRecipe = async (id, title, desc, catagory) => {
  if (id) {
    console.log(desc)
    return await Recipe.findOneAndUpdate({ _id: id }, {
      title: title,
      desc: desc,
      catagory: catagory
    }
    )
  }
  else {
    return new Recipe({
      title: title,
      desc: desc,
      picture: 'picture',
      ratings: [1, 2],
      servings: 1,
      ingredients: [
        {ingredient: 'ingredient 1', amount: 1}
      ],
      instructions: ['instruction 1']
    }).save()
  }
}

const deleteIngredient = async (id, ingredient_id) => {
  return await Recipe.findOneAndUpdate(
      { _id: id },
      { $pull: {ingredients: {_id: ingredient_id} } }
  )
}

const addIngredient = async (id, index) => {
  if (index) {
    return await Recipe.findOneAndUpdate(
        { _id: id },
        { $push: {
            ingredients: {
              $each: [{ ingredient: '', amount: 1}],
              $position: index+1
            } 
          } 
        }
    )
  }
  else {
    return await Recipe.findOneAndUpdate(
      { _id: id },
      { $push: {
          ingredients: {
            $each: [{ ingredient: '', amount: 1}],
            $position: 1
          } 
        } 
      }
  )
  }
}

const submitIngredient = async (id, ingredient_id, newAmount, newIngredient) => {
  return await Recipe.findOneAndUpdate(
      { '_id': id, 'ingredients._id': ingredient_id },
      { $set: {
          'ingredients.$.amount': newAmount,
          'ingredients.$.ingredient': newIngredient
          } 
      } 
  )
}

const deleteInstruction = async (id, instruction) => {
  return await Recipe.findOneAndUpdate(
      { _id: id },
      { $pull: {instructions: instruction } }
  )
}

const addInstruction = async (id, index) => {
  return await Recipe.findOneAndUpdate(
      { _id: id },
      { $push: {
        instructions: {
          $each: [''],
          $position: index+1
          } 
        } 
      }
  )
}

const submitInstruction = async (id, instruction, newInstruction) => {
  return await Recipe.findOneAndUpdate(
      { '_id': id, 'instructions': instruction },
      { $set: { 'instructions.$' : newInstruction } }
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

router.post('/api/newRecipe', async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const desc = req.body.desc;
  const catagory = req.body.catagory
  // console.log(title);
  const recipe = await createRecipe(id, title, desc, catagory)
  res.json(recipe)
})

router.post('/api/modifyRecipe', async (req, res) => {
  const id = req.body.id;
  const index = req.body.index;
  const change = req.body.change
  const ingredient_id = req.body.ingredient_id;
  const newAmount = req.body.newAmount;
  const newIngredient = req.body.newIngredient;
  // console.log(title);
  if (change === 'add') {
    const recipe = await addIngredient(id, index)
  }
  else if (ingredient_id) {
    const recipe = await submitIngredient(id, ingredient_id, newAmount, newIngredient)
  }
  res.json(recipe)
})

router.post('/api/modifyInstructions', async (req, res) => {
  const id = req.body.id;
  const index = req.body.index;
  const instruction = req.body.instruction;
  const change = req.body.change;
  const newInstruction = req.body.newInstruction;

  if (change === 'delete') {
    const recipe = await deleteInstruction(id, instruction)
  }
  else if (change === 'add') {
    const recipe = await addInstruction(id, index)
  }
  else if (change === 'submit') {
    const recipe = await submitInstruction(id, instruction, newInstruction)
  }
  res.json(recipe)
})

router.post('/api/deleteRecipe', async (req, res) => {
  const id = req.body.id;
  const ingredient_id = req.body.ingredient_id;
  // console.log(title);
  const recipe = await deleteIngredient(id, ingredient_id)
  res.json(recipe)
})

app.use('/.netlify/functions/server', router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);