import React from 'react';
import './NewRecipe.css';

class NewRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
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
                <h2>Instructions</h2>
                <button id='submit-recipe' onClick={() => this.addRecipe()}>Submit</button>
            </div>
        </div>
        )
    }
  }
  
  export default NewRecipe;