import { Trader } from './trader';
import data from './data/eth.json';
import { loadFromCoinmarketcapData } from './data';
import { nums } from '@wrule/nums';
import { Cross2LineReady } from './strategy/Cross2LineReady';
import moment from 'moment';


const dayData = loadFromCoinmarketcapData(data);
const dayPrice = nums(dayData.map((item) => item.price));
const strategy = new Cross2LineReady(dayPrice.MA(12), dayPrice.MA(21));
const trader = new Trader(strategy);
trader.Backtesting(dayData);
// trader.TradeList.PrintReport();

trader.TradeList.Select('2017-01').PrintReport();

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