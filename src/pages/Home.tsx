import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useFormik } from "formik";
import { Calendar, CalendarChangeParams } from "primereact/calendar";
// TODO: rename DropdownChangeParams
import { DropdownChangeParams } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { db } from "../firebase";
import { dropdownValues } from "../utils/constants";
import AddRowForm from '../components/AddRowForm';
import DialogRowDelete from '../components/DialogRowDelete';
import EmployeeTable from '../components/EmployeeTable';
import Page from '../layouts/Page';

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
  date: Date;
  time: string;
  note?: string;
}

export interface ToastOptions {
  severity: "success" | "info" | "warn" | "error";
  summary: string;
  detail: string;
}

const Home = () => {
  const [tableRows, setTableRows] = useState<TableRow[]>([]);
  const [selectedRow, setSelectedRow] = useState<TableRow | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [isDeleteRowModal, setIsDeleteRowModal] = useState(false);
  const [isDeleteBtnVisible, setIsDeleteBtnVisible] = useState(false);

  const toast = useRef<Toast>(null);
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      date: "",
      note: "",
    },

    validateOnChange: false,
    validateOnBlur: true,

    validate: data => {
      let errors: { [key: string]: string } = {};

      if (!data.name) errors.name = "Name is not selected";
      if (!data.date) errors.date = "Date is not selected";

      if (Object.keys(errors).length > 0) {
        showToast({
          severity: "error",
          summary: "Table is not updated",
          detail: Object.values(errors).join(","),
        });
        return errors;
      }

      return {};
    },

    onSubmit: async data => {
      setIsSubmitLoading(true);
      try {
        await addDoc(collection(db, "table"), {
          id: uuid(),
          name: formik.values.name,
          date: formik.values.date,
          note: formik.values.note,
          time: `${Timestamp.now()
            .toDate()
            .toLocaleDateString("en-US", { day: "2-digit" })}/${Timestamp.now()
            .toDate()
            .toLocaleDateString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              month: "2-digit",
            })}`,
        });
        showToast({
          severity: "success",
          summary: "Table was updated",
          detail: `${data.name} — ${data.date}`,
        });
      } catch (err) {
        if (err instanceof Error && typeof err.message === "string")
          console.error("Home onSubmit error ==>", err.message);
        else console.error("Home onSubmit error ==>", err);

        showToast({
          severity: "error",
          summary: "Table is not updated",
          detail: `Error adding ${data.name} — ${data.date}`,
        });
      } finally {
        setIsSubmitLoading(false);
      }

      formik.setFieldValue("date", formik.initialValues.date);
    },
  });

  useEffect(() => {
    fetchRows();
  }, []);

  useEffect(() => {
    if (
      formik.values.name === "Roman Balabanov" &&
      formik.values.note === "Inspector"
    ) {
      setIsDeleteBtnVisible(prev => !prev);
      formik.setFieldValue("note", "");
    }
  }, [formik.values.name, formik.values.note]);
  const fetchRows = async () => {
    setIsLoading(true);
    const q = query(collection(db, "table"));
    try {
      onSnapshot(q, querySnapshot => {
        setTableRows(
          querySnapshot.docs.map(
            (doc): TableRow => ({
              id: doc.id,
              name: doc.data().name,
              date: doc.data().date,
              note: doc.data().note,
              time: doc.data().time,
            })
          )
        );
      });
    } catch (err) {
      if (err instanceof Error && typeof err.message === "string")
        console.error("Home fetchRows error ==>", err.message);
      else console.error("Home fetchRows error ==>", err);
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = ({ severity, summary, detail }: ToastOptions) => {
    if (toast.current)
      toast.current.show({
        severity,
        summary,
        detail,
      });
  };

  const isFormFieldInvalid = (formName: keyof FormValues) =>
    !!(formik.touched[formName] && formik.errors[formName]);

  const handleDropdownChange = (e: DropdownChangeParams) => {
    const newName = dropdownValues.find(x => x.name === e.value)?.name;
    formik.setFieldValue("name", newName);
  };

  const onCalendarChange = (e: CalendarChangeParams) => {
    if (e.value instanceof Date) {
      const date = e.value;
      const newDate = `${date.getDate()} ${date.toLocaleDateString("en-US", {
        month: "long",
      })}, ${date.toLocaleDateString("en-US", { weekday: "long" })}`;

      formik.setFieldValue("date", newDate);
    }
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("note", e.target.value);
  };

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    setIsDeleteRowModal(false);

    if (selectedRow) {
      const rowDocRef = doc(db, "table", selectedRow.id);
      try {
        await deleteDoc(rowDocRef);
        showToast({
          severity: "info",
          summary: "Table was updated",
          detail: `Deleted ${selectedRow.name} — ${selectedRow.date}`,
        });
        setSelectedRow(null);
      } catch (err) {
        if (err instanceof Error && typeof err.message === "string")
          console.error("Home handleDelete error ==>", err.message);
        else console.error("Home handleDelete error ==>", err);
        showToast({
          severity: "error",
          summary: "Table is not updated",
          detail: `Error deleting ${selectedRow.name} — ${selectedRow.date}`,
        });
      }
    }
    setIsDeleteLoading(false);
  };

  return (
    <Page>
      <section className="container xl:h-[596px] flex flex-wrap xl:justify-evenly">
        <div className="flex flex-col items-center w-full h-full xl:w-4/12 ">
          <Calendar
            className=" w-full text-xs lg:w-6/12 xl:w-full xl:min-h-[435px]"
            value={formik.values.date}
            onChange={(e: CalendarChangeParams) => onCalendarChange(e)}
            minDate={new Date()}
            inline
          />
          <AddRowForm
            formik={formik}
            isSubmitLoading={isSubmitLoading}
            isFormFieldInvalid={isFormFieldInvalid}
            onDropdownChange={handleDropdownChange}
            isDeleteBtnVisible={isDeleteBtnVisible}
            showToast={showToast}
            isEditLoading={isEditLoading}
            selectedRow={selectedRow}
            setIsDeleteRowModal={setIsDeleteRowModal}
            isDeleteLoading={isDeleteLoading}
            onNoteChange={handleNoteChange}
          />
        </div>
        <div className="flex justify-center w-full xl:w-7/12">
          <EmployeeTable
            tableRows={tableRows}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
          />
        </div>
      </section>
      <DialogRowDelete
        isDeleteRowModal={isDeleteRowModal}
        setIsDeleteRowModal={setIsDeleteRowModal}
        selectedRow={selectedRow}
        handleDelete={handleDelete}
      />
      <Toast ref={toast} className="pl-5" baseZIndex={2000} />
    </Page>
  );
};

export default Home;
