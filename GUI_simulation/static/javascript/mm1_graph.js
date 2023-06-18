function plotLineGraph(dataList, labelList) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelList,
            datasets: [{
                label: 'Graph',
                data: dataList,
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
                        display: true
                    },
                    title: {
                      display: true,
                      text: 'Number of Entities'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true
                    },
                    title: {
                      display: true,
                      text: 'MQL Value'
                    }
                }]
            }
        }
    });
}

function downloadImage() {
    var canvas = document.getElementById('myChart');
    var link = document.createElement('a'); // temporary link element
    link.href = canvas.toDataURL('image/png'); // Set the link's href attribute to the image data URL
    link.download = 'MM1graph.png'; // Set the link's download attribute with a desired filename
    link.click();
}