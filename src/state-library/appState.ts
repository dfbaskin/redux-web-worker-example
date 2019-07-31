export interface ColumnDefinition {
  id: string;
  width?: number;
}

export interface ApplicationState {
  columns: ColumnDefinition[];
  data: any[][];
}

export const initialState: ApplicationState = {
  columns: [],
  data: []
};
