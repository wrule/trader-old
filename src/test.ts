import { Trader } from './trader';
import data from './data/dent.json';
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

trader.TradeList.Select('2020-05', '2021-08').PrintReport();
