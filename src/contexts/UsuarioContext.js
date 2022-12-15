import { createContext, useState } from 'react'

export const UsuarioContext = createContext({})

export function UserProvider( {children} ) {
  const [userName, setUserName] = useState("Andre")
  const [token, setToken] = useState(undefined)
  const [userImage, setUserImage] = useState("")

  return (
    <UsuarioContext.Provider value={{
        token,
        setToken,
        userName,
        setUserName,
        userImage,
        setUserImage
    }}>
      {children}
    </UsuarioContext.Provider>
  )
}