import { Trader } from './trader';
import { Cross2Ready } from './strategy/Cross2Ready';
import data from './data/btc.json';
import { loadFromCoinmarketcapData } from './data';
import { nums } from '@wrule/nums';
import { MACross2LineReadyFinder } from './finder/MACross2LineReadyFinder';

const dayData = loadFromCoinmarketcapData(data);
const dayPrice = nums(dayData.map((item) => item.price));

let dataSet = Array(1)
  .fill(0)
  .map(() => dayPrice.randomRangeEndStart(dayPrice.length))
  .map(([end, start]) => dayData.slice(start, end));

const finder = new MACross2LineReadyFinder([dayData.slice(0, 2000)], 1, 120);
const map = finder.Find();

let maxWinRate = 0;
let maxIncome = 0;

Array.from(map.entries()).forEach(([key, value]) => {
  value.forEach((item) => {
    if (item.trader.income > maxIncome) {
      maxIncome = item.trader.income;
      console.log(key, item.trader.winRate, item.trader.Log.length, item.trader.income);
    }
  });
});
// console.log(dataSet);

// const strategy = new Cross2Ready(
//   dayPrice.MA(8),
//   dayPrice.MA(44),
// );
// const trader = new Trader(strategy);
// trader.Backtesting(dayData);

// console.log(
//   trader.winNums.min(),
//   trader.winNums.avg(),
//   trader.winNums.max(),
//   trader.winNums.standardDeviation(),
// );
// console.log(
//   trader.loseNums.max(),
//   trader.loseNums.avg(),
//   trader.loseNums.min(),
//   trader.loseNums.standardDeviation(),
// );
// console.log(trader.winRate, trader.income, trader.Log.length);
// console.log(trader.winNums);
