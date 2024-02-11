import { companyService } from "../../general_scripts/dbService.js";
import { getCompanyIdFromURL } from "../../general_scripts/helpers.js";
import { Company } from "../../ts_models/company.js";
import { CompanyFactory } from "../../ts_models/factoryClasses.js";

const companyIdHere: number | null = getCompanyIdFromURL();
if (companyIdHere != null) {
    companyService.getCompanyById(companyIdHere).then((company: Company | null) => {
        if (company) {
            const companyNameSpan: HTMLSpanElement = <HTMLSpanElement>document.getElementById("companyName");
            const companyInfoUpdate: HTMLDivElement = <HTMLDivElement>document.getElementById("companyInfoUpdate");

            companyNameSpan.textContent = company.companyName;
            companyInfoUpdate.innerHTML = company.companyInfo;
            
            const editBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button.edit");
            const cancelChangesBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button.cancel");
            const saveChangesBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button.save");

            const deleteBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button.delete");

            editBtn.addEventListener("click", () => {
                companyNameSpan.contentEditable = "true";
                companyInfoUpdate.contentEditable = "true";

                cancelChangesBtn.style.display = "inline-block";
                saveChangesBtn.style.display = "inline-block";

                editBtn.style.display = "none";
                deleteBtn.style.display = "none";
            });

            cancelChangesBtn.addEventListener("click", () => {
                document.location.reload();
            });

            saveChangesBtn.addEventListener("click", () => {
                if (confirm("Do you want to update this company?")) {
                    company.companyName = companyNameSpan.textContent!;
                    company.companyInfo = companyInfoUpdate.innerHTML!;
                    companyService.updateCompany(company).then(() => {
                        confirm("Company was updated");
                    });
                }
            });

            deleteBtn.addEventListener("click", () => {
                if(confirm("Do you want to delete this company?")) {
                    companyService.deleteCompany(company.id).then(() => {
                        confirm("Company was deleted");
                    });
                }
            });
        } else {
            window.location.href = "../pages/companyManagement.html"
        }
    });
} else {
    const editBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button.edit");
    const saveChangesBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button.save");
    const deleteBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button.delete");

    saveChangesBtn.style.display = "inline-block";

    editBtn.style.display = "none";
    deleteBtn.style.display = "none";
    
    const companyNameSpan: HTMLSpanElement = <HTMLSpanElement>document.getElementById("companyName");
    const companyInfoUpdate: HTMLDivElement = <HTMLDivElement>document.getElementById("companyInfoUpdate");
    companyNameSpan.contentEditable = "true";
    companyNameSpan.className = "editable-span";
    companyInfoUpdate.contentEditable = "true";

    saveChangesBtn.addEventListener("click", () => {
        if (confirm("Do you want to add this company to database?") && companyNameSpan.textContent && companyInfoUpdate.innerHTML) {
            const companyFactory: CompanyFactory = new CompanyFactory();
            const theCompany: Company = companyFactory.createCompany(companyNameSpan.textContent, companyInfoUpdate.innerHTML, []);
            
            companyService.createCompany(theCompany).then(() => {
                confirm("Company was added to database");
            });
        }
    });
}