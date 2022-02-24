import { IImage } from "./image.model";


export interface IGlobalStates {
    images: IImage[],
    loading: boolean
  }