#!/usr/bin/env node

// better than apache at handling lots of small requests as it is not serial

// let PacketParser = require("./packet-parser");

let Readline = require("readline");
let FS = require("fs");

let Minimist = require("minimist");
let WS = require("ws");


void function server() {
  const CMD_LINE_ARGS = Minimist(
                          process.argv.slice(2), 
                          {
                            boolean: ["help", "version"],
                            alias: {
                              help: "h",
                              version: "v"
                            }
                          }
                        );
  
  if (CMD_LINE_ARGS.help) {
  
  }

  start();
        
        /*
	FS.watchFile("packet-parser.js", (curr, prev) => {
		if (curr.mtime !== prev.mtime) {
			PacketParser = reload_module("./packet-parser");	
		}		
	}); 
	*/

}();

/* COMMANDS:
 *  --> restart/reload, ban/kick ip,  
 */

function start() {
  initialize_cli();
  initialize_server();
}

function initialize_cli() {
  let cli = Readline.createInterface({
	      input: process.stdin,
	      output: process.stdout
            });

  // display num connections
  cli.setPrompt("(Frogger Server) >");

  cli.on("close", () => {
    cli.write("Exiting Frogger Server...");
    process.exit(0);
  });

  cli.on("SIGINT", () => {
  	cli.close();
  });
  
  cli.on("line", (line) => {
    switch (line.trim()) {
    case "exit":
      cli.close();
      break;
    default:
      cli.write("unknown command");
    }
  });
  
  
  
  client.on("message", (msg) => {
  	cli.write(`[client] --> ${msg}\n`);
  	forwarder.send(msg);
  });
  
  forwarder.on("message", (msg) => {
  	cli.write(`[forwarder] <-- ${msg}\n`);
  	client.send(msg);
  });
  
  forwarder.on("close", (forwader) => {
  	cli.write(`forwarder terminated the connection.\n`);
  });
  
}

function initialize_server() {
  let cur_id = 0;
  let player_num = 0;

  let clients = Array<client>;
  let tmp_data = ByteArray<1440>;
  let max_players = 30;

  // could verify client here and set max payload
  let server = new WS.Server({"host": "", "port": 80});
  
  server.on("connection", (client) => {
    if (player_num < max_players) {
      clients.push({cur_id, client, time.now()}); 
      player_num++;
      cur_id++;
      client.send(`0 ${cur_id}`); // establish connection
    } else {
      client.send(`3 ${cur_id}`); // server full
    }
  	cli.write(`Client connected.\n`);
  	client.on("close", (client) => {
      		cli.write(`Client disconnected.\n`);                                 
  	});                                        
    
    client.on("message", (msg) => {
    
    });
  });

}

function reload_module(module_name) {
    delete require.cache[require.resolve(module_name)]                               
    return require(module)                                                      
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
