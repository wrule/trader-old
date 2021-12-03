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

  /**
   * 资金量
   */
  private funds = 0;
  /**
   * 资产量
   */
  private assets = 0;
  /**
   * 当下交易数据
   */
  private tradeData: ITradeData[] = [];
  /**
   * 交易列表
   */
  private tradeList: TradeList = new TradeList();

  /**
   * 是否持有资产
   */
  public get Holding() {
    return this.assets > 0;
  }

  /**
   * 交易列表
   */
  public get TradeList() {
    return this.tradeList;
  }

  /**
   * 购买资产
   * @param data 当日数据
   */
  public Buy(data: IDayData) {
    if (!this.Holding) {
      this.tradeData = [{ ...data, funds: this.funds }];
      this.assets = this.funds / data.price * this.buyFee;
      this.funds = 0;
    }
  }

  /**
   * 出售资产
   * @param data 当日数据
   */
  public Sell(data: IDayData) {
    if (this.Holding) {
      this.funds = this.assets * data.price * this.sellFee;
      this.assets = 0;
      this.tradeData.push({ ...data, funds: this.funds });
      this.tradeList.push(new Trade([this.tradeData[0], this.tradeData[1]]));
    }
  }

  /**
   * 执行退场命令
   * @param data 当日数据
   */
  public End(data: IDayData) {
    this.Sell(data);
  }

  /**
   * 初始化交易者
   */
  public Reset() {
    this.funds = this.initFunds;
    this.assets = 0;
    this.tradeData = [];
    this.tradeList.Reset();
  }

  /**
   * 模拟回测
   * @param dayData 历史数据
   */
  public Backtesting(dayData: IDayData[]) {
    if (dayData.length > 0) {
      this.Reset();
      this.strategy.Install(this);
      const nDayData = dayData.slice().reverse();
      nDayData.forEach((data, index) => {
        this.strategy.Watch(nDayData.slice(nDayData.length - index - 1));
      });
      this.End(nDayData[0]);
    }
  }
}
