function calculateMQL(arrivalRate, serviceRate, noOfServers, limit) {
    var c = noOfServers;
    var p = arrivalRate / (serviceRate * c); // representing the traffic intensity
    var r = arrivalRate / serviceRate;
    var n = limit;
    // calculating P0 probability (where p<1, meaning that arrivalRate<serviceRate, lambda<mue)
    var sum = 0;
    var i = 0;
    while(i < c)
    {
          sum = sum + (Math.pow(c*p, i))/ factorial(i);
          i=i+1;
    }
   // i represents the customer in the system at a given moment, representing n in the equations
      // first part of the P0 equation

    // second part of the P0 equation
    sum = sum + (Math.pow((c*p), c) / (factorial(c) * (1 - p)));

    var P0 = (Math.pow((sum), (-1)));
    P0 = P0.toFixed(6);
    var Pn;

    if (n<=c){
        Pn = (Math.pow(c*p, n) * P0)/ factorial(n);
    }

    else {
        Pn = (Math.pow(c, c) * Math.pow(p, n) * P0)/ factorial(c);
        /*  console.log("----------------");
          console.log("c: " + c);
          console.log("p: " + p);
          console.log("n: " + n); */
          }
    Pn = Pn.toFixed(6);

   // console.log("P0 value: " + P0 + "for " + noOfServers + "server(s)");
   // console.log("Pn value: " + Pn + "for " + noOfServers + "server(s)");
    // Calculate MQL
    var part_add = ((arrivalRate)*(serviceRate))/(Math.pow((c*(serviceRate))-arrivalRate,2));
    var Lq = (1/(factorial(c-1))) * Math.pow(r,c) * part_add * P0;
    mql = Lq - Pn + 1;   // L = Lq-Pn+1 where L represents mql value
    console.log("Mql value: " + mql + " for " + noOfServers + " server(s)");
    return mql;
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;   }
    return n * factorial(n - 1);
}

function plotMQLGraph(lamda , mue, server, limit) {
    // Set up input values for the MQL function
    console.log("Inside the mmcL_graph.js : ");
    console.log("Mue value selected (min): " + mue);
    console.log("Lambda: " + lamda);
    console.log("Number of servers: " + server);
    var arrivalRate = lamda;
    var serviceRate = mue;
    var noOfServers = server;
    var limit = limit;
    console.log("Limit value: " + limit);

    // Calculate MQL values for different servers
    const mqlValues = [];
    for (let i = 1; i <= noOfServers; i++) {
        const mql = calculateMQL(arrivalRate, serviceRate, i, limit);
        mqlValues.push(mql.toFixed(2));
    }

    // Set up chart data and options
    const chartData = {
        labels: Array.from({ length: noOfServers }, (_, i) => i + 1),
        datasets: [{
        label: "MQL Values for Derived from the Analytical Results",
        data: mqlValues,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
        }]
    };
    const chartOptions = {
        scales: {
            x: {
                title: {
                display: true,
                text: 'Number of Servers'
                }
            },
            y: {
                title: {
                display: true,
                text: 'MQL'
            },
            suggestedMin: 0,
            suggestedMax: Math.max(...mqlValues) * 1.1,

            }
        }
    };

    // Creating a new chart and displaying it on the page
    const chart = new Chart('mmcl-graph', {
        type: 'line',
        data: chartData,
        options: chartOptions
    });
}

function simulationMQL(mqlList, entityList){
        chart = new Chart("SimMQLmmcl", {
            type: "line",
            data: {
              labels: entityList,
              datasets: [{
                label: "MQL Values for Derived from the Simulation Results",
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0, 0, 255, 1.0)",
                borderColor: "rgba(0, 0, 255, 0.1)",
                  data: mqlList
                  }]
            },
         options: {
          legend: {display: true},
          scales: {
            y: {
            title: {
              display: true,
              text: 'MQL Value'
              }
          },
          x: {
            title: {
              display: true,
              text: 'Number Of Entities'
              }
          }
            }
          }
        });

    chart.update();
};


function downloadImage() {
    var canvas = document.getElementById('SimMQLmmcl');

    var link = document.createElement('a'); // temporary link element
    link.href = canvas.toDataURL('image/png'); // Set the link's href attribute to the image data URL
    link.download = 'MMCLgraph.png'; // Set the link's download attribute with a desired filename
    link.click();
}


