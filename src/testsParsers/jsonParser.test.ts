import { readJSONFile, writeJSONFile } from "../util/parsers/jsonParser"
import * as fs from "fs"
import * as path from "path"

describe("JSON Read/Write Tests", () => {
  const testFile = path.resolve(__dirname, "../mock/test.json")
  const badPath = path.resolve(__dirname, "../missing/fail.json")
  const emptyFile = path.resolve(__dirname, "../mock/empty.json")

  const testData = {
    id: 1,
    name: "Test",
    values: [10, 20, 30]
  }

  beforeEach(() => {
    // Write a valid JSON file
    fs.writeFileSync(testFile, JSON.stringify(testData, null, 2), "utf-8")
    // Write an empty JSON file
    fs.writeFileSync(emptyFile, "", "utf-8")
  })

  afterEach(() => {
    try { fs.unlinkSync(testFile) } catch {}
    try { fs.unlinkSync(emptyFile) } catch {}
  })

  it("reads JSON file correctly", async () => {
    const data = await readJSONFile(testFile)
    expect(data).toEqual(testData)
  })

  it("writes JSON file and reads it back correctly", async () => {
    const newData = { foo: "bar", count: 42 }
    await writeJSONFile(testFile, newData)
    const readBack = await readJSONFile(testFile)
    expect(readBack).toEqual(newData)
  })

  it("throws error when reading invalid JSON file (empty file)", async () => {
    await expect(readJSONFile(emptyFile)).rejects.toThrow("Error reading JSON file")
  })

  it("throws error when reading from non-existent file", async () => {
    await expect(readJSONFile(badPath)).rejects.toThrow("Error reading JSON file")
  })

  it("throws error when writing to invalid path", async () => {
    await expect(writeJSONFile(badPath, testData)).rejects.toThrow("Error writing JSON file")
  })
})
