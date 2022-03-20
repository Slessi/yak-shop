import { Injectable } from '@nestjs/common';

export interface LabYak {
  name: string;
  age: number;
  sex: string;
}

export interface LabYakResult extends LabYak {
  milk: number;
  wool: number;
  ageLastShaved: number;
}

@Injectable()
export class AppService {
  public calculate(totalDays: number) {
    const results = this.getData().map<LabYakResult>((l) => ({
      ...l,
      milk: 0,
      wool: 0,
      ageLastShaved: 0,
    }));

    let currentDay = 0;

    while (currentDay < totalDays) {
      results.forEach((result) => {
        // D = age in days
        const D = result.age * 100;

        // A LabYak dies the day he turns 10.
        // Using .toFixed to prevent floating point errors
        if (result.age.toFixed(2) === '10.00') {
          return;
        }

        // Each day a LabYak produces 50-D*0.03 liters of milk
        result.milk += 50 - D * 0.03;

        if (this.canShaveLabYak(result, currentDay)) {
          result.wool += 1;
          result.ageLastShaved = result.age;
        }

        result.age += 0.01;
      });

      currentDay++;
    }

    return results;
  }

  private canShaveLabYak(
    { age, ageLastShaved }: LabYakResult,
    currentDay: number,
  ) {
    // A yak can be first shaven when he is 1 year.
    if (age < 1) {
      return false;
    }

    // The moment you open up the YakShop webshop will be day 0, and all yaks are eligible to be shaven
    if (currentDay === 0) {
      return true;
    }

    // At most every 8+age (D*0.01) days you can again shave a LabYak
    return (age - ageLastShaved) * 100 > 8 + age;
  }

  // TODO: Get this from where ...?
  private getData(): LabYak[] {
    return [
      { name: 'Betty-1', age: 4, sex: 'f' },
      { name: 'Betty-2', age: 8, sex: 'f' },
      { name: 'Betty-3', age: 9.5, sex: 'f' },
    ];
  }
}
