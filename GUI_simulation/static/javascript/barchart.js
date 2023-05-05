function fun(M, lam)
{
        var arriverate = lam;       // lambda
        var servicerate = M;        // mu
        var L = 5; // assign the queue size as 20 for now, take it from the user later
        var traffic_intensity = arriverate/servicerate;
        var average_num_of_customers = traffic_intensity/(1-traffic_intensity);
        var average_system_time = average_num_of_customers/arriverate;
        var num_of_customers_queue = average_num_of_customers * traffic_intensity;

        if(L>num_of_customers_queue)
        {
          queue_time = num_of_customers_queue/arriverate;
        }

        else
        {
          queue_time = L/arriverate;
        }

        var xValues = ["Traffic Intensity", "Number Of Customers", "Average System Time", "Number Of Customers In The Queue", "Queue Time"];
        var yValues = [traffic_intensity, average_num_of_customers, average_system_time, num_of_customers_queue, queue_time];
        var barColors = ["red", "green","blue","orange","brown"];

         barchart = new Chart("barChart", {
            type: "bar",
            data: {
              labels: xValues,
              datasets: [{
                label:"Measured Value ",
                backgroundColor: barColors,
                  data: yValues
                  }]
            },
         options: {
          legend: {display: false},
          title: {
            display: false,
            text: "M/M/1/L outputs"
          }
         }
        });
        barchart.update();
       // event.preventDefault();
}
