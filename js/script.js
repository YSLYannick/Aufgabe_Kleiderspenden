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

/* PLZ Prüfen */
const plzInput = document.getElementById('plz');
const plzFehler = document.getElementById('plz-fehler');

/* ersten zwei Ziffern der Geschäftsstelle-PLZ */
const geschaeftsstelle_plz = '67';

function plz_pruefen() {

    /* Eingabe des Nutzers holen */
    const eingabe = plzInput.value;

    if (eingabe.length === 5) {
        const ersten_zwei = eingabe.substring(0, 2);
    
        if (ersten_zwei !== geschaeftsstelle_plz) {
            plzInput.classList.add('fehler');
            plzFehler.classList.add('sichtbar');
        } else {
            plzInput.classList.remove('fehler');
            plzFehler.classList.remove('sichtbar');            
        }
    } else {
        plzInput.classList.remove('fehler');
        plzFehler.classList.remove('sichtbar');
    }
}

plzInput.addEventListener('input', plz_pruefen);

/* Formular abfangen */
const formular = document.getElementById('spenden-formular');

formular.addEventListener ('submit', function(event) {
    
    /* Seite neu laden nach abschicken des Formulars verhindern */
    event.preventDefault();

    console.log("Formular abgeschickt")
});