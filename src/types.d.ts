declare interface IHeader {
  Header: string;
  accessor: string;
  disableFilters?: boolean;
  disableSortBy?: boolean;
  sortType?: any;
  Cell?: Function
}

declare interface ITableData {
  columns: IHeader[];
  data: [];
  page: number;
  rowsPerPage: number
}


declare interface TableState {
  rowData: IRowData[] | [];
}

declare interface IRowData {
  id: number,
  first_name: string,
  last_name: string,
  date_of_birth: string,
  industry: string,
  salary: any,
  years_of_experience: any
};

declare interface IDefaultColumnFilter {
  column: {
    filterValue: string;
    setFilter: Function;
    preFilteredRows: IRowData[];
  }
}