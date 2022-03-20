import yargs from "yargs/yargs";

export async function getArgs() {
  const { argv } = yargs(process.argv.slice(2))
    .command("filename", "Path to XML file to parse")
    .demandCommand(1, "Path to XML file is required")
    .options({
      T: {
        type: "number",
        description: `An integer T, representing the elapsed time in days.
            N.B. T=13 means that day 12 has elapsed, but day 13 has yet to begin`,
        demandOption: "T is required and must be an integer",
      },
    });

  const {
    _: [fileName],
    T,
  } = await argv;

  return { fileName: String(fileName), T };
}
