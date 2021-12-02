import { nums } from '@wrule/nums';
import { Trade } from './trade';
import moment from 'moment';

export
class Trades {
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
    return new Trades(this.trades.filter((trade) => trade.Income > 0));
  }

  public lossTrades() {
    return new Trades(this.trades.filter((trade) => trade.Income <= 0));
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
        trade.Income <= 0 &&
        (prevTrade == null || prevTrade.Income > 0)
      ) {
        start = index;
      }
      if (start >= 0) {
        if (trade.Income > 0) {
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
      ([end, start]) => new Trades(this.trades.slice(start, end))
    );
  }

  public profitTradeSet() {
    let start = -1;
    const indexs: [number, number][] = [];
    this.trades.forEach((trade, index) => {
      const prevTrade = this.trades[index - 1] || null;
      if (
        trade.Income > 0 &&
        (prevTrade == null || prevTrade.Income <= 0)
      ) {
        start = index;
      }
      if (start >= 0) {
        if (trade.Income <= 0) {
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
      ([end, start]) => new Trades(this.trades.slice(start, end))
    );
  }

  public select(
    start?: string,
    end?: string,
  ) {
    const startTime = start != null ? moment(start).valueOf() : -Infinity;
    const endTime = end != null ? moment(end).valueOf() : Infinity;
    return new Trades(
      this.trades.filter(
        (trade) => (
          trade.BuyData.time >= startTime &&
          trade.BuyData.time <= endTime
        )
      )
    );
  }
}
