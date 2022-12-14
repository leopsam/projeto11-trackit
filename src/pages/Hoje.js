import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Hoje({ token }){
    const [hoje, setHoje] = useState([1])
    console.log(token)

    useEffect(() => {
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"    
        const config = { headers: { Authorization: `Bearer ${token}` }
        }    
        const promise = axios.get(url, config)
    
        promise.then((res) => {
            setHoje(res.data)
            console.log(res)
        })
        promise.catch((err) => console.log(err.response.data))
      }, [])




    return(
        <Container>
                        
            habitos de hoje
            <br/>
            <br/>
            <br/>
            <br/>
            {hoje}
        </Container>
    )
}

const Container = styled.div`
   display: flex;   
   flex-direction: column;
   justify-content: center;
   align-items: center;
   margin: 60px 0;
   img{
        width: 180px;
        height: 178px;
   }
`