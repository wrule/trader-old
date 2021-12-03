import { IDayData } from '../dayData';
import { Strategy } from '../strategy';
import { ITradeData, Trade } from './trade';
import { TradeList } from './tradeList';

/**
 * 交易者
 */
export
class Trader {
  /**
   * 构造函数
   * @param strategy 策略
   * @param initFunds 初始资金
   * @param buyFee 买入费率
   * @param sellFee 卖出费率
   */
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

  /**
   * 是否持有资产
   */
  public get Holding() {
    return this.assets > 0;
  }

  private data: ITradeData[] = [];
  private tradeList: TradeList = new TradeList();

  /**
   * 交易列表
   */
  public get TradeList() {
    return this.tradeList;
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
      this.tradeList.push(new Trade([this.data[0], this.data[1]]));
    }
  }

  /**
   * 初始化交易者
   */
  public Reset() {
    this.funds = this.initFunds;
    this.assets = 0;
    this.data = [];
    this.tradeList.Reset();
  }

  /**
   * 执行退场命令
   * @param data 当日数据
   */
  public End(data: IDayData) {
    this.Sell(data);
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
