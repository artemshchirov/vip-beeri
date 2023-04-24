import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';
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
    <div className='mb-auto flex flex-col min-h-screen justify-center items-center bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200'>
      <div className='w-full p-6 bg-white shadow-lg lg:w-5/12'>
        <div className='mb-5 text-center'>
          <img alt='hyper' className='mx-auto mb-3' src={logo} />
          <div className='mb-3 text-3xl font-medium text-black'>Рады снова видеть вас!</div>
          <span className='font-medium leading-3 text-gray-400 text-md'>Ещё нет аккаунта?</span>
          <Link className='ml-2 font-medium text-blue-500 no-underline cursor-pointer text-md' to='/signup'>
            Зарегистрируйся!
          </Link>
        </div>

        <form onSubmit={onSubmit}>
          <label className='block mt-3 mb-2 font-medium text-gray-600 text-md' htmlFor='email'>
            Электронный адрес
          </label>
          <InputText
            className='w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
            id='email'
            placeholder='Электронный адрес'
            type='text'
          />

          <label className='block mt-3 mb-2 font-medium text-gray-600' htmlFor='password'>
            Пароль
          </label>
          <InputText
            className='w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
            id='password'
            placeholder='Пароль'
            type='password'
          />

          <div className='flex items-center justify-between mt-3 mb-6'>
            <div className='flex items-center text-gray-600'>
              <Checkbox checked={checked} className='mr-2' id='rememberme' onChange={(e) => setChecked(e.checked)} />
              <label htmlFor='rememberme'>Запомнить меня</label>
            </div>
            <a className='ml-2 font-medium text-right text-blue-500 no-underline cursor-pointer'>Забыл пароль?</a>
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
