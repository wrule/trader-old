import { nums } from '@wrule/nums';
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

  public get winNums() {
    return nums(this.log.filter((item) => item.Income >= 0).map((item) => item.Income));
  }

  public get loseNums() {
    return nums(this.log.filter((item) => item.Income < 0).map((item) => item.Income));
  }

  /**
   * 最大连续亏损交易索引序列
   */
  public get maxConsecutiveLossesIndexs() {
    let start = -1;
    const indexs: [number, number][] = [];
    this.log.forEach((item, index) => {
      const prevItem = this.log[index - 1] || null;
      if (
        item.Income <= 0 &&
        (prevItem == null || prevItem.Income > 0)
      ) {
        start = index;
      }
      if (start >= 0) {
        if (item.Income > 0) {
          indexs.push([index, start]);
          start = -1;
        } else if (index >= this.log.length - 1) {
          indexs.push([index + 1, start]);
          start = -1;
        }
      }
    });
    indexs.sort((a, b) => (b[0] - b[1]) - (a[0] - a[1]));
    return indexs;
  }

  public get maxConsecutiveLosses() {
    return this.maxConsecutiveLossesIndexs
      .map(([end, start]) => this.log.slice(start, end));
  }

  public get winRate() {
    return this.winNums.length / this.log.length;
  }

  public get income() {
    return (this.funds - this.initFunds) / this.initFunds;
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
