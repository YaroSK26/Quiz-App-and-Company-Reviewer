import { companyService } from "../../general_scripts/dbService.js";
import { Company } from "../../ts_models/company.js";


const allCompanies: HTMLDivElement = <HTMLDivElement>document.querySelector("div.allCompanies");

companyService.getAllCompanies().then((dataOfCompanies: Company[]) => {
    for (let i: number = 0; i < dataOfCompanies.length; i++) {
        const divCompanyHolder: HTMLDivElement = document.createElement("div");
        divCompanyHolder.className = "company";

        const companyNameHeading: HTMLHeadingElement = document.createElement("h2");
        companyNameHeading.className = "company-name";
        companyNameHeading.textContent = dataOfCompanies[i].companyName;
        divCompanyHolder.appendChild(companyNameHeading);

        const companyDescriptionParagraph: HTMLParagraphElement = document.createElement("p");
        companyDescriptionParagraph.innerHTML = dataOfCompanies[i].companyInfo.substring(0, 200) + "...";
        companyDescriptionParagraph.className = "company-info";
        divCompanyHolder.appendChild(companyDescriptionParagraph);

        const companyDetailBtn: HTMLButtonElement = document.createElement("button");
        companyDetailBtn.innerHTML = 'Manage company';
        companyDetailBtn.addEventListener("click", () => {
            window.location.href = `/admin/pages/companyAdmin.html?id=${dataOfCompanies[i].id}`;
        });

        divCompanyHolder.appendChild(companyDetailBtn);
        allCompanies.appendChild(divCompanyHolder);
    }
});