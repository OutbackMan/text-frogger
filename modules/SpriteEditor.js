import TxtEngine from "./lib/TxtEngine.js";
import * as Utils from "./Utils.js";

export default class SpriteEditor extends TxtEngine {
  constructor(canvas_dom_elem, width, height, default_bg, default_fg, default_ch) {
    super(canvas_dom_elem, width, height, default_bg, default_fg, default_ch);

    this.active_label = "move";
	this.are_hovering_over_a_label = false;
	this.recent_hovering_label = null;

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
  }	

  _create_label(x, y, txt, bg_color, fg_color) {
    let label = Object.create(null);
    label.x = x;
    label.y = y;
    label.txt = txt;
    label.bg_color = bg_color;
    label.fg_color = fg_color;
	label.width = txt.length;

    label.update = () => {
	  this.render_str(label.x, label.y, label.txt, label.bg_color, label.fg_color);	
    };
  }

  _is_hovering_over_label(label) {
    return (this.input.pointer.x >= label.x && this.input.pointer.x < label.width &&
	         this.input.pointer.y === label.y);
  }

  _has_clicked_label(label) {
    return (this.input.pointer.has_touched && this._is_hovering_over_label(label));
  }

  _create_var_label(x, y, txt, bg_color, fg_color, variable, var_width) {
    let var_label = this._create_label(x, y, txt, bg_color, fg_color);	  
	var_label.variable = variable;
	var_label.width = var_label.txt.length + var_width + 2;

    var_label.update = () => {
	  this.render_str(
	    var_label.x, 
		var_label.y, 
		`${var_label.txt}: ${var_label.variable.substr(0, var_label.var_width)}`, 
		var_label.bg_color, 
		var_label.fg_color
	  );	
    };
  }

  _create_input_label(x, y, txt, bg_color, fg_color, input_width) {
    let input_label = this._create_label(x, y, txt, bg_color, fg_color);	  
	input_label.width = input_label.txt.length + input_width + 2;
	input_label.input_width = input_width;
	input_label.content = new Array(input_width).fill(" ");
	input_label.is_active = false;
	input_label.cursor_pos = -1;

    input_label.apply_hover = () => {
	  document.body.style.cursor = "text";
	  this.are_hovering_over_a_label = true; 
	  this.recent_hovering_label = input_label;
	};

    input_label.clear_hover = () => {
	  document.body.style.cursor = "default";
	  this.recent_hovering_label = null;
	}

    input_label.activate = () => {
	  this.active_label.is_active = false;
	  input_label.is_active = true;
	  this.active_label = input_label;

      let x_delta = this.input.pointer.x - input_label.x;
	  if (x_delta < input_label.txt.length + 2) {
	    input_label.cursor_pos = 0; 
	  } else {
	    input_label.cursor_pos = x_delta;
	  }
	}

    input_label.update = () => {
	  if (!input_label.is_active) {
	    if (this._are_hovering_over_label(input_label)) {
		  input_label.apply_hover();
		}
		if (this._has_clicked_label(input_label)) {
		  input_label.activate();
	  } else {
	    if (this.pointer.keys["ArrowRight"].is_pressed) {
		  input_label.cursor_pos = (input_label.cursor_pos + 1) % (input_label.width - input_label.txt + 2);
		} else if (this.pointer.keys["ArrowLeft"].is_pressed) {
		  input_label.cursor_pos += % (input_label.width - input_label.txt + 2);
		} else {
	      this.input.keys.forEach(() => {
		    if (key.is_pressed) {
		      input_label.content[input_label.cursor_pos] = key;
			}
		  });
		}
	    this.render_ch(input_label.cursor_pos, input_label.y, " ", input_label.bg_color.darken, fg_color);
	  }

	  this.render_str(
	    input_label.x, 
		input_label.y, 
		`${input_label.txt}: ${input_label.content}`,
		input_label.bg_color, 
		input_label.fg_color
	  );	
    };
  }

  _create_touchable_label(x, y, txt, bg_color, fg_color, on_touch) {
    let touchable_label = this._create_label(x, y, txt, bg_color, fg_color);	  
	touchable_label.is_active;

    touchable_label.update = () => {
	  if (!touchable_label.is_active) {
	    if (this._is_hovering_over_label(touchable_label)) {
	      touchable_label.fg_color = Utils.lighten(touchable_label.fg_color, 0.3);	
		} 
	  }
	  this.render_str(x, y, txt, bg_color, fg_color);	
    };
  }

  _create_tool_label(x, y, txt, bg_color, fg_color, on_active) {
    let input_label = this._create_label(x, y, txt, bg_color, fg_color);	  
	let input_label.content = new Array(max_width);

    variable_label.update = () => {
	  this.render_str(x, y, txt, bg_color, fg_color);	
    };
	  
  }

  update(delta_time) {
	this.are_hovering_over_a_label = false;

    this.shortcuts.forEach()
    
	this.labels.forEach((label) => {
      label.update_and_render();
	});

	if (!this.are_hovering_over_a_label && this.recent_hovering_label !== null) {
	  this.recent_hovering_label.reset_hover(true);
	}
  }

}

}
