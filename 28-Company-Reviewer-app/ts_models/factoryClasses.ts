import { Company } from "./company.js";
import { ICompanyFactory, IReviewFactory } from "./interfaces";
import { Review } from "./review.js";

export class CompanyFactory implements ICompanyFactory {
    createCompany(companyName: string, companyInfo: string, reviews: Review[]): Company {
        return new Company(0, companyName, companyInfo, reviews);
    }
}

export class ReviewFactory implements IReviewFactory {
    createReview(whoWroteThis: string, numberOfPointsOutOfFive: number, goodPoints: string[], badPoints: string[]): Review {
        return new Review(whoWroteThis, numberOfPointsOutOfFive, goodPoints, badPoints);
    }
}