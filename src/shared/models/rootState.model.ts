import { IGlobalStates } from "./globalStates.model";
import { IRankingStates } from "./rankingStates.model";
import { IVoteStates } from "./voteStates.model";

export interface IRootState {
    vote: IVoteStates,
    ranking: IRankingStates,
    global: IGlobalStates
}