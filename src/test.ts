import { Trader } from './trader';
import { Cross2Ready } from './strategy/Cross2Ready';
import data from './data/btc.json';
import { loadFromCoinmarketcapData } from './data';
import { nums } from '@wrule/nums';
import { MACross2LineReadyFinder } from './finder/MACross2LineReadyFinder';

const dayData = loadFromCoinmarketcapData(data);
const dayPrice = nums(dayData.map((item) => item.price));

let dataSet = Array(10)
  .fill(0)
  .map(() => dayPrice.randomRangeEndStart(365))
  .map(([end, start]) => dayData.slice(start, end));

const finder = new MACross2LineReadyFinder(dataSet, 1, 120);
const map = finder.Find();
console.log(map.size);
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
