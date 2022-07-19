import React, { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const [isError, setIsError] = useState(null);

	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const orderHandler = () => {
		setIsCheckout(true);
	};

	const submitOrderHandler = (userData) => {
		setIsSubmitting(true);

		fetch("https://send-http-request-react-default-rtdb.firebaseio.com/orders.json", {
			method: "POST",
			body: JSON.stringify({
				user: userData,
				orderedItems: cartCtx.items,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				console.log(response);
				if (!response.ok) {
					throw new Error("Something went wrong: ", response.statusText);
				}

				setDidSubmit(true);
				cartCtx.clearCart();
			})
			.catch((error) => {
				console.log(error.message);
				setIsError(error.message);
			})
			.finally(() => {
				setIsSubmitting(false);
			});
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

	const cartModalContent = (
		<Fragment>
			{cartItems}

			{isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}

			{cartCtx.items.length > 0 && (
				<div className={classes.actions}>
					<div className={classes.total}>
						<span className={classes["total__title"]}>Total Amount</span>
						<span>{totalAmount}</span>
					</div>
					{!isCheckout && (
						<button className={classes.button} onClick={orderHandler}>
							Order
						</button>
					)}
				</div>
			)}
		</Fragment>
	);

	return (
		<Modal onClose={props.onClose}>
			<div className={classes["close-btn-container"]}>
				<button className={classes["button--alt"]} onClick={props.onClose}>
					&times;
				</button>
			</div>
			{isError && !isSubmitting && !didSubmit && <p className={classes["submitting-message"]}>{isError}</p>}
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && <p className={classes["submitting-message"]}>Sending orders data...</p>}
			{!isSubmitting && didSubmit && <p className={classes["submitting-message"]}>Succesfully sent orders!</p>}
		</Modal>
	);
}

export default Cart;
