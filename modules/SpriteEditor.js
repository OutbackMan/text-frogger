import TxtEngine from "./lib/TxtEngine.js";
import * as Utils from "./Utils.js";

class Label {
  constructor(x, y, txt, bg_color, fg_color) {
    this.x = x;
    this.y = y;
    this.txt = txt;
    this.bg_color = bg_color;
    this.fg_color = fg_color;
  }
  
  update_and_render() {
    this.render_str(); 
  }
}

class VariableLabel extends Label {
        // must be arr to be passed by reference
  constructor(x, y, txt, bg_color, fg_color, variable_arr) {
    super(x, y, txt, bg_color, fg_color);
    this.variable_arr = variable_arr;
  }

  update() {
    let output_str = `${this.txt}: ${this.variable_arr[0]}`;
    this.render_str();
  }
}

class InputLabel extends Label {
  constructor(x, y, txt, bg_color, fg_color, max_width) {
    super(x, y, txt, bg_color, fg_color);
    this.content = new Array(max_width);
  }

  get content() {
    return this.content.join(""); 
  }

  update() {
    if (this.input.x = )
    let output_str = `${this.txt}: ${this.content.join("")}`;
    this.render_str();
  }
  
}

class TouchableLabel extends Label {
  constructor(x, y, txt, bg_color, fg_color, max_width) {
    super(x, y, txt, bg_color, fg_color);
    this.is_active = false;
  }

  update() {
    if (!this.is_active) {
      if (this.input.pointer.has_touched && this.input.pointer.x >= this.x && this.input.pointer.x < this.txt.length + this.max_width && this.input.pointer.y === this.y) {
        this.is_active = true; 
      }
    } else {
       
    }
  }

  // when has been deactivated
  reset() {
  
  }
}




export default class SpriteEditor extends TxtEngine {
  constructor(canvas_dom_elem, width, height, default_bg, default_fg, default_ch) {
    super(canvas_dom_elem, width, height, default_bg, default_fg, default_ch);

    this.active_tool = "move";

    this.labels = {
	  "move": this._create_touchable_label(3, 4, "MOVE", "blue", "white", () => {
	            if (!this.is_active) {
				  this.labels[this.active_tool].is_active = false;
				  this.active_tool = "move";
	              document.body.style.cursor = "move";	  
	              move_label.fg_color = Utils.darken(move_label.fg_color, 0.3);
	            } else {
	              this.is_active = true;	  
	            }
	          }),
	};

    this.tools = {
      "move":
	}

          // store sprites as .spr, but import as js file
          // contains:
          // let sprite_data = TypedArray(); 
          // export { sprite_data as default };

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
    
    width, height, width_plus, width_minus, 
  }	

  update(delta_time) {
	this._render_base_gui();
    
	this.labels.forEach((label) => {
          label.update_and_render();
	});

    this.tools[this.active_tool].process_input();
      
    this.shortcuts.forEach()
  }

  _render_base_gui() {
    	  
  }

  _create_touchable_label(x, y, txt, bg_color, fg_color, touch_callback) {
    let label = this._create_static_label(x, y, txt, bg_color, fg_color);
	label.is_active = false;
	label.handle_touch = () => {
      if (this.input.pointer.has_touched) {
		if (this.input.pointer.x >= label.x && this.input.pointer.x < label.txt.length &&
		     this.input.pointer.y == label.y) {
	      touch_callback();
		}
	  }
	};
  }

  _create_static_label(x, y, txt, bg_color, fg_color) {
    let label = Object.create(null);
    label.txt = txt;
    label.bg_color = bg_color;
    label.fg_color = fg_color;

    // arrow functions necessary to preserve 'this'
    label.handle_hover = () => {
	  if (this.input.pointer.x >= label.x && this.input.pointer.x < label.txt.length &&
		this.input.pointer.y === label.y) {
	     this.render_str(label.x, label.y, Utils.lighten(label.bg_color, 0.3), Utils.lighten(label.fg_color, 0.3), txt);
	  }
	};

    return label;
  }

}

}
