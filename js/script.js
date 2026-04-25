/* Elemente für die Adressangabe */
const radios = document.querySelectorAll('input[name="modus"]');
const adresseBereich = document.getElementById('adress-bereich');

/* Funktion zum Anzeigen oder Verstecken des Adressbereichs basierend auf der Auswahl */
function modus_aktualisieren() {

    const ausgewaehlt = document.querySelector('input[name="modus"]:checked');

    if (ausgewaehlt.value === 'abholung') {
        adresseBereich.style.display = 'flex';
    } else {
        adresseBereich.style.display = 'none';
    }
}

/* Beim Laden der Seite einmal ausfürhren */
modus_aktualisieren();

/* Bei jeder Änderung der Auswahl ausführen */
radios.forEach(function(radio) {
    radio.addEventListener('change', modus_aktualisieren);
});