const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Node.js file system module
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to handle CORS
app.use(cors());

// API route to send JSON data
app.get('/api/details', (req, res) => {
    // Path to the JSON file
    const filePath = path.join(__dirname, 'data.json');

    // Read the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            // Handle error if the file can't be read
            res.status(500).json({ error: 'Failed to read the JSON file' });
        } else {
            // Parse and send JSON data as response
            const UniversityData = JSON.parse(data);
            let dataSourceSettings = {
                enableSorting: true,
                columns: [{ name: 'region', caption: 'Region' }, { name: 'country', caption: 'Country' }],
                rows: [{ name: 'rank_display', caption: 'Rank', expandAll: true, allowDragAndDrop: false },
                { name: 'university', caption: 'University', expandAll: true, allowDragAndDrop: false }],
                formatSettings: [{ name: 'international_students', format: 'N0' },
                { name: 'faculty_count', format: 'N0' }],
                dataSource: UniversityData.data,
                expandAll: false,
                values: [{ name: 'international_students', caption: 'Students' },
                { name: 'faculty_count', caption: 'Faculty' }],
                filters: [{ name: 'type', caption: 'University Type' }],
                filterSettings: [{ name: 'region', type: 'Exclude', items: ['Africa', 'Latin America'] }],
                fieldMapping: [{ name: 'rank_display', dataType: 'number' },
                { name: 'country', caption: 'Country' },
                { name: 'city', caption: 'City' },
                { name: 'region', caption: 'Region' },
                { name: 'research_output', caption: 'Research Output' },
                { name: 'student_faculty_ratio', caption: 'Student faculty ratio' }],
                groupSettings: [{ name: 'rank_display', type: 'Number', rangeInterval: 100 }],
                conditionalFormatSettings: [
                    {
                        measure: 'international_students',
                        value1: 1,
                        value2: 5000,
                        conditions: 'Between',
                        style: {
                            backgroundColor: '#E10000',
                            color: 'white',
                            fontFamily: 'Tahoma',
                            fontSize: '12px'
                        },
                        applyGrandTotals: false
                    },
                    {
                        measure: 'international_students',
                        value1: 50000,
                        conditions: 'GreaterThan',
                        style: {
                            backgroundColor: '#0C860C',
                            color: 'white',
                            fontFamily: 'Tahoma',
                            fontSize: '12px'
                        },
                        applyGrandTotals: false
                    },
                    {
                        measure: 'faculty_count',
                        value1: 1,
                        value2: 1000,
                        conditions: 'Between',
                        style: {
                            backgroundColor: '#E10000',
                            color: 'white',
                            fontFamily: 'Tahoma',
                            fontSize: '12px'
                        },
                        applyGrandTotals: false
                    },
                    {
                        measure: 'faculty_count',
                        value1: 10000,
                        conditions: 'GreaterThan',
                        style: {
                            backgroundColor: '#0C860C',
                            color: 'white',
                            fontFamily: 'Tahoma',
                            fontSize: '12px'
                        },
                        applyGrandTotals: false
                    }
                ],
                showHeaderWhenEmpty: false,
                emptyCellsTextContent: '-',
                excludeFields: ['link', 'logo']
            };
            res.json({ dataSourceSettings, universityData: UniversityData?.data });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
