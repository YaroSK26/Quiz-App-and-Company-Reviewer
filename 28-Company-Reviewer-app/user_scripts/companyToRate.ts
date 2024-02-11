import { companyService } from "../general_scripts/dbService.js";
import { getCompanyIdFromURL } from "../general_scripts/helpers.js";
import { Company } from "../ts_models/company.js";
import { Review } from "../ts_models/review.js";
import { ReviewFactory } from '../ts_models/factoryClasses.js';

// Načítaj detaily firmy po načítaní stránky
const companyIdHere: number | null = getCompanyIdFromURL();
if (companyIdHere != null) {
    loadCompanyDetails(companyIdHere);
}

// Funkcia na načítanie detailov o firme a zobrazenie na stránke
async function loadCompanyDetails(companyId: number): Promise<void> {
    try {
        const company: Company | null = await companyService.getCompanyById(companyId);

        if (company) {
            document.getElementById("companyName")!.textContent = company.companyName;
            document.getElementById("companyInfo")!.innerHTML = company.companyInfo;

            // Funkcia na zobrazenie existujúcich recenzií
            function displayReviews(reviews: Review[]): void {
                const reviewsList: HTMLUListElement = <HTMLUListElement>document.getElementById("reviewsList");
                if (reviewsList) {
                    reviewsList.innerHTML = ""; // Vyprázdni zoznam recenzií

                    for (let i: number = 0; i < reviews.length; i++) {
                        const li: HTMLLIElement = document.createElement("li");

                        // Vytvor logicky oddelené elementy pre recenziu
                        const author: HTMLParagraphElement = document.createElement("p");
                        author.textContent = `Author: ${reviews[i].whoWroteThis}`;

                        const rating: HTMLParagraphElement = document.createElement("p");
                        rating.textContent = `Rating: ${reviews[i].numberOfPointsOutOfFive}/5`;

                        const goodPoints: HTMLParagraphElement = document.createElement("p");
                        if (reviews[i].goodPoints.length > 0) {
                            goodPoints.className = "good";
                            const ulGoodPoints: HTMLUListElement = document.createElement("ul");
                            
                            for (let j: number = 0; j < reviews[i].goodPoints.length; j++) {
                                const liPoint: HTMLLIElement = document.createElement("li");
                                liPoint.textContent = reviews[i].goodPoints[j];
                                ulGoodPoints.appendChild(liPoint);
                            }
                            goodPoints.textContent = `Good points:`;
                            goodPoints.appendChild(ulGoodPoints);
                        }

                        const badPoints: HTMLParagraphElement = document.createElement("p");
                        if (reviews[i].badPoints.length > 0) { 
                            badPoints.className = "bad";
                            const ulBadPoints: HTMLUListElement = document.createElement("ul");
                            
                            for (let k: number = 0; k < reviews[i].badPoints.length; k++) {
                                const liPoint: HTMLLIElement = document.createElement("li");
                                liPoint.textContent = reviews[i].badPoints[k];
                                ulBadPoints.appendChild(liPoint);
                            }
                            badPoints.textContent = `Bad points:`;
                            badPoints.appendChild(ulBadPoints);
                        }

                        const divDelete: HTMLDivElement = document.createElement("div");

                        const deleteButton: HTMLButtonElement = document.createElement("button");
                        deleteButton.textContent = "Delete this review";
                        deleteButton.addEventListener("click", () => {
                            li.remove();
                            reviews.splice(i);

                            companyService.updateCompany(company!);
                        });

                        divDelete.appendChild(deleteButton);

                        // Pridaj tieto elementy do <li> elementu
                        li.appendChild(author);
                        li.appendChild(rating);
                        if (reviews[i].goodPoints.length > 0) {
                            li.appendChild(goodPoints);
                        }

                        if (reviews[i].badPoints.length > 0) {
                            li.appendChild(badPoints);
                        }
                        li.appendChild(divDelete);

                        reviewsList.appendChild(li);
                    }
                }
            }

            displayReviews(company.reviews);

            const addReviewBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addReview");
            // Obsluha odoslaného formulára pre pridanie recenzie
            addReviewBtn.addEventListener("click", () => {
                const whoWroteThisInput: HTMLInputElement = document.getElementById("whoWroteThis") as HTMLInputElement;
                const numberOfPointsInput: HTMLInputElement = document.getElementById("numberOfPointsOutOfFive") as HTMLInputElement;
                const goodPointsInput: HTMLInputElement = document.getElementById("goodPoints") as HTMLInputElement;
                const badPointsInput: HTMLInputElement = document.getElementById("badPoints") as HTMLInputElement;

                if (whoWroteThisInput.value && parseInt(numberOfPointsInput.value) != null && (goodPointsInput.value.split(",").map((point: string) => point.trim()) || badPointsInput.value.split(",").map((point: string) => point.trim()))) {
                    if (parseInt(numberOfPointsInput.value) > 5) {
                        numberOfPointsInput.valueAsNumber = 5;
                    }

                    if (parseInt(numberOfPointsInput.value) < 0) {
                        numberOfPointsInput.valueAsNumber = 0;
                    }

                    const reviewFactory: ReviewFactory = new ReviewFactory();
                    const newReview: Review = reviewFactory.createReview(whoWroteThisInput.value, parseInt(numberOfPointsInput.value), goodPointsInput.value.split(",").map((point: string) => point.trim()), badPointsInput.value.split(",").map((point: string) => point.trim()));

                    // Pridaj novú recenziu do poľa recenzií
                    company.reviews.push(newReview);
                    
                    if (confirm(`Do you want to add a review for ${company.companyName}`)){
                        // Aktualizuj firmu s novými recenziami na serveri
                        companyService.updateCompany(company);
                    }
                    
                    // Znova načítaj recenzie a zobraz ich
                    displayReviews(company.reviews);
                    
                    // Vyčisti formulár
                    whoWroteThisInput.value = "";
                    numberOfPointsInput.value = "";
                    goodPointsInput.value = "";
                    badPointsInput.value = "";
                }
            });

        } else {
            console.error("Company with this ID was not found.");
        }
    } catch (error: unknown) {
        console.error("Error loading company details:", error);
    }
}