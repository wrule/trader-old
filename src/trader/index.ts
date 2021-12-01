import { IDayData } from '../dayData';
import { Strategy } from '../strategy';
import { ITradeData, TradeLog } from './log';

export
class Trader {
  public constructor(
    private strategy: Strategy,
    private initFunds = 1,
    private buyFee = 0.998,
    private sellFee = 0.998,
  ) {
    this.funds = this.initFunds;
  }

  private funds = 0;
  private assets = 0;

  public get Holding() {
    return this.assets > 0;
  }

  private data: ITradeData[] = [];
  private log: TradeLog[] = [];

  public get Log() {
    return this.log;
  }

  public Buy(data: IDayData) {
    if (!this.Holding) {
      this.data = [{ ...data, funds: this.funds }];
      this.assets = this.funds / data.price * this.buyFee;
      this.funds = 0;
    }
  }

  public Sell(data: IDayData) {
    if (this.Holding) {
      this.funds = this.assets * data.price * this.sellFee;
      this.assets = 0;
      this.data.push({ ...data, funds: this.funds });
      this.log.push(new TradeLog(this.data));
    }
  }

  public Reset() {
    this.funds = this.initFunds;
    this.assets = 0;
    this.data = [];
    this.log = [];
  }

  public End(data: IDayData) {
    this.Sell(data);
  }

  public Backtesting(list: IDayData[]) {
    if (list.length > 0) {
      this.Reset();
      this.strategy.Install(this);
      const nlist = list.slice().reverse();
      nlist.forEach((data, index) => {
        this.strategy.Watch(nlist.slice(nlist.length - index - 1));
      });
      this.End(nlist[0]);
    }
  }
}
