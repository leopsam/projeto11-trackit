import styled from "styled-components"
import logoSecundario from "../assets/TrackIt.png"
import { useContext } from "react";
import { UsuarioContext } from "../contexts/UsuarioContext";

export default function Menu(){
    const { userImage, userName } = useContext(UsuarioContext)

    return(
        <FooterMenu>
            <Logo>Hábitos</Logo>
            <Perfil src={userImage} alt="Logo TrackIt"/>
            <Logo>Hábitos</Logo>
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

`
const Logo = styled.p` 
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;

    color: #52B6FF;
`
const Perfil = styled.img` 
    width: 51px;
    height: 51px;
    border-radius: 98.5px;
    margin: 0 15px;
`