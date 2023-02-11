import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar, CalendarChangeParams } from "primereact/calendar";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import { Toast } from "primereact/toast";
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

const defaultValues = [
  {
    id: 1,
    name: "Роман ТЕСТ ТЕСТ ТЕСТ",
    date: "19-01-2023, чт",
    time: "00:25",
  },
];

const dropdownValues = [
  { id: 0, name: "Роман" },
  { id: 1, name: "Артём" },
];

const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [tableRows, setTableRows] = useState<Row[]>([]);
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    setTableRows(defaultValues);
    setSelectedDate(initialValues.date);
    setSelectedName(initialValues.name);
  }, []);

  const show = ({ name, date }: FormValues) => {
    if (!toast.current) return;
    toast.current.show({
      severity: "success",
      summary: "Таблица обновлена",
      detail: `Добавлено имя ${name} и дата ${date}`,
    });
  };
  const initialValues = {
    name: "Имя",
    date: "Дата",
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const date =
      (e.currentTarget.elements.namedItem("date") as HTMLInputElement).value ||
      selectedDate;
    const name =
      (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value ||
      selectedName;

    if (name && date) {
      show({ name, date });
      setTableRows([
        {
          id: 3,
          name,
          date,
          time: "00:01",
        },
        ...tableRows,
      ]);
      setSelectedName("");
      setSelectedDate(initialValues.date);
    }
  };

  const onDropdownChange = (e: DropdownChangeParams) => {
    const nameId = e.value;
    setSelectedName(dropdownValues[nameId].name);
  };

  const onCalendarChange = (e: CalendarChangeParams) => {
    if (e.value instanceof Date) {
      const newDate = e.value.toLocaleString().split(", ")[0];
      setSelectedDate(newDate);
    }
  };

  return (
    <div className="py-2 md:py-4 px-2 md:px-8 xl:px-16 lg:px-12 flex flex-col min-h-screen justify-between bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200">
      <header className="px-2 md:px-4 xl:px-8 lg:px-6 py-2.5 bg-white border-gray-200 rounded-md dark:bg-gray-800">
        <nav className="container flex flex-wrap items-center justify-between mx-auto">
          <a className="flex items-center" href="#">
            <img src={logo} className="h-6 mr-3 sm:h-9" alt="App Logo" />
            <h1 className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              VIP Рома
            </h1>
          </a>
        </nav>
      </header>

      <main className="flex justify-center w-full p-2  no-scrollbar md:p-4">
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
            onSubmit={onSubmit}
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
                placeholder={selectedName || initialValues.name}
                className={"w-full"}
                onChange={(e: DropdownChangeParams) => onDropdownChange(e)}
              />
            </div>
            <div className="w-full overflow-hidden rounded-md lg:w-4/12">
              <InputText
                name="date"
                value={selectedDate}
                className={"w-full"}
                placeholder={selectedDate || initialValues.date}
                disabled={selectedDate === initialValues.date}
                readOnly
              />
            </div>
            <div className="w-full overflow-hidden rounded-md lg:w-4/12">
              <Button
                className="w-full whitespace-nowrap"
                type="submit"
                label="Добавить в таблицу"
                disabled={
                  selectedName === initialValues.name ||
                  selectedDate === initialValues.date
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
            >
              <Column field="name" header="Имя"></Column>
              <Column field="date" header="Дата"></Column>
            </DataTable>
          </div>
        </section>
      </main>

      <footer className="px-2 md:px-4 xl:px-8 lg:px-6 py-2.5 bg-white border-gray-200 rounded-md dark:bg-gray-800">
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
