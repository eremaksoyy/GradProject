function plotLineGraph(dataList, labelList) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: entities_list,
            datasets: [{
                label: 'Graph',
                data: mql_values,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                tension: 0.3,   //set the tension property to a value between 0 and 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        padding: 20,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Entities'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Performance Measure Values'
                    }
                }]
            }
        }
    });
}

plotLineGraph(dataList, labelList);