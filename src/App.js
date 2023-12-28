import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrencies, getExchanges } from "./stores/Reducers/currencyList";
import { getCurrencyHistory } from "./stores/Reducers/selectedCurrency";
import Sidebar from "./components/Sidebar";
import Dashboard from "./views/Dashboard";
import Exchanges from "./views/Exchanges";
import "./style/styles.scss";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCurrencies());
		dispatch(getCurrencyHistory({ id: "bitcoin" }));
		dispatch(getExchanges());
	}, [dispatch]);

	return (
		<div className="App">
			<Sidebar />
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/exchanges" element={<Exchanges />} />
			</Routes>
		</div>
	);
}

export default App;
