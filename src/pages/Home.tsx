import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import logo from "../assets/logo.png";

import { useFormik } from "formik";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";

interface FormValues {
  value: string;
}

interface Product {
  id: string;
  name: string;
  date: string;
  time: string;
}

const defaultValues = [
  {
    id: "1",
    name: "Роман ТЕСТ ТЕСТ ТЕСТ",
    date: "19-01-2023, чт",
    time: "00:25",
  },
];

const Home: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    setProducts(defaultValues);
  }, []);

  const show = (data: FormValues) => {
    if (!toast.current) return;
    toast.current.show({
      severity: "success",
      summary: "Успешно",
      detail: `Таблица обновлена`,
    });
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      value: "",
    },
    validate: (data) => {
      let errors: { [key: string]: string } = {};

      if (!data.value && !errors.value) {
        errors.value = "Поле 'Имя' не заполнено.";
        if (!toast.current) return;
        toast.current.show({
          severity: "error",
          summary: "Ошибка",
          detail: errors.value,
        });
      }

      return errors;
    },
    onSubmit: (data) => {
      console.log("data ==>", data);
      data && show(data);
      formik.resetForm();
    },
  });

  const isFormFieldInvalid = (name: keyof FormValues) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: keyof FormValues) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };
  return (
    <div className="p-2 md:p-4   flex flex-col min-h-screen justify-between bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200">
      <header className="px-2 md:px-4 xl:px-8 lg:px-6 py-2.5 bg-white border-gray-200 rounded-md dark:bg-gray-800">
        <nav className="container flex flex-wrap items-center justify-between mx-auto ">
          <a className="flex items-center" href="#">
            <img src={logo} className="h-6 mr-3 sm:h-9" alt="App Logo" />
            <h1 className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              VIP Рома
            </h1>
          </a>
        </nav>
      </header>

      <main className="flex justify-center w-full p-2 md:p-4 ">
        <section className="container flex flex-wrap items-center justify-center ">
          <div className="flex justify-center w-full">
            <Calendar
              className="w-full overflow-hidden text-xs rounded-md sm:w-full lg:w-6/12"
              value={date}
              onChange={(e: any) => setDate(e.value)}
              inline
            />
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="flex items-center w-full gap-2 my-4 sm:w-full lg:w-6/12"
          >
            <span className="w-full overflow-hidden rounded-md p-float-label lg:w-6/12 ">
              <Toast ref={toast} />
              <InputText
                id="value"
                name="value"
                value={formik.values.value}
                onChange={(e) => {
                  formik.setFieldValue("value", e.target.value);
                }}
                className={classNames("w-full", {
                  "p-invalid": isFormFieldInvalid("value"),
                })}
              />
              <label htmlFor="input_value">Имя</label>
            </span>

            <div className="w-full overflow-hidden rounded-md lg:w-6/12 ">
              <Button className="w-full" type="submit" label="Success" />
            </div>
          </form>

          <div className="flex justify-center w-full ">
            <DataTable
              className="w-full overflow-hidden text-xs rounded-md sm:w-full lg:w-6/12"
              value={products}
              selectionMode="single"
              selection={selectedProduct}
              onSelectionChange={(e) => setSelectedProduct(e.value)}
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
        <span className="container flex flex-wrap items-center h-6 mx-auto text-sm text-gray-500  sm:h-9 sm:text-center dark:text-gray-400">
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
