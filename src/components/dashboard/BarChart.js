import { Skeleton } from "@mantine/core";
import axios from "axios";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { baseUrl } from "../../api/config";
import { ReactComponent as NoDataSVG } from "../../assets/No-data-1.svg";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const BarChart = () => {
    const [result,setResult] = useState([]);
    const token  = useSelector(state => state.user.token)
    const [barChartLoading,setBarChartLoading] = useState(false)
    const isMobile = useSelector(state => state.user.isMobile)
    const localToken = localStorage.getItem('token');
    useEffect(() =>{
        setBarChartLoading(true)
        axios.get(`${baseUrl}/dashboard/monthly-data`,{
            headers: { Authorization: `Bearer ${localToken}` }
        }).then((res) =>{
            setBarChartLoading(false)
            setResult(res.data.data)
            console.log("res",res.data.data)
        }).catch((err) =>{
            setBarChartLoading(false)
            console.log(err)
        })
    },[token])
    const labels = [];
    for (let i=result.length-1;i>=0; i--){
        labels.push(result[i].month)
    }
    const expensesData = result.map(item => item.expenses);
    const incomeData = result.map(item => item.income);
    function handleHasData(){
        let hasData = false
        for (let i=result.length-1;i>=0; i--){
            if(result[i].expenses>0 || result[i].income>0){
                hasData =true
            }
        }
        return hasData
    }
    const data = {
        labels,
        datasets: [
            {
                label: 'Expenses',
                data: expensesData,
                backgroundColor: '#63ABFD',
                borderColor: '#165BAA', // Border color for "expenses" bar
                borderWidth: 3,
                borderRadius: 8
            },
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: '#003380',
                borderColor: '#63ABFD', // Border color for "expenses" bar
                borderWidth: 3,
                borderRadius: 20
            },
        ],
    };

    result.forEach((item) => {
        const index = labels.indexOf(item.month);
        if (index !== -1) {
            data.datasets[0].data[index] = item.expenses;
            data.datasets[1].data[index] = item.income;
        }
    });
    function aspectRatio(){
        if(isMobile){
            return 1.5
        }else {
            return 2
        }
    }

    const maxDataValue = Math.max(...expensesData, ...incomeData);
    const stepSize = Math.ceil(maxDataValue / 5 / 500) * 500;
    const options = {
        aspectRatio: aspectRatio(),
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: false,
                grid: {
                    display: false,
                },
                ticks: {
                    stepSize: stepSize,
                    callback: (value) => {
                        if (value === 0) return value.toString();
                        const number = value / 1000;
                        if (number >= 1) {
                            return number.toString() + 'k';
                        }
                        return '';
                    },
                },
            },
        },
    };


    return <div>
        {barChartLoading ?
            <Skeleton height={250}  >
            </Skeleton>
            :
            <div>
                {handleHasData() ?
                    <Bar options={options} data={data} />
                    :
                    <NoDataSVG style={{height:230}}></NoDataSVG>
                }
            </div>
        }
    </div>


};

export default BarChart;
