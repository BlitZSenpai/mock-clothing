import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItem from "../cart-items/cart-items.component";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart-selector";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
	const cartItems = useSelector(selectCartItems);
	const navigate = useNavigate();
	const goToCheckout = () => {
		navigate("checkout");
	};
	return (
		<div className="cart-dropdown-container">
			<div className="cart-items">
				{cartItems.length ? (
					cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
				) : (
					<span className="empty-message">Your cart is empty</span>
				)}
			</div>
			<Button onClick={goToCheckout}>Go To CheckOut</Button>
		</div>
	);
};

export default CartDropdown;
