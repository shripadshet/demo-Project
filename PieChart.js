import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register required components of Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ students, professors }) => {
    const data = {
        labels: ['Total Students', 'Total Professors'],
        datasets: [
            {
                data: [students, professors],
                backgroundColor: ['#42A5F5', '#66BB6A'], // Customize colors
                hoverBackgroundColor: ['#64B5F6', '#81C784'], // Customize hover colors
            },
        ],
    };

    return (
        <div>
            <h3>Student vs Professor Distribution</h3>
            <Pie data={data} />
        </div>
    );
};

export default PieChart;
