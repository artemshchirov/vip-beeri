import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Spinner from './components/ui/Spinner';
import { fetchRows } from './firebase';
import { TableRow } from './pages/Home/Home';

const Home = lazy(() => import('./pages/Home/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));
const Calendar = lazy(() => import('./pages/Calendar/Calendar'));

const App: React.FC = () => {
  // const {currentUser} = useContext(AuthContext)
  // console.log("App, currentUser", currentUser);

  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to="/login" />;
  //   }

  //   return children;
  // };

  const [workers, setWorkers] = useState<TableRow[]>([]);

  useEffect(() => {
    const fetchAndSetTableRows = async () => {
      try {
        const workersData = await fetchRows();
        setWorkers(workersData);
      } catch (error) {
        console.error('Error fetching rows:', error);
      }
    };
    fetchAndSetTableRows();
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<Signup />} path='/signup' />
        <Route element={<Signin />} path='/signin' />
        <Route element={<Calendar workers={workers} />} path='/calendar' />
        <Route element={<Home />} path='/' />
        <Route element={<NotFound />} path='*' />
        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </Suspense>
  );
};

export default App;
