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
			   return false
            }
            else if(data=="queue")
            {
               var nodeCopy = document.getElementById(data).cloneNode(true);
               nodeCopy.id = "newId";
               /nodeCopy.onclick = openQueueForm();/
               ev.target.appendChild(nodeCopy);
			   return false
            }
            else
            {
                var nodeCopy = document.getElementById(data).cloneNode(true);
                nodeCopy.id = "newId";
                ev.target.appendChild(nodeCopy);
			    return false
            }
        }

        function openQueueForm(){
			   lambda=window.prompt("Enter lambda,number of entities:", "");
			   var error=1;
			   while(error==1)
			   {
			           var stringArray = lambda.split(',');
			           var lamdaNum = Number(stringArray[0]);
			           var numOfEntities = Number(stringArray[1]);
			           if(stringArray[1]==""){
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
			   console.log(element.name);
			   document.getElementById("drag-drop-items").appendChild(element);
               queueCount++;
               console.log(queueCount);
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
               console.log(serverCount);
        }

     function validateInputs(){
            if(lambda==""){
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
         return true;
	}