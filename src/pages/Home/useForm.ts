import { logEvent } from 'firebase/analytics';
import { FormikHelpers, useFormik } from 'formik';
import { useCallback, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import { analytics, fetchRows, saveRow } from '../../firebase';
import { ToastOptions } from '../../hooks/useToast';
import { getCurrentDateAndTime } from '../../utils/helpers';
import { FormValues, TableRow } from './Home';

interface UseFormHelpers {
  showToast: ({ severity, summary, detail }: ToastOptions) => void;
  setTableRows: React.Dispatch<React.SetStateAction<TableRow[]>>;
  setIsSubmitLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useForm = ({ showToast, setTableRows, setIsSubmitLoading }: UseFormHelpers) => {
  const initialValues: FormValues = useMemo(
    () => ({
      name: '',
      date: '',
      note: '',
    }),
    []
  );

  const validate = useCallback(
    (values: FormValues) => {
      const errors: Partial<FormValues> = {};

      if (!values.name) errors.name = 'Name is not selected';
      if (!values.date) errors.date = 'Date is not selected';

      if (Object.keys(errors).length > 0) {
        showToast({
          severity: 'error',
          summary: 'Table is not updated',
          detail: Object.values(errors).join(', '),
        });
      }

      return errors;
    },
    [showToast]
  );

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
      logEvent(analytics, 'button_click', { buttonId: 'add_row_button' });
    },
    [initialValues, setIsSubmitLoading, setTableRows, showToast]
  );

  const formik = useFormik<FormValues>({
    initialValues,
    validateOnChange: false,
    validateOnBlur: true,
    validate,
    onSubmit: handleSubmit,
  });

  return formik;
};
