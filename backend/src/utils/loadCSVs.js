const fs = require('fs').promises;
const path = require('path');
const { parse } = require('csv-parse/sync');

async function loadCSVs() {
    const file = 'makes-sample.csv';

    const data = {};
    const filePath = path.join(__dirname, '../../data', file);
    try {
        const content = await fs.readFile(filePath, 'utf-8');

        data['makes'] = parse(content, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
        });
    } catch (error) {
        console.error(`Error loading ${file}:`, error);
        throw error;
    }

    return data;
}

module.exports = { loadCSVs };