import { createSlice } from "@reduxjs/toolkit";
import { IVoteStates } from "../../shared/models/voteStates.model";
import { randomIntFromInterval } from '../../shared/util/number-utils'

const initialVoteState:IVoteStates = {
    images: [],
    loading: true,
    voted: false,
    votesNbr: 0,
    catIndex: []
}

const voteSlice = createSlice({
    name: 'vote',
    initialState: initialVoteState,
    reducers: {
        setImages(state:IVoteStates, action) {
            state.images = action.payload;
        },
        stopLoading(state:IVoteStates) {
            state.loading = false;
        },
        setVoted(state:IVoteStates,action) {
            state.voted = action.payload
        },
        setVotesNbr(state:IVoteStates,action) {
            state.votesNbr = action.payload
        },
        // Shuffle the state of catIndex Array
        shuffleImages(state:IVoteStates) {
            const catIndexArray = [randomIntFromInterval(0,99),randomIntFromInterval(0,99)];
            state.catIndex = catIndexArray
        }        
    }
});

export const voteActions = voteSlice.actions;
export default voteSlice.reducer;