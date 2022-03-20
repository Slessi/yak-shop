import { XMLParser } from "fast-xml-parser";
import fs from "fs/promises";
import path from "path";
import { LabYak } from "./labyak";

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  attributesGroupName: "attrs",
});

export async function parseXmlFile(fileName: string) {
  const filePath = path.resolve(process.cwd(), String(fileName));
  const file = await fs.readFile(filePath);

  const parsed = xmlParser.parse(file);
  const labyaks = parsed?.herd?.labyak;

  if (!Array.isArray(labyaks)) {
    throw new Error("Invalid XML file supplied");
  }

  return labyaks.map<LabYak>((l) => ({
    name: String(l?.attrs?.name),
    age: Number(l?.attrs?.age),
    sex: String(l?.attrs?.sex),
  }));
}
