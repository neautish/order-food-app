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
			</Fragment>
		);
	} else {
		cartItems = <p className={classes["empty-cart"]}>Your cart is empty. add a meal for start!</p>;
	}

	return (
		<Modal onClose={props.onClose}>
			<div className={classes["close-btn-container"]}>
				<button className={classes["button--alt"]} onClick={props.onClose}>
					&times;
				</button>
			</div>

			{cartItems}

			{cartCtx.items.length > 0 && (
				<div className={classes.actions}>
					<div className={classes.total}>
						<span className={classes["total__title"]}>Total Amount</span>
						<span>{totalAmount}</span>
					</div>
					<button className={classes.button}>Order</button>
				</div>
			)}
		</Modal>
	);
}

export default Cart;
