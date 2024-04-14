import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';


var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class FIRPieChart extends Component {
    render() {
        const options = {
            animationEnabled: true, 
            exportEnabled: true,
            theme: "light2", 
            title: {
                text: "Types of FIR Cases"
            },
            data: [{
                type: "pie",
                indexLabel: "{label}: {y}%", 
                startAngle: -90,
                dataPoints: [
                    { y: 86, label: "Heinous" },
                    { y: 14, label: "Non Heinous" },
                ]
            }]
        };

        return (
        <div>
            <h1></h1>
            <CanvasJSChart options={options} />
        </div>
        );
    }
}

export default FIRPieChart;