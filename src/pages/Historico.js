import styled from "styled-components"
import { useContext } from "react"
import { UsuarioContext } from "../contexts/UsuarioContext"
import Cabecalho from "../components/Cabecalho"
import Menu from "../components/Menu"


export default function Hoje(){    
    const { userName, token } = useContext(UsuarioContext)

    return(
        <Corpo>
            <Cabecalho />
            <Container>
                <TituloHistorico>
                    <h1>Histórico</h1>
                    <h3>Em breve você poderá ver o histórico dos seus hábitos aqui!</h3>
                </TituloHistorico>
            </Container>
            <Menu />
        </Corpo>
        
    )
}

const Corpo = styled.div`
    background-color: #E5E5E5;
    height: 100%;
    padding: 70px 0;
`
const Container = styled.div`
    margin: 25px 15px;
`
const TituloHistorico = styled.div`    
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5; 
    }
        
    h3{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
        margin: 20px 0;
    }
  
`