import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const path = "/home/dunggiait/Downloads/Buoi 5_Truy van node-mongo-mvc-demo-API.xlsx";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(path));

for (const sheet of workbook.worksheets.items) {
  const used = sheet.getUsedRange();
  console.log(`\n=== ${sheet.name} ${used?.address ?? "A1"} ===`);
  for (const [index, row] of (used?.values ?? []).entries()) {
    const cells = row.filter((value) => value !== null && value !== "");
    if (cells.length) console.log(`${index + 1}\t${cells.join("\t")}`);
  }
}
