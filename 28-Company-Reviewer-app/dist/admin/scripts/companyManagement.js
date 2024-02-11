import { companyService } from "../../general_scripts/dbService.js";
const allCompanies = document.querySelector("div.allCompanies");
companyService.getAllCompanies().then((dataOfCompanies) => {
    for (let i = 0; i < dataOfCompanies.length; i++) {
        const divCompanyHolder = document.createElement("div");
        divCompanyHolder.className = "company";
        const companyNameHeading = document.createElement("h2");
        companyNameHeading.className = "company-name";
        companyNameHeading.textContent = dataOfCompanies[i].companyName;
        divCompanyHolder.appendChild(companyNameHeading);
        const companyDescriptionParagraph = document.createElement("p");
        companyDescriptionParagraph.innerHTML = dataOfCompanies[i].companyInfo.substring(0, 200) + "...";
        companyDescriptionParagraph.className = "company-info";
        divCompanyHolder.appendChild(companyDescriptionParagraph);
        const companyDetailBtn = document.createElement("button");
        companyDetailBtn.innerHTML = 'Manage company';
        companyDetailBtn.addEventListener("click", () => {
            window.location.href = `/28-Company-Reviewer-app/admin/pages/companyAdmin.html?id=${dataOfCompanies[i].id}`;
        });
        divCompanyHolder.appendChild(companyDetailBtn);
        allCompanies.appendChild(divCompanyHolder);
    }
});
