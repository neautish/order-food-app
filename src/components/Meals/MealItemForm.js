import React, { useRef, useState } from "react";

import Input from "../UI/Input";
import classes from "./MealItemForm.module.css";

function MealItemForm(props) {
	const amountInputRef = useRef();
	const [amountIsValid, setAmountIsValid] = useState(true);

	const submitHandler = function (e) {
		e.preventDefault();

		const enteredAmount = amountInputRef.current.value;
		const enteredAmountNumber = +enteredAmount;

		if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
			setAmountIsValid(false);
			return;
		}

		props.onAddToCart(enteredAmountNumber);
	};

	return (
		<form onSubmit={submitHandler} className={classes.form}>
			<Input ref={amountInputRef} label="Amount" input={{ id: "amount", type: "number", min: "1", defaultValue: 1 }} />
			<button type="submit">+ Add</button>
			{!amountIsValid && <p>Please Enter a number between 1 and 5</p>}
		</form>
	);
}

export default MealItemForm;
