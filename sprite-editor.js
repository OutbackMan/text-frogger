import SE_TextCtx from "./TextCtx.js";

/*

Move.Brush.Erase.Eye Dropper..ZoomIn..ZoomOut......Undo....Redo....Cut...Copy..Paste

---------------
w: 100 +
h: 100 -
x: 50
y: 50
brush: #efefef
---------------
[hex] [colour]



document.body.style.cursor = "move/copy/no-drop/alias/zoom-in/zoom-out/w-resize/e-size"

let sprite_info = Object.create(null);
sprite_info.name = "new-sprite";
sprite_info.width = 8;
sprite_info.height = 8;
sprite_info.glyphs = new Array(sprite_info.width * sprite_info.height).fill(" ", 0, 8);
sprite_info.bg_colors = new Array(sprite_info.width * sprite_info.height);
sprite_info.fg_colors = new Array(sprite_info.width * sprite_info.height);

let sprite_editor_state = Object.create(null);
sprite_editor_state.active_brush = "#efefef";
sprite_editor_state.zoom = 4;
sprite_editor_state.x = 0;
sprite_editor_state.y = 0;
sprite_editor_state.offset_x = 0;
sprite_editor_state.offset_y = 0;

let output_str = `
  let ${sprite_name}_sprite = new Sprite(${sprite_info.width}, ${}, ${chars..}, ${bg...}, ${fg...}) 
`;
*/

let offset_x = -ctx._logical_width / 2;  // -= mouse_held.x - start_pan_x
let offset_y = -ctx._logical_height / 2; // -= mouse_held.y - start_pan_y
let start_pan_x = 0.0; // = mouse.x
let start_pan_y = 0.0; // = mouse.y

let scale_x = 0.0; // *= scroll_wheel_up 1.001 || 0.999f
let scale_y = 0.0; // *= scroll_wheel_up 1.001 || 0.999f

// the displacement vector between mouse positions after scale
// offset_x += mouse_world_x_before_zoom - mouse_world_x_after_zoom
// offset_y += mouse_world_y_before_zoom - mouse_world_y_after_zoom

// jittering --> float to int conversion anomaly

function world_to_screen(w_x, w_y) {
  return [
    parseInt(w_x - offset_x, 10) * scale_x,
	parseInt(w_y - offset_y, 10) * scale_y
  ];
}

function screen_to_world(s_x, s_y) {
  return [
    parseFloat(s_x) / scale_x + offset_x, // why float() ??
	parseFloat(s_y) / scale_y + offset_y
  ];
}

function sprite_editor_start() {
  let ctx = new SE_TextCtx(document.querySelector(".SpriteEditorCanvas"), 160, 100);

  window.requestAnimationFrame((frame_start_time) => {
    sprite_editor_loop(frame_start_time, ctx); 
  }); 
}

// scaling means further or closer apart
// screen space is the canvas logical width and height
// always pass screen space coordinates to set_*() functions
// realm-specific --> logical --> canvas 

function sprite_editor_loop(frame_start_time, ctx) {
  if (typeof sprite_editor_loop.when_last_frame === "undefined") {
    sprite_editor_loop.when_last_frame = frame_start_time;
  }

  let time_between_frames = frame_start_time - sprite_editor_loop.when_last_frame;
  sprite_editor_loop.when_last_frame = frame_start_time;

  for (let row = 0; row <= 10; ++row) {
    let [start_col, end_col] = world_to_screen(0.0, 10.0);
    let [start_row, end_row] = world_to_screen(row, row);

    ctx.set_line(start_col, start_row, end_col, end_row, ".", "white", "black"); 
  }

  ctx.render();

  window.requestAnimationFrame((start_time) => {
    sprite_editor_loop(start_time, ctx); 
  });
}




