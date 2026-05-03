/* Elemente für die Adressangabe */
const radios = document.querySelectorAll('input[name="modus"]');
const adresseBereich = document.getElementById('adresse-bereich');

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
    
    /* Validierung der Pflichtfelder */
    const kleidung = document.getElementById('kleidung').value;
    const krisengebiet = document.getElementById('krisengebiet').value
    const modus = document.querySelector('input[name="modus"]:checked').value;

    if (kleidung === '' || krisengebiet === ''){
        alert('Bitte alle Pflichtfelder ausfüllen');
        return;
    }

    /* Bei Abholung PLZ erneut prüfen */
    if (modus === 'abholung'){
        const plz = document.getElementById('plz').value;
        const strasse = document.getElementById('strasse').value
        const ort = document.getElementById('ort').value;

        if (plz === '' || strasse === '' || ort === ''){
        alert('Bitte Abholadresse vollständig ausfüllen');
        return;
    }

    if (plz.substring(0, 2) !== geschaeftsstelle_plz){
        alert('Die Postleitzahl liegt nicht im Einzugsgebiet');
        return;
    }

  }

    /* Datum und Uhrzeit generieren */
    const jetzt = new Date();
    const datum = jetzt.toLocaleDateString('de-DE');
    const uhrzeit = jetzt.toLocaleTimeString('de-DE');

    /* URL Parameter zusammenbauen */
    const params = new URLSearchParams();
    params.set('modus', modus);
    params.set('kleidung', kleidung);
    params.set('krisengebiet', krisengebiet);
    params.set('datum', datum + ' um ' + uhrzeit);

    if (modus === 'abholung') {
      const strasse = document.getElementById('strasse').value
      const plz = document.getElementById('plz').value;
      const ort = document.getElementById('ort').value;  
      params.set('adresse', strasse + ' , ' + plz + ' ' + ort);
      params.set('ort', strasse + ' , ' + plz + ' ' + ort);
    } else {
      params.set('ort', 'Geschäftsstelle - Musterstraße 1, 67346 Speyer');  
    }

    /* Zur Bestätigungsseite weiterleiten */
    window.location.href = 'bestaetigung.html?' + params.toString();
    
});