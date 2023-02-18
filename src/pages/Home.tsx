import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar, CalendarChangeParams } from "primereact/calendar";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import logo from "../assets/logo.png";
import CustomLink from "../components/CustomLink";
import Signin from "./Signin";
import Signup from "./Signup";

interface FormValues {
  name: string;
  date: string;
}

interface Row {
  id: number;
  name: string;
  date: string;
  time: string;
}

const defaultValues: Row[] = [
  {
    id: 10,
    name: "Имя в таблице",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 11,
    name: "Имя в таблице",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 12,
    name: "Имя в таблице",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 13,
    name: "Имя в таблице",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 14,
    name: "Имя в таблице",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 15,
    name: "Имя в таблице",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 16,
    name: "Имя в таблице",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 17,
    name: "Имя в таблице",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 18,
    name: "Имя в таблице",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 19,
    name: "Имя в таблице",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 20,
    name: "Имя в таблице",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 21,
    name: "Имя в таблице",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 22,
    name: "Имя в таблице",
    date: "19-01-2023, чт",
    time: "00:25",
  },
];

const dropdownValues: { id: number; name: string }[] = [
  { id: 0, name: "Роман Балабанов" },
  { id: 1, name: "Артём" },
  { id: 2, name: "НОВОЕ ОЧЕНЬ ДЛИННОЕ БОЛЬШОЕ СЛОВО" },
  { id: 14, name: "" },
  { id: 3, name: "Имя" },
  { id: 4, name: "Имя" },
  { id: 5, name: "Имя" },
  { id: 6, name: "Имя" },
  { id: 7, name: "Имя" },
  { id: 8, name: "Имя" },
  { id: 9, name: "Имя" },
  { id: 10, name: "Имя" },
  { id: 11, name: "Имя" },
  { id: 12, name: "Имя" },
  { id: 13, name: "Имя" },
];

interface ToastOptions {
  severity: "success" | "error";
  summary: string;
  detail: string;
}

const Home = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [tableRows, setTableRows] = useState<Row[]>([]);
  const [selectedName, setSelectedName] = useState<string | undefined>("");
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    setTableRows(defaultValues);
  }, []);

  const showToast = ({ severity, summary, detail }: ToastOptions) => {
    if (toast.current)
      toast.current.show({
        severity,
        summary,
        detail,
      });
  };

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
      console.log("data ==>", data);

      try {
        setLoading(true);
        // await setDoc(doc(db, "rows", res.user));
      } catch (err: any) {
        // TODO type
        console.log("onSubmit", err.message);
      } finally {
        setLoading(false);
      }

      setTableRows([
        {
          id: 3,
          name: data.name,
          date: data.date,
          time: "00:01",
        },
        ...tableRows,
      ]);

      showToast({
        severity: "success",
        summary: "Таблица обновлена",
        detail: `${data.name} — ${data.date}`,
      });

      formik.setFieldValue("date", formik.initialValues.date);
      setSelectedDate(formik.initialValues.date);
    },
  });

  const isFormFieldInvalid = (formName: keyof FormValues) =>
    !!(formik.touched[formName] && formik.errors[formName]);

  const onDropdownChange = (e: DropdownChangeParams) => {
    const newNameId = e.value;
    const newName = dropdownValues.find((x) => x.id === newNameId)?.name;
    setSelectedName(newName);
    formik.setFieldValue("name", newName);
    console.log("newNameId ==>", newNameId, "newName ==>", newName);
  };

  const onCalendarChange = (e: CalendarChangeParams) => {
    if (e.value instanceof Date) {
      const newDate = e.value.toLocaleString().split(", ")[0];
      setSelectedDate(newDate);
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
              value={selectedDate}
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
                    value={selectedName}
                    options={dropdownValues}
                    optionValue="id"
                    optionLabel="name"
                    placeholder={selectedName || "Имя"}
                    className={classNames("w-full", {
                      "p-invalid": isFormFieldInvalid("name") && !selectedName,
                    })}
                    onChange={(e: DropdownChangeParams) => onDropdownChange(e)}
                  />
                </div>
                <div className="w-6/12">
                  <InputText
                    name="date"
                    value={selectedDate}
                    className={classNames("w-full", {
                      "p-invalid": isFormFieldInvalid("date") && !selectedDate,
                    })}
                    placeholder={selectedDate || "Дата"}
                    disabled={selectedDate === formik.initialValues.date}
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
                  disabled={
                    selectedName === formik.initialValues.name ||
                    selectedDate === formik.initialValues.date
                  }
                />
              </div>
              <div className="flex justify-between w-full gap-2 mt-2">
                <Button
                  className="w-6/12 whitespace-nowrap "
                  type="button"
                  label="Изменить"
                  icon="pi pi-user"
                  aria-label="Edit"
                  style={{ background: "orange", border: "transparent" }}
                  disabled={selectedRow === null}
                />
                <Button
                  className="w-6/12 whitespace-nowrap "
                  type="button"
                  label="Удалить"
                  icon="pi pi-times"
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
