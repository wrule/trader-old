import { IDayData } from '../dayData';

/**
 * 交易数据
 */
export
interface ITradeData
extends IDayData {
  /**
   * 交易涉及资金
   */
  funds: number;
}

/**
 * 交易
 */
export
class Trade {
  public constructor(
    private data: [ITradeData, ITradeData],
  ) { }

  /**
   * 买入交易数据
   */
  public get buyData() {
    return this.data[0];
  }

  /**
   * 出售交易数据
   */
  public get sellData() {
    return this.data[1];
  }

  /**
   * 收益
   */
  public get income() {
    return (this.sellData.funds - this.buyData.funds) / this.buyData.funds;
  }
}
