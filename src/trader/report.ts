import { Trader } from '.';

function xnum(num: number) {
  return Number(num.toFixed(4));
}

function pnum(num: number) {
  return xnum(num * 100);
}

export function printReport(trader: Trader) {

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

  const profitTradeSet = trader.TradeList.ProfitTradeSet();
  if (profitTradeSet.length > 0) {
    const maxProfitTrades = profitTradeSet[0];
    console.log(
      '[最大连续盈利次数]:', maxProfitTrades.Length,
      '[持续时长(天)]:', maxProfitTrades.Duration,
      '[总盈利(%)]:', pnum(maxProfitTrades.TotalIncome),
      '[最小盈利(%)]:', pnum(maxProfitTrades.Incomes.min()),
      '[平均盈利(%)]:', pnum(maxProfitTrades.Incomes.avg()),
      '[最大盈利(%)]:', pnum(maxProfitTrades.Incomes.max()),
      '[标准差(%)]:', pnum(maxProfitTrades.Incomes.standardDeviation()),
    );
  }

  const lossTradeSet = trader.TradeList.LossTradeSet();
  if (lossTradeSet.length > 0) {
    const maxLossTrades = lossTradeSet[0];
    console.log(
      '[最大连续亏损次数]:', maxLossTrades.Length,
      '[持续时长(天)]:', maxLossTrades.Duration,
      '[总亏损(%)]:', pnum(maxLossTrades.TotalIncome),
      '[最小亏损(%)]:', pnum(maxLossTrades.Incomes.max()),
      '[平均亏损(%)]:', pnum(maxLossTrades.Incomes.avg()),
      '[最大亏损(%)]:', pnum(maxLossTrades.Incomes.min()),
      '[标准差(%)]:', pnum(maxLossTrades.Incomes.standardDeviation()),
    );
  }
}
