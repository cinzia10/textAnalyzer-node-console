/////// STEP 1 - IMPORTARE FS

  const fs = require('fs');


/////// STEP 2 - LEGGERE GLI ARGOMENTI INSERITI DA CONSOLE

  const myArgs = process.argv.slice(2);


/////// STEP 3 - PRENDERE IL PRIMO ELEMENTO COME "INPUTURL" (OBBLIGATORIO), IL SECONDO COME "OUTPUTURL" (OBBLIGATORIO) E IL TERZO COME PAROLA DA CERCARE (NON OBBLIGATORIO)

  /// LEGGE IL TESTO DEL FILE
    let inputUrl;

    if (myArgs[0]) {
      inputUrl = myArgs[0];
    } else {
      console.error('mi serve il file di input')
      process.exit();
    }


  let outputUrl;

  if (myArgs[1]){
    outputUrl = myArgs[1];
  } else {
    console.error('mi serve il file di output')
    process.exit();
  }

  let searchWord;


  if (myArgs[2] !== undefined){
    searchWord = myArgs[2];
  } else {
    searchWord = 'nessuna parola cercata'
  }

  let fileData;

  try {
    fileData = fs.readFileSync(inputUrl, 'utf8');
  } catch (err) {
    console.error('file non trovato');
    process.exit();
  }


/////// STEP 4 - LEGGERE IL CONTENUTO DEL FILE E LOGGARE IL NUMERO DI CARATTERI (SPAZI COMPRESI), IL NUMERO DI CARATTERI (SPAZI ESCLUSI), IL NUMERO DELLE PAROLE E IL NUMERO DELLE OCCORRENZE DELLA PROLA DA CERCARE (SE PRESENTE)


  ///  NUMERO CARATTERI (COMPRESI GLI SPAZI)
    const countCharWithSpace = fileData.length;

  /// NUMERO CARATTERI (SPAZI ESCLUSI)
    const countCharWithoutSpace = fileData.replace(/\s+/g, "").length;
    // const countCharWithoutSpace = fileData.replaceAll(" ", "").length;

  /// TRASFORMARE IL TESTO IN UN ARRAY DI STRINGHE
    const wordArray = fileData.replaceAll("'", " ").replace(/[^a-zA-Z ]/g, "").toLowerCase().split(" ");

  /// NUMERO DI PAROLE PRESENTI
    const countWord = wordArray.length;

  /// NUMERO DI OCCORRENZE DELLA PAROLA CERCATA(ANCHE ALL'INTERNO DELLE PAROLE)
    // let counter = 0;

    // const regexSearch = new RegExp(searchWord.toLowerCase());
    //   for (let i = 0; i < wordArray.length; i++) {
    //   const word = wordArray[i];
    //   if (word.match(regexSearch)) {
    //     counter++
    //   }
    // }

    
    let counter = 0;
    for (const word of wordArray){
      if (word === searchWord){
        counter++;
      }
    }
    

/////// STEP 5 - SE L'UTENTE HA INSERITO L'"OUTPUTURL", SCRIVERE UN NUOVO FILE CON IL TESTO DELL'ORIGINALE PIU' I DATI DELL'ANALISI
/////// ESEMPIO: (ORIGINALE)"VIVA IL CSS!" (COPIA)"VIVA IL CSS!" \ NUMERO DI CARATTERI (SPAZI INCLUSI): 12 \ NUMERO DI CARATTERI (SPAZI ESCLUSI): 10 \ NUMERO DI PAROLE: 3 \ OCCORRENZE PAROLA CERCATA: N°

  const newFile = fileData + '\r\n' + 
                '\r\n' + 'Numero caratteri (spazi compresi): ' + countCharWithSpace + '\r\n' + 
                '\r\n' + 'Numero caratteri (spazi esclusi): ' + countCharWithoutSpace + '\r\n' +
                '\r\n' + 'Numero parole (totali): ' + countWord + '\r\n' + 
                '\r\n' + 'Parola cercata: ' + searchWord + '\r\n' +
                '\r\n' + 'Numero occorrenze (parola cercata): ' + counter;


  try {
    fs.writeFileSync(outputUrl, newFile);
  } catch (err) {
    console.error('non riesco a scrivere il file');
    process.exit();
  }