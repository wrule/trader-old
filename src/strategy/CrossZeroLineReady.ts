import { Nums } from '@wrule/nums';
import { Strategy } from '.';

/**
 * 零线穿越策略
 */
export
class CrossZeroLineReady
extends Strategy {
  public constructor(
    private line: Nums,
  ) {
    super();
  }

  public Work() {
    if (this.index < 1) {
      return false;
    }
    if (
      this.line.Nums[this.indexBefore()] <= 0 &&
      this.line.Nums[this.index] > 0
    ) {
      this.trader.Buy(this.data);
    }
    if (
      this.line.Nums[this.indexBefore()] >= 0 &&
      this.line.Nums[this.index] < 0
    ) {
      this.trader.Sell(this.data);
    }
    return true;
  }
}
