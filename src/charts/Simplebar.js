import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints =[];

class App extends Component {
    render() {
        const options = {
            theme: "light2",
            title: {
                text: "Crime Review",
            },
            axisX: {
                title: "Year",
                valueFormatString: "####",
            },
            axisY: {
                title: "Number Cases Filed"
            },
            data: [{
                type: "line",
                dataPoints: dataPoints
            }],
        };

        return (
            <div>
                <CanvasJSChart options={options} 
                    onRef={ref => this.chart = ref}
                />
            </div>
        );
    }
    
    componentDidMount() {
        var chart = this.chart;
        fetch('http://localhost/Demo.php')
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                dataPoints.push({
                    x: parseInt(data[i].Year),
                    y: parseInt(data[i].Arrest)
                });
            }
            if (chart) {
                chart.render();
            } else {
                console.error("Chart reference is null after data fetch.");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }
}

export default App;
