import axios from "axios"
import logoPrincipal from "../assets/logo.png"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Cadastro(){
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function cadastrarUser(e){
        e.preventDefault()
        const body = { email, name, image, password }
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"

        const promise = axios.post(url, body)
        promise.then(res => {
            alert("Cadastro realizado!")
            console.log(res.config.data)
            navigate(`/`)
          })
        promise.catch(err => {
            alert(err.response.data.message)
            console.log(err.response.data.message)
        })

        setName("")
        setEmail("")
        setImage("")
        setPassword("")        
      }

    return(
        <Container>
            <img src={logoPrincipal} />

            <Formulario onSubmit={cadastrarUser}>
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
                <Input
                    id="name"
                    type="text"
                    placeholder="nome"
                    value={name}
                    onChange={e => setName(e.target.value)} 
                    required
                />
                <Input
                    id="image"
                    type="url"
                    placeholder="foto"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    required
                />
                <Button type="submit">Cadastrar</Button>
            </Formulario>

            <LinkLogin>
                <Link to={`/`}>
                    <p>Já tem uma conta? Faça login!</p>
                </Link>                
            </LinkLogin>
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
const LinkLogin = styled.div`
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