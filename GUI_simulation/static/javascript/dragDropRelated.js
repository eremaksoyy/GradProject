        var serverCount = 0;
        var queueCount = 0;
		const muArray = [];

        function dragStart(ev) {
            ev.dataTransfer.effectAllowed='move';
            ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
            ev.dataTransfer.setDragImage(ev.target,0,0);
            return true;
        }

        function dragEnter(ev) {
            event.preventDefault();
            return true;
        }

        function dragOver(ev) {
            return false;
        }

        function dragDrop(ev) {
			ev.preventDefault();
            var data=ev.dataTransfer.getData("Text");
            if(data=="server")
            {
               var nodeCopy = document.getElementById(data).cloneNode(true);
               nodeCopy.id = "newId";
               /nodeCopy.onclick = openServerForm();/
               ev.target.appendChild(nodeCopy);
			   return false;
            }
            else if(data=="queue")
            {
               var nodeCopy = document.getElementById(data).cloneNode(true);
               nodeCopy.id = "newId";
               /nodeCopy.onclick = openQueueForm();/
               ev.target.appendChild(nodeCopy);
			   return false;
            }
            else
            {
                var nodeCopy = document.getElementById(data).cloneNode(true);
                nodeCopy.id = "newId";
                ev.target.appendChild(nodeCopy);
			    return false;
            }
        }

        function openQueueForm(selection)
        {
               if(selection==1)
               {
                   lambda=window.prompt("Enter lambda,number of entities:", "");
               }
               else if(selection==2)
               {
                  lambda=window.prompt("Enter lambda,number of entities,queue size:", "");
               }

               else if(selection==3)
               {
                  lambda=window.prompt("Enter lambda,number of entities,limit:", "");
               }

			   var error=1;
			   while(error==1)
			   {
			           var stringArray = lambda.split(',');
			           var lamdaNum = Number(stringArray[0]);
			           var numOfEntities = Number(stringArray[1]);
			           var queueSize = Number(stringArray[2]);

			           if(selection==2 && typeof(stringArray[2])=='undefined')
			           {
			               window.alert("No value is entered for the Queue Size");
			               lambda=window.prompt("Enter lambda,number of entities,queue size:", "");
			           }
			           else if(selection==2 && (queueSize < 0 || queueSize == 0))
			           {
			               window.alert("Queue Size should be a positive number !");
			               lambda=window.prompt("Enter lambda,number of entities,queue size:", "");

			           }
			           else if(selection==3 && typeof(stringArray[2])=='undefined')
			           {
			               window.alert("No value is entered for the Limit");
			               lambda=window.prompt("Enter lambda,number of entities,limit:", "");
			           }
			           else if(selection==3 && (queueSize < 0 || queueSize == 0))
			           {
			               window.alert("Limit should be a positive number !");
			               lambda=window.prompt("Enter lambda,number of entities,limit:", "");

			           }
			           else if(stringArray[1]==""){
                          window.alert("No value is entered for the NUMBER OF ENTITIES");
                          lambda=window.prompt("Enter lambda,number of entities:", "");
                       }
                       else if (numOfEntities<1024){
                          window.alert("Enter a valid amount of entity (more than 1024)!");
                          lambda=window.prompt("Enter lambda,number of entities:", "");
                       }
                       else if(stringArray[0]==""){
                          window.alert("No value is entered for LAMBDA");
                          lambda=window.prompt("Enter lambda,number of entities:", "");
                       }
                       else if(lamdaNum<0){
                           window.alert("LAMBDA can not be a negative number!");
                           lambda=window.prompt("Enter lambda,number of entities:", "");
                       }
                       else
                       {
                            error = 0;
                       }
			   }

			   var element = document.createElement("input");
			   element.setAttribute("type", "hidden");
			   element.setAttribute("value", lambda);
			   element.setAttribute("name", "queue"+queueCount);
			   document.getElementById("drag-drop-items").appendChild(element);
               queueCount++;
        }

		function openServerForm(){
			   mu=window.prompt("Enter mu:", "");
			   var error = 1;
			   while(error==1)
			   {
			         var muNum  = Number(mu);
			         if(mu == ""){
                          window.alert("No value is entered for MU");
                          mu=window.prompt("Enter mu:", "");
                     }
                     else if(muNum<0){
                         window.alert("MU can not be a negative value!");
                         mu=window.prompt("Enter mu:", "");
                     }
                     else
                     {
                          error = 0;
                     }
			   }

			   var element = document.createElement("input");
			   element.setAttribute("type", "hidden");
			   element.setAttribute("value", mu);
			   element.setAttribute("name", "server"+ serverCount);
			   document.getElementById("drag-drop-items").appendChild(element);
			   serverCount++;
			   var element = document.createElement("input");
			   element.setAttribute("type", "hidden");
			   element.setAttribute("value", serverCount);
			   element.setAttribute("name", "count"+ serverCount);
			   document.getElementById("drag-drop-items").appendChild(element);

        }

     function validateInputs(){
             var splitArray = lambda.split(',');
			 var lamda = Number(splitArray[0]);
			 var entityCount = Number(splitArray[1]);
            if(lamda==""){
                window.alert("No value is entered for LAMBDA");
                return false;
            }
            else if(lamda<0){
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
            else if (entityCount<1024){
                window.alert("Enter a valid amount of entity (more than 1024)!");
                return false;
            }
         return true;
	}