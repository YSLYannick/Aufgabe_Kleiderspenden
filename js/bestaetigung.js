/* URL Parameter auslesen */
const params = new URLSearchParams(window.location.search);

/* Text sicher ausgeben (XSS Schutz) */
function sicher_ausgeben(elementId, wert){
    const element = document.getElementById(elementId);
    if (element) {
        element.innerText  = wert || '-';
    }
}

/* Modus leserlich machen */
const modus = params.get('modus');
const modus_text = modus === 'abholung'
  ? 'Abholung durch Sammelfahrzeug'
  : 'Übergabe an der Geschäftsstelle';

/* Daten in die Seite schreiben */
sicher_ausgeben('erg-modus', modus_text);
sicher_ausgeben('erg-kleidung', params.get('kleidung'));
sicher_ausgeben('erg-krisengebiet', params.get('krisengebiet'));
sicher_ausgeben('erg-datum', params.get('datum'));
sicher_ausgeben('erg-ort', params.get('ort'));

/* Adresszeile wieder nur bei Abholung anzeigen */
const adresseZeile = document.getElementById('erg-adresse-zeile');
if (modus === 'abholung'){
    sicher_ausgeben('erg-adresse', params.get('adresse'));
    adresseZeile.style.display = 'flex';
    } else {
        adresseZeile.style.display = 'none';
    }