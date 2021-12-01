import { Nums } from '@wrule/nums';
import { Strategy } from '.';

/**
 * 双线穿越策略
 */
export
class Cross2Ready
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
      this.trader.BuyAllIn(this.data);
    }
    if (
      this.fast.Nums[this.indexBefore()] >= this.slow.Nums[this.indexBefore()] &&
      this.fast.Nums[this.index] < this.slow.Nums[this.index]
    ) {
      this.trader.SellAllOut(this.data);
    }
    return true;
  }
}
