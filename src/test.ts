import { Trader } from './trader';
import { Cross2Ready } from './strategy/Cross2Ready';
import data from './data/btc.json';
import { loadFromCoinmarketcapData } from './data';
import { nums } from '@wrule/nums';

const dayData = loadFromCoinmarketcapData(data);
const dayPrice = nums(dayData.map((item) => item.price));

const strategy = new Cross2Ready(
  dayPrice.MA(7),
  dayPrice.MA(21),
);
const trader = new Trader(strategy);
trader.Backtesting(dayData);

console.log(
  trader.winNums.min(),
  trader.winNums.avg(),
  trader.winNums.max(),
  trader.winNums.standardDeviation(),
);
console.log(
  trader.loseNums.max(),
  trader.loseNums.avg(),
  trader.loseNums.min(),
  trader.loseNums.standardDeviation(),
);
console.log(trader.winRate);
