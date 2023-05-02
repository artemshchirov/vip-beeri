import { Column, ColumnSortParams } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react';

import { TableRow } from './Home';

interface EmployeeTableProps {
  isLoading: boolean;
  tableRows: TableRow[];
  selectedRow: TableRow | null;
  setSelectedRow: React.Dispatch<React.SetStateAction<TableRow | null>>;
  onSort: (rows: TableRow[], order: boolean) => TableRow[];
}

const EmployeeTable = ({ isLoading, tableRows, selectedRow, setSelectedRow, onSort }: EmployeeTableProps) => {
  return (
    <DataTable
      alwaysShowPaginator={false}
      className='w-full text-xs'
      dataKey='id'
      emptyMessage='No data available'
      loading={isLoading}
      onSelectionChange={(e) => setSelectedRow(e.value)}
      paginator
      paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink'
      responsiveLayout='scroll'
      rows={10}
      selection={selectedRow}
      selectionMode='single'
      size='normal'
      sortOrder={1}
      value={tableRows}
    >
      <Column field='name' header='Name' sortable style={{ width: 'auto' }} />
      <Column
        field='date'
        header='Date'
        sortable
        sortFunction={(e: ColumnSortParams) => onSort(e.data, e.order === -1)}
        style={{ width: 'auto' }}
      />
      {tableRows.some((row) => row.note) && <Column field='note' header='Note' style={{ width: 'auto' }} />}
      <Column field='time' header='Time' sortable style={{ width: 'auto' }} />
    </DataTable>
  );
};

export default EmployeeTable;
