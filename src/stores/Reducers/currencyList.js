import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../API";

async function getData(path) {
	const response = await API.get(path);
	return response.data.data;
}

export const getCurrencies = createAsyncThunk(
	"crypto/getCurrencies",
	async () => {
		return await getData("/assets");
	}
);

export const getExchanges = createAsyncThunk(
	"crypto/getExchanges",
	async () => {
		return await getData("/exchanges");
	}
);

const CurrencyListSlice = createSlice({
	name: "currency_list",
	initialState: {
		list: [],
		exchanges: [],
		loading: false,
		successful: false,
	},
	reducers: {},
	extraReducers: {
		[getCurrencies.pending]: (state) => {
			state.loading = true;
		},
		[getCurrencies.fulfilled]: (state, { payload }) => {
			state.list = payload;
			state.loading = false;
			state.successful = true;
		},
		[getCurrencies.rejected]: (state) => {
			state.loading = false;
			state.successful = false;
		},
		[getExchanges.pending]: (state) => {
			state.loading = true;
		},
		[getExchanges.fulfilled]: (state, { payload }) => {
			state.exchanges = payload;
			state.loading = false;
			state.successful = true;
		},
		[getExchanges.rejected]: (state) => {
			state.loading = false;
			state.successful = false;
		},
	},
});

export default CurrencyListSlice.reducer;
