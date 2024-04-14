import React, { Component } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class TempChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPoints: []
    };
  }

  componentDidMount() {
    fetch('http://localhost/Demo.php')
      .then(response => response.json())
      .then(data => {
        this.setState({ dataPoints: data });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }

  render() {
    return (
      <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
          width={500}
          height={300}
          margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
          }}
          data={this.state.dataPoints}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Arrest" fill="#8884d8" />
            <Bar dataKey="total_cases_recorded" fill="#82ca9d" />
            <Bar dataKey="clearance_rate" fill="white" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default TempChart;