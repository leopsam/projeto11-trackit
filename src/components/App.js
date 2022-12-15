import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cadastro from "../pages/Cadastro";
import Hoje from "../pages/Hoje";
import Login from "../pages/Login";
import Habitos from "../pages/Habitos";
import { UserProvider } from "../contexts/UsuarioContext";

export default function App() {
  return (
  <BrowserRouter>
    <UserProvider>
      <Routes>      
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/hoje" element={<Hoje />} />
        <Route path="/habitos" element={<Habitos />} />
      </Routes>
    </UserProvider> 
  </BrowserRouter>
  );
}