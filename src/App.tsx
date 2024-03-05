import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import TicketTable from './pages/Table/Table';
import Profile from './pages/Profile';
import SignUp from './pages/Authentication/SignUp';
import Realizados from './pages/Atendimentos/Table';


function App() {
  const { pathname } = useLocation();
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Recuperar o e-mail do usuário do localStorage após o login bem-sucedido
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

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
        path="/atendimentos/Table"
        element={
          <>
          <PageTitle title="Suporte | Four" />
          <Realizados/>
          </> 
        }
      />
      
      <Route
        path="/Table/Table"
        element={
          <>
            <PageTitle title="Suporte | Four" />
            {/* Passar o e-mail do usuário para o componente TicketTable */}
            <TicketTable loggedInEmail={userEmail} />
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

export default App;
