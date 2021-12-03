import { Trader } from './trader';
import { Cross2Ready } from './strategy/Cross2Ready';
import data from './data/eth.json';
import { loadFromCoinmarketcapData } from './data';
import { nums } from '@wrule/nums';

const dayData = loadFromCoinmarketcapData(data);
const dayPrice = nums(dayData.map((item) => item.price));
const strategy = new Cross2Ready(dayPrice.MA(12), dayPrice.MA(21));
const trader = new Trader(strategy);
trader.Backtesting(dayData);

function xnum(num: number) {
  return Number(num.toFixed(4));
}

function pnum(num: number) {
  return xnum(num * 100);
}

console.log('[总收益率(%)]:', pnum(trader.TradeList.TotalIncome));
console.log('[交易次数]:', trader.TradeList.Length);
console.log('[胜率(%)]:', pnum(trader.TradeList.ProfitRate));

const lossList = trader.TradeList.LossTradeSet();
const lossNums = nums(lossList.map((item) => item.TotalIncome));
const maxLossList = lossList[0];
console.log('[最大连续亏损次数]:', maxLossList.Length);
console.log(
  '[最大连续亏损详情]:',
  '最小(%):', pnum(maxLossList.Incomes.max()),
  '平均(%):', pnum(maxLossList.Incomes.avg()),
  '最大(%):', pnum(maxLossList.Incomes.min()),
  '标准差(%):', pnum(maxLossList.Incomes.standardDeviation()),
  '总亏损(%):', pnum(maxLossList.TotalIncome),
);
console.log(
  '[连续亏损区间亏损情况]:',
  '最小(%):', pnum(lossNums.max()),
  '平均(%):', pnum(lossNums.avg()),
  '最大(%):', pnum(lossNums.min()),
  '标准差(%):', pnum(lossNums.standardDeviation()),
);


const profitList = trader.TradeList.ProfitTradeSet();
const profitNums = nums(profitList.map((item) => item.TotalIncome));
const maxProfitList = profitList[0];
console.log('[最大连续盈利次数]:', maxProfitList.Length);
console.log(
  '[最大连续盈利详情]:',
  '最小(%):', pnum(maxProfitList.Incomes.min()),
  '平均(%):', pnum(maxProfitList.Incomes.avg()),
  '最大(%):', pnum(maxProfitList.Incomes.max()),
  '标准差(%):', pnum(maxProfitList.Incomes.standardDeviation()),
  '总盈利(%):', pnum(maxProfitList.TotalIncome),
);
console.log(
  '[连续盈利区间盈利情况]:',
  '最小(%):', pnum(profitNums.min()),
  '平均(%):', pnum(profitNums.avg()),
  '最大(%):', pnum(profitNums.max()),
  '标准差(%):', pnum(profitNums.standardDeviation()),
);
