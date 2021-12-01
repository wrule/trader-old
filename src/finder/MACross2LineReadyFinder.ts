import { nums } from '@wrule/nums';
import moment from 'moment';
import { IDayData } from '../dayData';
import { Cross2Ready } from '../strategy/Cross2Ready';
import { Trader } from '../trader';

export
class MACross2LineReadyFinder {
  public constructor(
    private dataSet: IDayData[][],
    private start: number,
    private end: number,
  ) { }

  public Find() {
    const result = new Map<string, { index: number, trader: Trader }[]>();
    this.dataSet.forEach((dayData, index) => {
      const dayPrices = nums(dayData.map((item) => item.price));
      console.log(`${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')} [${index + 1}/${this.dataSet.length}]...`);
      for (let fast = this.start; fast < this.end; ++fast) {
        for (let slow = fast + 1; slow <= this.end; ++slow) {
          const strategy = new Cross2Ready(
            dayPrices.MA(fast),
            dayPrices.MA(slow),
          );
          const trader = new Trader(strategy);
          trader.Backtesting(dayData);
          const key = `${fast}-${slow}`;
          if (result.has(key)) {
            result.get(key)?.push({ index, trader });
          } else {
            result.set(key, [{ index, trader, }]);
          }
        }
      }
    });
    return result;
  }
}
