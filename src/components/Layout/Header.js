import React, { Fragment } from "react";

import mealsImg from "../../assets/meals-2.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

function Header(props) {
	return (
		<Fragment>
			<header className={classes.header}>
				<h1>Meals</h1>
				<HeaderCartButton onClick={props.onShowCart} />
			</header>
			<div className={classes["main-image"]}>
				<img src={mealsImg} alt="meals" />
			</div>
		</Fragment>
	);
}

export default Header;
