import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import solidcyan from './img/solidcyan.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import { useGlobalContext } from './context/globalContext';

const AppLayout = ({ active, setActive }) => {
  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Navigation active={active} setActive={setActive} />
      <main>
        {displayData()}
      </main>
    </>
  );
};

function App() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();
  console.log(global);

  const orbMemo = useMemo(() => <Orb />, []);

  return (
    <Router>
      <AppStyled bg={solidcyan} className="App">
        {orbMemo}
        <MainLayout>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={global.isAuthenticated ? <AppLayout active={active} setActive={setActive} /> : <Navigate to="/register" />} />
            <Route path="*" element={<Navigate to="/register" />} />
          </Routes>
        </MainLayout>
      </AppStyled>
    </Router>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
