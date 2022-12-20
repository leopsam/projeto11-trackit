import logoPrincipal from "../assets/logo.png"
import styled from "styled-components"
import { useState, useContext } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { UsuarioContext } from "../contexts/UsuarioContext"
import { ThreeDots } from  'react-loader-spinner'

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [desabilitado, setDesabilitado] = useState("")
    const [textoBotao, setTextoBotao] = useState("Entrar")
    const { setToken, setUserImage, inputAtivo, inputDesbotado } = useContext(UsuarioContext)    
    const navigate = useNavigate()
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

     localStorage.removeItem("email");
     localStorage.removeItem("senha");
     localStorage.removeItem("token");

    function loginUser(e) {
        e.preventDefault() 
        setTextoBotao(botaoLoading) 
        setDesabilitado("disabled")      
        const body = { email, password }
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"
    
        const promise = axios.post(url, body)
        promise.then((res) => { 
            setToken(res.data.token)
            setUserImage(res.data.image)
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("senha", res.data.password);
            localStorage.setItem("token", res.data.token);
            navigate("/hoje") 
        })

        promise.catch(err => { 
            setTextoBotao("Entrar") 
            setDesabilitado("")            
            alert(err.response.data.message)           
        })
      }

    return(
        <Container>
            <img src={logoPrincipal} alt="Logo Trancklt"/>
            <Formulario onSubmit={loginUser}>
                <Input
                    data-test="email-input"
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
                    data-test="password-input"
                    id="password"
                    type="password"
                    placeholder="senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={desabilitado}
                    corFundo={desabilitado ? inputDesbotado : inputAtivo } 
                    required
                />
                <Button data-test="login-btn" disabled={desabilitado} type="submit">{textoBotao}</Button>
                
            </Formulario>

            <LinkCadastro>
                <Link data-test="signup-link" to={`/cadastro`}>
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
const LinkCadastro = styled.div`
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