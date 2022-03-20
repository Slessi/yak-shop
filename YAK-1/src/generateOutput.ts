import type { calculate } from "./calculate";

export function generateOutput(resultMap: ReturnType<typeof calculate>) {
  const results = Array.from(resultMap.values());

  const stock = results.reduce(
    (prev, result) => {
      prev.milk += result.milk;
      prev.wool += result.wool;

      return prev;
    },
    { milk: 0, wool: 0 }
  );

  return `In Stock:
\t${stock.milk.toFixed(3)} liters of milk
\t${stock.wool} skins of wool
Herd:
${results
  .map(({ name, age }) => `\t${name} ${age.toFixed(2)} years old`)
  .join("\n")}
`;
}
