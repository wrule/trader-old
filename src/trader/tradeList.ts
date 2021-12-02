import { nums } from '@wrule/nums';
import { Trade } from './trade';
import moment from 'moment';

export
class TradeList {
  public constructor(
    private trades: Trade[],    
  ) { }

  public push(...items: Trade[]) {
    return this.trades.push(...items);
  }

  public get length() {
    return this.trades.length;
  }

  public incoms() {
    return nums(this.trades.map((trade) => trade.Income));
  }

  public profitTrades() {
    return new TradeList(this.trades.filter((trade) => trade.Income > 0));
  }

  public lossTrades() {
    return new TradeList(this.trades.filter((trade) => trade.Income <= 0));
  }

  public profitRate() {
    return this.profitTrades.length / this.length;
  }

  public lossRate() {
    return this.lossTrades.length / this.length;
  }

  public select(
    start?: string,
    end?: string,
  ) {
    const startTime = start != null ? moment(start).valueOf() : -Infinity;
    const endTime = end != null ? moment(end).valueOf() : Infinity;
    return new TradeList(
      this.trades.filter(
        (trade) => (
          trade.BuyData.time >= startTime &&
          trade.BuyData.time <= endTime
        )
      )
    );
  }
}
