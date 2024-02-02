import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const OPTIONS = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
	},
	scales: {
		y: {
			ticks: {
				color: "rgb(255,255,255)",
				font: {
					size: 14,
				},
			},
			grid: {
				display: false,
			},
		},
		x: {
			ticks: {
				color: "rgb(255,255,255)",
				font: {
					size: 14,
				},
			},
			grid: {
				display: false,
			},
		},
	},
};

const LineChart = (props) => {
	const { data, labels, selectedCurrency } =
		props;
	if (!selectedCurrency) {
		return null;
	}
	const ChartData = {
		labels: labels,
		datasets: [
			{
				label: selectedCurrency
					? selectedCurrency.name
					: null,
				data: data,
				borderColor: "rgb(161, 63, 128)",
				backgroundColor:
					"rgba(161, 63, 128, 0.5)",
			},
		],
	};

	return (
		<div className="lineChart">
			<div className="title">
				<h3>{selectedCurrency.name}</h3>
				<h3>
					{Math.round(
						selectedCurrency.priceUsd *
							100
					) / 100}
					$
				</h3>
			</div>
			<Line
				options={OPTIONS}
				data={ChartData}
			/>
		</div>
	);
};

export default LineChart;
