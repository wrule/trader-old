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

  public get Holding() {
    return this.assets > 0;
  }

  public Buy(data: IDayData) {
    if (!this.Holding) {
      this.assets = this.funds / data.price * this.buyFee;
      this.funds = 0;
    }
  }

  public Sell(data: IDayData) {
    if (this.Holding) {
      this.funds = this.assets * data.price * this.sellFee;
      this.assets = 0;
    }
  }
}
