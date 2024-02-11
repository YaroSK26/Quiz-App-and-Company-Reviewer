import { Company } from "./company.js";
import { Review } from "./review.js";
export class CompanyFactory {
    createCompany(companyName, companyInfo, reviews) {
        return new Company(0, companyName, companyInfo, reviews);
    }
}
export class ReviewFactory {
    createReview(whoWroteThis, numberOfPointsOutOfFive, goodPoints, badPoints) {
        return new Review(whoWroteThis, numberOfPointsOutOfFive, goodPoints, badPoints);
    }
}
