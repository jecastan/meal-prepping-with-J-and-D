import { Link } from 'react-router-dom'
import './Header.css';

function refreshPage() {
  setTimeout(()=> {
    window.location.reload();
  }, 200);
}

function Header() {
  return (
    <header>
      <h1>Meal Prepping with Jesse and Daly</h1>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/newRecipe' onClick={ refreshPage }>New Recipe</Link>
        <Link to='/about'>About the Chefs</Link>
      </nav>
    </header>
  );
}

export default Header;