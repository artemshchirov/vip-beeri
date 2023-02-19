import React, { useState, useEffect, useRef } from "react";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import { Calendar, CalendarChangeParams } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import CustomLink from "../components/CustomLink";
import logo from "../assets/logo.png";

interface FormValues {
  name: string;
  date: string;
}

interface Row {
  id: number;
  name: string;
  date: Date;
  time: string;
}

interface ToastOptions {
  severity: "success" | "error";
  summary: string;
  detail: string;
}

interface DropdownValue {
  id: number;
  name: string;
}

const dropdownValues: DropdownValue[] = [
  { id: 0, name: "Роман Балабанов" },
  { id: 1, name: "Артём" },
  { id: 2, name: "НОВОЕ ОЧЕНЬ ДЛИННОЕ БОЛЬШОЕ СЛОВО" },
  { id: 3, name: "Д" },
];

const Home = () => {
  const [tableRows, setTableRows] = useState<Row[]>([]);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useRef<Toast>(null);
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      date: "",
    },

    validateOnChange: false,
    validateOnBlur: true,

    validate: (data) => {
      let errors: { [key: string]: string } = {};

      if (!data.name) errors.name = "Имя не выбрано";
      if (!data.date) errors.date = "Дата не выбрана";

      if (Object.keys(errors).length > 0) {
        showToast({
          severity: "error",
          summary: "Таблица не обновлена",
          detail: Object.values(errors).join(", "),
        });
        return errors;
      }

      return {};
    },

    onSubmit: async (data) => {
      setLoading(true);
      console.log("Home onSubmit data ==>", data);
      try {
        await addDoc(collection(db, "rows"), {
          id: uuid(),
          name: formik.values.name,
          date: formik.values.date,
          time: Timestamp.now().toDate(),
        });
      } catch (err) {
        if (err instanceof Error && typeof err.message === "string")
          console.error("Signin error ==>", err.message);
        else console.error("Signin error ==>", err);
      } finally {
        setLoading(false);
      }

      showToast({
        severity: "success",
        summary: "Таблица обновлена",
        detail: `${data.name} — ${data.date}`,
      });

      formik.setFieldValue("date", formik.initialValues.date);
    },
  });

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = async () => {
    setLoading(true);
    const q = query(collection(db, "rows"));
    try {
      onSnapshot(q, (querySnapshot) => {
        setTableRows(
          querySnapshot.docs.map(
            (doc): Row => ({
              id: doc.data().id,
              name: doc.data().name,
              date: doc.data().date,
              time: doc.data().time,
            })
          )
        );
      });
    } catch (err) {
      if (err instanceof Error && typeof err.message === "string")
        console.error("Signin error ==>", err.message);
      else console.error("Signin error ==>", err);
    } finally {
      setLoading(false);
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

  const onDropdownChange = (e: DropdownChangeParams) => {
    const newName = dropdownValues.find((x) => x.name === e.value)?.name;
    formik.setFieldValue("name", newName);
    console.log("newNameId ==>", e.value, "newName ==>", newName);
  };

  const onCalendarChange = (e: CalendarChangeParams) => {
    if (e.value instanceof Date) {
      const newDate = e.value.toLocaleString().split(", ")[0];
      formik.setFieldValue("date", newDate);
      console.log("newDate ==>", newDate);
    }
  };

  // NOTE SignOut
  // import { signOut } from "firebase/auth";
  // import { auth } from "../firebase";
  // button => () => signOut(auth)

  return (
    <div className="mb-auto flex flex-col min-h-screen justify-center bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200">
      <header className="px-2 md:px-4 xl:px-8 lg:px-6 py-2.5 bg-white border-gray-200 dark:bg-gray-800">
        <nav className="container flex flex-wrap items-center justify-between mx-auto">
          <a className="flex items-center" href="#">
            <img src={logo} className="h-6 mr-3 sm:h-9" alt="App Logo" />
            <h1 className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              VIP Рома
            </h1>
          </a>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-center flex-1 w-full p-2 no-scrollbar md:p-4">
        <section className="container xl:h-[596px] flex flex-wrap xl:justify-evenly">
          <div className="flex flex-col items-center w-full h-full xl:w-4/12 ">
            <Calendar
              className="w-full text-xs lg:w-6/12 xl:w-full xl:min-h-[435px]"
              value={formik.values.date}
              onChange={(e: CalendarChangeParams) => onCalendarChange(e)}
              inline
            />
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col items-center w-full my-3 xl:mt-5 sm:w-full lg:w-6/12 xl:w-full xl:flex-col"
            >
              <div className="flex flex-row w-full gap-2 xl:gap-2 xl:w-full">
                <Toast ref={toast} className="pl-5" />
                <div className="w-6/12">
                  <Dropdown
                    inputId="name"
                    value={formik.values.name}
                    options={dropdownValues}
                    optionValue="name"
                    optionLabel="name"
                    placeholder={formik.values.name || "Имя"}
                    className={classNames("w-full", {
                      "p-invalid":
                        isFormFieldInvalid("name") && !formik.values.name,
                    })}
                    onChange={(e: DropdownChangeParams) => onDropdownChange(e)}
                  />
                </div>
                <div className="w-6/12">
                  <InputText
                    name="date"
                    value={formik.values.date}
                    className={classNames("w-full", {
                      "p-invalid":
                        isFormFieldInvalid("date") && !formik.values.date,
                    })}
                    placeholder={formik.values.date || "Дата"}
                    disabled={formik.values.date === formik.initialValues.date}
                    readOnly
                  />
                </div>
              </div>
              <div className="w-full mt-2">
                <Button
                  className="w-full whitespace-nowrap"
                  type="submit"
                  label="Добавить"
                  icon="pi pi-check"
                  aria-label="Submit"
                  loading={loading}
                  disabled={
                    formik.values.name === formik.initialValues.name ||
                    formik.values.date === formik.initialValues.date
                  }
                />
              </div>
              <div className="flex justify-between w-full gap-2 mt-2">
                <Button
                  className="w-6/12 whitespace-nowrap "
                  type="button"
                  label="Изменить"
                  icon="pi pi-pencil"
                  aria-label="Edit"
                  style={{ background: "orange", border: "transparent" }}
                  disabled={selectedRow === null}
                />
                <Button
                  className="w-6/12 whitespace-nowrap "
                  type="button"
                  label="Удалить"
                  icon="pi pi-trash"
                  aria-label="Delete"
                  style={{ background: "orangered", border: "transparent" }}
                  disabled={selectedRow === null}
                />
              </div>
            </form>
          </div>
          <div className="flex justify-center w-full xl:w-7/12">
            <DataTable
              className="w-full text-xs sm:w-full lg:w-6/12 xl:w-full"
              value={tableRows}
              selectionMode="single"
              selection={selectedRow}
              onSelectionChange={(e) => setSelectedRow(e.value)}
              dataKey="id"
              responsiveLayout="scroll"
              paginator
              rows={10}
              alwaysShowPaginator={false}
              emptyMessage="Данные отсутствуют"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            >
              <Column
                field="name"
                header="Имя"
                sortable
                style={{ width: "50%" }}
              ></Column>
              <Column field="date" header="Дата" sortable></Column>
            </DataTable>
          </div>
        </section>
      </main>

      <footer className="px-4 md:px-4 xl:px-8 lg:px-6 py-2.5 bg-white border-gray-200  dark:bg-gray-800">
        <span className="container flex flex-wrap items-center h-6 mx-auto text-sm text-gray-500 sm:h-9 sm:text-center dark:text-gray-400">
          © 2023&nbsp;
          <CustomLink
            href="https://artemshchirov.github.io/portfolio/"
            className="hover:underline"
          >
            Developed by Ɐrtem
          </CustomLink>
        </span>
      </footer>
    </div>
  );
};

export default Home;
