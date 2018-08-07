function create_server_connection(server_url) {
  let socket = new WebSocket(server_url); // establish msg size??

  socket.onopen = (evt) => {
    socket.onmessage = (evt) => {
	  let msg = evt.data;	
	  if (msg.length) <= 0) {
	    socket.close();	  
		console.log("connection to " + ip " has been terminated");
	  }
	} 
  }

  window.addEventListener("beforeunload", (evt) => {
    socket.close(); 
  })
}


