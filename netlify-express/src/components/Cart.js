import './Cart.css';

function Cart(props) {
    return (
        <div id='cart'>
            <h1>Your Cart</h1>
            <button onClick={() => props.emptyCart()} id='empty-cart'>Empty Cart</button>
            
            {props.cart.map((item) => {
                return <div key={item._id} class='cart-item'>{item.ingredient} - {item.amount}</div>
            })}
            
        </div>
    );
}

export default Cart;