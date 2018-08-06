import F_Config from "./Config.js";
import F_TextCtx from "./TextCtx.js";
import * as F_Common from "./Common.js";

function start_frogger(e) {
  let ctx = new F_TextCtx(document.querySelector("canvas"), 128, 80);

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
    ctx.set_str(0, 0, "#".repeat(ctx._logical_width), "black"); 
  }

  ctx.render();

  window.requestAnimationFrame((start_time) => {
    frogger_loop(start_time, ctx); 
  });
}

document.addEventListener("DOMContentLoaded", start_frogger);
