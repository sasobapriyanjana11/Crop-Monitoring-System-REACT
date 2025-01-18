import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../assets/styles/Dashboard.css";

export function Dashboard() {
    const lineChartRef = useRef<Chart | null>(null);
    const doughnutChartRef = useRef<Chart | null>(null);

    useEffect(() => {
        const lineCtx = document.getElementById("lineChart") as HTMLCanvasElement;
        const doughnutCtx = document.getElementById("doughnut") as HTMLCanvasElement;

        // Destroy existing charts to avoid errors on re-render
        if (lineChartRef.current) {
            lineChartRef.current.destroy();
        }
        if (doughnutChartRef.current) {
            doughnutChartRef.current.destroy();
        }

        // Create Line Chart
        if (lineCtx) {
            lineChartRef.current = new Chart(lineCtx, {
                type: "line",
                data: {
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                            label: "Growth Rate",
                            data: [12, 19, 3, 5, 2, 3],
                            borderColor: "rgb(8,66,13)",
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderWidth: 2,
                            tension: 0.4,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                        },
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }

        // Create Doughnut Chart
        if (doughnutCtx) {
            doughnutChartRef.current = new Chart(doughnutCtx, {
                type: "doughnut",
                data: {
                    labels: ["Crops", "Vehicles", "Employees"],
                    datasets: [
                        {
                            label: "System Data",
                            data: [50, 10, 100],
                            backgroundColor: [
                                "rgb(8,66,13)",
                                "rgb(25,91,14)",
                                "rgba(47,213,21,0.6)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                        },
                    },
                },
            });
        }

        // Cleanup on component unmount
        return () => {
            if (lineChartRef.current) {
                lineChartRef.current.destroy();
            }
            if (doughnutChartRef.current) {
                doughnutChartRef.current.destroy();
            }
        };
    }, []);

    return (
        <>
            <div className="container">
                <div className="main">
                    <div className="cards">
                        <div className="card">
                            <div className="card-content">
                                <div className="number">10+</div>
                                <div className="card-name">Vehicles</div>
                            </div>
                            <div className="icon-box">
                                <i className="fas fa-truck vehicle-icon"></i>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content">
                                <div className="number">100</div>
                                <div className="card-name">Employee</div>
                            </div>
                            <div className="icon-box">
                                <i className="fas fa-user-graduate"></i>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content">
                                <div className="number">250</div>
                                <div className="card-name">Equipment</div>
                            </div>
                            <div className="icon-box">
                                <i className="fas fa-tools"></i>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content">
                                <div className="number">50+</div>
                                <div className="card-name">Crops</div>
                            </div>
                            <div className="icon-box">
                                <i className="fas fa-seedling field-icon"></i>
                            </div>
                        </div>
                    </div>
                    <div className="charts h-3">
                        <div className="chart">
                            <h2>Growing speed (past 6 months)</h2>
                            <canvas id="lineChart"></canvas>
                        </div>
                        <div className="chart" id="doughnut-chart">
                            <h2>System Data</h2>
                            <canvas id="doughnut"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
