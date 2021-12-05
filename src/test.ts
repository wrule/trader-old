import { Trader } from './trader';
import { Cross2Ready } from './strategy/Cross2Ready';
import data from './data/btc.json';
import { loadFromCoinmarketcapData } from './data';
import { nums } from '@wrule/nums';
import { printReport } from './trader/report';
import { MACross2LineReadyFinder } from './finder/MACross2LineReadyFinder';
import fs from 'fs';

const dayData = loadFromCoinmarketcapData(data);
const finder = new MACross2LineReadyFinder([dayData], 1, 120);
const result = finder.Find();
console.log(result.size);
const list = Array.from(result.entries()).map(([key, value]) => ({
  key,
  trader: value[0].trader,
}));
list.sort((a, b) => b.trader.TradeList.TotalIncome - a.trader.TradeList.TotalIncome);
const a = list.slice(0, 100).map((item) => {
  return {
    key: item.key,
    funds: item.trader.TradeList.TotalIncome,
    a2014: item.trader.TradeList.Select(undefined, '2013-12-04').TotalIncome,
    a2017: item.trader.TradeList.Select('2016-10', '2017-12-16').TotalIncome,
    a2021: item.trader.TradeList.Select('2019-10', '2021-11-08').TotalIncome,
    d2014: item.trader.TradeList.Select('2013-11', '2015-04').TotalIncome,
    d2017: item.trader.TradeList.Select('2017-11', '2019-02').TotalIncome,
    d2021: item.trader.TradeList.Select('2021-01', '2021-07').TotalIncome,
  };
}).map((item) => {
  return {
    ...item,
    aStdDiff: nums([item.a2014, item.a2017, item.a2021]).standardDeviation(),
    dStdDiff: nums([item.d2014, item.d2017, item.d2021]).standardDeviation(),
  };
});

fs.writeFileSync('a.json', JSON.stringify(a, null, 2));

