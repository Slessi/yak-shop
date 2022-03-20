import { calculate } from "./calculate";
import { LabYak } from "./labyak";

describe("calculate", () => {
  const mockHerd: LabYak[] = [
    { name: "Betty-1", age: 4, sex: "f" },
    { name: "Betty-2", age: 8, sex: "f" },
    { name: "Betty-3", age: 9.5, sex: "f" },
  ];

  it.each<Parameters<typeof calculate>>([
    [mockHerd, 13],
    [mockHerd, 14],
    [mockHerd, 200],
  ])("calculates expected values", (...input) => {
    expect(calculate(...input)).toMatchSnapshot();
  });
});
