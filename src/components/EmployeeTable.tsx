import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { TableRow } from "../pages/Home";

interface EmployeeTableProps {
  tableRows: TableRow[];
  selectedRow: TableRow | null;
  setSelectedRow: React.Dispatch<React.SetStateAction<TableRow | null>>;
}

const EmployeeTable = ({
  tableRows,
  selectedRow,
  setSelectedRow,
}: EmployeeTableProps) => {
  return (
    <DataTable
      className="w-full text-xs sm:w-full lg:w-6/12 xl:w-full"
      value={tableRows}
      selectionMode="single"
      selection={selectedRow}
      onSelectionChange={e => setSelectedRow(e.value)}
      dataKey="id"
      responsiveLayout="scroll"
      paginator
      rows={10}
      alwaysShowPaginator={false}
      emptyMessage="No data available"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      size="large"
      loading={!!!tableRows.length}
      style={{
        background: "#f8f9fa",
        borderWidth: "1px 0 0 0",
        transition: "box-shadow 0.2s",
        overflow: "hidden",
      }}
    >
      <Column field="name" header="Name" sortable style={{ width: "auto" }} />
      <Column field="date" header="Date" style={{ width: "auto" }} sortable />
      {tableRows.some(row => row.note) && (
        <Column field="note" header="Note" style={{ width: "auto" }} />
      )}
      <Column field="time" header="Time" style={{ width: "auto" }} sortable />
    </DataTable>
  );
};

export default EmployeeTable;
