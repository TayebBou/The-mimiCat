import { createSlice } from "@reduxjs/toolkit";
import { IRankingStates } from "../../shared/models/rankingStates.model";

const initialRankingState:IRankingStates = {
    rankedArray: [],
    rankedArrayFetched: [],
    basicFirst: 0,
    basicRows: 10
}

const rankingSlice = createSlice({
    name: 'ranking',
    initialState: initialRankingState,
    reducers:{
        createRankedArray(state:IRankingStates, action) {
            const VotesNbr = action.payload.totalVoteNbr
            const catArrayRanked: { id: string; rank: number }[] = []
            // convert object to key's array
            const keys = Object.keys(action.payload).filter((a) => a !== 'totalVoteNbr' && a !== 'images')
            keys.map(
            (i: string, j: number) =>
                (catArrayRanked[j] = {
                id: i,
                // Calcul rank
                rank: parseFloat(
                    ((action.payload[i].vote / VotesNbr) * 100).toFixed(2),
                ),
                }),
            )
            const sortedArray = [...catArrayRanked].sort((a, b) => b.rank - a.rank)
            state.rankedArray = sortedArray;
            state.rankedArrayFetched = [...sortedArray].slice(0, 10);
        },
        setRankedArrayFetched(state:IRankingStates,action) {
            state.rankedArrayFetched = action.payload;
        },
        setBasicFirst(state:IRankingStates,action) {
            state.basicFirst = action.payload;
        },
        setBasicRows(state:IRankingStates,action) {
            state.basicRows = action.payload;
        }
    }
});

export const rankingActions = rankingSlice.actions;
export default rankingSlice.reducer;