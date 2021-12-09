import { Trader } from './trader';
import data from './data/dent.json';
import { loadFromCoinmarketcapData } from './data';
import { nums } from '@wrule/nums';
import { Cross2LineReady } from './strategy/Cross2LineReady';
import moment from 'moment';
import { MACross2LineReadyFinder } from './finder/MACross2LineReadyFinder';
import fs from 'fs';

const dayData = loadFromCoinmarketcapData(data);
const finder = new MACross2LineReadyFinder([dayData], 1, 120);
const result = finder.Find();
console.log(result.size);
const list = Array.from(result.entries()).map(([key, value]) => {
  const trader = value[0].trader;
  return { key, trader };
});
list.sort((a, b) => b.trader.TradeList.TotalIncome - a.trader.TradeList.TotalIncome);
const a = list.slice(0, 100).map((item) => [
  item.key,
  item.trader.TradeList.TotalIncome,
  item.trader.TradeList.ProfitRate,
  item.trader.TradeList.Select('2017-11', '2019-10').TotalIncome - item.trader.TradeList.Select('2017-11', '2019-10').TotalAppreciation,
  item.trader.TradeList.Select('2020-12', '2021-08').TotalIncome - item.trader.TradeList.Select('2020-12', '2021-08').TotalAppreciation,
  item.trader.TradeList.Length,
]).map((item) => [
  item[0],
  item[1],
  item[2],
  nums([item[3], item[4]] as number[]).standardDeviation(),
  item[5],
]);

fs.writeFileSync('1.json', JSON.stringify(a, null, 2));


// const dayPrice = nums(dayData.map((item) => item.price));
// const strategy = new Cross2LineReady(dayPrice.MA(8), dayPrice.MA(44));
// const trader = new Trader(strategy);
// trader.Backtesting(dayData);
// trader.TradeList.Select('2017-03', '2018-12').PrintReport();
