import { Trader } from '../trader';
import { IDayData } from '../dayData';
import { nums } from '@wrule/nums';

export
abstract class Strategy {
  public constructor() { }

  protected trader!: Trader;

  public Install(trader: Trader) {
    this.trader = trader;
  }

  protected latestData: IDayData[] = [];

  public Watch(latestData: IDayData[]) {
    this.latestData = latestData;
    this.Work();
  }

  public abstract Work(): boolean;

  protected get prices() {
    return nums(this.latestData.map((item) => item.price));
  }

  protected pricesBefore(interval: number = 1) {
    return this.prices.slice(undefined, interval);
  }
}
