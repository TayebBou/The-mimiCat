import { IRankedArray } from "./rankedArray.model";


export interface IRankingStates {
    rankedArray: IRankedArray[],
    rankedArrayFetched: IRankedArray[],
    basicFirst: number,
    basicRows: number
  }