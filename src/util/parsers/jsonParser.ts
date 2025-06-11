import { promises as fs } from 'fs';

/**
 * Reads a JSON file and returns its parsed content
 * @param filePath - Path to the JSON file
 * @returns Promise<any> - Parsed JSON object
 */
export async function readJSONFile(filePath: string): Promise<any> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        throw new Error(`Error reading JSON file: ${error}`);
    }
}

/**
 * Writes an object to a JSON file
 * @param filePath - Path where the JSON file should be written
 * @param data - Data to write
 * @returns Promise<void>
 */
export async function writeJSONFile(filePath: string, data: any): Promise<void> {
    try {
        const jsonString = JSON.stringify(data, null, 2); // pretty-print with 2-space indent
        await fs.writeFile(filePath, jsonString, 'utf-8');
    } catch (error) {
        throw new Error(`Error writing JSON file: ${error}`);
    }
}
