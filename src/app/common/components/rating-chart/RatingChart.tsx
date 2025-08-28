import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from "chart.js";
import "./RatingChart.scss"
import { Bar } from "react-chartjs-2";
import { useContext, useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { RatingOptions } from "../../../../models/RatingOptions";
import { ApisContext } from "../../../layout/app/App";

// Register the required components with Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type dept_gl = { scope: RatingOptions.Department_Global};
type teach_gl = { scope: RatingOptions.Teacher_Global};
type teach_dept = { scope: RatingOptions.Teacher_Department, deptId: number};

type RatingChartProps = dept_gl | teach_dept | teach_gl;

type StateType = {
    labels: string[],
    datasets:[
        {
            label: string;
            data: number[];         // Array of numeric values for the chart
            borderColor?: string;  // Array of colors for each segment of the line
            fill?: boolean;
            tension?: number;
            backgroundColor?: ("#FFD700" | "#C0C0C0" | "#CD7F32" | "rgba(54, 162, 235, 0.6)")[];
            borderWidth?:number
        }
    ]
}

let intervalId: NodeJS.Timeout | null = null;

export default function RatingChart(props: RatingChartProps){
    const { departmentApi, teacherApi } = useContext(ApisContext);
    const [chartData, setChartData] = useState<StateType>();
    const [entities, setEntities] = useState<{ name: string, rating: number}[]>([]);
    
    const setEntitiesFromApi = () => {
        const invokeNextInterval = (intvlId: NodeJS.Timeout | null) => {
          if (intvlId)
            clearInterval(intvlId);
          
          intervalId = setInterval(() => {
            setEntitiesFromApi();
          }, 3_000);
        };
        
        if (props.scope === RatingOptions.Department_Global){
            departmentApi.getTop10()
                .then(res =>{
                    if(res) setEntities(res.map(ent => ({ name: ent.name, rating: ent.rating })));

                    invokeNextInterval(intervalId);
                });
            return;
        } 
        
        if (props.scope === RatingOptions.Teacher_Global){
            teacherApi.getTop10()
                .then(res =>{
                    if(res){
                        res = res.map(t => ({ 
                            ...t, 
                            firstName: `${t.firstName.length >= 10 ? `${t.firstName.substring(0, 7)}...`: t.firstName}`, 
                            lastName: `${t.lastName.toUpperCase().substring(0,1)}.`
                        }));
                        setEntities(res.map(ent => ({ name: `${ent.firstName} ${ent.lastName}`, rating: ent.rating })));

                        invokeNextInterval(intervalId);
                    } 
                      
                });
            return;
        }

        teacherApi.getTop10InDepartment(props.deptId)
                .then(res =>{
                    if(res){
                        res = res.map(t => ({ 
                            ...t, 
                            firstName: `${t.firstName.length >= 10 ? `${t.firstName.substring(0, 7)}...`: t.firstName}`, 
                            lastName: `${t.lastName.toUpperCase().substring(0,1)}.`
                        }));
                        setEntities(res.map(ent => ({ name: `${ent.firstName} ${ent.lastName}`, rating: ent.rating })));

                        invokeNextInterval(intervalId);
                    } 
                      
                });
    };

    // Update the teacher ratings every 5 seconds
    useEffect(() => {
      setEntitiesFromApi();
    }, []);

    // Update chartData based on the teachers' ratings
    useEffect(() => {
        if (entities) {
            const names = entities.map(ent => ent.name);
            const ratings = entities.map(ent => ent.rating);
      
            // Define bar colors: Gold for 1st, Silver for 2nd, Bronze for 3rd, and a default for others
            const backgroundColors = entities.map((_, index) => {
              if (index === 0) return '#FFD700';  // Gold
              if (index === 1) return '#C0C0C0';  // Silver
              if (index === 2) return '#CD7F32';  // Bronze
              return 'rgba(54, 162, 235, 0.6)';    // Default color (blue)
            });
      
            
            setChartData({
              labels: names,
              datasets: [
                {
                  label: 'Teacher Ratings',
                  data: ratings,
                  backgroundColor: backgroundColors,
                  borderWidth: 1,
                },
              ],
            });
        }
    }, [entities]);

    const options = {
      indexAxis: 'y', // This makes it horizontal
      responsive: true,
      
      plugins: {
        legend: {
          display: false, // Hide legend
        },
        tooltip: {
          enabled: true, // Show tooltips on hover
        },
      },
      scales: {
        x: {
          beginAtZero: true, // Start the rating from 0
        },
        y: {
          beginAtZero: false,
          ticks: {
            callback: function (_: any, index: number) {
              // Render teacher names directly on the bars, not on the side labels
              const entity = entities[index];
              return `${entity.name}: ${!entity.rating ? "N/A" : Math.round(entity.rating * 10) / 10.0}`;
            },
            font: {
              size: 12, // Adjust font size for readability
            },
          },
        },
      },
      animation: {
        duration: 1000, // Smooth transition for updating
      },
    };

    const title = props.scope === RatingOptions.Department_Global ? "Departments" : "Teachers";
    //@ts-ignore
    console.log(entities);
    return (
      <div className="rating-chart-holder">
        <h2>{title}</h2>
        <div className="info-holder">
            {(entities.length ?? 0) < 1 ? <LoadingOutlined /> : (
                (chartData?.datasets[0].data?.length ?? 0) < 1 ? (<text className="NA-text">N/A</text>) :
                  <Bar //@ts-ignore 
                    data={chartData} options={options} />
            )}
        </div>
      </div>
    );
}