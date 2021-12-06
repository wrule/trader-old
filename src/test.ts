import { Trader } from './trader';
import { Cross2Ready } from './strategy/Cross2Ready';
import data from './data/btc.json';
import { loadFromCoinmarketcapData } from './data';
import { nums } from '@wrule/nums';
import { printReport } from './trader/report';
import { MACross2LineReadyFinder } from './finder/MACross2LineReadyFinder';
import fs from 'fs';
import { Cross2LineReady } from './strategy/Cross2LineReady';
import moment from 'moment';
import { Cross3LineReady } from './strategy/Cross3LineReady';


const dayData = loadFromCoinmarketcapData(data);
const dayPrice = nums(dayData.map((item) => item.price));
const strategy = new Cross2LineReady(dayPrice.MA(8), dayPrice.MA(44));
const trader = new Trader(strategy);
trader.Backtesting(dayData);
console.log(trader.TradeList.TotalIncome, trader.TradeList.TotalAppreciation);
trader.TradeList.PrintReport();

const a = [
  moment('2013-07-05'),
  moment('2013-12-04'),
  moment('2015-01-14'),
  moment('2017-12-16'),
  moment('2018-12-15'),
  moment('2019-06-26'),
  moment('2020-03-12'),
  moment('2021-11-08'),
];

a.forEach((item, index) => {
  if (index < a.length - 1) {
    console.log(item.format('YYYY-MM-DD'), index % 2 ? '顶' : '底');
    const next = a[index + 1];
    console.log((next.unix() - item.unix()) / 60 / 60 / 24);
  } else {
    console.log(item.format('YYYY-MM-DD'), index % 2 ? '顶' : '底');
  }
});