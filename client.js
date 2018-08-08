/*
player = {
  id --> required for identification on server,
  is_ready --> can send data
}

remote_player = {
  id,
  position,
  rotation,
  look_direction,
  health,
  cur_weapon
  draw_remote_player()
}

game = {
  is_online --> single or multiplayer	
}

game() {
  if (is_online) create_server_connection();
}

*/

/*
  server_connection.send_information_necessary_for_remote_player()
  server_connection.send_shot()
  server_connection.recieve_information();
*/
class NetworkConnector {
  constructor(server_url) {
	  let socket = new WebSocket(server_url);

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
	    socket.send("2"); // disconnect message
		socket.close(); 
	  })

    this._socket = socket;

  send(player) {
    if (player.is_ready) {
      this._socket.send("1 anim_frame x y look_dir health weapon")		
	} 
  }

}
}



