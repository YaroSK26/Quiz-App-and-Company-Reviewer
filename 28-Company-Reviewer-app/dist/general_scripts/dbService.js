class CompanyDatabaseService {
    static instance;
    static urlLink = "http://localhost:3000/companies";
    constructor() { }
    static getInstance() {
        if (!CompanyDatabaseService.instance) {
            CompanyDatabaseService.instance = new CompanyDatabaseService();
        }
        return CompanyDatabaseService.instance;
    }
    // Metóda pre získanie všetkých firiem
    async getAllCompanies() {
        try {
            const response = await fetch(CompanyDatabaseService.urlLink);
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            return await response.json();
        }
        catch (error) {
            throw new Error(`Failed to fetch data: ${error}`);
        }
    }
    async getCompanyById(id) {
        const response = await fetch(`${CompanyDatabaseService.urlLink}/${id}`);
        if (response.ok) {
            const company = await response.json();
            return company;
        }
        else {
            return null;
        }
    }
    // Metóda pre vytvorenie novej firmy
    async createCompany(newCompany) {
        try {
            const response = await fetch(CompanyDatabaseService.urlLink, {
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
        }
        catch (error) {
            throw new Error(`Failed to create company: ${error}`);
        }
    }
    // Metóda pre aktualizáciu existujúcej firmy
    async updateCompany(updatedCompany) {
        try {
            const response = await fetch(`${CompanyDatabaseService.urlLink}/${updatedCompany.id}`, {
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
        }
        catch (error) {
            throw Error(`Failed to update company: ${error}`);
        }
    }
    // Metóda pre zmazanie firmy
    async deleteCompany(companyId) {
        try {
            const response = await fetch(`${CompanyDatabaseService.urlLink}/${companyId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
        }
        catch (error) {
            throw new Error(`Failed to delete company: ${error}`);
        }
    }
}
export const companyService = CompanyDatabaseService.getInstance();
