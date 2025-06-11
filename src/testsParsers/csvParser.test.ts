import { readCSVFile, writeCSVFile } from "../util/parsers/csvParser"
import * as fs from "fs"
import * as path from "path"

describe("Simple CSV Read/Write Tests", () => {
  const testFile = path.resolve(__dirname, "../mock/products.csv")
  const emptyFile = path.resolve(__dirname, "../mock/empty.csv")

  const productData: string[][] = [
    ["ID", "Name", "Category", "Price"],
    ["101", "Laptop", "Electronics", "1200"],
    ["102", "Chair", "Furniture", "150"],
    ["103", "Notebook", "Stationery", "5"]
  ]

  beforeEach(() => {
    // Write the initial CSV file and empty file before each test
    fs.writeFileSync(testFile, productData.map(row => row.join(",")).join("\n"), "utf-8")
    fs.writeFileSync(emptyFile, "", "utf-8")
  })

  afterEach(() => {
    // Clean up files after each test
    try { fs.unlinkSync(testFile) } catch {}
    try { fs.unlinkSync(emptyFile) } catch {}
  })

  it("reads CSV correctly including header", async () => {
    const data = await readCSVFile(testFile, true)
    expect(data).toEqual(productData)
  })

  it("reads CSV correctly without header", async () => {
    const data = await readCSVFile(testFile, false)
    expect(data).toEqual(productData.slice(1)) // skip header row
  })

  it("returns an empty array when reading an empty CSV file", async () => {
    const data = await readCSVFile(emptyFile)
    expect(data).toEqual([])
  })

  it("writes new data to CSV and reads it back", async () => {
    const newData = [
      ["ID", "Name", "Category", "Price"],
      ["201", "Desk", "Furniture", "300"],
      ["202", "Pen", "Stationery", "2"]
    ]
    await writeCSVFile(testFile, newData)
    const result = await readCSVFile(testFile, true)
    expect(result).toEqual(newData)
  })
})
