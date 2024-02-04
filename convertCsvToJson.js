const fs = require('fs');
const { parse } = require('csv-parse/sync');

function csvToJson(csvFilePath, jsonFilePath) {
    const csvData = fs.readFileSync(csvFilePath);
    const records = parse(csvData, {
        columns: true,
        skip_empty_lines: true
    });
    const jsonData = JSON.stringify(records, null, 2);
    fs.writeFileSync(jsonFilePath, jsonData);
}

// Convert each CSV file to JSON
fs.readdirSync('.').forEach(file => {
    if (file.endsWith('.csv')) {
        const jsonFileName = file.replace('.csv', '.json');
        csvToJson(file, jsonFileName);
    }
});

console.log("CSV to JSON conversion started. Please wait...");
