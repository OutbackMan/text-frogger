client = {
 "index": 0,
 "ip",
 "socket",
 "closing": false,
 "read_buf": new Int32Array()
};

server = {
  "clients": []	
};

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

function initialize_server() {
   let server_socket = new WebSocket();	

   server_socket.onconnect = (evt) => {
     for (let i = 0; i < MAX_PLAYERS; ++i) {
	   if (clients[i] === "undefined") {
	     clients[i].ip = "";	   
	   }	 
	 }    

     evt.socket.onmessage() {
		 
	 }
   };
}
