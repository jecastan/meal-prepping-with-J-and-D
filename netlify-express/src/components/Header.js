import { Link } from 'react-router-dom'
import './Header.css';

function Header() {
  return (
    <header>
      <h1>Grocery Prep</h1>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/about'>About the Chefs</Link>
      </nav>
    </header>
  );
}

export default Header;