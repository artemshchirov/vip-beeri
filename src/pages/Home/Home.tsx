import { Calendar, CalendarChangeParams } from 'primereact/calendar';
import { DropdownChangeParams } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import React, { useEffect, useState } from 'react';

import AddRowForm from '../../components/AddRowForm';
import DeleteRowPopup from '../../components/DeleteRowPopup';
import EmployeeTable from '../../components/EmployeeTable';
import { fetchRows } from '../../firebase';
import { useToast } from '../../hooks/useToast';
import Page from '../../layouts/Page';
import { admins, dropdownValues } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';
import { useDeleteRow } from './useDeleteRow';
import { useForm } from './useForm';

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

const Home = () => {
  const [tableRows, setTableRows] = useState<TableRow[]>([]);
  const [selectedRow, setSelectedRow] = useState<TableRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isDeleteRowModal, setIsDeleteRowModal] = useState(false);
  const [isInspectorVisible, setIsInspectorVisible] = useState(false);

  const { toast, showToast } = useToast();

  const formik = useForm({ showToast, setTableRows, setIsSubmitLoading });

  const handleDeleteRow = useDeleteRow({
    selectedRow,
    showToast,
    setTableRows,
    setIsDeleteRowModal,
    setIsDeleteLoading,
    setSelectedRow,
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
    if (admins.includes(formik.values.name.toLowerCase()) && formik.values.note?.toLowerCase() === 'inspect') {
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
        handleDelete={handleDeleteRow}
        isDeleteRowModal={isDeleteRowModal}
        selectedRow={selectedRow}
        setIsDeleteRowModal={setIsDeleteRowModal}
      />
      <Toast baseZIndex={2000} className='pl-5' ref={toast} />
    </Page>
  );
};

export default Home;
