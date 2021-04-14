import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Header from './components/Header.js';
import Recipe from './components/Recipe.js';
import Cart from './components/Cart.js';
import RecipeList from './components/RecipeList.js';
import NewRecipe from './components/NewRecipe.js';
import About from './pages/About.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      cartIngredients: []
    };
  }

  updateCart = (items) => {
    const cartIngredients = this.state.cartIngredients;

    for (const item in items) {
      cartIngredients[item] = items[item];
    }
    
    const newCart = [...this.state.cart];
    cartIngredients.forEach( (item) => {
      const exists = newCart.some(el => el.ingredient === item.ingredient);
      if (exists === true) {
        const id = newCart.findIndex(el => el.ingredient === item.ingredient);
        newCart[id].amount += item.amount;
      }
      else {
      newCart.push({ingredient: item.ingredient, amount:item.amount});
      }
    });
    this.setState({cart: newCart});
    this.setState({cartIngredients: []});
  }

  emptyCart = () => this.setState({ cart: [] });

  render(){
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/'>
            <main id='browse'>
              <RecipeList />
              <Cart cart={this.state.cart} emptyCart={this.emptyCart} />
            </main>
          </Route>
          <Route path='/recipe'>
            <main id='browse'>
              <Recipe updateCart={this.updateCart} />
              <Cart cart={this.state.cart} emptyCart={this.emptyCart} />
            </main>
          </Route>
          <Route path='/newRecipe'>
            <main id='browse'>
              <NewRecipe />
              <Cart cart={this.state.cart} emptyCart={this.emptyCart} />
            </main>
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
