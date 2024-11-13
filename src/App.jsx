import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { MainPage } from "./pages/MainPage/MainPage";
import { FormPage } from "./pages/FormPage/FormPage";
import { PayPage } from "./pages/PayPage/PayPage";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/paying" element={<PayPage />} />
      </Routes>
    </>
  );
}

export default App;
