import React from "react";
import {useEffect} from 'react'
import io from 'socket.io-client'

const socket = io('http://127.0.0.1:5000')

socket.on('connect', () =>
  console.log('connected to socket.io')
)

// socket.on('data', (data) => {
//   console.log(data)
// })


export function ConcentrationMap(props) {



  return <div />;
}
