import { FC, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Spinner from "./components/ui/Spinner";
import Calendar from "./pages/Calendar";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import { events } from "./utils/constants";

const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App: FC = () => {
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/calendar" element={<Calendar events={events} />} />
        <Route path="/" element={<Home />} />
        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
