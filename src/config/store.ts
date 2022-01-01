import { configureStore } from '@reduxjs/toolkit';
import voteReducer from './stateSlices/voteSlice';
import rankingReducer from './stateSlices/rankingSlice';

const store = configureStore({
    reducer: {
        vote: voteReducer,
        ranking: rankingReducer
    }
});

export default store;