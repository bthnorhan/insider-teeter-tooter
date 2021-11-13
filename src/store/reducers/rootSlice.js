import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	clientWidth: 0,
	clientHeight: 0,
	currentWeightLeft: 0,
	currentWeightTop: 0,
	isWeightFalling: false,
	isGameEnded: false,
	isGamePause: false,

	leftWeights: [],
	leftTotalWeight: 0,
	leftMomentum: 0,

	rightWeights: [],
	rightTotalWeight: 0,
	rightMomentum: 0,
};

export const rootSlice = createSlice({
	name: 'root',
	initialState,
	reducers: {
		setClientSize: (state, action) => {
			state.clientWidth = action.payload.clientWidth;
			state.clientHeight = action.payload.clientHeight;
			state.currentWeightLeft = action.payload.clientWidth / 2 - 228;
		},
		moveLeft: state => {
			if (
				state.currentWeightLeft > state.clientWidth / 2 - 836 &&
				state.isWeightFalling &&
				!state.isGameEnded &&
				!state.isGamePause
			) {
				state.currentWeightLeft = state.currentWeightLeft - 152;
			}
		},
		moveRight: state => {
			if (
				state.currentWeightLeft < state.clientWidth / 2 - 228 &&
				state.isWeightFalling &&
				!state.isGameEnded &&
				!state.isGamePause
			) {
				state.currentWeightLeft = state.currentWeightLeft + 152;
			}
		},
		moveDown: state => {
			if (state.isWeightFalling && !state.isGameEnded && !state.isGamePause) {
				if (state.currentWeightTop < state.clientHeight - 258) {
					state.currentWeightTop = state.currentWeightTop + 2;
				} else {
					state.isWeightFalling = false;
				}
			}
		},
		addWeightLeft: (state, action) => {
			state.leftWeights = [...state.leftWeights, action.payload];
			state.leftTotalWeight += action.payload.weight;
			state.leftMomentum += action.payload.weight * action.payload.distance;

			if (state.leftMomentum - state.rightMomentum >= 20) {
				state.isGameEnded = true;
			}
		},
		addWeightRight: (state, action) => {
			state.rightWeights = [...state.rightWeights, action.payload];
			state.rightTotalWeight += action.payload.weight;
			state.rightMomentum += action.payload.weight * action.payload.distance;
		},

		resetGame: state => {
			state.currentWeightLeft = state.clientWidth / 2 - 228;
			state.isWeightFalling = false;
			state.isGameEnded = false;
			state.isGamePause = false;
			state.leftWeights = [];
			state.rightWeights = [];
			state.leftTotalWeight = 0;
			state.leftMomentum = 0;
			state.rightTotalWeight = 0;
			state.rightMomentum = 0;
		},

		runGame: state => {
			state.isWeightFalling = true;
			state.currentWeightTop = 0;
			state.currentWeightLeft = state.clientWidth / 2 - 228;
		},

		togglePause: state => {
			state.isGamePause = !state.isGamePause;
		},
	},
});

export const {
	setClientSize,
	moveLeft,
	moveRight,
	moveDown,
	addWeightLeft,
	addWeightRight,
	resetGame,
	runGame,
	togglePause,
} = rootSlice.actions;
export default rootSlice.reducer;
