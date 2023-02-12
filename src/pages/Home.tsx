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
import logo from "../assets/logo.png";

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
    name: "ТЕСТ ТЕСТ ТЕСТ",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 11,
    name: "ТЕСТ ТЕСТ ТЕСТ",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 12,
    name: "ТЕСТ ТЕСТ ТЕСТ",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 13,
    name: "ТЕСТ ТЕСТ ТЕСТ",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 14,
    name: "ТЕСТ ТЕСТ ТЕСТ",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 15,
    name: "ТЕСТ ТЕСТ ТЕСТ",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 16,
    name: "ТЕСТ ТЕСТ ТЕСТ",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 17,
    name: "ТЕСТ ТЕСТ ТЕСТ",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 18,
    name: "ТЕСТ ТЕСТ ТЕСТ",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 19,
    name: "ТЕСТ ТЕСТ ТЕСТ",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 20,
    name: "ТЕСТ ТЕСТ ТЕСТ",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 21,
    name: "ТЕСТ ТЕСТ ТЕСТ",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: 22,
    name: "ТЕСТ ТЕСТ ТЕСТ",
    date: "19-01-2023, чт",
    time: "00:25",
  },
];

const dropdownValues: { id: number; name: string }[] = [
  { id: 0, name: "Роман" },
  { id: 1, name: "Артём" },
  { id: 2, name: "НОВОЕ ОЧЕНЬ ДЛИННОЕ БОЛЬШОЕ ИМЯ" },
  { id: 3, name: "" },
];

interface ToastOptions {
  severity: "success" | "error";
  summary: string;
  detail: string;
}

const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [tableRows, setTableRows] = useState<Row[]>([]);
  const [selectedName, setSelectedName] = useState<string | undefined>("");
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
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

    onSubmit: (data) => {
      console.log("data ==>", data);

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
        detail: `Добавлено Имя: ${data.name}, Дата: ${data.date}`,
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

  return (
    <div className="py-4 md:py-4 px-8 md:px-12 xl:px-20 lg:px-16 flex flex-col min-h-screen justify-between bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200">
      <header className="px-4 md:px-4 xl:px-8 lg:px-6 py-2.5 bg-white border-gray-200 rounded-md dark:bg-gray-800">
        <nav className="container flex flex-wrap items-center justify-between mx-auto">
          <a className="flex items-center" href="#">
            <img src={logo} className="h-6 mr-3 sm:h-9" alt="App Logo" />
            <h1 className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              VIP Рома
            </h1>
          </a>
        </nav>
      </header>

      <main className="flex justify-center w-full p-4 no-scrollbar md:p-4">
        <section className="container flex flex-wrap items-center justify-center ">
          <div className="flex justify-center w-full">
            <Calendar
              className="w-full overflow-hidden text-xs rounded-md sm:w-full lg:w-6/12"
              value={selectedDate}
              onChange={(e: CalendarChangeParams) => onCalendarChange(e)}
              inline
            />
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex items-center w-full gap-2 my-4 sm:w-full lg:w-6/12"
          >
            <Toast ref={toast} />
            <div className="w-full overflow-hidden rounded-md lg:w-4/12">
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
            <div className="w-full overflow-hidden rounded-md lg:w-4/12">
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
            <div className="w-full overflow-hidden rounded-md lg:w-4/12">
              <Button
                className="w-full whitespace-nowrap"
                type="submit"
                label="Добавить в таблицу"
                disabled={
                  selectedName === formik.initialValues.name ||
                  selectedDate === formik.initialValues.date
                }
              />
            </div>
          </form>
          <div className="flex justify-center w-full ">
            <DataTable
              className="w-full overflow-hidden text-xs rounded-md sm:w-full lg:w-6/12"
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
              <Column field="name" header="Имя" sortable></Column>
              <Column field="date" header="Дата" sortable></Column>
            </DataTable>
          </div>
        </section>
      </main>

      <footer className="px-4 md:px-4 xl:px-8 lg:px-6 py-2.5 bg-white border-gray-200 rounded-md dark:bg-gray-800">
        <span className="container flex flex-wrap items-center h-6 mx-auto text-sm text-gray-500 sm:h-9 sm:text-center dark:text-gray-400">
          © 2023&nbsp;
          <a href="#" className="hover:underline">
            Developed by Ɐrtem
          </a>
        </span>
      </footer>
    </div>
  );
};

export default Home;
