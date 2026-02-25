import React, { useState, useEffect } from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell, Legend } from 'recharts';


const EventGenresChart = ({ events }) => {
  const [ data, setData ] = useState([]);
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
  const colors = ['#a83535', '#7fc05c', '#4c4cbe', '#e2ad3a', '#963896'];

  const getData = () => {
    const data = genres.map( (genre) => {
      const filteredEvents = events.filter(event => event.summary.includes(genre));
      return { name: genre, value: filteredEvents.length };
    })
    return data;
  }

  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  // Math to calculate % labels for each slice of the pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
    return percent ? (
      <text
        x={x}
        y={y}
        fill={colors[index]}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={130}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend layout="horizontal" verticalAlign="top" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;