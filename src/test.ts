import { Trader } from './trader';
import data from './data/btc.json';
import { loadFromCoinmarketcapData } from './data';
import { nums } from '@wrule/nums';
import { Cross2LineReady } from './strategy/Cross2LineReady';
import moment from 'moment';
import { MACross2LineReadyFinder } from './finder/MACross2LineReadyFinder';

const dayData = loadFromCoinmarketcapData(data);
const finder = new MACross2LineReadyFinder([dayData], 1, 120);
const result = finder.Find();
console.log(result.size);
const list = Array.from(result.entries()).map(([key, value]) => {
  const trader = value[0].trader;
  return { key, trader };
});
list.sort((a, b) => b.trader.TradeList.TotalIncome - a.trader.TradeList.TotalIncome);
console.log(list.slice(0, 100).map((item) => [
  item.key,
  item.trader.TradeList.TotalIncome,
  item.trader.TradeList.ProfitRate,
  item.trader.TradeList.Select('2013-08', '2015-05').TotalIncome - item.trader.TradeList.Select('2013-08', '2015-05').TotalAppreciation,
  item.trader.TradeList.Select('2016-10', '2019-02').TotalIncome - item.trader.TradeList.Select('2016-10', '2019-02').TotalAppreciation,
  item.trader.TradeList.Select('2019-02', '2020-04').TotalIncome - item.trader.TradeList.Select('2019-02', '2020-04').TotalAppreciation,
  item.trader.TradeList.Select('2020-04', '2021-07').TotalIncome - item.trader.TradeList.Select('2020-04', '2021-07').TotalAppreciation,
]).map((item) => [
  item[0],
  item[1],
  item[2],
  nums([item[3], item[4], item[5], item[6]] as number[]).standardDeviation(),
]));

// const dayPrice = nums(dayData.map((item) => item.price));
// const strategy = new Cross2LineReady(dayPrice.MA(8), dayPrice.MA(44));
// const trader = new Trader(strategy);
// trader.Backtesting(dayData);
// trader.TradeList.Select('2017-03', '2018-12').PrintReport();
