const x_axis = [];
const y_axis = [];

chartIt();

async function chartIt() {
 const data =  await getData();         //invoking a function for reading the data from a CSV file       
const ctx = document.getElementById('myChart').getContext('2d');
//labeling the x-axis values
const myChart = new Chart(ctx, {
type: 'line',   //defining the type of the graph chart
data: {
    labels: x_axis,
    datasets: [{
        label: 'Time',
        data: y_axis,
        fill: false,       //removes the space occupied below the graph
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
},

//to append special characters with the y-axis labeling
options: {
    scales: {
        y: {
            ticks: {
                callback: function(value, index, values) {
                    return value;
                }
            }
        }
    }
}
});
}

async function getData() {

    const response = await fetch('data.csv');
    const data = await response.text();

    const table = data.split('\n').slice(1);
    table.forEach(row => {
    const columns =  row.split(',');
    const year = columns[0];
    x_axis.push(year);
    const temp = columns[1];
    y_axis.push(parseFloat(temp) + 14);
    console.log(year,temp);
});
return (x_axis, y_axis);
}