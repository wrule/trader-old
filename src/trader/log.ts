import { IDayData } from '../dayData';

export
interface ITradeData
extends IDayData {
  funds: number;
}

export
class TradeLog {
  public constructor(
    private data: ITradeData[],
  ) { }

  public get Income() {
    return (this.data[1].funds - this.data[0].funds) / this.data[0].funds;
  }
}
