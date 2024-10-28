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
  if (dataDimensions(dataset)[1] != -1) {
    const validNumbers = dataset.filter(item => validNumber(item)).map(Number);
    if (validNumbers.length == 0) return false;
    const sum = validNumbers.reduce((acc, val) => acc + val, 0);
    return sum / validNumbers.length;
  }
  return false;
}


function findTotal(dataset) {
  if (dataDimensions(dataset)[1] != -1) {
    const validNumbers = dataset.filter(item => validNumber(item)).map(Number);
    return validNumbers.reduce((acc, val) => acc + val, 0);
  }  
  return false;
} 


function convertToFloat(dataframe, col){
  let count = 0;
  for (let row of dataframe) {
    if (row[col] != undefined && validNumber(row[col]) && typeof row[col] != 'number') {
      row[col] = parseFloat(row[col]);
      count++;
    }
  }
  return count;
}


function flatten(dataframe) {
  if (dataDimensions(dataframe)[1] == 1) {
    return dataframe.map(row => row[0]);
  }  
  return [];
}


function loadCSV(csvFile, ignorerows, ignorecols) {
  
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