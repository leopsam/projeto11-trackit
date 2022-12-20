import styled from "styled-components"
import logoSecundario from "../assets/TrackIt.png"
import { useContext } from "react";
import { UsuarioContext } from "../contexts/UsuarioContext";

export default function Cabecalho(){
    const { userImage, userName } = useContext(UsuarioContext)

    return(
        <TopHead data-test="header">
            <p>TrackIt</p>
            <img src={userImage} alt="Logo TrackIt"/>
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
    p{
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
        color: #FFFFFF;
        margin: 0 15px;
    }
    img{
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
        margin: 0 15px;
    }
`