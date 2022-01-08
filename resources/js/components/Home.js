import React from "react";
import { Chart as ChartJS, CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function() {

    return (
        <div className="card">
            <div className="card-header">
                Home
            </div>
            <div className="card-body">
                <h5 className="card-title">Dashboard Example</h5>
                <div className="row">
                    <div className="col-6">
                        <Bar 
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: 'User Behaviour'
                                    }
                                }
                            }} 
                            data={{
                                labels: ['Jun', 'Jul', 'Aug'],
                                datasets: [
                                  {
                                    label: 'open',
                                    data: [5, 6, 7],
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)'
                                  },
                                  {
                                    label: 'click',
                                    data: [10, 8, 10],
                                    backgroundColor: 'rgba(33, 156, 186, 0.5)'
                                  }
                                ],
                              }} 
                        />
                    </div>
                    <div className="col-6">
                        <Pie data={{
                            labels: ['Open', 'Unsubscribe', 'Bounce'],
                            datasets: [
                                {
                                    label: '# of values',
                                    data: [20, 10, 15],
                                    backgroundColor: [
                                        'rgba(43, 147, 225, 0.5)',
                                        'rgba(213, 243, 53, 0.5)',
                                        'rgba(243, 90, 53, 0.5)'
                                    ]
                                }
                            ]
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}