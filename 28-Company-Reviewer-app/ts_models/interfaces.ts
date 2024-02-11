import { Company } from "./company";
import { Review } from "./review";

export interface ICompanyFactory {
    createCompany(companyName: string, companyInfo: string, reviews: Review[]): Company;
}

export interface IReviewFactory {
    createReview(whoWroteThis: string, numberOfPointsOutOfFive: number, goodPoints: string[], badPoints: string[]): Review;
}

export interface IDbService {
    getAllCompanies(): Promise<Company[]>;
    getCompanyById(id: number): Promise<Company | null>;
    createCompany(newCompany: Company): Promise<Company>;
    updateCompany(updatedCompany: Company): Promise<Company>;
    deleteCompany(companyId: number): Promise<void>;
}

export interface ICompany {
    id: number;
    companyName: string;
    companyInfo: string;
    reviews: Review[];
}

export interface IReview {
    whoWroteThis: string;
    numberOfPointsOutOfFive: number;
    goodPoints: string[];
    badPoints: string[];
}