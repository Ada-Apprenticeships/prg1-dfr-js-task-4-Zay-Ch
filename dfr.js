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
  if (!Array.isArray(dataframe) || !Array.isArray(dataframe[0])) {
    throw new Error('Invalid dataframe');
  }
  // Filter rows based on colpattern
  const rows = dataframe.filter((row) => {
    if (colindex >= row.length) {
      throw new Error('colindex is out of range');
    }
    // Match the pattern
    return colpattern === '*' || row[colindex] == colpattern;
  });
  // Determine which columns to export
  const slicedData = rows.map(row => {
    if (exportcols.length === 0) {
      return row; // Return all columns if none specified
    }
    return exportcols.map(colIndex => row[colIndex]);
  });
  return slicedData;
}

function loadCSV(filename, ignorerows = [], ignorecols = []) {
  if (!fs.existsSync(filename)) {
      return [[], -1, -1]; // File does not exist
  }

  const fileContent = fs.readFileSync(filename, 'utf-8');
  const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0); // Trim and filter empty lines

  if (lines.length === 0) {
      return [[], 0, 0];
  }

  const headers = lines[0].split(','); // Split headers
  const originalColCount = headers.length; // Total number of columns in the header
  const filteredHeaders = headers.filter((_, index) => !ignorecols.includes(index)); // Filter out ignored columns

  const results = [];
  let originalRowCount = 0;

  lines.forEach((line, lineIndex) => {
      if (lineIndex === 0 || ignorerows.includes(lineIndex)) {
          // Skip header or ignored rows
          return;
      }

      const columns = line.split(',');

      // Create a filtered row based on ignored columns
      const filteredRow = columns.map((col, index) => {
          return ignorecols.includes(index) ? null : col; // Ignore specified columns
      }).filter(value => value !== null); // Remove ignored columns

      // Only push the filtered row if it has valid data
      if (filteredRow.length > 0) {
          results.push(filteredRow);
          originalRowCount++; // Increment only when a valid row is added
      }
  });

  // Debugging logs
  console.log('Filtered Headers:', filteredHeaders); // Log filtered headers
  console.log('Filtered Results:', results); // Log the filtered results
  console.log('Filtered Row Count:', results.length); // Log the number of valid rows
  console.log('Filtered Column Count:', filteredHeaders.length); // Log the number of valid columns

  return [results, originalRowCount, filteredHeaders.length]; // Return filtered column count
}

module.exports = {
  fileExists, validNumber, dataDimensions, calculateMean, findTotal, convertToFloat, flatten, 
  loadCSV, calculateMedian, createSlice,
} 