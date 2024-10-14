import { useContext, useEffect, useRef, useState } from "react";
import "./QueueSizeChart.scss"
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Line } from "react-chartjs-2";
import { StarOutlined } from "@ant-design/icons";


Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

type StateType = {
    labels: string[],
    datasets:[
        {
            label: string;
            data: number[];         // Array of numeric values for the chart
            borderColor: string;  // Array of colors for each segment of the line
            fill: boolean;
            tension: number;
            backgroundColor: string;
        }
    ]
}
export default function QueueSizeChart(){
    const maxPoints = 20; // Maximum number of points to display
    const chartRef = useRef(null);
    const [data, setData] = useState<StateType>({
        labels: [''],
        datasets: [
            {
                label: 'Values',
                data: [50], // Initial random value
                backgroundColor: 'rgba(0, 0, 255, 0.2)', // Optional fill color
                fill: false,
                tension: 0.4, // Adds smooth curves between points
                borderColor: 'blue', // Default color (won't be used in segmented rendering)
            },
        ],
    });
    const [previousValue, setPreviousValue] = useState(data.datasets[0].data[0]);
    
    
    const updateData: (prevData: StateType, newValue: number) => StateType = (prevData: StateType, newValue: number) => {
        const newLabels = [...prevData.labels, ``];

        const lineColor = newValue == previousValue ? 'blue' : ( newValue > previousValue ? 'green' : 'red');
        console.log(previousValue);
        console.log(newValue);
        console.log(lineColor)
        const newData = [...prevData.datasets[0].data, newValue].map((value, index, array) => {
            if (index === array.length - 1) {
              // The newest value remains unchanged
              return value;
            }
            // Decay older values towards 50
            const decayFactor = 0.1; // Change this to control the speed of decay
            return value + (newValue - value) * decayFactor;
        });

        // If the number of points exceeds maxPoints, shift data and labels to simulate scrolling
        if (newData.length > maxPoints) {
            newData.shift();
            newLabels.shift();
        }

        
        setPreviousValue(newValue);
        
        return {
            labels: newLabels,  // Updated labels
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: newData,  // Updated data
                    borderColor: lineColor,
                },
            ],
        };
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            // teacherApi.getGrade(props.entityId, props.gradeCategory)
                //     .then((res) => {
                //         if (res) {
                //             setData((prevData) => updateData(prevData, res));
                //         }
                //     });
        }, 1_500); // Update every 3 seconds

        return () => clearInterval(interval);
    }, [previousValue]);

    const getMaxY = () => Math.max(...data.datasets[0].data) + 10;
    const getMinY = () => Math.min(...data.datasets[0].data) - 10;

    return (
        <div className="chart-holder">
            <h2>
                Queue size:
                <text className="rating">
                    {data.datasets[0].data[data.datasets[0].data.length - 1]}
                </text>
            </h2>
            <Line
                data={data}
                options={{
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            min: getMinY(),     // Set min Y to min(data) - 10
                            max: getMaxY(), 
                        },
                    },
                    animation: {
                        duration: 1200, // 1-second animation for smooth transitions
                        easing: 'easeOutQuad', // Smooth easing function for the animation
                    },
                    plugins: {
                        legend: {
                            display: false,  // Hide legend if not needed
                        },
                    },
                    elements: {
                        point: {
                            radius: 2,
                            borderWidth: 2
                        }
                    }
                }}
                ref={chartRef}
            />
        </div>
    );
}
