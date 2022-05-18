  const fs = require('fs');

  const myArgs = process.argv.slice(2);

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


    const countCharWithSpace = fileData.length;

    const countCharWithoutSpace = fileData.replace(/\s+/g, "").length;

    const wordArray = fileData.replaceAll("'", " ").replace(/[^a-zA-Z ]/g, "").toLowerCase().split(" ");

    const countWord = wordArray.length;

    let counter = 0;
    for (const word of wordArray){
      if (word === searchWord){
        counter++;
      }
    }


//////////////////////////////////////////////////////////////////////////////////

///////// TUTTE LE OCCORRENZE
const allOccurrencies = new Map()

  const count = 1;
  
  for (let i = 0; i < wordArray.length; i++) {
    const word = wordArray[i];
    if (allOccurrencies.has(word)){
      allOccurrencies.set(word, count);
    } else {
      allOccurrencies.set(word, count)
    }
  }

  console.log(allOccurrencies)


  ///////////////ORDINE DECRESCENTE
  const orderedOccurrencies =  [...allOccurrencies].sort((a, b) => b[1] - a[1]);
  
  
  
  //////////////CALCOLO PERCENTUALE
  const occurrenciesTotalNumber = [...allOccurrencies].concat.apply([], [...allOccurrencies])
                                                 .filter(value => typeof value === 'number')
                                                 .reduce( (p, c) => p + c);

  const totalPercentage = new Map ();
  
  const number = allOccurrencies.values();
  const key = allOccurrencies.keys()
  
  for (let i = 0; i < orderedOccurrencies.length; i++) {
    const element = orderedOccurrencies[i];
    const value = (number.next().value * 100) / occurrenciesTotalNumber;
    totalPercentage.set(key.next().value, value+'%');
    
  }


  console.log(totalPercentage);


//////////////////////////////////////////////////////////////////////////////////
  const newFile = fileData + '\r\n' + 
                '\r\n' + 'Numero caratteri (spazi compresi): ' + countCharWithSpace + '\r\n' + 
                '\r\n' + 'Numero caratteri (spazi esclusi): ' + countCharWithoutSpace + '\r\n' +
                '\r\n' + 'Numero parole (totali): ' + countWord + '\r\n' + 
                '\r\n' + 'Parola cercata: ' + searchWord + '\r\n' +
                '\r\n' + 'Numero occorrenze (parola cercata): ' + counter + '\r\n' + 
                '\r\n' + 'Tutte le occorrenze: ' + allOccurrencies;



  try {
    fs.writeFileSync(outputUrl, newFile);
  } catch (err) {
    console.error('non riesco a scrivere il file');
    process.exit();
  }