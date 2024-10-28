const fs = require('fs'); 

function fileExists(filename) {
  return fs.existsSync(filename);
}

function validNumber(value) {
  // Check if the value is a number type
  if (typeof value === 'number') {
      return !isNaN(value); // Ensure it's not NaN
  }
  // If the value is a string, check against the regex
  if (typeof value === 'string') {
      // Regular expression to match valid numbers (integer and float, signed and unsigned)
      const regex = /^-?\d+(\.\d+)?$/;
      return regex.test(value.trim()); // Test the trimmed string against the regex
  }
  // If it's neither a number nor a string, return false
  return false;
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
  // Check if the dataset is an array
  if (!Array.isArray(dataset) || dataset.length === 0) {
      return false; // Invalid dataset
  }
  // Filter valid numbers from the dataset
  const validNumbers = dataset.filter(value => validNumber(value));
  // Check if there are any valid numbers
  if (validNumbers.length === 0) {
      return false; // No valid numbers found
  }
  // Calculate the mean average
  const sum = validNumbers.reduce((acc, value) => {
      return acc + (typeof value === 'string' ? parseFloat(value) : value);
  }, 0);
  return sum / validNumbers.length; // Return the mean
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
  // string, dataset, dataset 
  // returns a list comprising of [dataframe, rows (integer), cols (integer)]

}

function calculateMedian(dataset) {
  if (dataDimensions(dataset)[1] != -1) {
    const validNumbers = dataset.filter(item => validNumber(item)).map(Number).sort((a,b) => a - b);
    const length = validNumbers.length;
    if (length == 0) return false;
    const mid = Math.floor(length / 2);
    return length % 2 == 0 ? (validNumbers[mid - 1] + validNumbers[mid]) / 2 : validNumbers[mid];
  }
  return false;  
}

function createSlice(dataframe, colindex, colpattern, exportcols = []) {
  const filteredData = dataframe.filter(row => row[colindex] == colpattern);
  if (exportcols.length == 0) {
    return filteredData;
  }
  return filteredData.map(row => {
    return Object.keys(row).filter((_, index) => exportcols.includes(index)).map(key => row[key]);
  });
}

module.exports = {
  fileExists, validNumber, dataDimensions, calculateMean, findTotal, convertToFloat, flatten, 
  loadCSV, calculateMedian, createSlice,
} 