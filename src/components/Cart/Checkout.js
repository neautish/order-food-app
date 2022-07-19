import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (entry) => entry.trim() === "";
const isFiveDigit = (entry) => entry.trim().length === 5;

const Checkout = (props) => {
	const [formInputValidity, setFormInputValidity] = useState({
		name: true,
		street: true,
		postalCode: true,
		city: true,
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalCodeInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = (e) => {
		e.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostalCode = postalCodeInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enteredPostalCodeIsValid = isFiveDigit(enteredPostalCode);

		setFormInputValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			postalCode: enteredPostalCodeIsValid,
			city: enteredCityIsValid,
		});

		const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;

		if (!formIsValid) {
			return;
		}

		props.onConfirm({
			name: enteredName,
			street: enteredStreet,
			postalCode: enteredPostalCode,
			city: enteredCity,
		});
	};

	const nameInputClasses = formInputValidity.name ? classes.control : `${classes.control} ${classes.invalid}`;
	const streetInputClasses = formInputValidity.street ? classes.control : `${classes.control} ${classes.invalid}`;
	const postalCodeInputClasses = formInputValidity.postalCode ? classes.control : `${classes.control} ${classes.invalid}`;
	const cityInputClasses = formInputValidity.city ? classes.control : `${classes.control} ${classes.invalid}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameInputClasses}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameInputRef} />
				{!formInputValidity.name && <p>Please enter a valid name!</p>}
			</div>
			<div className={streetInputClasses}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetInputRef} />
				{!formInputValidity.street && <p>Please enter a valid street!</p>}
			</div>
			<div className={postalCodeInputClasses}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalCodeInputRef} />
				{!formInputValidity.postalCode && <p>Please enter a valid postal code (5 digit)!</p>}
			</div>
			<div className={cityInputClasses}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityInputRef} />
				{!formInputValidity.city && <p>Please enter a valid city!</p>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
