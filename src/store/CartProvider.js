import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
	items: [],
	totalAmount: 0,
};
const cartReducer = (state, action) => {
	if (action.type === "ADD_ITEM") {
		const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

		const existingCardItemIndex = state.items.findIndex((item) => item.id === action.item.id);
		const existingCardItem = state.items[existingCardItemIndex];

		let updatedItems;

		if (existingCardItem) {
			const updatedItem = {
				...existingCardItem,
				amount: existingCardItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCardItemIndex] = updatedItem;
		} else {
			updatedItems = [action.item, ...state.items];
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	if (action.type === "REMOVE_ITEM") {
		const existingCardItemIndex = state.items.findIndex((item) => item.id === action.id);
		const existingCardItem = state.items[existingCardItemIndex];
		const updatedTotalAmount = state.totalAmount - existingCardItem.price;

		let updatedItems;

		if (existingCardItem.amount === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else {
			const updatedItem = {
				...existingCardItem,
				amount: existingCardItem.amount - 1,
			};
			updatedItems = [...state.items];
			updatedItems[existingCardItemIndex] = updatedItem;
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	if (action.type === "CLEAR") {
		return defaultCartState;
	}

	return defaultCartState;
};

function CartProvider(props) {
	const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartState);

	const addItemToCartHandler = (item) => {
		cartDispatch({
			type: "ADD_ITEM",
			item: item,
		});
	};

	const removeItemFromCartHandler = (id) => {
		cartDispatch({
			type: "REMOVE_ITEM",
			id: id,
		});
	};

	const clearCartHandler = () => {
		cartDispatch({ type: "CLEAR" });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		clearCart: clearCartHandler,
	};

	return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
}

export default CartProvider;
