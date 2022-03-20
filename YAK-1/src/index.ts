import { calculate } from "./calculate";
import { generateOutput } from "./generateOutput";
import { getArgs } from "./getArgs";
import { parseXmlFile } from "./parseXmlFile";

main();

async function main() {
  const { fileName, T } = await getArgs();
  const labyaks = await parseXmlFile(fileName);

  const resultMap = calculate(labyaks, T);
  const output = generateOutput(resultMap);

  console.log(output);
}
