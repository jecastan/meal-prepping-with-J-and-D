import React from 'react';
import { Link } from 'react-router-dom';

import './RecipeList.css';

class RecipeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          list: []
        };
    }

    componentDidMount() {
        fetch('/.netlify/functions/server/api/getRecipes')
        .then(res => res.json())
        .then(data => this.setState({ list: data }))
        
        document.title = 'Keto Meal Prep'
    };

    render() {
        return (
            <div id='recipe-list'>
                <h1>Welcome to Jesse and Daly's Keto Recipes</h1>
                <p>We know eating Keto and meal planning can be challenging.</p>
                <p>To help folks out we wanted to share some recipes and help with the meal prep shopping list</p>

                <h2>Recipes</h2>
                <div className='link-collection'>
                    {this.state.list && this.state.list.map(item => {
                        const id = item._id;
                        const title = item.title;

                        return <Link to={'/recipe/#' + id}>{title}</Link>;
                    })}
                </div>
            </div>
        )
    }
}

export default RecipeList;