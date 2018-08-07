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

  initialize_cli(CMD_LINE_ARGS.NAME, CMD_LINE_ARGS.FORWARDER_IP, CMD_LINE_ARGS.FORWARDER_PORT);
	
	/*
	FS.watchFile("packet-parser.js", (curr, prev) => {
		if (curr.mtime !== prev.mtime) {
			PacketParser = reload_module("./packet-parser");	
		}		
	}); 
	*/

}();

function initialize_cli(name, forwarder_ip, forwarder_port) {
	let readline_interface = Readline.createInterface({
					input: process.stdin,
					output: process.stdout
				});
	readline_interface.setPrompt(`(${name}) >`);

	readline_interface.write(`${name} WebSocket proxy forwarding to ${forwarder_ip}:${forwarder_port}\n`);
	readline_interface.write(`Waiting for a client to connect...\n`);

    	let proxy = new WS.Server({port: 8080});

    	proxy.on("connection", (client) => {
		readline_interface.write(`Client connected.\n`);
		client.on("close", (client) => {
            		readline_interface.write(`Client disconnected.\n`);                                 
		});                                        

		readline_interface.write(`Attempting to establish connection with ${forwarder_ip}:{forwarder_port}\n`);
		let forwarder = new WS(`ws://${forwarder_ip}:${forwarder_port}`);
		forwarder.on("open", () => {
			readline_interface.write(`Connection established with ${forwarder_ip}:{forwarder_port}\n`);
			readline_interface.prompt();	

			readline_interface.on("close", () => {
				readline_interface.write(`exiting ${name}\n`);
				forwarder.close();
				proxy.close();
				process.exit(0);
			});

			readline_interface.on("line", (line) => {
				switch (line.trim()) {
				case "exit":
					readline_interface.close();
					break;
				default:
					readline_interface.write("unknown command");
				}
				readline_interface.prompt();
			});

			readline_interface.on("SIGINT", () => {
				readline_interface.close();
			});


			client.on("message", (msg) => {
				readline_interface.write(`[client] --> ${msg}\n`);
				forwarder.send(msg);
			});

			forwarder.on("message", (msg) => {
				readline_interface.write(`[forwarder] <-- ${msg}\n`);
				client.send(msg);
			});

			forwarder.on("close", (forwader) => {
				readline_interface.write(`forwarder terminated the connection.\n`);
			});
		});
    	});
}

function reload_module(module_name) {
    delete require.cache[require.resolve(module_name)]                               
    return require(module)                                                      
} 









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
