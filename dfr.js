const fs = require('fs'); 


function fileExists(filename) {
  return fs.existsSync(filename);
}


function validNumber(value) {
  return !isNaN(value) && (typeof value == 'number' || !isNaN(parseFloat(value)));
}


function dataDimensions(dataframe) {
  if (dataframe == null || dataframe == undefined) {
    return [-1, -1];
  }
  if (Array.isArray(dataframe)) {
    const rows = dataframe.length;
    const cols = Array.isArray(dataframe[0]) ? dataframe[0].length : -1;
    return [rows,cols];
  }
  return [-1, -1];
}


function calculateMean(dataset) {
  // returns a float or false
  
}


function findTotal(dataset) {
  // returns float or false
  
} 


function convertToFloat(dataframe, col){ //dataframe, integer
  // returns an integer, which is the number that were  converted to floats.
  
}


function flatten(dataframe) {
  // returns a dataset (a flattened dataframe)
  
}


function loadCSV(csvFile, ignorerows, ignorecols) {  // string, dataset, dataset
  // returns a list comprising of [dataframe, rows (integer), cols (integer)]

}


function calculateMedian(dataset) {
  // return float or false 
  
}


function createSlice(dataframe, colindex, colpattern, exportcols = []) { // dataframe, integer, string/numeric, dataset
  // returns a dataframe
  
}









module.exports = {
  fileExists, validNumber, dataDimensions, calculateMean, findTotal, convertToFloat, flatten, 
  loadCSV, calculateMedian, createSlice,
} 