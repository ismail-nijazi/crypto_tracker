import React, { useState } from "react";
import LineChart from "../components/LineChart";
import CurrencyTable from "../components/CurrencyTable";
import {
	useSelector,
	useDispatch,
} from "react-redux";
import { getCurrencyHistory } from "../stores/Reducers/selectedCurrency";
import { INTERVALS } from "../stores/Reducers/selectedCurrency";

const OPTION_HOUR_MINUT = {
	hour: "2-digit",
	minute: "2-digit",
};

const OPTION_MONTH_DAY = {
	day: "numeric",
	month: "long",
};
const OPTION_MONTH_YEAR = {
	year: "numeric",
	month: "short",
	day: "numeric",
};

const Dashboard = () => {
	const history = useSelector(
		(state) => state.currencyHistory.history
	);
	const selectedInterval = useSelector(
		(state) => state.currencyHistory.interval
	);
	const historyLoading = useSelector(
		(state) => state.currencyHistory.history
	);
	const selected_currency_id = useSelector(
		(state) => state.currencyHistory.id
	);
	const currencies = useSelector(
		(state) => state.currencyList.list
	);
	const [searchPhrase, setSearch] =
		useState("");
	const [suggestions, setSuggestions] =
		useState([]);
	const dispatch = useDispatch();

	const getSelectedCurrency = () => {
		for (const currency of currencies) {
			if (
				currency.id ===
				selected_currency_id
			) {
				return currency;
			}
		}
	};

	const changeInterval = (interval) => {
		dispatch(
			getCurrencyHistory({
				id: selected_currency_id,
				interval: interval,
			})
		);
	};

	const onSearchChange = (e) => {
		setSearch(e.target.value);
		let matched = currencies.filter(
			(currency) => {
				const subString = currency.name
					.substr(
						0,
						e.target.value.length
					)
					.toLowerCase();
				return (
					subString ===
					e.target.value.toLowerCase()
				);
			}
		);
		if (
			matched.length > 5 &&
			matched.length !== currencies.length
		) {
			matched = matched.slice(0, 5);
		} else if (
			matched.length === currencies.length
		) {
			matched = [];
		}
		setSuggestions(matched);
	};

	const selectSearchedCurrency = (currency) => {
		dispatch(
			getCurrencyHistory({
				id: currency.id,
				interval: null,
			})
		);
		setSearch("");
		setSuggestions([]);
	};

	const generateLabels = () => {
		let date = null;
		let options =
			selectedInterval === "1D"
				? OPTION_HOUR_MINUT
				: OPTION_MONTH_DAY;
		options = ["6M", "1Y"].includes(
			selectedInterval
		)
			? OPTION_MONTH_YEAR
			: options;

		return history.map((item) => {
			date = new Date(item.date);
			return date.toLocaleString(
				"en-US",
				options
			);
		});
	};

	return (
		<main className="main">
			<section>
				<div className="search-box">
					<input
						type="text"
						placeholder="Search..."
						value={searchPhrase}
						onChange={
							onSearchChange
						}></input>
					{suggestions.length > 0 ? (
						<ul className="suggestion-box">
							{suggestions.map(
								(currency) => (
									<li
										key={
											currency.id
										}
										onClick={() => {
											selectSearchedCurrency(
												currency
											);
										}}>
										{
											currency.name
										}
									</li>
								)
							)}
						</ul>
					) : null}
				</div>
			</section>
			<section>
				<div className="intervals">
					{Object.keys(INTERVALS).map(
						(interval) => {
							return (
								<button
									className={`interval-btn
									${interval === selectedInterval ? "active" : ""}`}
									onClick={() => {
										changeInterval(
											interval
										);
									}}
									key={
										interval
									}>
									{interval}
								</button>
							);
						}
					)}
				</div>
				{historyLoading ? (
					<LineChart
						data={history.map(
							(item) =>
								item.priceUsd
						)}
						labels={generateLabels()}
						selectedCurrency={getSelectedCurrency()}
					/>
				) : null}
			</section>

			<section>
				<div className="title">
					<h4>Top assets</h4>
				</div>
				<CurrencyTable />
			</section>
		</main>
	);
};

export default Dashboard;
