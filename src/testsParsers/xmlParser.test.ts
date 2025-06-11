import { readXMLFile, writeXMLFile } from "../util/parsers/xmlParser";
import * as fs from "fs";
import * as path from "path";

describe("XML Read/Write Tests", () => {
  const testFile = path.resolve(__dirname, "../mock/test.xml");
  const emptyFile = path.resolve(__dirname, "../mock/empty.xml");
  const badPath = path.resolve(__dirname, "../missing/fail.xml");

  const sampleData = {
    product: {
      id: "123",
      name: "Laptop",
      price: "1200"
    }
  };

  beforeEach(() => {
    // Write a sample XML file for testing
    return writeXMLFile(testFile, sampleData);
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch {}
    try { fs.unlinkSync(emptyFile); } catch {}
  });

  it("reads XML correctly", async () => {
    const data = await readXMLFile(testFile);
    expect(data).toEqual(sampleData);
  });

  it("writes XML correctly", async () => {
    const newData = { person: { name: "John", age: "30" } };
    await writeXMLFile(testFile, newData);
    const content = fs.readFileSync(testFile, "utf-8");
    expect(content).toContain("<person>");
    expect(content).toContain("<name>John</name>");
  });

  it("returns null when reading an empty XML file", async () => {
    fs.writeFileSync(emptyFile, "", "utf-8");
    const data = await readXMLFile(emptyFile);
    expect(data).toBeNull();
  });

  it("throws error when reading from non-existent file", async () => {
    await expect(readXMLFile(badPath)).rejects.toThrow("Error reading XML file");
  });

  it("throws error when writing to invalid path", async () => {
    await expect(writeXMLFile(badPath, sampleData)).rejects.toThrow("Error writing XML file");
  });
});
