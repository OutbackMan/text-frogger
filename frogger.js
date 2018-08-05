import F_Config from "./Config.js";
import F_TextCtx from "./TextCtx.js";
import * as F_Common from "./Common.js";

class Lane {
  constructor() {
    this.x_vel = x_vel;
    this.content = content;
  }
}

function start_frogger(e) {
  let lanes = [
    new Lane(0.0, "................................................................"),
    new Lane(0.0, "................................................................"),
    new Lane(0.0, "................................................................"),
    new Lane(0.0, "................................................................"),
    new Lane(0.0, "................................................................"),
    new Lane(0.0, "................................................................"),
    new Lane(0.0, "................................................................"),
    new Lane(0.0, "................................................................"),
    new Lane(2.0, "....xx....xx....xx..xx....xx.....xx..xx.xx.......xx...xx........"), // cars
    new Lane(0.0, "................................................................")
  ];


  let frogger_ctx = new F_TextCtx(document.querySelector("canvas"), 120, 40);

  window.requestAnimationFrame((frame_start_time) => {
    frogger_loop(frame_start_time, frogger_ctx); 
  });
}

function frogger_loop(frame_start_time, frogger_ctx) {
  if (typeof frogger_loop.when_last_frame === "undefined") {
    frogger_loop.when_last_frame = frame_start_time;
  }

  let time_between_frames = frame_start_time - frogger_loop.when_last_frame;
  frogger_loop.when_last_frame = frame_start_time;

  frogger_ctx.clear();

  for (let i = 0; i < frogger_ctx._logical_height; ++i) {
    frogger_ctx.render_text(0, i, "#".repeat(frogger_ctx._logical_width), "red");
  }

  window.requestAnimationFrame((start_time) => {
    frogger_loop(start_time, frogger_ctx); 
  });
}

document.addEventListener("DOMContentLoaded", start_frogger);
