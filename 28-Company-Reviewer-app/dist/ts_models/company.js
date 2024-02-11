export class Company {
    id;
    companyName;
    companyInfo;
    reviews;
    constructor(id, companyName, companyInfo, reviews) {
        this.id = id;
        this.companyName = companyName;
        this.companyInfo = companyInfo;
        this.reviews = reviews;
    }
}
