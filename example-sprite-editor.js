import TxtRenderer from "./modules/TxtRenderer.js";

function start_sprite_editor(evt) {
  let renderer = new TxtRenderer(document.querySelector("canvas"), 40, 40);

  window.requestAnimationFrame((frame_start_time) => {
    sprite_editor_loop(frame_start_time, ctx); 
  }); 
}

function sprite_editor_loop(frame_start_time, renderer) {
  if (typeof sprite_editor_loop.when_last_frame === "undefined") {
    sprite_editor_loop.when_last_frame = frame_start_time;
  }

  let time_between_frames = frame_start_time - sprite_editor_loop.when_last_frame;
  sprite_editor_loop.when_last_frame = frame_start_time;

  renderer.render();

  window.requestAnimationFrame((start_time) => {
    sprite_editor_loop(start_time, ctx); 
  });
}

document.addEventListener("DOMContentLoaded", start_sprite_editor);
