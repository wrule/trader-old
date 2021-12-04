import { Trader } from '.';

export
class Report {
  public constructor(
    private trader: Trader,
  ) { }

  public Print() {

  }
}

export function report(trader: Trader) {
  return new Report(trader);
}

export function printReport(trader: Trader) {
  report(trader).Print();
}
