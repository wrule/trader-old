import { nums } from '@wrule/nums';
import { Trade } from './trade';
import moment from 'moment';

/**
 * 交易列表
 */
export
class TradeList {
  /**
   * 构造函数
   * @param trades 交易列表
   */
  public constructor(
    private trades: Trade[] = [],
  ) { }

  /**
   * 向列表中追加交易
   * @param items 交易
   */
  public Push(...items: Trade[]) {
    this.trades.push(...items);
  }

  /**
   * 初始化交易列表
   */
  public Reset() {
    this.trades = [];
  }

  /**
   * 交易列表长度
   */
  public get Length() {
    return this.trades.length;
  }

  /**
   * 交易收益的Nums
   */
  public get Incomes() {
    return nums(this.trades.map((trade) => trade.Income));
  }

  /**
   * 总收益
   */
  public get TotalIncome() {
    if (this.trades.length > 0) {
      const first = this.trades[0];
      const last = this.trades[this.trades.length - 1];
      return (last.SellData.funds - first.BuyData.funds) / first.BuyData.funds;
    }
    return 0;
  }

  /**
   * 盈利交易列表
   */
  public get ProfitTrades() {
    return new TradeList(this.trades.filter((trade) => trade.Income > 0));
  }

  /**
   * 亏损交易列表
   */
  public get PossTrades() {
    return new TradeList(this.trades.filter((trade) => trade.Income <= 0));
  }

  /**
   * 胜率
   */
  public get ProfitRate() {
    return this.ProfitTrades.Length / this.Length;
  }

  /**
   * 获取连续亏损交易集
   * @returns 连续亏损交易集
   */
  public LossTradeSet() {
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
      ([end, start]) => new TradeList(this.trades.slice(start, end))
    );
  }

  /**
   * 获取连续盈利交易集
   * @returns 连续盈利交易集
   */
  public ProfitTradeSet() {
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
      ([end, start]) => new TradeList(this.trades.slice(start, end))
    );
  }

  /**
   * 根据时间字符串选取交易列表
   * @param start 开始时间
   * @param end 结束时间
   * @returns 交易列表
   */
  public Select(
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
