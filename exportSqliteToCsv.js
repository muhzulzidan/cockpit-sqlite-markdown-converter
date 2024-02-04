const fs = require('fs');
const sqlite3 = require('sqlite3');
const { promisify } = require('util');
const { stringify } = require('csv-stringify/sync');

async function exportSQLiteToCSV(sqliteFile) {
    const db = new sqlite3.Database(sqliteFile);

    // Promisify the all() method
    const allAsync = promisify(db.all.bind(db));

    try {
        const tables = await allAsync("SELECT name FROM sqlite_master WHERE type='table'");
        for (const table of tables) {
            const rows = await allAsync(`SELECT * FROM ${table.name}`);
            const csvString = stringify(rows, { header: true });
            fs.writeFileSync(`${table.name}.csv`, csvString);
        }
    } catch (error) {
        console.error(`Error processing ${sqliteFile}:`, error);
    } finally {
        db.close();
    }
}

fs.readdirSync('.').forEach(file => {
    if (file.endsWith('.sqlite')) {
        exportSQLiteToCSV(file);
    }
});
