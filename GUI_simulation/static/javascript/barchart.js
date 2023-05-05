
 function combine(){
        var a = validateInputs();
        var b = fun();
        return a && b;
      }


 function validateInputs(){
      var entityCount = document.forms["input-form"]["numberOfEntities"].value;
      var lambda = document.forms["input-form"]["lambda"].value;
      var mu = document.forms["input-form"]["mu"].value;

      if(entityCount==""){
            window.alert("No value is entered for the NUMBER OF ENTITIES");
            return false;
      }
      else if (entityCount<1024){
            window.alert("Enter a valid amount of entity (more than 1024)!");
            return false;
      }
      else if(lambda==""){
            window.alert("No value is entered for LAMBDA");
            return false;
      }
      else if(lambda<0){
            window.alert("LAMBDA can not be a negative number!");
            return false;
      }
      else if(mu == ""){
            window.alert("No value is entered for MU");
            return false;
      }
      else if(mu<0){
            window.alert("MU can not be a negative value!");
            return false;
      }
      else if(lambda>=mu){
            window.alert("LAMBDA value should be less than MU value!");
            return false;
      }
      return true;
}


function fun()
      {
        var arriverate = document.getElementById('lambda').value;
        var servicerate = document.getElementById('mu').value;
        var L = document.getElementById('queuesize').value;
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
                label:"Measured Value:",
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
        event.preventDefault();

      }
