import { IImage } from "./image.model";


export interface IVoteStates {
    images: IImage[],
    loading: boolean,
    voted: boolean,
    votesNbr: number,
    catIndex: number[]
  }