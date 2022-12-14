import styled from "styled-components"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { UsuarioContext } from "../contexts/UsuarioContext"
import Cabecalho from "../components/Cabecalho"
import Menu from "../components/Menu"
import { ThreeDots } from  'react-loader-spinner'
import lixoImage from "../assets/lixo.png"

export default function Habitos(){
  const { token, setUserImage, inputDesbotado, inputAtivo } = useContext(UsuarioContext)  
  const [habitos, setHabitos] = useState([])
  const [days, setDays] = useState([])
  const [cadastarHabito, setCadastarHabito] = useState(false)
  const [name, setName] = useState()
  const [desabilitado, setDesabilitado] = useState("")
  const [textoBotao, setTextoBotao] = useState("Salvar")
  const [count, setCount] = useState(0)
  const diasDaSemana = ["D","S","T","Q","Q","S","S"]
  const NumDaSemana = [0,1,2,3,4,5,6]
  const brancoBotao = "#ffffff"
  const cinzaBotao = "#CFCFCF"
  const botaoLoading = <ThreeDots 
        height="50" 
        width="50" 
        radius="9"
        color="#ffffff" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
     />    
  
  useEffect(()=>{ 
      const email = localStorage.getItem("email")
      const password = localStorage.getItem("senha")
      
      const body = { email, password }
      const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"

      const promise = axios.post(url, body)
      promise.then(res => {
          localStorage.setItem("token", res.data.token)
          setUserImage(res.data.image) 
           
      })
      promise.catch(err => {            
          alert(err.response.data.message)           
      })  
  }, []) 
     
  useEffect(() => {
    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"    
    const config = { headers: { Authorization: `Bearer ${token}` }} 

    const promise = axios.get(url, config)    
    promise.then((res) => setHabitos(res.data))
    promise.catch((err) => console.log(err.response.data))
  }, [count]) 

  function cadastrarHabito(e){
    e.preventDefault()
    setTextoBotao(botaoLoading) 
    setDesabilitado("disabled")      
    const body = { name, days }
    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
    const config = { headers: { Authorization: `Bearer ${token}` } }  

    const promise = axios.post(url, body, config)
    promise.then(res => { 
        setCadastarHabito(false)
        setTextoBotao("Salvar") 
        setDesabilitado("")       
      })

    promise.catch(err => {
        setTextoBotao("Salvar") 
        setDesabilitado("")
        alert(err.response.data.message)         
    })

    setName("")  
    setDays([]) 
    setCount(count+1)     
  }
  
  function escolhaDia(dia){
    if(!days.includes(dia)){
      let novoArray = [...days, dia]
      setDays(novoArray)
    }else{
      let novoArray = [...days]
      novoArray.splice(novoArray.indexOf(dia), 1);
      setDays(novoArray)
    }    
  }

  function deletarHabito(Habito){    
    if(window.confirm(`Deseja deletar o Habito "${Habito.name}"?`)){
      const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${Habito.id}`
      const config = { headers: { Authorization: `Bearer ${token}` } }  

      const promise = axios.delete(url, config)
      promise.then(res => { 
          console.log("Deletado")               
        })
      promise.catch(err => {
          alert(err.response.data.message)         
        })
      setCount(count+1) 
    }
  }

  return(
    <Corpo>
      <Cabecalho />
        <TopHabitos>
          <h1>Meus h??bitos</h1>
          <button data-test="habit-create-btn" onClick={() => setCadastarHabito(true)}>+</button>
        </TopHabitos>
        <ContainerHabitos>        
            {cadastarHabito && (            
              <CadastroHabito data-test="habit-create-container">
                <Formulario onSubmit={cadastrarHabito}>
                  <Input
                      data-test="habit-name-input"
                      id="name"
                      type="name"
                      placeholder="nome do h??bito"
                      value={name}
                      onChange={e => setName(e.target.value)} 
                      disabled={desabilitado}
                      corFundo={desabilitado ? inputDesbotado : inputAtivo }
                      required
                  />
                    <ContainerBotoesSemana>
                      {NumDaSemana.map((nd) => (
                        <InputButton
                          data-test="habit-day"
                          key={nd} 
                          type="button" 
                          onClick={() => escolhaDia(nd)} 
                          disabled={desabilitado}
                          corFundoBotao={!days.includes(nd) ? brancoBotao : cinzaBotao}
                          corTexto={days.includes(nd) ? brancoBotao : "#DBDBDB"}
                        >{diasDaSemana[nd]}</InputButton>
                      ))} 
                    </ContainerBotoesSemana>
                    <ContainerBotoesEdicao>
                      <ButtonCanselar data-test="habit-create-cancel-btn" onClick={() => setCadastarHabito(false)}>Cancelar</ButtonCanselar> 
                      <Button data-test="habit-create-save-btn" type="submit">{textoBotao}</Button>                 
                    </ContainerBotoesEdicao>                                
                </Formulario>
              </CadastroHabito>
             )}
          
            {habitos.length > 0 ? 
              <ListaHabito>
                {habitos.map((h) => (
                    <HabitoUnid data-test="habit-container" key={h.id}>
                      <TituloHabitoUnid>
                        <h1 data-test="habit-name">{h.name}</h1>
                        <img data-test="habit-delete-btn" onClick={() => deletarHabito(h)} src={lixoImage} alt="Deletar H??bito"/>
                      </TituloHabitoUnid>                      
                      <ContainerBotoesSemana>
                            {NumDaSemana.map((d) => (
                              <InputButton
                                data-test="habit-day" 
                                key={d} 
                                type="button"                    
                                disabled={desabilitado}
                                corFundoBotao={!h.days.includes(d) ? brancoBotao : cinzaBotao}
                                corTexto={h.days.includes(d) ? brancoBotao : "#DBDBDB"}
                              >{diasDaSemana[d]}</InputButton>
                            ))} 
                      </ContainerBotoesSemana>
                    </HabitoUnid>
                ))} 
              </ListaHabito>
              :
              <p>Voc?? n??o tem nenhum h??bito cadastrado ainda. Adicione um h??bito para come??ar a trackear!</p>}
        </ContainerHabitos>
      <Menu />
    </Corpo>
  )
}

const Corpo = styled.div`
  background-color: #E5E5E5;
  height: 100%;
  padding: 70px 15px;
`
const TopHabitos = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
    h1{
      font-family: 'Lexend Deca';
      font-style: normal;
      font-weight: 400;
      font-size: 22.976px;
      line-height: 29px;
      color: #126BA5;
    }
    button{
      width: 40px;
      height: 35px;
      background-color: #52B6FF;
      border-radius: 4.63636px;      
      font-style: normal;
      font-weight: 400;
      font-size: 27px;
      color: #FFFFFF;
      border: none;
      cursor: pointer;
    }
`
const ContainerHabitos = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  p{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
  }
`
const CadastroHabito = styled.div`
  width: 340px;
  height: 180px;  
  background-color: #FFFFFF;
  border-radius: 5px;
  margin-bottom: 30px; 
  padding: 15px;
`
const Formulario = styled.form`
   display: flex;   
   flex-direction: column;
   justify-content: center;
   
`
const Input = styled.input`
    box-sizing: border-box;
    width: 303px;
    height: 45px;
    background-color: ${props => props.corFundo};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin: 5px;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
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
const InputButton = styled.button`
    box-sizing: border-box;
    width: 30px;
    height: 30px;    
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin: 0 2px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: ${props => props.corTexto};
    background-color: ${props => props.corFundoBotao};
`
const Button = styled.button`
  width: 84px;
  height: 35px;
  background: #52B6FF;
  border-radius: 4.63636px;
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 15.976px;
  line-height: 20px;
  color: #FFFFFF;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
const ContainerBotoesSemana = styled.div`
   margin: 5px;
`
const ButtonCanselar = styled.button`
  font-family: 'Lexend Deca';
  font-style: normal;
  font-weight: 400;
  font-size: 15.976px;
  line-height: 20px;
  width: 69px;
  height: 20px;
  color: #52B6FF;
  background-color: #FFFFFF;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
  cursor: pointer;
`
const ContainerBotoesEdicao = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 20px 0 10px;
`
const ListaHabito = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
`
const HabitoUnid = styled.div`
  width: 340px;
  height: 91px;
  background-color: #FFFFFF;
  border-radius: 5px;
  padding: 0 10px;
  margin-bottom: 10px;
  h1{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
    margin: 10px 6px;
  }
`
const TituloHabitoUnid = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
img{
  cursor: pointer;
}
`