import React, { Fragment, useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";

function Cart(props) {
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	let cartItems;
	if (cartCtx.items.length > 0) {
		cartItems = (
			<Fragment>
				<ul className={classes["cart-items"]}>
					{cartCtx.items.map((item) => (
						<CartItem
							key={item.id}
							name={item.name}
							price={item.price}
							amount={item.amount}
							onAdd={cartItemAddHandler.bind(undefined, item)}
							onRemove={cartItemRemoveHandler.bind(null, item.id)}
						/>
					))}
				</ul>
				<div className={classes.total}>
					<span>Total Amount</span>
					<span>{totalAmount}</span>
				</div>
			</Fragment>
		);
	} else {
		cartItems = <p className={classes["empty-cart"]}>Your cart is empty. add a meal for start!</p>;
	}

	return (
		<Modal onClose={props.onClose}>
			{cartItems}

			<div className={classes.actions}>
				<button className={classes["button--alt"]} onClick={props.onClose}>
					Close
				</button>
				{cartCtx.items.length > 0 && <button className={classes.button}>Order</button>}
			</div>
		</Modal>
	);
}

export default Cart;
