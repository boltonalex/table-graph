import React from 'react'
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
} from 'react-table'

import {
  Table as MaUTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'

import { DefaultColumnFilter } from '../../components/DefaultColumnFilter';

export function Table({ columns, data, page, rowsPerPage }: ITableData) {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
  )

  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <>
                <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <div>
                    {column.canFilter ? column.render('Filter') : null}
                  </div>
                </TableCell>
              </>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(row => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
      </TableBody>
    </MaUTable>
  )
}