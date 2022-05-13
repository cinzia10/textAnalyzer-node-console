
const utilities = require('./text-utilities')
const inputOutput = require('./input-output_utilities')
const reportUtilities = require('./report-utilities')


const inputUrl = reportUtilities.getArgumentOrExitWithErrorAndIndex("devi inserire l'input url", 0)
const outputUrl = reportUtilities.getArgumentOrExitWithErrorAndIndex("devi inserire l'output url", 1)

let searchWord = reportUtilities.getOptionalArgumentWithIndex(2)

let fileData = inputOutput.readFileDataWithUrl(inputUrl);

const charNumber = utilities.getCharNumber(fileData);

const noSpacesCharNumber = utilities.getCharNumberWithoutSpaces(fileData);

const wordNumber = utilities.getWordNumber(fileData);

let occurrence = -1;
if (searchWord) {
  occurrence = utilities.getOccurrenciesWordInString(searchWord, fileData)
  
}

const report = utilities.createReportString(fileData,searchWord,charNumber,noSpacesCharNumber,wordNumber,occurrence)

inputOutput.writeReportInFile(outputUrl, report)