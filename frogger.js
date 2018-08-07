import F_Config from "./Config.js";
import F_TextCtx from "./TextCtx.js";
import * as F_Common from "./Common.js";

function start_frogger(e) {
  let ctx = new F_TextCtx(document.querySelector("canvas"), 40, 40);

  window.requestAnimationFrame((frame_start_time) => {
    frogger_loop(frame_start_time, ctx); 
  }); 
}

function frogger_loop(frame_start_time, ctx) {
  if (typeof frogger_loop.when_last_frame === "undefined") {
    frogger_loop.when_last_frame = frame_start_time;
  }

  let time_between_frames = frame_start_time - frogger_loop.when_last_frame;
  frogger_loop.when_last_frame = frame_start_time;

  for (let row = 0; row < ctx._logical_height; ++row) {
    ctx.set_str(0, row, "#".repeat(ctx._logical_width), "white", "black");
  }

  window.addEventListener("click", (e) => {
    if (e.defaultPrevented) {
      return;	
	}	  

    let buf_x = parseInt(e.clientX / (ctx._x_scale * ctx._ch_width), 10);
    let buf_y = parseInt(e.clientY / (ctx._y_scale * ctx._ch_height), 10);

    let ch_buf_index = buf_y * ctx._logical_width + buf_x;

    ctx._ch_buffer[ch_buf_index].bg_color = "steelblue";

    e.preventDefault();
  });

  ctx.render();

  window.requestAnimationFrame((start_time) => {
    frogger_loop(start_time, ctx); 
  });
}

document.addEventListener("DOMContentLoaded", start_frogger);
