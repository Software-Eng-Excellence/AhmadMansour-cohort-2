import logger from "./util/logger";
import { readCSVFile } from './util/parsers/csvParser';
import { readJSONFile } from './util/parsers/jsonParser';
import { readXMLFile } from './util/parsers/xmlParser';

async function main() {
    // CSV data
    const csvData = await readCSVFile("./src/data/cake orders.csv");
    csvData.forEach((row: any) => logger.info(`CSV data: ${row}`)); 

    // JSON data
    const jsonData = await readJSONFile("./src/data/book orders.json");
    jsonData.forEach((row: object) => logger.info(`JSON data: ${JSON.stringify(row)}`));

    // XML data
    const xmlData = await readXMLFile("./src/data/toy orders.xml");
    const rows = xmlData.data.row;  // assuming rows is always an array
    rows.forEach((row: object) => logger.info(`XML data: ${JSON.stringify(row)}`));
}

main();
