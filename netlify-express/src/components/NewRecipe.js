import React from 'react';
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

    addRecipe () {
        const newRecipeId = this.state._id;
        const newRecipeTitle = document.getElementById('recipe-title').value;
        const newRecipeDesc = document.getElementById('recipe-desc').value;
        //if (isNaN(newRecipeTitle)) return;

        const recipeBody = {
            id: newRecipeId,
            title: newRecipeTitle,
            desc: newRecipeDesc
        }
    
        fetch('/.netlify/functions/server/api/newRecipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipeBody)
        });

        window.location.reload();
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

        window.location.reload();
    }

    addIngredient (count) {
        const newRecipeId = this.state._id;

        const recipeBody = {
            id: newRecipeId,
            index: count
        }

        fetch('/.netlify/functions/server/api/modifyRecipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipeBody)
        });

        window.location.reload();
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

        window.location.reload();
    }

    deleteInstruction (instruction) {
        const newRecipeId = this.state._id;
        const deletedInstruction = instruction;
        //if (isNaN(newRecipeTitle)) return;

        const recipeBody = {
            id: newRecipeId,
            instruction: deletedInstruction,
        }
    
        fetch('/.netlify/functions/server/api/newRecipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipeBody)
        });
        //let newInstructions = [...this.state.instructions];
        //console.log(newInstructions);
        //newInstructions.splice(index, 1);
        //console.log(newInstructions);
        this.setState({instructions: []})
        console.log(this.state.instructions.length)
        //this.setState({instructions: newInstructions});
        //console.log(this.state.instructions)
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
                </div>
                <button id='submit-recipe' onClick={() => this.addRecipe()}>Submit</button>
                <h2>Ingredients</h2>
                <ul>
                    {this.state.ingredients && this.state.ingredients.map((item, count) => {
                            return <li className='ingredients' key={item._id}>
                                <input id={'amount'+count} className='ingredient-amount' defaultValue={item.amount} />
                                <input id={'ingredient'+count} className='ingredient-name' defaultValue={item.ingredient} />
                                <button type='button' id='delete' onClick={() => this.deleteIngredient(item._id)}>Delete</button>
                                <button key={count} type='button' id='add' onClick={() => this.addIngredient(count)}>Add</button>
                                <button type='button' id='submit' onClick={() => this.submitIngredient(item._id, count)}>Submit</button>
                            </li>;
                        })
                    }
                </ul>
                <h2>Instructions</h2>
                <ol >
                    {this.state.instructions && this.state.instructions.map((instruction, count) => {
                        return <li className='instruction-list'>
                            <input key={count} type="text" className='instructions' defaultValue={instruction} />
                            <button type='button' id='delete' onClick={() => this.deleteInstruction(instruction)}>Delete</button>
                            <button type='button' id='add' onClick={() => this.addInstruction()}>Add</button>
                        </li>;
                    })}
                </ol>
                
            </div>
        </div>
        )
    }
  }
  
  export default NewRecipe;