import { IDayData } from '../dayData';

export
class Trader {
  public constructor(
    private funds = 1,
    private buyFee = 0.98,
    private sellFee = 0.98,
  ) { }

  private assets = 0;

  public get Funds() {
    return this.funds;
  }

  public get Assets() {
    return this.assets;
  }

  public Buy(data: IDayData) {
    this.assets = this.funds / data.price * this.buyFee;
    this.funds = 0;
  }

  public Sell(data: IDayData) {
    this.funds = this.assets * data.price * this.sellFee;
    this.assets = 0;
  }
}
