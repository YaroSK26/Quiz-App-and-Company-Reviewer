export function getCompanyIdFromURL() {
    // Získaj parametre URL adresy a ulož ich do objektu URLSearchParams.
    const urlParams = new URLSearchParams(window.location.search);
    // Získaj hodnotu parametra s názvom "id" z URLSearchParams.
    const companyIdString = urlParams.get("id");
    // Skontroluj, či bol parameter "id" nájdený v URL adrese.
    if (companyIdString) {
        // Ak parameter "id" existuje, pokús sa previesť ho na číslo.
        const companyId = parseInt(companyIdString);
        // Skontroluj, či prevod na číslo bol úspešný a číslo je platné.
        if (!isNaN(companyId)) {
            // Vráť identifikátor firmy ako číslo.
            return companyId;
        }
    }
    // Ak parameter "id" neexistuje alebo nie je platným číslom, vráť null.
    return null;
}
