import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UsuarioContext } from "../contexts/UsuarioContext"

export default function LoginPersistente() {
    const navigate = useNavigate()
    const email = localStorage.getItem("email")
    const password = localStorage.getItem("senha")
    const { setToken, setUserImage, inputAtivo, inputDesbotado } = useContext(UsuarioContext) 

    const body = { email, password }
    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"

    const promise = axios.post(url, body)
    promise.then((res) => {
        setToken(res.data.token) 
        setUserImage(res.data.image)
        //localStorage.setItem("email", res.data.email);
        //localStorage.setItem("senha", res.data.password);
        navigate("/hoje")
    })

    promise.catch(err => {            
        alert(err.response.data.message)           
    })

    //return navigate("/hoje")
  }