import { math } from "./mathCore";

export function applyFormula(formula: string, data: any[][]): any[] {
  const result: any[] = [];
  const scope = createScope(data);
  const parsed = math.compile!(formula);
  for (let row = 0; row < data.length; row++) {
    setScopeRow(scope, row);
    const value = parsed.evaluate(scope);
    result.push(value);
  }
  return result;
}

const rowNumberSymbol = Symbol("row number");

function createScope(data: any[][]): any {
  const columnCount = data.reduce((cnt, row) => Math.max(row.length, cnt), 0);
  const scope: any = {
    [rowNumberSymbol]: 0
  };
  scope.ROW = () => scope[rowNumberSymbol] + 1;
  scope.ROWS = () => data.length;
  scope.COLUMNS = () => columnCount;
  for (let col = 0; col < columnCount; col++) {
    Object.defineProperty(scope, `C${col + 1}`, {
      enumerable: true,
      get() {
        const row = scope[rowNumberSymbol];
        return data[row] && data[row][col];
      }
    });
  }
  return scope;
}

function setScopeRow(scope: any, row: number): void {
  scope[rowNumberSymbol] = row;
}
