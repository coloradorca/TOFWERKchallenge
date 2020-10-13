import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import io from 'socket.io-client';
import moment from 'moment';

const ENDPOINT = 'http://127.0.0.1:5000';

export function ConcentrationChart(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on('data', (data) => {
      setData((allData) => [...allData, data]);
    });
  }, []);

  return (
    <div>
      <LineChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='time'
          tickFormatter={(timeStr) => moment(timeStr).format('HH:mm:ss')}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='Acetone'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
        <Line type='monotone' dataKey='Benzene' stroke='#82ca9d' />
      </LineChart>
    </div>
  );
}
