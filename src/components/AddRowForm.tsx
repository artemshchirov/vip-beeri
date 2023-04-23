import { FormikValues } from "formik";
import { Button } from "primereact/button";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { FormValues, TableRow, ToastOptions } from "../pages/Home";
import { dropdownValues } from "../utils/constants";

interface AddRowFormProps {
  formik: FormikValues;
  isSubmitLoading: boolean;
  isDeleteBtnVisible: boolean;
  isEditLoading: boolean;
  setIsDeleteRowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteLoading: boolean;
  isFormFieldInvalid: (formName: keyof FormValues) => boolean;
  onDropdownChange: (e: DropdownChangeParams) => void;
  showToast: (props: ToastOptions) => void;
  selectedRow: TableRow | null;
  onNoteChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddRowForm = ({
  formik,
  isSubmitLoading,
  isDeleteBtnVisible,
  isFormFieldInvalid,
  onDropdownChange,
  showToast,
  isEditLoading,
  selectedRow,
  setIsDeleteRowModal,
  isDeleteLoading,
  onNoteChange,
}: AddRowFormProps) => {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-center w-full my-3 xl:mt-5 sm:w-full lg:w-6/12 xl:w-full xl:flex-col"
    >
      <div className="flex flex-row w-full gap-2 xl:gap-2 xl:w-full">
        <div className="w-6/12">
          <Dropdown
            inputId="name"
            value={formik.values.name}
            options={dropdownValues}
            optionValue="name"
            optionLabel="name"
            placeholder="Name"
            className={classNames("w-full", {
              "p-invalid": isFormFieldInvalid("name") && !formik.values.name,
            })}
            onChange={(e: DropdownChangeParams) => onDropdownChange(e)}
          />
        </div>
        <div className="w-6/12">
          <InputText
            name="date"
            value={formik.values.date}
            className={classNames("w-full", {
              "p-invalid": isFormFieldInvalid("date") && !formik.values.date,
            })}
            placeholder="Date"
            disabled={formik.values.date === formik.initialValues.date}
            readOnly
          />
        </div>
      </div>
      <div className="w-full mt-2">
        <Button
          className="w-full whitespace-nowrap"
          type="submit"
          label="Add to table"
          icon="pi pi-check"
          aria-label="Submit"
          loading={isSubmitLoading}
          disabled={
            formik.values.name === formik.initialValues.name ||
            formik.values.date === formik.initialValues.date
          }
        />
      </div>
      <div className="flex justify-between w-full gap-2 mt-2">
        {isDeleteBtnVisible ? (
          <>
            <Button
              className="w-6/12 whitespace-nowrap "
              type="button"
              label="Edit"
              icon="pi pi-pencil"
              aria-label="Edit"
              style={{ background: "orange", border: "transparent" }}
              onClick={() =>
                showToast({
                  severity: "warn",
                  summary: "In development",
                  detail: "Temporarily unavailable",
                })
              }
              loading={isEditLoading}
              disabled={selectedRow === null}
            />
            <Button
              className="w-6/12 whitespace-nowrap "
              type="button"
              label="Delete"
              icon="pi pi-trash"
              aria-label="Delete"
              style={{ background: "orangered", border: "transparent" }}
              onClick={() => setIsDeleteRowModal(true)}
              loading={isDeleteLoading}
              disabled={selectedRow === null}
            />
          </>
        ) : (
          <InputText
            placeholder="Note"
            value={formik.values.note}
            maxLength={40}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onNoteChange(e)
            }
            className="w-full"
          />
        )}
      </div>
    </form>
  );
};

export default AddRowForm;
