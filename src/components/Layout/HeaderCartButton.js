import React, { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

function HeaderCartButton(props) {
	const [btnAnimated, setBtnAnimated] = useState(false);
	const cartCtx = useContext(CartContext);

	const totalItems = cartCtx.items.reduce((curNumber, item) => curNumber + item.amount, 0);

	const buttonClasses = `${classes.button} ${btnAnimated && classes.bump}`;
	useEffect(() => {
		if (cartCtx.items.length === 0) {
			return;
		}

		setBtnAnimated(true);

		const timer = setTimeout(() => {
			setBtnAnimated(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [cartCtx.items]);

	return (
		<button className={buttonClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{totalItems}</span>
		</button>
	);
}

export default HeaderCartButton;
