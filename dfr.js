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
  // Calculate the total of valid numbers
  const total = validNumbers.reduce((acc, value) => {
      return acc + (typeof value === 'string' ? parseFloat(value) : value);
  }, 0);
  return total; // Return the total
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
  // Check if the dataset is an array
  if (!Array.isArray(dataset) || dataset.length === 0) {
      return false; // Invalid dataset
  }
  // Filter valid numbers from the dataset
  const validNumbers = dataset.filter(value => validNumber(value))
                               .map(value => (typeof value === 'string' ? parseFloat(value) : value));
  // Check if there are valid numbers
  if (validNumbers.length === 0) {
      return false; // No valid numbers found
  }
  // Sort the valid numbers
  validNumbers.sort((a, b) => a - b);
  const mid = Math.floor(validNumbers.length / 2);
  // Calculate the median
  if (validNumbers.length % 2 === 0) {
      // Even number of elements
      return (validNumbers[mid - 1] + validNumbers[mid]) / 2;
  } else {
      // Odd number of elements
      return validNumbers[mid];
  }
}

function createSlice(dataframe, colindex, colpattern, exportcols = []) {

}

module.exports = {
  fileExists, validNumber, dataDimensions, calculateMean, findTotal, convertToFloat, flatten, 
  loadCSV, calculateMedian, createSlice,
} 