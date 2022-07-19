import { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem";
import classes from "./AvailableMeals.module.css";

function AvailableMeals() {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(null);

	useEffect(() => {
		const fetchMeals = async () => {
			setIsLoading(true);

			const response = await fetch("https://send-http-request-react-default-rtdb.firebaseio.com/meals.json");

			if (!response.ok) {
				console.log(response);
				throw new Error("Something went wrong");
			}

			const responseData = await response.json();

			const loadedMeals = [];

			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}

			setMeals(loadedMeals);

			setIsLoading(false);
		};

		fetchMeals().catch((error) => {
			console.log(error.message);
			setIsLoading(false);
			setIsError(error.message);
		});
	}, []);

	if (isLoading) {
		return (
			<section className={classes["meals-loading"]}>
				<p>loading...</p>
			</section>
		);
	}
	if (isError) {
		return (
			<section className={classes["meals-error"]}>
				<p>{isError}</p>
			</section>
		);
	}

	const mealsList = meals.map((meal) => <MealItem name={meal.name} description={meal.description} price={meal.price} key={meal.id} id={meal.id} />);

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
}

export default AvailableMeals;
