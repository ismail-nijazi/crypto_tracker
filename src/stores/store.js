import { configureStore } from "@reduxjs/toolkit";
import currencyListReducer from "./Reducers/currencyList";
import selectedCurrency from "./Reducers/selectedCurrency";

export default configureStore({
	reducer: {
		currencyList: currencyListReducer,
		currencyHistory: selectedCurrency,
	},
});
