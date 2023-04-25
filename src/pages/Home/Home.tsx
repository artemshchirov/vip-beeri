import { deleteDoc, doc } from 'firebase/firestore';
import { FormikHelpers, useFormik } from 'formik';
import { Calendar, CalendarChangeParams } from 'primereact/calendar';
import { DropdownChangeParams } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import AddRowForm from '../../components/AddRowForm';
import DeleteRowPopup from '../../components/DeleteRowPopup';
import EmployeeTable from '../../components/EmployeeTable';
import { db, fetchRows, saveRow } from '../../firebase';
import Page from '../../layouts/Page';
import { dropdownValues } from '../../utils/constants';
import { formatDate, getCurrentDateAndTime } from '../../utils/helpers';

// dark theme
// import "primereact/resources/themes/vela-blue/theme.css";

export interface FormValues {
  name: string;
  date: string;
  note?: string;
}

export interface TableRow {
  id: string;
  name: string;
  date: string;
  time: string;
  note?: string;
}

export interface ToastOptions {
  severity: 'success' | 'info' | 'warn' | 'error';
  summary: string;
  detail: string;
}

const Home = () => {
  const [tableRows, setTableRows] = useState<TableRow[]>([]);
  const [selectedRow, setSelectedRow] = useState<TableRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isDeleteRowModal, setIsDeleteRowModal] = useState(false);
  const [isInspectorVisible, setIsInspectorVisible] = useState(false);

  const toast = useRef<Toast>(null);
  const showToast = useCallback(({ severity, summary, detail }: ToastOptions) => {
    if (toast.current) {
      toast.current.show({
        severity,
        summary,
        detail,
      });
    }
  }, []);

  const initialValues = useMemo(
    () => ({
      name: '',
      date: '',
      note: '',
    }),
    []
  );

  const validate = useCallback((values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.name) {
      errors.name = 'Name is not selected';
    }
    if (!values.date) {
      errors.date = 'Date is not selected';
    }

    return errors;
  }, []);

  const handleSubmit = useCallback(
    async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
      setIsSubmitLoading(true);

      const rowData: TableRow = {
        id: uuid(),
        name: values.name,
        date: values.date,
        note: values.note,
        time: getCurrentDateAndTime(),
      };

      try {
        await saveRow(rowData);
        setTableRows(await fetchRows());
        showToast({
          severity: 'success',
          summary: 'Table was updated',
          detail: `${values.name} — ${values.date}`,
        });
      } catch (error) {
        console.error('Error fetching rows:', error);
        showToast({
          severity: 'error',
          summary: 'Table is not updated',
          detail: `Error adding ${values.name} — ${values.date}`,
        });
      } finally {
        setIsSubmitLoading(false);
      }

      formikHelpers.resetForm({ values: initialValues });
    },
    [initialValues, setIsSubmitLoading, showToast]
  );

  const formik = useFormik<FormValues>({
    initialValues,
    validate,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const fetchAndSetTableRows = async () => {
      try {
        const rows = await fetchRows();

        setTableRows(rows);
      } catch (error) {
        console.error('Error fetching rows:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetTableRows();
  }, []);

  useEffect(() => {
    if (formik.values.name === 'Roman Balabanov' && formik.values.note === 'Inspector') {
      setIsInspectorVisible((prev) => !prev);
      formik.setFieldValue('note', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.name, formik.values.note]);

  const isFormFieldInvalid = (formName: keyof FormValues) => !!(formik.touched[formName] && formik.errors[formName]);

  const onCalendarChange = ({ value }: CalendarChangeParams) => {
    if (value instanceof Date) {
      const formattedDate = formatDate(value);

      formik.setFieldValue('date', formattedDate);
    }
  };

  const handleDropdownChange = (e: DropdownChangeParams) => {
    const newName = dropdownValues.find((x) => x.name === e.value)?.name;
    formik.setFieldValue('name', newName);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('note', e.target.value);
  };

  const handleDelete = useCallback(async () => {
    setIsDeleteLoading(true);
    setIsDeleteRowModal(false);
    if (!selectedRow) {
      setIsDeleteLoading(false);

      return;
    }
    const rowDocRef = doc(db, 'table', selectedRow.id);

    try {
      await deleteDoc(rowDocRef);
      setTableRows(await fetchRows());
      showToast({
        severity: 'info',
        summary: 'Table was updated',
        detail: `Deleted ${selectedRow.name} — ${selectedRow.date}`,
      });
      setSelectedRow(null);
    } catch (error) {
      console.error('Home handleDelete error ==>', error);
      showToast({
        severity: 'error',
        summary: 'Table is not updated',
        detail: `Error deleting ${selectedRow.name} — ${selectedRow.date}`,
      });
    } finally {
      setIsDeleteLoading(false);
    }
  }, [selectedRow, showToast]);

  return (
    <Page>
      <section className='container xl:h-[596px] flex flex-wrap xl:justify-evenly'>
        <div className='flex flex-col items-center w-full h-full xl:w-4/12 '>
          <Calendar
            className='w-full text-xs lg:w-6/12 xl:w-full xl:min-h-[435px]'
            inline
            minDate={new Date()}
            onChange={(e: CalendarChangeParams) => onCalendarChange(e)}
            value={formik.values.date}
          />
          <AddRowForm
            formik={formik}
            isDeleteLoading={isDeleteLoading}
            isFormFieldInvalid={isFormFieldInvalid}
            isInspectorVisible={isInspectorVisible}
            isSubmitLoading={isSubmitLoading}
            onDropdownChange={handleDropdownChange}
            onNoteChange={handleNoteChange}
            selectedRow={selectedRow}
            setIsDeleteRowModal={setIsDeleteRowModal}
            showToast={showToast}
          />
        </div>
        <div className='flex justify-center w-full xl:w-7/12'>
          <EmployeeTable
            isLoading={isLoading}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            tableRows={tableRows}
          />
        </div>
      </section>
      <DeleteRowPopup
        handleDelete={handleDelete}
        isDeleteRowModal={isDeleteRowModal}
        selectedRow={selectedRow}
        setIsDeleteRowModal={setIsDeleteRowModal}
      />
      <Toast baseZIndex={2000} className='pl-5' ref={toast} />
    </Page>
  );
};

export default Home;
