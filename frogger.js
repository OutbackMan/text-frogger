import F_Config from "./Config.js";
import F_TextCtx from "./TextCtx.js";
import * as F_Common from "./Common.js";

// dev-tools->clear-site-data (remove service workers previously run for localhost)

class Lane {
  constructor(x_vel, content) {
    this.x_vel = x_vel;
    this.content = content;
  }
}

const FPS = 10
const FRAME_INTERVAL = parseFloat(1000 / FPS); 

function start_frogger(e) {
  let lanes = [
    new Lane(0.0, "xxx..xxx..xxx..xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"),
    new Lane(-3.0, ".xxxxx....xxx.......xxxx.........xxxxx........xxxx........xxx..."),
    new Lane(2.0, "...xxxx.....xxxxx.....xxx..xxxx...........xxxxx..........xxx...."),
    new Lane(3.0, ".xxx.....xxxxx....xx....xxxx.......xxxxx......xxx.....xxxxx....."),
    new Lane(0.0, "................................................................"),
    new Lane(-4.0, "...xx..xx...xx...xx.....xx.xx....xx...xx.....xx.....xx..xx...xx."), // cars
    new Lane(1.0, "....xxxx....xxxx......xxxx..xxxx.......xxxx...........xxxx......"), // buses
    new Lane(-3.0, ".xx....xx..xx......xx....xx....xx.........xx...xx.........xx...."), // cars
    new Lane(2.0, "....xx....xx....xx..xx....xx.....xx..xx.xx.......xx...xx........"), // cars
    new Lane(0.0, "................................................................")
  ];

  let time_since_start = 0.0;
  let cell_dim = 8; // 8 x 8 chars --> logical dim are div by 8

  let ctx = new F_TextCtx(document.querySelector("canvas"), 128, 80);

  window.requestAnimationFrame((frame_start_time) => {
    frogger_loop(frame_start_time, ctx, lanes, time_since_start, cell_dim); 
  }); 
}

function frogger_loop(frame_start_time, ctx, lanes, time_since_start, cell_dim) {
  if (typeof frogger_loop.when_last_frame === "undefined") {
    frogger_loop.when_last_frame = frame_start_time;
  }

  let time_between_frames = frame_start_time - frogger_loop.when_last_frame;

  if (time_between_frames > FRAME_INTERVAL) {
    frogger_loop.when_last_frame = frame_start_time;

    time_since_start += time_between_frames;
	  
    ctx.clear();

    let x = 0 
    let y = 0;
    lanes.forEach((lane) => {
	  // perhaps divide by 1000 to get seconds
      let start_pos = parseInt(time_since_start * lane.x_vel, 10) % 64; // just get units (times cancel)
      if (start_pos < 0) {
        start_pos = 64 - (Math.abs(start_pos) % 64);		
      }

      for (let i = 0; i < ctx._logical_width / cell_dim; ++i) {
        let graphic = lane.content[(start_pos + i) % 64];	
        ctx.render_text_fill((x + i)*cell_dim, y*cell_dim, (y + 1)*cell_dim, graphic.repeat(cell_dim), "black");
      }
      ++y;
    });
  }

  window.requestAnimationFrame((start_time) => {
    frogger_loop(start_time, ctx, lanes, time_since_start, cell_dim); 
  });
}

document.addEventListener("DOMContentLoaded", start_frogger);

  /*
  window.addEventListener("keydown", (e) => {
    if (e.defaultPrevented) {
      return;	
	}	  

	switch (e.key) {
		
	}

    e.preventDefault();
  }); */
