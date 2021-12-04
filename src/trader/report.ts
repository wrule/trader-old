import { Trader } from '.';
import { TradeList } from './tradeList';

function xnum(num: number) {
  return Number(num.toFixed(4));
}

function pnum(num: number) {
  return xnum(num * 100);
}

export function printReport(trader: Trader) {
  console.log('<基本性能>');
  console.log(
    '[总盈利(%)]:', pnum(trader.TradeList.TotalIncome),
    '[胜率(%)]:', pnum(trader.TradeList.ProfitRate),
  );
  console.log(
    '[交易次数]:', trader.TradeList.Length,
    '[盈利次数]:', trader.TradeList.ProfitTrades.Length,
    '[亏损次数]:', trader.TradeList.LossTrades.Length,
  );
  console.log(
    '[单次最小盈利(%)]:', pnum(trader.TradeList.ProfitTrades.Incomes.min()),
    '[单次平均盈利(%)]:', pnum(trader.TradeList.ProfitTrades.Incomes.avg()),
    '[单次最大盈利(%)]:', pnum(trader.TradeList.ProfitTrades.Incomes.max()),
    '[标准差(%)]:', pnum(trader.TradeList.ProfitTrades.Incomes.standardDeviation()),
  );
  console.log(
    '[单次最小亏损(%)]:', pnum(trader.TradeList.LossTrades.Incomes.max()),
    '[单次平均亏损(%)]:', pnum(trader.TradeList.LossTrades.Incomes.avg()),
    '[单次最大亏损(%)]:', pnum(trader.TradeList.LossTrades.Incomes.min()),
    '[标准差(%)]:', pnum(trader.TradeList.LossTrades.Incomes.standardDeviation()),
  );
  profitPrint(trader.TradeList.ProfitTradeSet());
  lossPrint(trader.TradeList.LossTradeSet());
}

function profitPrint(profitTradeSet: TradeList[]) {
  console.log('<盈利详情>');
  profitTradeSet.forEach((tradeList, index) => {
    console.log(
      index + 1,
      '. ',
      '[盈利次数]:', tradeList.Length,
      '[持续时长(天)]:', tradeList.Duration,
      '[总盈利(%)]:', pnum(tradeList.TotalIncome),
      '[最小盈利(%)]:', pnum(tradeList.Incomes.min()),
      '[平均盈利(%)]:', pnum(tradeList.Incomes.avg()),
      '[最大盈利(%)]:', pnum(tradeList.Incomes.max()),
      '[标准差(%)]:', pnum(tradeList.Incomes.standardDeviation()),
    );
  });
}

function lossPrint(lossTradeSet: TradeList[]) {
  console.log('<亏损详情>');
  lossTradeSet.forEach((tradeList, index) => {
    console.log(
      index + 1,
      '. ',
      '[亏损次数]:', tradeList.Length,
      '[持续时长(天)]:', tradeList.Duration,
      '[总亏损(%)]:', pnum(tradeList.TotalIncome),
      '[最小亏损(%)]:', pnum(tradeList.Incomes.max()),
      '[平均亏损(%)]:', pnum(tradeList.Incomes.avg()),
      '[最大亏损(%)]:', pnum(tradeList.Incomes.min()),
      '[标准差(%)]:', pnum(tradeList.Incomes.standardDeviation()),
    );
  });
}
