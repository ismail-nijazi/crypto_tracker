import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "../style/colors";
import { getCurrencyHistory } from "../stores/Reducers/selectedCurrency";

const CurrencyTable = (props) => {
	const rows = useSelector((state) => state.currencyList.list).slice(0, 5);
	const dispatch = useDispatch();

	return (
		<ul className="currency_table">
			<li className="header">
				<h4>Name</h4>
				<h4>Price</h4>
				<h4>Changes(24Hr)</h4>
			</li>

			{rows.map((row) => {
				return (
					<li
						key={row.id}
						className="row"
						onClick={() => {
							dispatch(getCurrencyHistory({ id: row.id }));
						}}>
						<span>{row.name}</span>
						<span>${Math.round(row.priceUsd * 100) / 100}</span>
						<span
							style={{
								color:
									row.changePercent24Hr >= 0
										? colors.positive
										: colors.negative,
							}}>
							{Math.round(row.changePercent24Hr * 1000) / 100}%
						</span>
					</li>
				);
			})}
		</ul>
	);
};

export default CurrencyTable;
