import { createSlice } from "@reduxjs/toolkit";
import { IVoteStates } from "../../shared/models/voteStates.model";
import { randomIntFromInterval } from '../../shared/util/number-utils'

const initialVoteState:IVoteStates = {
    voted: false,
    votesNbr: 0,
    catIndex: [randomIntFromInterval(0,99),randomIntFromInterval(0,99)]
}

const voteSlice = createSlice({
    name: 'vote',
    initialState: initialVoteState,
    reducers: {
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