  function getConsoleArguments() {
    return process.argv.slice(2);
  }
  
  function getArgumentOrExitWithErrorAndIndex(errorString, index) {
    const arguments = getConsoleArguments();
    let arg;
    if (arguments[index]) {
      arg = arguments[index]
    } else {
      console.error(errorString);
      process.exit()
    }
    return arg;
  }
  
  function getOptionalArgumentWithIndex(index) {
    const arguments = getConsoleArguments();
    return arguments[index];
  }
  
  exports.getArgumentOrExitWithErrorAndIndex = getArgumentOrExitWithErrorAndIndex;
  exports.getOptionalArgumentWithIndex = getOptionalArgumentWithIndex;