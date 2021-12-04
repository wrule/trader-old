import { Trader } from './trader';
import { Cross2Ready } from './strategy/Cross2Ready';
import data from './data/btc.json';
import { loadFromCoinmarketcapData } from './data';
import { nums } from '@wrule/nums';
import { printReport } from './trader/report';

const dayData = loadFromCoinmarketcapData(data);
const dayPrice = nums(dayData.map((item) => item.price));
const strategy = new Cross2Ready(dayPrice.MA(11), dayPrice.MA(21));
const trader = new Trader(strategy);
trader.Backtesting(dayData);

trader.TradeList.Select('2019-08', '2022').PrintReport();
