import logoPrincipal from "../assets/logo.png"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Login({ setToken }){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function loginUser(e) {
        e.preventDefault()        
        const body = { email, password }
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"
    
        const promise = axios.post(url, body)
        promise.then((res) => {
            setToken(res.data.token)        
            navigate("/hoje")
        })

        promise.catch(err => {            
            alert(err.response.data.message)
        })
      }

    return(
        <Container>
            <img src={logoPrincipal} />

            <Formulario onSubmit={loginUser}>
                <Input
                    id="email"
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                    required
                />
                <Input
                    id="password"
                    type="password"
                    placeholder="senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}  
                    required
                />
                <Button type="submit">Entrar</Button>
            </Formulario>

            <LinkCadastro>
                <Link to={`/cadastro`}>
                    <p>Não tem uma conta? Cadastre-se!</p>
                </Link>                
            </LinkCadastro>
        </Container>
    )
}

const Container = styled.div`
   display: flex;   
   flex-direction: column;
   justify-content: center;
   align-items: center;
   margin: 60px 0;
   img{
        width: 180px;
        height: 178px;
   }
`
const Formulario = styled.form`
   display: flex;   
   flex-direction: column;
   justify-content: center;
   align-items: center;
   margin: 30px 0;
`
const Input = styled.input`
    box-sizing: border-box;
    width: 303px;
    height: 45px;
    background-color: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin: 5px 0;
    ::placeholder{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;   
        padding-left: 10px;     
    }
`
const Button = styled.button`
    width: 303px;
    height: 45px;
    background-color: #52B6FF;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    color: #FFFFFF;
    border: none;
`
const LinkCadastro = styled.div`
   p{    
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
   }
`