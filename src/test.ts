import { Trader } from './trader';
import { Cross2Ready } from './strategy/Cross2Ready';
import data from './data/btc.json';
import { loadFromCoinmarketcapData } from './data';
import { nums } from '@wrule/nums';

const dayData = loadFromCoinmarketcapData(data);
const dayPrice = nums(dayData.map((item) => item.price));
const strategy = new Cross2Ready(dayPrice.MA(8), dayPrice.MA(44));
const trader = new Trader(strategy);
trader.Backtesting(dayData);

function xnum(num: number) {
  return Number(num.toFixed(4));
}

function pnum(num: number) {
  return xnum(num * 100);
}

console.log('交易次数: ', trader.TradeList.Length);
console.log('胜率(%): ', pnum(trader.TradeList.ProfitRate * 100));
const maxLossList = trader.TradeList.LossTradeSet()[0];
console.log('最大连续亏损次数: ', maxLossList.Length);
console.log(
  '最小(%): ', pnum(maxLossList.Incomes.max()),
  '平均(%): ', pnum(maxLossList.Incomes.avg()),
  '最大(%): ', pnum(maxLossList.Incomes.min()),
);
const maxProfitList = trader.TradeList.ProfitTradeSet()[0];
console.log('最大连续盈利次数: ', maxLossList.Length);
console.log(
  '最小(%): ', pnum(maxProfitList.Incomes.min()),
  '平均(%): ', pnum(maxProfitList.Incomes.avg()),
  '最大(%): ', pnum(maxProfitList.Incomes.max()),
);
