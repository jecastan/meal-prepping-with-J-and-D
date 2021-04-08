import React from 'react';
import './NewRecipe.css';

class NewRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'title'
        }
    }

    defineRecipe () {
        const newRecipeTitle = document.getElementById('recipe-title').value;
        this.setState({title: newRecipeTitle});
        //console.log(this.state.title)
    }

    addRecipe () {
        const newRecipeTitle = this.state.title;
        //if (isNaN(newRecipeTitle)) return;

        const recipeBody = {
            title: newRecipeTitle
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
                <h1 id='title'>Add New Recipe</h1>
            </div>
            <div className='showcase2'>
                <input type="text" id="recipe-title" onChange={() => this.defineRecipe()} placeholder="Recipe Name" />
                &nbsp;<button id='add-recipe' onClick={() => this.addRecipe()}>Add!</button>
            </div>
        </div>
        )
    }
  }
  
  export default NewRecipe;