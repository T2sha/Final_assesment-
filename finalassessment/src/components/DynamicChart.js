import React from "react";
import 'chart.js/auto';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {useState, useRef, useEffect} from 'react';
import axios from "axios";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import SocialCard from './components/SocialCard'

ChartJS.register(ArcElement, Tooltip, Legend);


const DynamicChart = () => {

    const [data, setData] = useState([]);
    const [faildata, setfailData] = useState([]);
    const [successdata, setsuccessData] = useState([]);

    const [showMissions, setShowMissions] = useState();

    const value = useRef();
 
    

    useEffect(()=>{
        axios.get('https://api.spacexdata.com/v5/launches')
        .then((res)=>{
            
            const succ = res.data.filter((item) => item.success === true).length;
            const fail = res.data.filter((item) => item.success === false).length;
            setData([succ, fail]);
        })
    }, []);

    const info = {
        labels: ['Successful', 'Failed'],
        datasets: [
        {
            label: 'Success to Failed Launches',
            data: data,
            backgroundColor: [
            '#222222',
            '#ffffff'
            ],
            borderColor: [
            '#ffffff',
            '#ffffff'
            ],
            borderWidth: 1,
        }, 
        ],
    }

    const [chart, setChart] = useState({})
  var baseUrl = "https://api.spacexdata.com/v4/rockets";

  useEffect(() => {
    const fetchLaunches = async () => {
      await fetch(`${baseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          
        }
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              console.log(json.data);
              setChart(json.data)
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    };
    fetchLaunches()
  }, [baseUrl])

  console.log("chart", chart);
  var data = {
    labels: chart?.launches?.map(x => x.date),
    datasets: [{
      label: `${chart?.launches?.length} Coins Available`,
      data: chart?.launches?.map(x => x.price),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }



    

    

    useEffect(()=>{
        axios.get('https://api.spacexdata.com/v5/launches')
        .then((res)=>{
            
            const succ = res.data.filter((item) => item.success === true).length;
            const fail = res.data.filter((item) => item.success === false).length;
            setData([succ, fail]);
        })
    }, []);

    const info3 = {
        labels: ['Successful', 'Failed'],
        datasets: [
        {
            label: 'Success to Failed Launches',
            data: data,
            backgroundColor: [
            '#222222',
            '#ffffff'
            ],
            borderColor: [
            '#ffffff',
            '#ffffff'
            ],
            borderWidth: 1,
        }, 
        ],
    }

    const[users,setUser]=useState([]);

    useEffect(() => {
        (async () =>{
            try{let userData;
            const response = await fetch('https://api.spacexdata.com/v3/missions');
            const userData = await response.json().name;
            }catch(errors){
                console.log(errors);
                UserData = [];
            }

            setUsers(userData);

        })();
    });

    

    

    return (
        <>
        <div className="chart-one">
            <div className="chartBox">
                <Doughnut data={info} />
                <Bar data={info2} />
                <Line
        data={data}
        height={400}
        options={options}
 />
                
            </div>
            
            
        </div>
        <div className="chart-two">
           
           
            <div className="mission-log">
                {users.map((user,index) =>(
                    <SocialCard userData={user} key={index}/>
                ))}
            </div>
        </div>
        </>
    );
}

export default DynamicChart;