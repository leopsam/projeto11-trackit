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
import { useNavigate } from "react-router-dom"


export default function Hoje(){
    const data = dayjs().locale('pt-br').format('dddd, DD/MM')
    const dataFinal = data.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
    const desmarcado = "#EBEBEB"
    const marcado = "#8FC549"
    const navigate = useNavigate()
    
    
    const { userName, token, setPorcentagem, porcentagem, hoje, setHoje } = useContext(UsuarioContext)
    //const [hoje, setHoje] = useState([])
    const [count, setCount] = useState(2) 
    const [calculo, setCalculo] = useState(0) 

    //.log("-----------------------------------")
    console.log("porcentagem " + porcentagem) 
    //console.log("Calculo " + calculo) 
    //console.log(count) 
    
    
        

    useEffect(() => {
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"    
        const config = { headers: { Authorization: `Bearer ${token}` } }    
        const promise = axios.get(url, config) 

        promise.then(res => {            
            setHoje(res.data)                      
            setCalculo(100/res.data.length)
        })        
        promise.catch((err) => console.log(err.response.data))
    }, [count])
     

    function marcaHabito(habito){
        
            const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/check`
            const body = {}
            const config = { headers: { Authorization: `Bearer ${token}` } }  
      
            const promise = axios.post(url, body, config)
            promise.then(res => { 
                (console.log("Marcado"))
                setCount(count+1)
                setPorcentagem(porcentagem + calculo)        
              })
            promise.catch(err => {
                alert(err.response.data.message)       
              })            
        }

        function desmarcaHabito(habito){       
            const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/uncheck`
            const body = {}
            const config = { headers: { Authorization: `Bearer ${token}` } }  
      
            const promise = axios.post(url, body, config)
            promise.then(res => { 
                console.log("Desmarcado")
                setCount(count+1)
                setPorcentagem(porcentagem - calculo)          
              })
            promise.catch(err => {
                alert(err.response.data.message)         
              })
        }    

    return(
    <Corpo>
        <Cabecalho />
        <Container>
            <DataHoje>
                <h1>{dataFinal}</h1>  
                {porcentagem > 0 ? <SubTitulo corTitulo={marcado}>{porcentagem.toFixed(0)}% dos hábitos concluídos</SubTitulo> : <SubTitulo corTitulo="#BABABA">Nenhum hábito concluído ainda</SubTitulo>}                  
                
            </DataHoje>
            <ContainerHabitosHoje> 
                 {hoje.map((hh) => (
                    <HabitosHoje key={hh.id}>
                    <ContainerHabitoEsquerda>
                        <h1>{hh.name}</h1>
                        <div>
                            <p>Sequência atual: <TextoVerde corTexto={hh.currentSequence>0 && marcado}>{hh.currentSequence} dias</TextoVerde></p>
                            <p>Seu recorde: <TextoVerde corTexto={hh.highestSequence>0 && marcado}>{hh.highestSequence} dias</TextoVerde></p>
                        </div>
                    </ContainerHabitoEsquerda>
                    <ContainerImage onClick={!hh.done ? () => marcaHabito(hh) : () => desmarcaHabito(hh)} corFundo={hh.done ? marcado : desmarcado}>
                        <img src={vetor} alt="ckeck"/> 
                    </ContainerImage>                        
                    </HabitosHoje>
                ))}   
              
            </ContainerHabitosHoje> 
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
const DataHoje = styled.div`    
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5; 
    }
  
`
const SubTitulo = styled.h3`
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: ${props => props.corTitulo};
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
    background: ${props => props.corFundo};
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
const TextoVerde = styled.span`
    color: ${props => props.corTexto};
`