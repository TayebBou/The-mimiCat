import { IImage } from "./image.model";
import { IRankedArray } from "./rankedArray.model";


export interface IRankingStates {
    rankedArray: IRankedArray[],
    rankedArrayFetched: IRankedArray[],
    images: IImage[],
    loading: boolean,
    basicFirst: number,
    basicRows: number
  }