import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React from 'react';

import { TableRow } from './Home';

interface DeleteRowPopupProps {
  isDeleteRowModal: boolean;
  setIsDeleteRowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRow: TableRow | null;
  handleDelete: () => void;
}

const DeleteRowPopup = ({ isDeleteRowModal, setIsDeleteRowModal, selectedRow, handleDelete }: DeleteRowPopupProps) => {
  return (
    <Dialog
      breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      className='m-1'
      footer={
        <>
          <Button
            icon='pi pi-times'
            label='No'
            onClick={() => setIsDeleteRowModal(false)}
            style={{
              background: 'transparent',
              border: '1px solid blue',
              fontWeight: '500',
              color: 'blue',
            }}
          />
          <Button
            icon='pi pi-check'
            label='Yes'
            onClick={handleDelete}
            style={{
              background: 'orangered',
              border: '1px solid orangered',
              fontWeight: 'bold',
            }}
          />
        </>
      }
      header='Confirmation'
      modal
      onHide={() => setIsDeleteRowModal(false)}
      style={{ width: '32rem' }}
      visible={isDeleteRowModal}
    >
      <div>
        <i className='mb-3 mr-3 pi pi-exclamation-triangle' style={{ fontSize: '2rem' }} />
        {selectedRow && (
          <span>
            Are you sure you want to {/* FIXME */}
            <span className='text-red-500'>delete</span> this row?
            <br />
            <b>{`${selectedRow.name} — ${selectedRow.date}`}</b>?
          </span>
        )}
      </div>
    </Dialog>
  );
};

export default DeleteRowPopup;
