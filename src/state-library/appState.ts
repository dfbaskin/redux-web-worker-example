export interface ColumnDefinition {
  id: string;
  width: number;
}

export interface ApplicationState {
  columns: ColumnDefinition[];
  data: any[][];
  width: number;
  height: number;
  scrollLeft: number;
  scrollTop: number;
  usedColumnCount: number;
}

export const initialState: ApplicationState = {
  columns: [],
  data: [],
  width: 100,
  height: 100,
  scrollLeft: 0,
  scrollTop: 0,
  usedColumnCount: 0
};
