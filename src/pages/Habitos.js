import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Habitos({ token }){
  const [name, setName] = useState("Testando primeiro habito")
  const [days, setDays] = useState([1, 3, 5])
  const [habitos, setHabitos] = useState([])
  console.log(token)

      function criarHabito(e){
        e.preventDefault()
        const body = { name, days }
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        } 

        const promise = axios.post(url, config, body)

        promise.then(res => {
            setHabitos(res.data)
            console.log(res.data)
          })
        
          promise.catch((err) => console.log(err.response.data))
             
      }





    return(
        <>
        {habitos.map(f => (
        <p>{f.name}{f.days}</p>
      ))}
        </>
)
}