    function fun(mue, lamda, entityC, QueueSize) {
            // Do something with the form's data here
            console.log("Inside the mm1L_graph.js : ");
            console.log("Mue: " + mue);
            console.log("Lambda: " + lamda);
            console.log("Number of Entities: " + entityC);
            console.log("Queue size: " + QueueSize);
            var i, j=0, mql=0;
            var time_Arrival = 0;
            var Start_Serving = 0;
            var entity_list = [];
            var finish_Time = Start_Serving + (-(1 / mue) * math.log(math.random()));
            var arriverate = lamda;
            var servicerate = mue;
            var Iat = -(1 / lamda) * Math.log(Math.random()); 
            var NoOfEntities = entityC;
            var counter = 0;
            var mql_list = [];

            for(i=0;i<NoOfEntities;i++)
            {
              j = i;
              if(counter==QueueSize)
              {
                continue;
              }

              else
              {
                time_Arrival += Iat;
                Iat = -(1 / lamda) * math.log(math.random());
                Start_Serving = Math.max(time_Arrival, finish_Time);
                if (Start_Serving == time_Arrival) {
                      counter = counter+1;
                } 
                else {
                if (counter > 0) {
                 counter = counter-1;
                } 
                else {
                  counter = 0;
                 }
                }
                let St = -(1 / mue) * math.log(math.random());
                finish_Time = Start_Serving + St;
                entity_list.push(j);
                //finish_list.push(finish_Time);
                let waiting = finish_Time - time_Arrival;
                mql += waiting;
                if (i > 0) {
                    if (Math.abs((((mql/finish_Time)-(lamda/(mue-lamda)))*100)/(lamda/(mue-lamda)))<=0.15) {
                        mql_list.push(mql / finish_Time);
                        j = i;
                        break;
                    }
                }
                mql_list.push(mql / finish_Time);
              }
            }

            var xValues = entity_list;
            var yValues = mql_list;
            linechart = new Chart("lineGraph", {
            type: "line",
            data: {
              labels: xValues,
              datasets: [{
                label: "Line Graph",
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0, 0, 255, 1.0)",
                borderColor: "rgba(0, 0, 255, 0.1)",
                  data: yValues
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
        linechart.update();
}


function downloadImage() {
    var canvas = document.getElementById('lineGraph');
    var link = document.createElement('a'); // temporary link element
    link.href = canvas.toDataURL('image/png'); // Set the link's href attribute to the image data URL
    link.download = 'MM1Lgraph.png'; // Set the link's download attribute with a desired filename
    link.click();
}