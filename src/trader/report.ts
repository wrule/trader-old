import { Trader } from '.';

function xnum(num: number) {
  return Number(num.toFixed(4));
}

function pnum(num: number) {
  return xnum(num * 100);
}

export function printReport(trader: Trader) {

  console.log('[总盈利%]:', pnum(trader.TradeList.TotalIncome));
  console.log('[交易次数]:', trader.TradeList.Length);
  console.log(
    '[胜率%]:', pnum(trader.TradeList.ProfitRate),
    '[盈利次数]:', trader.TradeList.ProfitTrades.Length,
    '[亏损次数]:', trader.TradeList.LossTrades.Length,
  );
}
