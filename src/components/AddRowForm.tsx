import { FormikValues } from 'formik';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import React from 'react';

import { FormValues, TableRow, ToastOptions } from '../pages/Home/Home';
import { dropdownValues } from '../utils/constants';

interface AddRowFormProps {
  formik: FormikValues;
  isSubmitLoading: boolean;
  isInspectorVisible: boolean;
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
  isInspectorVisible,
  isFormFieldInvalid,
  onDropdownChange,
  showToast,
  selectedRow,
  setIsDeleteRowModal,
  isDeleteLoading,
  onNoteChange,
}: AddRowFormProps) => {
  return (
    <form
      className='flex flex-col items-center w-full my-3 xl:mt-5 sm:w-full lg:w-6/12 xl:w-full xl:flex-col'
      onSubmit={formik.handleSubmit}
    >
      <div className='flex flex-row w-full gap-2 xl:gap-2 xl:w-full'>
        <div className='w-6/12'>
          <Dropdown
            className={classNames('w-full', {
              'p-invalid': isFormFieldInvalid('name') && !formik.values.name,
            })}
            inputId='name'
            onChange={(e: DropdownChangeParams) => onDropdownChange(e)}
            optionLabel='name'
            options={dropdownValues}
            optionValue='name'
            placeholder='Name'
            value={formik.values.name}
          />
        </div>
        <div className='w-6/12'>
          <InputText
            className={classNames('w-full', {
              'p-invalid': isFormFieldInvalid('date') && !formik.values.date,
            })}
            disabled={formik.values.date === formik.initialValues.date}
            name='date'
            placeholder='Date'
            readOnly
            value={formik.values.date}
          />
        </div>
      </div>
      <div className='w-full mt-2'>
        <Button
          aria-label='Submit'
          className='w-full whitespace-nowrap'
          disabled={false}
          icon='pi pi-check'
          label='Add to table'
          loading={isSubmitLoading}
          type='submit'
        />
      </div>
      <div className='flex justify-between w-full gap-2 mt-2'>
        {isInspectorVisible ? (
          <>
            <Button
              aria-label='Edit'
              className='w-6/12 whitespace-nowrap'
              disabled={selectedRow === null}
              icon='pi pi-pencil'
              label='Edit'
              onClick={() =>
                showToast({
                  severity: 'warn',
                  summary: 'In development',
                  detail: 'Temporarily unavailable',
                })
              }
              style={{ background: 'orange', border: 'transparent' }}
              type='button'
            />
            <Button
              aria-label='Delete'
              className='w-6/12 whitespace-nowrap '
              disabled={selectedRow === null}
              icon='pi pi-trash'
              label='Delete'
              loading={isDeleteLoading}
              onClick={() => setIsDeleteRowModal(true)}
              style={{ background: 'orangered', border: 'transparent' }}
              type='button'
            />
          </>
        ) : (
          <InputText
            className='w-full'
            maxLength={40}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onNoteChange(e)}
            placeholder='Note'
            value={formik.values.note}
          />
        )}
      </div>
    </form>
  );
};

export default AddRowForm;
