import styled from "styled-components"
import logoSecundario from "../assets/TrackIt.png"
import { useContext } from "react";
import { UsuarioContext } from "../contexts/UsuarioContext";

export default function Cabecalho(){
    const { userImage, userName } = useContext(UsuarioContext)

    return(
        <TopHead>
            <Logo src={logoSecundario} alt={userName} />
            <Perfil src={userImage} alt="Logo TrackIt"/>
        </TopHead>
    )
}

const TopHead = styled.div` 
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;   
    width: 100%;
    height: 70px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;

`
const Logo = styled.img` 
    margin: 0 15px;
`
const Perfil = styled.img` 
    width: 51px;
    height: 51px;
    border-radius: 98.5px;
    margin: 0 15px;
`