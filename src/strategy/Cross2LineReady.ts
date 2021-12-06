import { Nums } from '@wrule/nums';
import { Strategy } from '.';

/**
 * 双线穿越策略
 */
export
class Cross2LineReady
extends Strategy {
  public constructor(
    private fast: Nums,
    private slow: Nums,
  ) {
    super();
  }

  public Work() {
    if (this.index < 1) {
      return false;
    }
    if (
      this.fast.Nums[this.indexBefore()] <= this.slow.Nums[this.indexBefore()] &&
      this.fast.Nums[this.index] > this.slow.Nums[this.index]
    ) {
      this.trader.Buy(this.data);
    }
    if (
      this.fast.Nums[this.indexBefore()] >= this.slow.Nums[this.indexBefore()] &&
      this.fast.Nums[this.index] < this.slow.Nums[this.index]
    ) {
      this.trader.Sell(this.data);
    }
    return true;
  }
}
