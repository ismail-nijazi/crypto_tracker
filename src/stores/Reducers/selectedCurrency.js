import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../API";

const DEFAULT_INTERVAL = "1D";
export const INTERVALS = {
	"1D": 1,
	"1W": 7,
	"1M": 30,
	"6M": 180,
	"1Y": 365,
};

export const getCurrencyHistory = createAsyncThunk(
	"crypto/getCurrencyHistory",
	async (obj) => {
		const _interval = obj.interval ? obj.interval : DEFAULT_INTERVAL;
		let URL = `/assets/${obj.id}/history?interval=h2`;
		if (_interval !== DEFAULT_INTERVAL) {
			const end = new Date();
			let start = new Date();
			start.setDate(start.getDate() - INTERVALS[_interval]);
			URL = `/assets/${
				obj.id
			}/history?interval=d1&start=${start.getTime()}&end=${end.getTime()}`;
		}
		const response = await API.get(URL);

		if (_interval === DEFAULT_INTERVAL) {
			const now = new Date();
			let result = response.data.data;
			result = result.filter((history) => {
				const historyDate = new Date(history.date);
				return historyDate.toDateString() === now.toDateString();
			});

			return { id: obj.id, interval: _interval, data: result };
		}

		return { id: obj.id, interval: _interval, data: response.data.data };
	}
);

const SelectedCurrency = createSlice({
	name: "currency_list",
	initialState: {
		history: [],
		id: null,
		interval: null,
		loading: false,
		successful: false,
	},
	reducers: {},
	extraReducers: {
		[getCurrencyHistory.pending]: (state) => {
			state.loading = true;
		},
		[getCurrencyHistory.fulfilled]: (state, { payload }) => {
			state.history = payload.data;
			state.id = payload.id;
			state.interval = payload.interval;
			state.loading = false;
			state.successful = true;
		},
		[getCurrencyHistory.rejected]: (state) => {
			state.loading = false;
			state.successful = false;
		},
	},
});

export default SelectedCurrency.reducer;
