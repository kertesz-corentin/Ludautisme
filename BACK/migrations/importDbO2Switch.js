const dotenv = require('dotenv').config({ path: '../.env' });
const fs = require('fs/promises');
const client = require('../app/config/db');

const deployPath = './sqitch.plan';

const sendQuery = async (query, placeholders) => {
    try {
        const result = (!placeholders)
            ? await client.query(query)
            : await client.query(query, placeholders);
        return result;
    } catch (err) {
        const showErr = {
            name: err.constructor.name,
            message: err.message,
            stack: err.stack,
            table: err.table,
            schemas: err.schemas,
            column: err.column,
            dataType: err.dataType,
        };
        console.error(showErr);
        return { rows: [showErr] };
    }
};

const queryFromFile = async (filepath) => {
    try {
        const data = await fs.readFile(filepath, { encoding: 'utf8' });
        sendQuery(data);
        return data;
    } catch (err) {
        console.error(err);
    }
};

// queryFromFile('./initTest.sql');

const readDeploy = async () => {
    try {
        const data = await fs.readFile(deployPath, { encoding: 'utf8' });
        const cleaned = data.split(/\r?\n/)
            .filter(
                (line) => line.length > 1 && !line.includes('%'),
            );
        const sqlFiles = cleaned.map((line) => line.split(' ')[0]);
        sqlFiles.forEach(async (file) => {
            await queryFromFile(`./revert/${file}.sql`);
        });
        setTimeout(() => {
            sqlFiles.forEach(async (file, index) => {
                setTimeout(async () => {
                    const result = await queryFromFile(`./deploy/${file}.sql`);
                }, index * 20000);
            });
        }, 5000);
    } catch (err) {
        console.error(err);
    }
};

try {
    readDeploy();
    console.log('IMPORT SUCCESS');
} catch (err) {
    console.error(err);
}
