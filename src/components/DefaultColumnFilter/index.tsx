import React from 'react'

export function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}: IDefaultColumnFilter) {
  const count = preFilteredRows.length
  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}
