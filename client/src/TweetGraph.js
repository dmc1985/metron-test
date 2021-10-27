import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import React from 'react';
import styled from 'styled-components';

const FilterOneLegend = styled.div`
  height: 20px;
  width: 40px;
  background-color: #8884d8;
  margin-bottom: 10px;
`;

const FilterTwoLegend = styled.div`
  height: 20px;
  width: 40px;
  background-color: #82ca9d;
`;

function TweetGraph({ data, filterOne, filterTwo }) {
  return (
    <div>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="filterOne" stroke="#8884d8" />
        <Line type="monotone" dataKey="filterTwo" stroke="#82ca9d" />
      </LineChart>
      <div>
        <FilterOneLegend> {filterOne}</FilterOneLegend>
        <FilterTwoLegend> {filterTwo}</FilterTwoLegend>
      </div>
    </div>
  );
}

export default TweetGraph;
