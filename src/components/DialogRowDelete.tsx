import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { TableRow } from "../pages/Home";

interface DialogRowDeleteProps {
  isDeleteRowModal: boolean;
  setIsDeleteRowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRow: TableRow | null;
  handleDelete: () => void;
}

const DialogRowDelete = ({
  isDeleteRowModal,
  setIsDeleteRowModal,
  selectedRow,
  handleDelete,
}: DialogRowDeleteProps) => {
  return (
    <Dialog
      className="m-1"
      visible={isDeleteRowModal}
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header="Confirmation"
      modal
      footer={
        <>
          <Button
            label="No"
            icon="pi pi-times"
            onClick={() => setIsDeleteRowModal(false)}
            style={{
              background: "transparent",
              border: "1px solid blue",
              fontWeight: "500",
              color: "blue",
            }}
          />
          <Button
            label="Yes"
            icon="pi pi-check"
            onClick={handleDelete}
            style={{
              background: "orangered",
              border: "1px solid orangered",
              fontWeight: "bold",
            }}
          />
        </>
      }
      onHide={() => setIsDeleteRowModal(false)}
    >
      <div>
        <i
          className="mb-3 mr-3 pi pi-exclamation-triangle"
          style={{ fontSize: "2rem" }}
        />
        {selectedRow && (
          <span>
            Are you sure you want to {/* FIXME */}
            <span className="text-red-500">delete</span> this row?
            <br />
            <b>{`${selectedRow.name} — ${selectedRow.date}`}</b>?
          </span>
        )}
      </div>
    </Dialog>
  );
};

export default DialogRowDelete;