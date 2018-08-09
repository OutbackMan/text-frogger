import TxtEngine from "./lib/TxtEngine.js";

export default class SpriteEditor extends TxtEngine {
  constructor(canvas_dom_elem, width, height) {
    super(canvas_dom_elem, width, height);
  }	

  update() {
    console.log("something");
  }
}


function create_label(x, y, txt, bg_color, fg_color) {
  let label = Object.create(null);
  label.txt = txt;
  label.bg_color = bg_color;
  label.fg_color = fg_color;

  return label;
}

function sprite_editor_loop(frame_start_time, renderer) {
  if (typeof sprite_editor_loop.when_last_frame === "undefined") {
    sprite_editor_loop.when_last_frame = frame_start_time;
  }

  let time_between_frames = frame_start_time - sprite_editor_loop.when_last_frame;
  sprite_editor_loop.when_last_frame = frame_start_time;


  let static_labels = create_static_labels();
  let clickable_labels = create_clickable_labels();

  window.addEventListener("mouseenter", update_mouse_position);
  window.addEventListener("mousemove", update_mouse_position);
  // update_mouse_position => (evt) => x = evt.pageX, y = evt.pageY
  
  if (mouse_x) {
	  
  }

  window.addEventListener("click", (evt) => {
	  
  });
  dynamic_labels.forEach((label) => {
    renderer.set_str(label.x, label.y, label.txt, label.bg_color, label.fg_color);
  });

  let move_label = create_label(3, 4, "MOVE"); 
  let brush_label = create_label(3, 4, "MOVE"); 
  let erase_label = create_label(3, 4, "MOVE"); 
  let zoom_in_label = create_label(3, 4, "MOVE"); 
  let zoom_out_label = create_label(3, 4, "MOVE"); 
  let undo_label = create_label(3, 4, "MOVE"); 
  let redo_label = create_label(3, 4, "MOVE"); 
  let cut_label = create_label(3, 4, "MOVE"); 
  let copy_label = create_label(3, 4, "MOVE"); 
  let paste_label = create_label(3, 4, "MOVE"); 
  let output_label = create_label(3, 4, "MOVE"); 
  let load_label = create_label(3, 4, "MOVE"); 


  for (let y = 0; y < renderer.height; ++y) {
    for (let x = 0; x < renderer.width; ++x) {
      renderer.set_ch(x, y, "#", "white", "black");		
	}	  
  }

  renderer.set_str(1, 2, "w: 100000 + -", "white", "black");
  renderer.set_str(1, 3, "h: 100000 + -", "white", "black");

  renderer.render();

