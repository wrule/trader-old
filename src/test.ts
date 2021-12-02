import { Trader } from './trader';
import { Cross2Ready } from './strategy/Cross2Ready';
import data from './data/btc.json';
import { loadFromCoinmarketcapData } from './data';
import { nums } from '@wrule/nums';
import { MACross2LineReadyFinder } from './finder/MACross2LineReadyFinder';
import moment from 'moment';

console.log(moment('2021-2-5 ').valueOf());

// const dayData = loadFromCoinmarketcapData(data);
// const dayPrice = nums(dayData.map((item) => item.price));

// const strategy = new Cross2Ready(
//   dayPrice.MA(8),
//   dayPrice.MA(44),
// );
// const trader = new Trader(strategy);
// trader.Backtesting(dayData);
// trader.Log.map((item) => item.Income).map((num) => `${Number((num * 100).toFixed(2))}%`).forEach((item, index) => {
//   console.log(index, item);
// });
// console.log(trader.maxConsecutiveLosses);
