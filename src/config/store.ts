import { configureStore } from '@reduxjs/toolkit';
import voteReducer from './stateSlices/voteSlice';
import rankingReducer from './stateSlices/rankingSlice';
import globalReducer from './stateSlices/globalSlice';

const store = configureStore({
    reducer: {
        vote: voteReducer,
        ranking: rankingReducer,
        global: globalReducer
    }
});

export default store;