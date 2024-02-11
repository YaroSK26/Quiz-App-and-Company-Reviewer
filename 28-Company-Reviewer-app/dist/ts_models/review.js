export class Review {
    whoWroteThis;
    numberOfPointsOutOfFive;
    goodPoints;
    badPoints;
    constructor(whoWroteThis, numberOfPointsOutOfFive, goodPoints, badPoints) {
        this.whoWroteThis = whoWroteThis;
        this.numberOfPointsOutOfFive = numberOfPointsOutOfFive;
        this.goodPoints = goodPoints;
        this.badPoints = badPoints;
    }
}
