import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import TicketTable from './pages/Table/Table';
import Profile from './pages/Profile';
import SignUp from './pages/Authentication/SignUp';


function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route
        index
        element={
          <>
            <PageTitle title="Suporte | Four" />
            <SignIn />
          </>
        }
      />
      
      <Route
        path="/Table/Table"
        element={
          <TicketTableWithLoader />
        }
      />
      
      <Route
        path="/profile"
        element={
          <>
            <Profile />
          </>
        }
      />
      <Route
        path="/profile"
        element={
          <>

            <Profile />
          </>
        }
      />

      <Route
        path="/login"
        element={
          <>
            <PageTitle title="Suporte | Four" />
            <SignIn />
          </>
        }
      />

      <Route
        path="/auth/signup"
        element={
          <>
            <PageTitle title="Suporte | Four" />
            <SignUp />
          </>
        }
      />
    </Routes>
  );
}

function TicketTableWithLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? <Loader /> : <TicketTable />;
}

export default App;
