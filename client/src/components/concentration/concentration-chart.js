import React from "react";
import {useState, useEffect} from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import io from 'socket.io-client'

const ENDPOINT = 'http://127.0.0.1:5000'
// const socket = io('http://127.0.0.1:5000')

// socket.on('connect', () =>
//   console.log('connected to socket.io')
// )

// socket.on('data', (data) => {
//   console.log(data)
// })

export function ConcentrationChart(props) {
  const [time, setTime] = useState([])
  const [benzene, setBenzene] = useState([])
  const [acetone, setAcetone] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    const socket = io(ENDPOINT)
    socket.on('data', (data) => {
      setData((allData) => [...allData, data])
      setTime((time) => [...time, data.time])
      setBenzene((benzene) => [...benzene, data.Benzene])
      setAcetone((acetone) => [...acetone,data.Acetone])
    })
  }, [])


  return <div>

    <LineChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Acetone" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Benzene" stroke="#82ca9d" />
      </LineChart>

  </div>

}
