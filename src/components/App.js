import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cadastro from "../pages/Cadastro";
import Hoje from "../pages/Hoje";
import Login from "../pages/Login";
import { useState } from "react"
import Habitos from "../pages/Habitos";

export default function App() {
  const [token, setToken] = useState("")

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login setToken={setToken}/>} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/hoje" element={<Hoje token={token}/>} />
      <Route path="/habitos" element={<Habitos token={token}/>} />
    </Routes>
  </BrowserRouter>
  );
}