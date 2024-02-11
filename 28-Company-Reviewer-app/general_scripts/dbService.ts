import { Company } from "../ts_models/company";
import { IDbService } from "../ts_models/interfaces";

class CompanyDatabaseService implements IDbService {
    private static instance: CompanyDatabaseService;
    private static urlLink: string = "http://localhost:3000/companies";

    private constructor() { }


    static getInstance(): CompanyDatabaseService {
        if (!CompanyDatabaseService.instance) {
            CompanyDatabaseService.instance = new CompanyDatabaseService();
        }
        return CompanyDatabaseService.instance;
    }

    // Metóda pre získanie všetkých firiem
    async getAllCompanies(): Promise<Company[]> {
        try {
            const response: Response = await fetch(CompanyDatabaseService.urlLink);
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error: unknown) {
            throw new Error(`Failed to fetch data: ${error}`);
        }
    }

    async getCompanyById(id: number): Promise<Company | null> {
        const response: Response = await fetch(`${CompanyDatabaseService.urlLink}/${id}`);
        if (response.ok) {
            const company: Company = await response.json();
            return company;
        } else {
            return null;
        }
    }

    // Metóda pre vytvorenie novej firmy
    async createCompany(newCompany: Company): Promise<Company> {
        try {
            const response: Response = await fetch(CompanyDatabaseService.urlLink, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCompany),
            });
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error: unknown) {
            throw new Error(`Failed to create company: ${error}`);
        }
    }

    // Metóda pre aktualizáciu existujúcej firmy
    async updateCompany(updatedCompany: Company): Promise<Company> {
        try {
            const response: Response = await fetch(`${CompanyDatabaseService.urlLink}/${updatedCompany.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCompany),
            });
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error: unknown) {
            throw Error(`Failed to update company: ${error}`);
        }
    }

    // Metóda pre zmazanie firmy
    async deleteCompany(companyId: number): Promise<void> {
        try {
            const response: Response = await fetch(`${CompanyDatabaseService.urlLink}/${companyId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
        } catch (error: unknown) {
            throw new Error(`Failed to delete company: ${error}`);
        }
    }
}

export const companyService: CompanyDatabaseService = CompanyDatabaseService.getInstance();