import React from 'react';
import { Link } from 'react-router-dom';
import './NewRecipe.css';

class NewRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instructions: []
        }
    }

    componentDidMount() {
        const id = window.location.hash.substr(1);
        fetch('/.netlify/functions/server/api/getRecipe/' + id)
        .then(res => res.json())
        .then(recipe => {
            this.setState({...recipe});
            document.title = recipe.title + ' - Grocery Prep'
        })
    }

    selectedCatagory () {
        const selected = document.getElementById('select-catagory').value;
        this.setState({catagory: selected})
    }

    addRecipe () {
        const newRecipeId = this.state._id;
        const newRecipeTitle = document.getElementById('recipe-title').value;
        const newRecipeDesc = document.getElementById('recipe-desc').value;
        const newRecipeCatagory = document.getElementById('select-catagory').value;
        //if (isNaN(newRecipeTitle)) return;

        const recipeBody = {
            id: newRecipeId,
            title: newRecipeTitle,
            desc: newRecipeDesc,
            catagory: newRecipeCatagory
        }
    
        fetch('/.netlify/functions/server/api/newRecipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipeBody)
        });

        setTimeout(function () {
            document.location.reload();
        }, 250);
    }

    deleteIngredient (id) {
        const newRecipeId = this.state._id;

        const recipeBody = {
            id: newRecipeId,
            ingredient_id: id
        }

        fetch('/.netlify/functions/server/api/deleteRecipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipeBody)
        });

        setTimeout(function () {
            document.location.reload();
        }, 250);
    }

    addIngredient (count) {
        const newRecipeId = this.state._id;

        console.log(count)

        const recipeBody = {
            id: newRecipeId,
            index: count,
            change: 'add'
        }

        fetch('/.netlify/functions/server/api/modifyRecipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipeBody)
        });

        setTimeout(function () {
            document.location.reload();
        }, 250);
    }

    submitIngredient (ingredient_id, count) {
        const newRecipeId = this.state._id;
        const newAmount = document.getElementById('amount'+count).value;
        const newIngredient = document.getElementById('ingredient'+count).value;

        const recipeBody = {
            id: newRecipeId,
            ingredient_id: ingredient_id,
            newAmount: newAmount,
            newIngredient: newIngredient
        }

        fetch('/.netlify/functions/server/api/modifyRecipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipeBody)
        });

        setTimeout(function () {
            document.location.reload();
        }, 250);
    }

    deleteInstruction (instruction) {
        const newRecipeId = this.state._id;

        const recipeBody = {
            id: newRecipeId,
            instruction: instruction,
            change: 'delete'
        }

        fetch('/.netlify/functions/server/api/modifyInstructions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipeBody)
        });

        setTimeout(function () {
            document.location.reload();
        }, 250);
    }

    addInstruction (count) {
        const newRecipeId = this.state._id;

        const recipeBody = {
            id: newRecipeId,
            index: count,
            change: 'add'
        }

        fetch('/.netlify/functions/server/api/modifyInstructions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipeBody)
        });

        setTimeout(function () {
            document.location.reload();
        }, 250);
    }

    submitInstruction (instruction, count) {
        const newRecipeId = this.state._id;
        const newInstruction = document.getElementById('instruction'+count).value;

        const recipeBody = {
            id: newRecipeId,
            instruction: instruction,
            newInstruction: newInstruction,
            change: 'submit'
        }

        fetch('/.netlify/functions/server/api/modifyInstructions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipeBody)
        });

        setTimeout(function () {
            document.location.reload();
        }, 250);
    }
    
    render () {
        return (
        <div id='newRecipe'>
            <div className='headline2'>
                <h1 id='title'>Add/Change Recipe</h1>
            </div>
            <div className='showcase2'>
                <h2>Recipe Details</h2>
                <div className='input-fields'>
                    <p>Recipe Name</p>
                    <input type="text" id="recipe-title" placeholder="Recipe Name" defaultValue={this.state.title} />
                    <p>Recipe Description</p>
                    <input type="text" id="recipe-desc" placeholder="Recipe Description" defaultValue={this.state.desc} />
                    <p>Catgory</p>
                    <select id='select-catagory' onChange={() => this.selectedCatagory()} value={this.state.catagory}>
                        <option value={this.state.catagory} disabled hidden>{this.state.catagory}</option>
                        <option value='Breakfast'>Breakfast</option>
                        <option value='Lunch'>Lunch</option>
                        <option value='Dinner'>Dinner</option>
                        <option value='Snacks'>Snacks</option>
                        <option value='Sauces'>Sauces</option>
                    </select>
                </div>
                <button id='submit-recipe' onClick={() => this.addRecipe()}>Submit</button>
                <h2>Ingredients</h2>
                <ul>
                    {this.state.ingredients && this.state.ingredients.map((item, count) => {
                            return <li className='ingredients' key={item._id}>
                                <input id={'amount'+count} className='ingredient-amount' defaultValue={item.amount} />
                                <input id={'ingredient'+count} className='ingredient-name' defaultValue={item.ingredient} />
                                <button type='button' id='delete' onClick={() => this.deleteIngredient(item._id)}>Delete</button>
                                <button type='button' id='add' onClick={() => this.addIngredient(count)}>Add</button>
                                <button type='button' id='submit' onClick={() => this.submitIngredient(item._id, count)}>Submit</button>
                            </li>;
                        })
                    }
                </ul>
                <h2>Instructions</h2>
                <ol >
                    {this.state.instructions && this.state.instructions.map((instruction, count) => {
                        return <li className='instruction-list'>
                            <input id={'instruction'+count} type="text" className='instructions' defaultValue={instruction} />
                            <button type='button' id='delete' onClick={() => this.deleteInstruction(instruction)}>Delete</button>
                            <button type='button' id='add' onClick={() => this.addInstruction(count)}>Add</button>
                            <button type='button' id='submit' onClick={() => this.submitInstruction(instruction, count)}>Submit</button>
                        </li>;
                    })}
                </ol>
                <Link to={'/recipe/#' + this.state._id}><button id='return-recipe'>
                        Go to Recipe Page
                    </button>
                </Link>
            </div>
        </div>
        )
    }
  }
  
  export default NewRecipe;