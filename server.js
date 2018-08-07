function create_client_info_holder() {
  let client_info = Object.create(null);	
  client
}

client = {
 "socket":
 "timeout":
 "id":
 "closing": false,
 "read_buf": new Int32Array(),
 "connecting": false,
 "connected": false
};

/*
 client connect --> server (record id) 

 frame: position,  --> server (broadcast)

 shoot: shooter_id shot_id health decrease  

 client disconnect --> server (delete id, broadcast)
 
*/

packet_buffer = {
  "buff": new ByteArray(),
  read_buff,
  read_pos,
  buff_update
};
// length() == buff.length - read_pos
// add_integer_to_buff()/float/string/byte/short

function get_integer_from_buf() {
  if (buf.count > read_pos) {
    if (buff_update) {
	   let integer = buffer.convertToInt(read_pos, read_pos + 4);
    }	  
  }	
}

function clear_packet_buffer() // once packets are sent to the client we no
// longer want them on the server

void function server() {
   let server_socket = new WebSocket();	

   server_socket.onconnect = (evt) => {
     for (let i = 0; i < MAX_PLAYERS; ++i) {
	   if (clients[i] === "undefined") {
	     clients[i].ip = "";	   
	   }	 
	 }    

     evt.socket.onmessage(evt) {
	   if (evt.data.length == 0) return;
	   // switch (read_packet_id(evt.data)
	 }
   }
}();
