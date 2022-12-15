import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { UsuarioContext } from "../contexts/UsuarioContext"
import Cabecalho from "../components/Cabecalho"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import vetor from "../assets/Vector.png"
import Menu from "../components/Menu"


export default function Hoje(){
    const data = dayjs().locale('pt-br').format('dddd, DD/MM')
    const dataFinal = data.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());

    const [hoje, setHoje] = useState([])
    const { userName, token } = useContext(UsuarioContext)  
    
    useEffect(() => {
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"    
        const config = { headers: { Authorization: `Bearer ${token}` }
        }    
        const promise = axios.get(url, config)    
        promise.then((res) => setHoje(res.data))
        promise.catch((err) => console.log(err.response.data))
    }, [])

    return(
        <Corpo>
            <Cabecalho />
            <Container>
                <DataHoje>
                    <h1>{dataFinal}</h1>
                    <h3>Nenhum hábito concluído ainda</h3>
                </DataHoje>
                <ContainerHabitosHoje>
                    <HabitosHoje>
                        <ContainerHabitoEsquerda>
                            <h1>Ler 1 capítulo de livro</h1>
                            <div>
                                <p>Sequência atual: 3 dias</p>
                                <p>Seu recorde: 5 dias</p>
                            </div>
                        </ContainerHabitoEsquerda>
                        <ContainerImage>
                            <img src={vetor}/> 
                        </ContainerImage>                        
                    </HabitosHoje>
                    <HabitosHoje>
                        <ContainerHabitoEsquerda>
                            <h1>Ler 1 capítulo de livro</h1>
                            <div>
                                <p>Sequência atual: 3 dias</p>
                                <p>Seu recorde: 5 dias</p>
                            </div>                            
                        </ContainerHabitoEsquerda>
                        <ContainerImage>
                            <img src={vetor}/> 
                        </ContainerImage>                                               
                    </HabitosHoje>

                </ContainerHabitosHoje>
                
                

            </Container>
            <Menu />
        </Corpo>
        
    )
}

const Corpo = styled.div`
    background-color: #E5E5E5;
    height: 90vh;
    margin-top: 70px;
    padding-top: 1px;
`
const Container = styled.div`
    margin: 25px 15px;
`
const DataHoje = styled.div`    
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
        color: #BABABA;
    }
  
`
const ContainerHabitosHoje = styled.div` 
    margin: 25px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const HabitosHoje = styled.div` 
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
    width: 340px;
    height: 94px;
    background-color: #ffffff;
    border-radius: 5px; 
    h1{
        margin: 10px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }
`
const ContainerImage = styled.div`
    width: 69px;
    height: 69px;
    background: #EBEBEB;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ContainerHabitoEsquerda = styled.div` 
    div{
         margin: 0 10px 10px;
    }    
     p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;
        color: #666666;
    } 
`