import { ICompany } from "./interfaces";
import { Review } from "./review";

export class Company implements ICompany {
    constructor(public id: number, public companyName: string, public companyInfo: string, public reviews: Review[]) {
        
    }
}