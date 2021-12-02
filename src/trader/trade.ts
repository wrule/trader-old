import { IDayData } from '../dayData';

export
interface ITradeData
extends IDayData {
  funds: number;
}

export
class Trade {
  public constructor(
    private data: ITradeData[],
  ) { }

  public get buyData() {
    return this.data[0];
  }

  public get sellData() {
    return this.data[1];
  }

  public get income() {
    return (this.data[1].funds - this.data[0].funds) / this.data[0].funds;
  }
}
