/////// STEP 1 - IMPORTARE FS

const fs = require('fs');


/////// STEP 2 - LEGGERE GLI ARGOMENTI INSERITI DA CONSOLE

const myArgs = process.argv.slice(2);


/////// STEP 3 - PRENDERE IL PRIMO ELEMENTO COME "INPUTURL", IL SECONDO COME "OUTPUTURL" (NON OBBLIGATORIO) E IL TERZO

if (myArgs[0] === undefined) {
  console.error('mi serve il file di input')
  process.exit();
}

const inputUrl = myArgs[0];

let outputUrl

if (myArgs[1] === undefined){
  outputUrl = inputUrl;
} else {
  outputUrl = myArgs[1];
}

let data;

try {
  data = fs.readFileSync(inputUrl, 'utf8');
} catch (err) {
  console.log('file non trovato');
  process.exit();
}


/////// STEP 4 - LEGGERE IL CONTENUTO DEL FILE E LOGGARE IL NUMERO DI CARATTERI (SPAZI COMPRESI) E IL NUMERO DI CARATTERI (SPAZI ESCLUSI)

const countCharWithSpace = data.length;

const countCharWithoutSpace = data.replace(/\s+/g, '').length;

const wordArray = data.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(" ");

const countWord = wordArray.length;

let searchWord;

let counter = 0;

if (myArgs[2] !== undefined){
  searchWord = myArgs[2];
  const regexSearch = new RegExp(searchWord.toLowerCase());
  for (let i = 0; i < wordArray.length; i++) {
  const word = wordArray[i];
  if (word.match(regexSearch)) {
    counter = counter + 1
  }
}
} else {
  searchWord = 'nessuna parola cercata'
} 


/////// STEP 5 - SE L'UTENTE HA INSERITO L'"OUTPUTURL", SCRIVERE UN NUOVO FILE CON IL TESTO DELL'ORIGINALE PIU' I DATI DELL'ANALISI
///////          SE L'UTENTE NON HA INSERITO L'"OUTPUTURL", SOVRASCRIVERE IL FILE ORIGINALE.
/////// ESEMPIO: (ORIGINALE)"VIVA IL CSS!" (COPIA)"VIVA IL CSS!" \ NUMERO DI CARATTERI (SPAZI INCLUSI): 12 \ NUMERO DI CARATTERI (SPAZI ESCLUSI): 10

const result = data + '\r\n' + 
               '\r\n' + 'Numero caratteri (spazi compresi): ' + countCharWithSpace + '\r\n' + 
               '\r\n' + 'Numero caratteri (spazi esclusi): ' + + countCharWithoutSpace + '\r\n' +
               '\r\n' + 'Numero parole (totali): ' + countWord + '\r\n' + 
               '\r\n' + 'Parola cercata: ' + searchWord + '\r\n' +
               '\r\n' + 'Numero occorrenze (parola cercata): ' + counter;


try {
  fs.writeFileSync(outputUrl, result);
} catch (err) {
  console.error('non riesco a scrivere il file');
  process.exit();
}

