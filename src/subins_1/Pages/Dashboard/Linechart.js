import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {
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
                const dataPoints = data.map(item => ({
                    label: parseInt(item.Year),
                    y: parseInt(item.Total_cases)
                }));
                this.setState({ dataPoints });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }

    render() {
        const { dataPoints } = this.state;

        const options = {
            theme: "light2",
            axisX: {
                title: "Year",
            },
            axisY: {
                title: "Number of Cases Filed"
            },
            height: 150,
            width: 1200,
            data: [{
                type: "line",
                dataPoints: dataPoints
            }],
        };

        return (
            <div>
                <center><h2>Crime Rate across the Years</h2></center>
                <CanvasJSChart options={dataPoints.length ? options : {}}/>
            </div>
        );
    }
}

export default App;
