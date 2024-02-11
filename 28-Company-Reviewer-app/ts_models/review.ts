import { IReview } from './interfaces';
export class Review implements IReview {
    constructor(public whoWroteThis: string, public numberOfPointsOutOfFive: number, public goodPoints: string[], public badPoints: string[]) {

    }
}