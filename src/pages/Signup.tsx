import React, { useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  // TODO fix any
  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // const file = e.target[3].files[0];
    console.log("Signup onSubmit displayName:", displayName);
    console.log("Signup onSubmit email:", email);
    console.log("Signup onSubmit password:", password);

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("res ==>", res);
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        // photoURL: downloadURL,
      });
      navigate("/");
      //**********************************
      // TODO Create a unique image name *
      //**********************************
      // const date = new Date().getTime();
      // const storageRef = ref(storage, `${displayName + date}`);
      // getDownloadURL(storageRef).then(async (downloadURL) => {
      //   try {
      //     //Update profile
      //     await updateProfile(res.user, {
      //       displayName,
      //       // photoURL: downloadURL,
      //     });
      //     //create user on firestore
      //     await setDoc(doc(db, "users", res.user.uid), {
      //       uid: res.user.uid,
      //       displayName,
      //       email,
      //       // photoURL: downloadURL,
      //     });
      //     //create empty user chats on firestore
      //     // await setDoc(doc(db, "userChats", res.user.uid), {});
      //     // navigate("/");
      //   } catch (err) {
      //     console.log(err);
      //     setError(true);
      //     setLoading(false);
      //   }
      // });
      //**********************************
    } catch (err) {
      if (err instanceof Error && typeof err.message === "string")
        console.error("Signin error ==>", err.message);
      else console.error("Signin error ==>", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-auto flex flex-col min-h-screen justify-center items-center bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200">
      <div className="w-full p-6 bg-white shadow-lg lg:w-5/12">
        <div className="mb-5 text-center">
          <img src={logo} alt="hyper" className="mx-auto mb-3" />
          <div className="mb-3 text-3xl font-medium text-black">
            Добро пожаловать!
          </div>
          <span className="font-medium leading-3 text-gray-400 text-md">
            Уже есть аккаунт?
          </span>
          <Link
            to="/signin"
            className="ml-2 font-medium text-blue-500 no-underline cursor-pointer text-md"
          >
            Войти
          </Link>
        </div>

        <form onSubmit={onSubmit}>
          <label
            htmlFor="name"
            className="block mt-3 mb-2 font-medium text-gray-600 text-md"
          >
            Имя и фамилия
          </label>
          <InputText
            id="name"
            type="text"
            placeholder="Имя и фамилия"
            className="w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />

          <label
            htmlFor="name"
            className="block mt-3 mb-2 font-medium text-gray-600 text-md"
          >
            Электронный адрес
          </label>
          <InputText
            id="email"
            type="text"
            placeholder="Электронный адрес"
            className="w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />

          <label
            htmlFor="password"
            className="block mt-3 mb-2 font-medium text-gray-600"
          >
            Пароль
          </label>
          <InputText
            id="password"
            type="password"
            placeholder="Пароль"
            className="w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />

          <div className="flex items-center justify-between mt-3 mb-6">
            <div className="flex items-center text-gray-600">
              <Checkbox
                id="rememberme"
                onChange={(e) => setChecked(e.checked)}
                checked={checked}
                className="mr-2"
              />
              <label htmlFor="rememberme">Запомнить меня</label>
            </div>
            <a className="ml-2 font-medium text-right text-blue-500 no-underline cursor-pointer">
              Забыл свой пароль?
            </a>
          </div>
          {error ? <span>Что-то пошло не так...</span> : null}
          <Button
            label="Зарегистрироваться"
            icon="pi pi-user"
            className="w-full px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
