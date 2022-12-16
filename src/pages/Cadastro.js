import axios from "axios"
import logoPrincipal from "../assets/logo.png"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { ThreeDots } from 'react-loader-spinner'

export default function Cadastro(){
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [password, setPassword] = useState("")
    const [desabilitado, setDesabilitado] = useState("")
    const [textoBotao, setTextoBotao] = useState("Cadastrar")
    const navigate = useNavigate()

    const inputDesbotado = "#F2F2F2"
    const inputAtivo = "#FFFFFF"
    const botaoLoading = <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#ffffff" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}    
        />    

    function cadastrarUser(e){
        e.preventDefault()
         setTextoBotao(botaoLoading) 
        setDesabilitado("disabled")      
        const body = { email, name, image, password }
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"
        

        const promise = axios.post(url, body)
        promise.then(res => {
            alert("Cadastro realizado!")
            console.log(res.config.data)
            navigate(`/`)
          })
        promise.catch(err => {
            setTextoBotao("Cadastrar") 
            setDesabilitado("")   
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
                    disabled={desabilitado}
                    corFundo={desabilitado ? inputDesbotado : inputAtivo }
                    required
                />
                <Input
                    id="password"
                    type="password"
                    placeholder="senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)} 
                    disabled={desabilitado}
                    corFundo={desabilitado ? inputDesbotado : inputAtivo } 
                    required
                />
                <Input
                    id="name"
                    type="text"
                    placeholder="nome"
                    value={name}
                    onChange={e => setName(e.target.value)} 
                    disabled={desabilitado}
                    corFundo={desabilitado ? inputDesbotado : inputAtivo }
                    required
                />
                <Input
                    id="image"
                    type="url"
                    placeholder="foto"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    disabled={desabilitado}
                    corFundo={desabilitado ? inputDesbotado : inputAtivo }
                    required
                />
                <Button type="submit">{textoBotao}</Button>
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
   padding: 60px 0;
   background-color: #ffffff;
   height: 100vh;
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
    background-color: ${props => props.corFundo};
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
    display: flex;
    align-items: center;
    justify-content: center;
`
const LinkLogin = styled.div`
    margin-bottom: 30px;
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