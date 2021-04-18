import React from 'react';
import { Link } from 'react-router-dom';
import './Recipe.css';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateCart: props.updateCart,
        }
    }

    updateRating () {
        this.postRating ();
        this.componentDidMount()
    }

    componentDidMount() {
        const id = window.location.hash.substr(1);
        fetch('/.netlify/functions/server/api/getRecipe/' + id)
        .then(res => res.json())
        .then(recipe => {
            this.setState({...recipe});

            let rating = recipe.ratings.reduce((a, b) => a + b) / recipe.ratings.length;
            rating = rating.toFixed(2);

            this.setState(
                {rating: rating}
            );

            document.title = recipe.title + ' - Grocery Prep'
        })
    }

    selectedRating () {
        const selected = +(document.getElementById('select-rating').value);
        this.setState({selected: selected})
    }

    postRating () {

        const newRating = this.state.selected;
        if (isNaN(newRating)) return;

        this.setState({ratings: [...this.state.ratings, newRating]});
        let rating = this.state.ratings.reduce((a, b) => a + b) / this.state.ratings.length;
        rating = rating.toFixed(2);
        this.setState({rating: rating});
 
        const ratingBody = {
            id: this.state._id,
            rating: newRating
        }

        fetch('/.netlify/functions/server/api/postRating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ratingBody)
        });
    }

    updateCount(dir) {
        if (this.state.servings + dir <= 0) return;

        const currentServings = this.state.servings;
        const newState = Object.assign({}, this.state);
        newState.ingredients.forEach( (item) => {
            const currentCount = +(item.amount);
            item.amount = Number(((currentCount / currentServings) * (currentServings + dir)).toFixed(2));
        });

        this.setState(newState);
        this.setState({servings: this.state.servings + dir});
    }

    addToCart() {
        this.state.updateCart(this.state.ingredients);
    }

    populateChangedRecipe() {

    }

    render() {
        return (
            <div id='recipe'>
                <div className='headline'>
                    <h1 id='title'>{this.state.title}</h1>
                    <div id='actions'>
                        <div id='ratings'>
                            <Link to={'/newRecipe/#' + this.state._id}><button id='edit-recipe'>
                                Edit Recipe
                            </button>
                            </Link>
                            
                            &nbsp;
                            <span id='rating'>{this.state.rating}</span> &#9734;
                            &nbsp;
                            <button id='add-to-cart' onClick={() => this.addToCart()}>Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className='showcase'>
                    <div className='info'>
                        <p className='desc'>{this.state.desc}</p>
                        <div className='servings'>
                            <h3>Servings</h3>
                            <button onClick={() => this.updateCount(-1)}>-</button>
                            <span id='serving-count'>{this.state.servings}</span>
                            <button onClick={() => this.updateCount(1)}>+</button>
                        </div>
                        <div className='rating'>
                            <label id='rating-label' for='selecting-rating'>Rate Me!</label>
                            <select id='select-rating' onChange={() => this.selectedRating()} defaultValue='none'>
                                <option value='none' disabled hidden>Select Rating</option>
                                <option value='1'>1 &#9733;</option>
                                <option value='2'>2 &#9733;</option>
                                <option value='3'>3 &#9733;</option>
                                <option value='4'>4 &#9733;</option>
                                <option value='5'>5 &#9733;</option>
                            </select>
                            &nbsp;<button id='post-rating' onClick={() => this.updateRating()}>Post Rating</button>
                        </div>
                    </div>
                    <img src={this.state.picture} height='250px' alt={'Photo of ' +this.state.title}></img>
                </div>

                <h2>Ingredients</h2>
                <ul>
                    {this.state.ingredients && this.state.ingredients.map((item) => {
                            return <li key={item._id}><span className='count'>{item.amount} </span>{item.ingredient}</li>;
                        })
                    }
                </ul>

                <h2>Instructions</h2>
                <ol>
                    {this.state.instructions && this.state.instructions.map((instruction, count) => {
                        return <li key={count}>{instruction}</li>;
                    })}
                </ol>
            </div>
        )
    }
}

export default Recipe;