import React, { useState , useMemo} from 'react'
import { convertDate } from '../../utils/convertDate';
import { toCurrency } from '../../utils/toCurrency';
import {
  Container,
  TablePagination
} from '@material-ui/core'
import { Table } from '../../components/Table';

const newData = require('../../mockData/MOCK_DATA.json');

function DataTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        disableSortBy: true,
        disableFilters: true,
        width: 50,
      },
      {
        Header: 'First Name',
        accessor: 'first_name',
        disableSortBy: true,
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
        disableSortBy: true,
      },
      {
        Header: 'Date of Birth',
        accessor: 'date_of_birth',
        sortType: (rowA: any, rowB: any, dateOfBirth: string, desc: Boolean) => {
          const newRowA = convertDate(rowA.original[dateOfBirth]);
          const newRowB = convertDate(rowB.original[dateOfBirth]);
          if (newRowA > newRowB) return -1;
          if (newRowB > newRowA) return 1;
          return 0;
        },
        disableFilters: true,
      },
      {
        Header: 'Industry',
        accessor: 'industry',
        disableFilters: true,
      },
      {
        Header: 'Salary',
        accessor: 'salary',
        disableFilters: true,
        Cell: (props: any) => toCurrency(props.value)
      },
      {
        Header: 'Experience (years)',
        accessor: 'years_of_experience',
        disableFilters: true,
      },
    ],
    []
  )

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rowsPerPageOptions = [5, 10, 25, 100, { value: -1, label: 'All' }];

  return (
    <Container>
      <Table
        columns={columns}
        data={newData}
        page={page}
        rowsPerPage={rowsPerPage}
      />
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component='div'
        count={newData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Container>
  )
}

export default DataTable
