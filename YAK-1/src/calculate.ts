import { LabYak } from "./labyak";

interface LabYakResult {
  name: string;
  age: number;
  milk: number;
  wool: number;
  lastShave: number;
}

export function calculate(labyaks: LabYak[], totalDays: number) {
  const results = new Map<number, LabYakResult>(
    labyaks.map((l, i) => [
      i,
      {
        name: l.name,
        age: l.age,
        milk: 0,
        wool: 0,
        lastShave: 0,
      },
    ])
  );

  let currentDay = 0;

  while (currentDay < totalDays) {
    results.forEach((result) => {
      // D = age in days
      const D = result.age * 100;

      // A LabYak dies the day he turns 10.
      // Using .toFixed to prevent floating point errors
      if (result.age.toFixed(2) === "10.00") {
        return;
      }

      // Each day a LabYak produces 50-D*0.03 liters of milk
      result.milk += 50 - D * 0.03;

      if (canShaveLabYak(result, currentDay)) {
        result.wool += 1;
        result.lastShave = currentDay;
      }

      result.age += 0.01;
    });

    currentDay++;
  }

  return results;
}

function canShaveLabYak({ age, lastShave }: LabYakResult, currentDay: number) {
  // A yak can be first shaven when he is 1 year.
  if (age < 1) {
    return false;
  }

  // The moment you open up the YakShop webshop will be day 0, and all yaks are eligible to be shaven
  if (currentDay === 0) {
    return true;
  }

  // At most every 8+age (D*0.01) days you can again shave a LabYak
  return currentDay - lastShave > 8 + age;
}
