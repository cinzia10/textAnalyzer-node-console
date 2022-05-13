function getCharNumber(string) {
  return string.length;
}

function getCharNumberWithoutSpaces(string) {
  return getCharNumber(string.replaceAll(' ', ''));
}

function cleanString(string) {
  const cleanedString = string.replaceAll("'", ' ')
                              .replaceAll('.', '')
                              .replaceAll(',', '')
                              .replaceAll('!', '');
  return cleanedString
}

function createArrayOfWordsFromString(string) {
  const cleanedString = cleanString(string);
  return cleanedString.split(' ');
}

function getWordNumber(string) {
  const wordArray = createArrayOfWordsFromString(string);
  return wordArray.length;
}

function getOccurrenciesWordInString(searchWord, string) {
  let occurence = 0;
  const wordArray = createArrayOfWordsFromString(string);
  for (const word of wordArray) {
    if (word.toLowerCase() === searchWord.toLowerCase()) {
      occurence++;
    }
  }
  return occurence;
}

function createReportString(originalText, searchWord, charNumber, noSpacesCharNumber, wordNumber, occurrenceString) {
  occurrenceString = '';
  if (occurence>=0){
    occurrenceString = 'la parola "' + searchWord + '" appare ' + occurence + (occurence === 1 ? ' volta' : ' volte');
  }
  const newFileData = originalText + 
                    '\n' +
                    '\n' +
                    'numero di caratteri: ' + charNumber + '\n' +
                    'numero di caratteri spazi esclusi: ' + noSpacesCharNumber + '\n' +
                    'numero di parole: ' + wordNumber + '\n' +
                    occurrenceString;
return newFileData;
}
  exports.getCharNumber = getCharNumber;
  exports.getCharNumberWithoutSpaces = getCharNumberWithoutSpaces;
  exports.getWordNumber = getWordNumber;
  exports.getOccurrenciesWordInString = getOccurrenciesWordInString;
  exports.createReportString = createReportString;