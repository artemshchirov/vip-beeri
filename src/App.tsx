import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Spinner from './components/ui/Spinner';
import { events } from './utils/constants';

const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));
const Calendar = lazy(() => import('./pages/Calendar'));

const App: React.FC = () => {
  // const {currentUser} = useContext(AuthContext)
  // console.log("App, currentUser", currentUser);

  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to="/login" />;
  //   }

  //   return children;
  // };

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<Signup />} path='/signup' />
        <Route element={<Signin />} path='/signin' />
        <Route element={<Calendar events={events} />} path='/calendar' />
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
