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

  const formatted = labyaks.map((l) => ({
    name: String(l?.attrs?.name),
    age: Number(l?.attrs?.age ?? 0),
    sex: String(l?.attrs?.sex).toLowerCase(),
  }));

  const filtered = formatted.filter(
    (l): l is LabYak =>
      l.name.length > 0 && l.age >= 0 && ["f", "m"].includes(l.sex)
  );

  const invalidYaks = formatted.length - filtered.length;

  if (invalidYaks) {
    console.warn(
      `WARNING: ${invalidYaks} invalid yaks have been discarded from results`
    );
  }

  return filtered;
}
