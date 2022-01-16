import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from '../../axios-votes'
import { IGlobalStates } from "../../shared/models/globalStates.model";

const initialGlobalState:IGlobalStates = {
    images: [],
    loading: true,
}

const globalSlice = createSlice({
    name: 'global',
    initialState: initialGlobalState,
    reducers:{
        setImages(state:IGlobalStates, action) {
            state.images = action.payload;
            state.loading = false;
        }
    }
});

// Custom action creator
export const getImages = () => {
    return (dispatch: Dispatch) => {
        // Getting images with axios
        axios
        .get('/cats.json')
        .then((res) => {
            dispatch(globalSlice.actions.setImages(res.data.images))
        })
        .catch((err) => {});
    }
}

export const globalActions = globalSlice.actions;
export default globalSlice.reducer;