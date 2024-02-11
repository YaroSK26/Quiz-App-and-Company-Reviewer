import { companyService } from "../general_scripts/dbService.js";
import { getCompanyIdFromURL } from "../general_scripts/helpers.js";
import { ReviewFactory } from '../ts_models/factoryClasses.js';
// Načítaj detaily firmy po načítaní stránky
const companyIdHere = getCompanyIdFromURL();
if (companyIdHere != null) {
    loadCompanyDetails(companyIdHere);
}
// Funkcia na načítanie detailov o firme a zobrazenie na stránke
async function loadCompanyDetails(companyId) {
    try {
        const company = await companyService.getCompanyById(companyId);
        if (company) {
            document.getElementById("companyName").textContent = company.companyName;
            document.getElementById("companyInfo").innerHTML = company.companyInfo;
            // Funkcia na zobrazenie existujúcich recenzií
            function displayReviews(reviews) {
                const reviewsList = document.getElementById("reviewsList");
                if (reviewsList) {
                    reviewsList.innerHTML = ""; // Vyprázdni zoznam recenzií
                    for (let i = 0; i < reviews.length; i++) {
                        const li = document.createElement("li");
                        // Vytvor logicky oddelené elementy pre recenziu
                        const author = document.createElement("p");
                        author.textContent = `Author: ${reviews[i].whoWroteThis}`;
                        const rating = document.createElement("p");
                        rating.textContent = `Rating: ${reviews[i].numberOfPointsOutOfFive}/5`;
                        const goodPoints = document.createElement("p");
                        if (reviews[i].goodPoints.length > 0) {
                            goodPoints.className = "good";
                            const ulGoodPoints = document.createElement("ul");
                            for (let j = 0; j < reviews[i].goodPoints.length; j++) {
                                const liPoint = document.createElement("li");
                                liPoint.textContent = reviews[i].goodPoints[j];
                                ulGoodPoints.appendChild(liPoint);
                            }
                            goodPoints.textContent = `Good points:`;
                            goodPoints.appendChild(ulGoodPoints);
                        }
                        const badPoints = document.createElement("p");
                        if (reviews[i].badPoints.length > 0) {
                            badPoints.className = "bad";
                            const ulBadPoints = document.createElement("ul");
                            for (let k = 0; k < reviews[i].badPoints.length; k++) {
                                const liPoint = document.createElement("li");
                                liPoint.textContent = reviews[i].badPoints[k];
                                ulBadPoints.appendChild(liPoint);
                            }
                            badPoints.textContent = `Bad points:`;
                            badPoints.appendChild(ulBadPoints);
                        }
                        const divDelete = document.createElement("div");
                        const deleteButton = document.createElement("button");
                        deleteButton.textContent = "Delete this review";
                        deleteButton.addEventListener("click", () => {
                            li.remove();
                            reviews.splice(i);
                            companyService.updateCompany(company);
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
            const addReviewBtn = document.getElementById("addReview");
            // Obsluha odoslaného formulára pre pridanie recenzie
            addReviewBtn.addEventListener("click", () => {
                const whoWroteThisInput = document.getElementById("whoWroteThis");
                const numberOfPointsInput = document.getElementById("numberOfPointsOutOfFive");
                const goodPointsInput = document.getElementById("goodPoints");
                const badPointsInput = document.getElementById("badPoints");
                if (whoWroteThisInput.value && parseInt(numberOfPointsInput.value) != null && (goodPointsInput.value.split(",").map((point) => point.trim()) || badPointsInput.value.split(",").map((point) => point.trim()))) {
                    if (parseInt(numberOfPointsInput.value) > 5) {
                        numberOfPointsInput.valueAsNumber = 5;
                    }
                    if (parseInt(numberOfPointsInput.value) < 0) {
                        numberOfPointsInput.valueAsNumber = 0;
                    }
                    const reviewFactory = new ReviewFactory();
                    const newReview = reviewFactory.createReview(whoWroteThisInput.value, parseInt(numberOfPointsInput.value), goodPointsInput.value.split(",").map((point) => point.trim()), badPointsInput.value.split(",").map((point) => point.trim()));
                    // Pridaj novú recenziu do poľa recenzií
                    company.reviews.push(newReview);
                    if (confirm(`Do you want to add a review for ${company.companyName}`)) {
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
        }
        else {
            console.error("Company with this ID was not found.");
        }
    }
    catch (error) {
        console.error("Error loading company details:", error);
    }
}
