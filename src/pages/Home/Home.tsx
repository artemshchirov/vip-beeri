// dark theme
// import "primereact/resources/themes/vela-blue/theme.css";
import { logEvent, setUserProperties } from 'firebase/analytics';
import moment from 'moment';
import { Calendar, CalendarChangeParams } from 'primereact/calendar';
import { DropdownChangeParams } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import React, { useEffect, useState } from 'react';

import { analytics, fetchRows } from '../../firebase';
import { useToast } from '../../hooks/useToast';
import Container from '../../layouts/Container';
import Page from '../../layouts/Page';
import Section from '../../layouts/Section';
import { admins, dropdownValues } from '../../utils/constants';
import AddRowForm from './AddRowForm';
import DeleteRowPopup from './DeleteRowPopup';
import EmployeeTable from './EmployeeTable';
import { useDeleteRow } from './useDeleteRow';
import { useForm } from './useForm';

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
        setTableRows(handleSortByDate(rows, true));
      } catch (error) {
        console.error('Error fetching rows:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndSetTableRows();
  }, []);

  useEffect(() => {
    const isAdmin = admins.includes(formik.values.name.toLowerCase());
    const userInput = formik.values.note?.toLowerCase();
    const password = 'inspect';
    const isValidPassword = userInput === password;
    if (isAdmin && isValidPassword) {
      setIsInspectorVisible((prev) => !prev);
      formik.setFieldValue('note', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.name, formik.values.note]);

  const isFormFieldInvalid = (formName: keyof FormValues) => !!(formik.touched[formName] && formik.errors[formName]);

  const onCalendarChange = ({ value }: CalendarChangeParams) => {
    if (value instanceof Date) {
      const formattedDate = moment(value).format('D MMMM, dddd');
      formik.setFieldValue('date', formattedDate);
    }

    setUserProperties(analytics, { timeFormat: value });
  };

  const handleDropdownChange = (e: DropdownChangeParams) => {
    const newName = dropdownValues.find((x) => x.name === e.value)?.name;
    formik.setFieldValue('name', newName);

    logEvent(analytics, 'select_name', {
      name: newName,
      userAgent: window.navigator.userAgent,
      time: Date(),
      formData: [
        {
          formName: formik.values.name,
          formDate: formik.values.date,
          formNote: formik.values.note,
        },
      ],
    });
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue('note', e.target.value);

  const handleSortByDate = (rows: TableRow[], order: boolean) => {
    const sorted = [...rows].sort((a, b) => {
      const dateA = moment(a.date, 'D MMM, dddd').toDate();
      const dateB = moment(b.date, 'D MMM, dddd').toDate();

      if (dateA < dateB) {
        return order ? -1 : 1;
      } else if (dateA > dateB) {
        return order ? 1 : -1;
      } else {
        return 0;
      }
    });

    return sorted;
  };

  return (
    <Page>
      <Section className='flex w-full flex-wrap xl:items-center xl:justify-evenly'>
        <Container className='flex w-full flex-col xl:w-4/12'>
          <Calendar
            className='text-lg'
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
        </Container>
        <Container className='w-full xl:w-7/12'>
          <EmployeeTable
            isLoading={isLoading}
            onSort={handleSortByDate}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            tableRows={tableRows}
          />
        </Container>
      </Section>
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
