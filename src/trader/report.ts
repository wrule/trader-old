import { Trader } from '.';

function xnum(num: number) {
  return Number(num.toFixed(4));
}

function pnum(num: number) {
  return xnum(num * 100);
}

export function printReport(trader: Trader) {

  console.log(
    '[总盈利%]:', pnum(trader.TradeList.TotalIncome),
    '[胜率%]:', pnum(trader.TradeList.ProfitRate),
  );
  console.log(
    '[交易次数]:', trader.TradeList.Length,
    '[盈利次数]:', trader.TradeList.ProfitTrades.Length,
    '[亏损次数]:', trader.TradeList.LossTrades.Length,
  );
  console.log(
    '[单次最小盈利%]:', pnum(trader.TradeList.ProfitTrades.Incomes.min()),
    '[单次平均盈利%]:', pnum(trader.TradeList.ProfitTrades.Incomes.avg()),
    '[单次最大盈利%]:', pnum(trader.TradeList.ProfitTrades.Incomes.max()),
  );
  console.log(
    '[单次最小亏损%]:', pnum(trader.TradeList.LossTrades.Incomes.max()),
    '[单次平均亏损%]:', pnum(trader.TradeList.LossTrades.Incomes.avg()),
    '[单次最大亏损%]:', pnum(trader.TradeList.LossTrades.Incomes.min()),
  );
}
