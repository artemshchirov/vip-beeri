import { useCallback } from 'react';

import { deleteRow, fetchRows } from '../../firebase';
import { ToastOptions } from '../../hooks/useToast';
import { TableRow } from './Home';

interface UseDeleteRowHelpers {
  selectedRow: TableRow | null;
  showToast: (options: ToastOptions) => void;
  setTableRows: React.Dispatch<React.SetStateAction<TableRow[]>>;
  setSelectedRow: React.Dispatch<React.SetStateAction<TableRow | null>>;
  setIsDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteRowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDeleteRow = ({
  selectedRow,
  showToast,
  setIsDeleteRowModal,
  setIsDeleteLoading,
  setTableRows,
  setSelectedRow,
}: UseDeleteRowHelpers) => {
  const handleDelete = useCallback(async () => {
    if (!selectedRow) return;

    setIsDeleteLoading(true);
    setIsDeleteRowModal(false);

    try {
      await deleteRow(selectedRow.id);
      const rows = await fetchRows();
      console.log(rows);
      setTableRows(rows);
      showToast({
        severity: 'info',
        summary: 'Table was updated',
        detail: `Deleted ${selectedRow.name} — ${selectedRow.date}`,
      });
      setSelectedRow(null);
    } catch (error) {
      console.error('Error deleting row:', error);
      showToast({
        severity: 'error',
        summary: 'Table is not updated',
        detail: `Error deleting ${selectedRow.name} — ${selectedRow.date}`,
      });
    } finally {
      setIsDeleteLoading(false);
    }
  }, [selectedRow, setIsDeleteLoading, setIsDeleteRowModal, setSelectedRow, setTableRows, showToast]);

  return handleDelete;
};
