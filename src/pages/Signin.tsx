import React, { useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/logo.png";

const Signin = () => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      if (err instanceof Error && typeof err.message === "string")
        console.error("Signin error ==>", err.message);
      else console.error("Signin error ==>", err);
    } finally {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="mb-auto flex flex-col min-h-screen justify-center items-center bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200">
      <div className="w-full p-6 bg-white shadow-lg lg:w-5/12">
        <div className="mb-5 text-center">
          <img src={logo} alt="hyper" className="mx-auto mb-3" />
          <div className="mb-3 text-3xl font-medium text-black">
            Рады снова видеть вас!
          </div>
          <span className="font-medium leading-3 text-gray-400 text-md">
            Ещё нет аккаунта?
          </span>
          <Link
            to="/signup"
            className="ml-2 font-medium text-blue-500 no-underline cursor-pointer text-md"
          >
            Зарегистрируйся!
          </Link>
        </div>

        <form onSubmit={onSubmit}>
          <label
            htmlFor="email"
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
              Забыл пароль?
            </a>
          </div>
          {error ? <span>Что-то пошло не так...</span> : null}
          <Button
            label="Войти"
            icon="pi pi-user"
            className="w-full px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
        </form>
      </div>
    </div>
  );
};

export default Signin;
