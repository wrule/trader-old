import { Trader } from '.';
import { TradeList } from './tradeList';
import 'colors';
import moment from 'moment';

function xnum(num: number) {
  return Number(num.toFixed(4));
}

function pnum(num: number) {
  return xnum(num * 100);
}

export function printReport(tradeList: TradeList) {
  console.log('<基本性能>'.green);
  console.log(
    '[总盈利(%)]:', pnum(tradeList.TotalIncome),
    '[资产升值(%)]:', pnum(tradeList.TotalAppreciation),
    '[胜率(%)]:', pnum(tradeList.ProfitRate),
  );
  console.log(
    '[交易次数]:', tradeList.Length,
    '[盈利次数]:', tradeList.ProfitTrades.Length,
    '[亏损次数]:', tradeList.LossTrades.Length,
  );
  console.log(
    '[单次最小盈利(%)]:', pnum(tradeList.ProfitTrades.Incomes.min()),
    '[单次平均盈利(%)]:', pnum(tradeList.ProfitTrades.Incomes.avg()),
    '[单次最大盈利(%)]:', pnum(tradeList.ProfitTrades.Incomes.max()),
    '[标准差(%)]:', pnum(tradeList.ProfitTrades.Incomes.standardDeviation()),
  );
  console.log(
    '[单次最小亏损(%)]:', pnum(tradeList.LossTrades.Incomes.max()),
    '[单次平均亏损(%)]:', pnum(tradeList.LossTrades.Incomes.avg()),
    '[单次最大亏损(%)]:', pnum(tradeList.LossTrades.Incomes.min()),
    '[标准差(%)]:', pnum(tradeList.LossTrades.Incomes.standardDeviation()),
  );
  profitPrint(tradeList.ProfitTradeSet());
  lossPrint(tradeList.LossTradeSet());
}

function profitPrint(profitTradeSet: TradeList[]) {
  console.log('<盈利详情>'.green);
  profitTradeSet.forEach((tradeList, index) => {
    console.log(
      index + 1,
      '. ',
      '[盈利次数]:', tradeList.Length,
      '[时间]:', `[${moment(tradeList.StartTime).format('YYYY-MM-DD HH:mm:ss')} ~ ${moment(tradeList.EndTime).format('YYYY-MM-DD HH:mm:ss')}]`,
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
  console.log('<亏损详情>'.green);
  lossTradeSet.forEach((tradeList, index) => {
    console.log(
      index + 1,
      '. ',
      '[亏损次数]:', tradeList.Length,
      '[时间]:', `[${moment(tradeList.StartTime).format('YYYY-MM-DD HH:mm:ss')} ~ ${moment(tradeList.EndTime).format('YYYY-MM-DD HH:mm:ss')}]`,
      '[持续时长(天)]:', tradeList.Duration,
      '[总亏损(%)]:', pnum(tradeList.TotalIncome),
      '[最小亏损(%)]:', pnum(tradeList.Incomes.max()),
      '[平均亏损(%)]:', pnum(tradeList.Incomes.avg()),
      '[最大亏损(%)]:', pnum(tradeList.Incomes.min()),
      '[标准差(%)]:', pnum(tradeList.Incomes.standardDeviation()),
    );
  });
}
