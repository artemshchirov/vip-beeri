import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const defaultValues = [
  {
    id: "1",
    name: "Роман ИМЯ",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: "2",
    name: "Артём",
    date: "13-11-2023, ср",
    time: "14:42",
  },
  {
    id: "3",
    name: "Роман",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: "4",
    name: "Артём",
    date: "13-11-2023, ср",
    time: "14:42",
  },
  {
    id: "5",
    name: "Роман",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: "6",
    name: "Артём",
    date: "13-11-2023, ср",
    time: "14:42",
  },
  {
    id: "7",
    name: "Роман вывфы  ",
    date: "19-01-2023, авфы чт",
    time: "00:25",
  },
  {
    id: "8",
    name: "Артём",
    date: "13-11-2023, ср",
    time: "14:42",
  },
  {
    id: "9",
    name: "Роман",
    date: "19-01-2023, чт",
    time: "00:25",
  },
  {
    id: "10",
    name: "Артём",
    date: "13-11-2023, ср",
    time: "14:42",
  },
];

export const TableWorkers: React.FC = () => {
  const [products, setProducts] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    setProducts(defaultValues);
  }, []);

  return (
    <DataTable
      className="w-full"
      value={products}
      selectionMode="radiobutton"
      selection={selectedProduct}
      onSelectionChange={(e) => setSelectedProduct(e.value)}
      dataKey="id"
      responsiveLayout="scroll"
    >
      <Column selectionMode="single" headerStyle={{ width: "3em" }}></Column>
      <Column field="name" header="Имя"></Column>
      <Column field="date" header="Дата"></Column>
    </DataTable>
  );
};

// const value = {
//   id: "1003",
//   code: "244wgerg2",
//   name: "Давид Балабанов",
//   description: "Product Description",
//   image: "blue-t-shirt.jpg",
//   price: 29,
//   category: "Clothing",
//   quantity: 25,
//   inventoryStatus: "INSTOCK",
//   rating: 5,
//   date: "24-05-2023, вт",
// };
