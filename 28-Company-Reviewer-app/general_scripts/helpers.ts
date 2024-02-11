export function getCompanyIdFromURL(): number | null {
    // Získaj parametre URL adresy a ulož ich do objektu URLSearchParams.
    const urlParams: URLSearchParams = new URLSearchParams(window.location.search);

    // Získaj hodnotu parametra s názvom "id" z URLSearchParams.
    const companyIdString: string | null = urlParams.get("id");

    // Skontroluj, či bol parameter "id" nájdený v URL adrese.
    if (companyIdString) {
        // Ak parameter "id" existuje, pokús sa previesť ho na číslo.
        const companyId: number = parseInt(companyIdString);

        // Skontroluj, či prevod na číslo bol úspešný a číslo je platné.
        if (!isNaN(companyId)) {
            // Vráť identifikátor firmy ako číslo.
            return companyId;
        }
    }

    // Ak parameter "id" neexistuje alebo nie je platným číslom, vráť null.
    return null;
}