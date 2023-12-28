import React from "react";
import { colors } from "../style/colors";

const ExchangeTable = (props) => {
	const { rows } = props;

	const pretifyNumber = (number) => {
		const formatedNumber = Intl.NumberFormat("en-US", {
			notation: "compact",
			maximumFractionDigits: 1,
		}).format(number);

		return formatedNumber;
	};

	return (
		<ul className="currency_table">
			<li className="header row-no-hover">
				<h4>Rank</h4>
				<h4>Name</h4>
				<h4>Valume(24Hr)</h4>
				<h4>Total(%)</h4>
			</li>

			{rows.map((row) => {
				return (
					<li key={row.exchangeId} className="row row-no-hover">
						<span>{row.rank}</span>
						<span>{row.name}</span>
						<span>${pretifyNumber(row.volumeUsd)}</span>
						<span
							style={{
								color:
									row.changePercent24Hr >= 0
										? colors.positive
										: colors.negative,
							}}>
							{Math.round(+row.percentTotalVolume * 100) / 100}%
						</span>
					</li>
				);
			})}
		</ul>
	);
};

export default ExchangeTable;
