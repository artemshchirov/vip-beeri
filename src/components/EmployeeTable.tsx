import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react';

import { TableRow } from '../pages/Home';

interface EmployeeTableProps {
  isLoading: boolean;
  tableRows: TableRow[];
  selectedRow: TableRow | null;
  setSelectedRow: React.Dispatch<React.SetStateAction<TableRow | null>>;
}

const EmployeeTable = ({ isLoading, tableRows, selectedRow, setSelectedRow }: EmployeeTableProps) => {
  return (
    <DataTable
      alwaysShowPaginator={false}
      className='w-full text-xs sm:w-full lg:w-6/12 xl:w-full'
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
      size='large'
      style={{
        background: '#f8f9fa',
        borderWidth: '1px 0 0 0',
        transition: 'box-shadow 0.2s',
        overflow: 'hidden',
      }}
      value={tableRows}
    >
      <Column field='name' header='Name' sortable style={{ width: 'auto' }} />
      <Column field='date' header='Date' sortable style={{ width: 'auto' }} />
      {tableRows.some((row) => row.note) && <Column field='note' header='Note' style={{ width: 'auto' }} />}
      <Column field='time' header='Time' sortable style={{ width: 'auto' }} />
    </DataTable>
  );
};

export default EmployeeTable;
