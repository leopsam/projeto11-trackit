import { createContext, useState } from 'react'

export const UsuarioContext = createContext({})

export function UserProvider( {children} ) {
  const [userName, setUserName] = useState("Andre")
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [userImage, setUserImage] = useState("")
  const [porcentagem, setPorcentagem] = useState(0)
  const [hoje, setHoje] = useState([])
  const [count, setCount] = useState(2) 
  const inputDesbotado = "#F2F2F2"
  const inputAtivo = "#FFFFFF"

  return (
    <UsuarioContext.Provider value={{
        token,
        setToken,
        userName,
        setUserName,
        userImage,
        setUserImage,
        inputDesbotado,
        inputAtivo,
        porcentagem,
        setPorcentagem,
        hoje,
        setHoje,
        count,
        setCount
    }}>
      {children}
    </UsuarioContext.Provider>
  )
}