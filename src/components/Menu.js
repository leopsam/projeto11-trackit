import styled from "styled-components"
import { useContext } from "react";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { Link } from "react-router-dom"
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";


export default function Menu(){
    const { userImage, userName, porcentagem } = useContext(UsuarioContext)

    return(
        <FooterMenu> 
            <Link to={`/habitos`}>
                <Logo>Hábitos</Logo>
            </Link>
            <Link to={`/hoje`}>
                <Progresso label="Background">
                    <CircularProgressbar
                        value={porcentagem}
                        text={`Hoje`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                        backgroundColor: "#3e98c7",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent"
                        })}
                        />
                </Progresso>
            </Link> 
            <Link to={`/historico`}>
                <Logo>Histórico</Logo>
            </Link>
        </FooterMenu>
    )
}

const FooterMenu = styled.div` 
    position: fixed;
    bottom: 0;
    left: 0;
    box-sizing: border-box;   
    width: 100%;
    height: 70px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-around;
    align-items: center;
    a{
        text-decoration: none;
    }

`
const Logo = styled.p` 
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;
    text-decoration: none;

    color: #52B6FF;
`
const Progresso = styled.div`
    width: 91px;
    height: 91px;
    margin-bottom: 35px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
`

    