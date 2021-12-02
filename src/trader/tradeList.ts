import { nums } from '@wrule/nums';
import { Trade } from './trade';
import moment from 'moment';

export
class TradeList {
  public constructor(
    private trades: Trade[] = [],
  ) { }

  public push(...items: Trade[]) {
    return this.trades.push(...items);
  }

  public Reset() {
    this.trades = [];
  }

  public get length() {
    return this.trades.length;
  }

  public incoms() {
    return nums(this.trades.map((trade) => trade.income));
  }

  public profitTrades() {
    return new TradeList(this.trades.filter((trade) => trade.income > 0));
  }

  public lossTrades() {
    return new TradeList(this.trades.filter((trade) => trade.income <= 0));
  }

  public profitRate() {
    return this.profitTrades.length / this.length;
  }

  public lossRate() {
    return this.lossTrades.length / this.length;
  }

  public lossTradeSet() {
    let start = -1;
    const indexs: [number, number][] = [];
    this.trades.forEach((trade, index) => {
      const prevTrade = this.trades[index - 1] || null;
      if (
        trade.income <= 0 &&
        (prevTrade == null || prevTrade.income > 0)
      ) {
        start = index;
      }
      if (start >= 0) {
        if (trade.income > 0) {
          indexs.push([index, start]);
          start = -1;
        } else if (index >= this.trades.length - 1) {
          indexs.push([index + 1, start]);
          start = -1;
        }
      }
    });
    indexs.sort((a, b) => (b[0] - b[1]) - (a[0] - a[1]));
    return indexs.map(
      ([end, start]) => new TradeList(this.trades.slice(start, end))
    );
  }

  public profitTradeSet() {
    let start = -1;
    const indexs: [number, number][] = [];
    this.trades.forEach((trade, index) => {
      const prevTrade = this.trades[index - 1] || null;
      if (
        trade.income > 0 &&
        (prevTrade == null || prevTrade.income <= 0)
      ) {
        start = index;
      }
      if (start >= 0) {
        if (trade.income <= 0) {
          indexs.push([index, start]);
          start = -1;
        } else if (index >= this.trades.length - 1) {
          indexs.push([index + 1, start]);
          start = -1;
        }
      }
    });
    indexs.sort((a, b) => (b[0] - b[1]) - (a[0] - a[1]));
    return indexs.map(
      ([end, start]) => new TradeList(this.trades.slice(start, end))
    );
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
          trade.buyData.time >= startTime &&
          trade.buyData.time <= endTime
        )
      )
    );
  }
}
