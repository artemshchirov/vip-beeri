import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logoLight from '../assets/logoLight.svg';
import { auth } from '../firebase';

const Signin = () => {
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const navigate = useNavigate();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      if (err instanceof Error && typeof err.message === 'string') console.error('Signin error ==>', err.message);
      else console.error('Signin error ==>', err);
    } finally {
      setError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className='mb-auto flex min-h-screen flex-col items-center justify-center bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200'>
      <div className='w-full bg-white p-6 shadow-lg lg:w-5/12'>
        <div className='mb-5 text-center'>
          <img alt='hyper' className='mx-auto mb-3' src={logoLight} />
          <div className='mb-3 text-3xl font-medium text-black'>Рады снова видеть вас!</div>
          <span className='text-md font-medium leading-3 text-gray-400'>Ещё нет аккаунта?</span>
          <Link className='text-md ml-2 cursor-pointer font-medium text-blue-500 no-underline' to='/signup'>
            Зарегистрируйся!
          </Link>
        </div>

        <form onSubmit={onSubmit}>
          <label className='text-md mb-2 mt-3 block font-medium text-gray-600' htmlFor='email'>
            Электронный адрес
          </label>
          <InputText
            className='w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
            id='email'
            placeholder='Электронный адрес'
            type='text'
          />

          <label className='mb-2 mt-3 block font-medium text-gray-600' htmlFor='password'>
            Пароль
          </label>
          <InputText
            className='w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
            id='password'
            placeholder='Пароль'
            type='password'
          />

          <div className='mb-6 mt-3 flex items-center justify-between'>
            <div className='flex items-center text-gray-600'>
              <Checkbox checked={checked} className='mr-2' id='rememberme' onChange={(e) => setChecked(e.checked)} />
              <label htmlFor='rememberme'>Запомнить меня</label>
            </div>
            <a className='ml-2 cursor-pointer text-right font-medium text-blue-500 no-underline'>Забыл пароль?</a>
          </div>
          {error ? <span>Что-то пошло не так...</span> : null}
          <Button
            className='w-full px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            icon='pi pi-user'
            label='Войти'
            loading={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default Signin;
