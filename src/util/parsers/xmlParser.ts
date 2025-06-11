import { promises as fs } from 'fs';
import { parseStringPromise, Builder } from 'xml2js';

/**
 * Reads an XML file and converts it to a JS object
 * @param filePath - Path to the XML file
 * @returns Promise<any> - Parsed XML object
 */
export async function readXMLFile(filePath: string): Promise<any> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return await parseStringPromise(fileContent, {
            explicitArray: false,
            mergeAttrs: true
        });
    } catch (error) {
        throw new Error(`Error reading XML file: ${error}`);
    }
}

/**
 * Writes a JS object to an XML file
 * @param filePath - Path where the XML file should be written
 * @param data - JS object to convert to XML
 * @returns Promise<void>
 */
export async function writeXMLFile(filePath: string, data: any): Promise<void> {
    try {
        const builder = new Builder();
        const xmlString = builder.buildObject(data);
        await fs.writeFile(filePath, xmlString, 'utf-8');
    } catch (error) {
        throw new Error(`Error writing XML file: ${error}`);
    }
}
