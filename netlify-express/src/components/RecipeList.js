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
        
        document.title = 'J & D Meal Prep'
    };

    render() {
        return (
            <div id='recipe-list'>
                <div className='headline'>
                    <div className='headline-text'>
                        <h1>Welcome to Jesse and Daly's Recipes</h1>
                        <p>We know eating home cooked meals and planning for shopping can be challenging.</p>
                        <p>To help folks out we wanted to share some recipes and help with the meal prep shopping list</p>
                    </div>
                    <div className='headline-image'>
                        <img id='chefs-photo' src="../imgs/The_Chefs.jpg" height='350px' alt={'The Chefs'}></img>
                    </div>
                </div>

                <h2>Breakfast</h2>
                <div className='link-collection'>
                    {this.state.list && this.state.list.map(item => {
                        const id = item._id;
                        const title = item.title;
                        const catagory = item.catagory;
                        if (catagory === 'Breakfast') {
                            return <Link to={'/recipe/#' + id}>{title}</Link>;
                        }
                    })}
                </div>

                <h2>Lunch</h2>
                <div className='link-collection'>
                    {this.state.list && this.state.list.map(item => {
                        const id = item._id;
                        const title = item.title;
                        const catagory = item.catagory;
                        if (catagory === 'Lunch') {
                            return <Link to={'/recipe/#' + id}>{title}</Link>;
                        }
                    })}
                </div>

                <h2>Dinner</h2>
                <div className='link-collection'>
                    {this.state.list && this.state.list.map(item => {
                        const id = item._id;
                        const title = item.title;
                        const catagory = item.catagory;
                        if (catagory === 'Dinner') {
                            return <Link to={'/recipe/#' + id}>{title}</Link>;
                        }
                    })}
                </div>

                <h2>Snacks</h2>
                <div className='link-collection'>
                    {this.state.list && this.state.list.map(item => {
                        const id = item._id;
                        const title = item.title;
                        const catagory = item.catagory;
                        if (catagory === 'Snacks') {
                            return <Link to={'/recipe/#' + id}>{title}</Link>;
                        }
                    })}
                </div>

                <h2>Sauces</h2>
                <div className='link-collection'>
                    {this.state.list && this.state.list.map(item => {
                        const id = item._id;
                        const title = item.title;
                        const catagory = item.catagory;
                        if (catagory === 'Sauces') {
                            return <Link to={'/recipe/#' + id}>{title}</Link>;
                        }
                    })}
                </div>
            </div>
        )
    }
}

export default RecipeList;