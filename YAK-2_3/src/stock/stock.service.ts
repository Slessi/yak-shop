import { Injectable } from '@nestjs/common';
import { HerdService } from 'src/herd/herd.service';
import { OrderDto } from 'src/order/order.dto';
import { round } from 'src/round';

export interface Stock {
  milk: number;
  skins: number;
}

@Injectable()
export class StockService {
  private reservedStock: Stock = { milk: 0, skins: 0 };

  constructor(private herdService: HerdService) {}

  public getStock(totalDays: number): Stock {
    const stock = this.createStock(totalDays);

    return {
      milk: round(stock.milk - this.reservedStock.milk),
      skins: round(stock.skins - this.reservedStock.skins),
    };
  }

  public reserveStock(
    totalDays: number,
    { milk: milkRequested, skins: skinsRequested }: OrderDto,
  ) {
    const { milk: milkAvailable, skins: skinsAvailable } =
      this.getStock(totalDays);

    const reservedStock: Partial<Stock> = {};

    if (milkRequested && milkRequested <= milkAvailable) {
      reservedStock.milk = milkRequested;
      this.reservedStock.milk = round(this.reservedStock.milk + milkRequested);
    }

    if (skinsRequested && skinsRequested <= skinsAvailable) {
      reservedStock.skins = skinsRequested;
      this.reservedStock.skins = this.reservedStock.skins + skinsRequested;
    }

    return reservedStock;
  }

  private createStock(totalDays: number) {
    const data = this.herdService.getHerd(totalDays);

    return data.reduce(
      (prev, result) => {
        prev.milk += result.milk;
        prev.skins += result.skins;

        return prev;
      },
      { milk: 0, skins: 0 },
    );
  }
}
