import { getAllTests } from "./typescript_scripts/dbService.js";
const mainContainer = document.querySelector("section.main-container");
getAllTests().then((tests) => {
    tests.forEach((test) => {
        const divTestHolder = document.createElement("div");
        divTestHolder.classList.add("testHolder");
        const headingTestName = document.createElement("h2");
        headingTestName.classList.add("testName");
        headingTestName.textContent = test.title;
        divTestHolder.appendChild(headingTestName);
        const paragraphQuestionCount = document.createElement("p");
        paragraphQuestionCount.classList.add("question-counter");
        paragraphQuestionCount.innerHTML = `Number of questions in the test: <strong>${test.questions.length.toString()}</strong>`;
        divTestHolder.appendChild(paragraphQuestionCount);
        const anchorViewDetail = document.createElement("a");
        anchorViewDetail.textContent = "Apply to test";
        anchorViewDetail.href = `/Quiz-app-start/pages/testApplying.html?id=${test.id}`;
        divTestHolder.appendChild(anchorViewDetail);
        mainContainer.appendChild(divTestHolder);
    });
});
