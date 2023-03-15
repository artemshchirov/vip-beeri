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
import { Button } from "primereact/button";
import { Calendar, CalendarChangeParams } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import logo from "../assets/logo.png";
import CustomLink from "../components/CustomLink";
import { db } from "../firebase";
import { dropdownValues } from "../utils/constants";

interface FormValues {
	name: string;
	date: string;
	note?: string;
}

interface TableRow {
	id: string;
	name: string;
	date: Date;
	time: string;
	note?: string;
}

interface ToastOptions {
	severity: "success" | "info" | "warn" | "error";
	summary: string;
	detail: string;
}

const Home = () => {
	const [tableRows, setTableRows] = useState<TableRow[]>([]);
	const [selectedRow, setSelectedRow] = useState<TableRow | null>(null);
	const [loading, setLoading] = useState(false);
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

			if (!data.name) errors.name = "Name not selected";
			if (!data.date) errors.date = "Date not selected";

			if (Object.keys(errors).length > 0) {
				showToast({
					severity: "error",
					summary: "Table not updated",
					detail: Object.values(errors).join(", "),
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
					time: Timestamp.now().toDate().toLocaleDateString("en-US", {
						hour: "2-digit",
						minute: "2-digit",
						hour12: false,
						day: "2-digit",
						month: "2-digit",
					}),
				});

				showToast({
					severity: "success",
					summary: "Table updated",
					detail: `${data.name} — ${data.date}`,
				});
			} catch (err) {
				if (err instanceof Error && typeof err.message === "string")
					console.error("Home onSubmit error ==>", err.message);
				else console.error("Home onSubmit error ==>", err);

				showToast({
					severity: "error",
					summary: "Table not updated",
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
		setLoading(true);
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

	const onNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
					summary: "Table updated",
					detail: `Deleted ${selectedRow.name} — ${selectedRow.date}`,
				});
				setSelectedRow(null);
			} catch (err) {
				if (err instanceof Error && typeof err.message === "string")
					console.error("Home handleDelete error ==>", err.message);
				else console.error("Home handleDelete error ==>", err);
				showToast({
					severity: "error",
					summary: "Table not updated",
					detail: `Error deleting ${selectedRow.name} — ${selectedRow.date}`,
				});
			}
		}
		setIsDeleteLoading(false);
	};

	return (
		<div className="mb-auto flex flex-col min-h-screen justify-center bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200">
			<header className="px-2 md:px-4 xl:px-8 lg:px-6 py-2.5 bg-white border-gray-200 dark:bg-gray-800">
				<nav className="container flex flex-wrap items-center justify-between mx-auto">
					<a className="flex items-center" href="#">
						<img src={logo} className="h-6 mr-3 sm:h-9" alt="App Logo" />
						<h1 className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
							VIP
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
								<Toast ref={toast} className="pl-5" baseZIndex={2000} />
								<div className="w-6/12">
									<Dropdown
										inputId="name"
										value={formik.values.name}
										options={dropdownValues}
										optionValue="name"
										optionLabel="name"
										placeholder="Name"
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
										placeholder="Date"
										disabled={formik.values.date === formik.initialValues.date}
										readOnly
									/>
								</div>
							</div>
							<div className="w-full mt-2">
								<Button
									className="w-full whitespace-nowrap"
									type="submit"
									label="Add to table"
									icon="pi pi-check"
									aria-label="Submit"
									loading={isSubmitLoading}
									disabled={
										formik.values.name === formik.initialValues.name ||
										formik.values.date === formik.initialValues.date
									}
								/>
							</div>

							<div className="flex justify-between w-full gap-2 mt-2">
								{isDeleteBtnVisible ? (
									<>
										<Button
											className="w-6/12 whitespace-nowrap "
											type="button"
											label="Edit"
											icon="pi pi-pencil"
											aria-label="Edit"
											style={{ background: "orange", border: "transparent" }}
											onClick={() =>
												showToast({
													severity: "warn",
													summary: "In development",
													detail: "Temporarily unavailable",
												})
											}
											loading={isEditLoading}
											disabled={selectedRow === null}
										/>
										<Button
											className="w-6/12 whitespace-nowrap "
											type="button"
											label="Delete"
											icon="pi pi-trash"
											aria-label="Delete"
											style={{ background: "orangered", border: "transparent" }}
											onClick={() => setIsDeleteRowModal(true)}
											loading={isDeleteLoading}
											disabled={selectedRow === null}
										/>
									</>
								) : (
									<InputText
										placeholder="Note"
										value={formik.values.note}
										maxLength={40}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											onNoteChange(e)
										}
										className="w-full"
									/>
								)}
							</div>
						</form>
					</div>
					<div className="flex justify-center w-full xl:w-7/12">
						<DataTable
							className="w-full text-xs sm:w-full lg:w-6/12 xl:w-full"
							value={tableRows}
							selectionMode="single"
							selection={selectedRow}
							onSelectionChange={e => setSelectedRow(e.value)}
							dataKey="id"
							responsiveLayout="scroll"
							paginator
							rows={10}
							alwaysShowPaginator={false}
							emptyMessage="No data available"
							paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
						>
							<Column
								field="name"
								header="Name"
								sortable
								style={{ width: "19%" }}
							/>
							<Column
								field="date"
								header="Date"
								style={{ width: "23%" }}
								sortable
							/>
							<Column field="note" header="Note" style={{ width: "auto" }} />
							<Column field="time" header="Time" style={{ width: "19%" }} />
						</DataTable>
					</div>
					<Dialog
						className="m-1"
						visible={isDeleteRowModal}
						style={{ width: "32rem" }}
						breakpoints={{ "960px": "75vw", "641px": "90vw" }}
						header="Confirmation"
						modal
						footer={
							<>
								<Button
									label="No"
									icon="pi pi-times"
									onClick={() => setIsDeleteRowModal(false)}
									style={{
										background: "transparent",
										border: "1px solid blue",
										fontWeight: "500",
										color: "blue",
									}}
								/>
								<Button
									label="Yes"
									icon="pi pi-check"
									onClick={handleDelete}
									style={{
										background: "orangered",
										border: "1px solid orangered",
										fontWeight: "bold",
									}}
								/>
							</>
						}
						onHide={() => setIsDeleteRowModal(false)}
					>
						<div>
							<i
								className="mb-3 mr-3 pi pi-exclamation-triangle"
								style={{ fontSize: "2rem" }}
							/>
							{selectedRow && (
								<span>
									Are you sure you want to {/* FIXME */}
									<span className="text-red-500">delete</span> this row?
									<br />
									<b>{`${selectedRow.name} — ${selectedRow.date}`}</b>?
								</span>
							)}
						</div>
					</Dialog>
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
