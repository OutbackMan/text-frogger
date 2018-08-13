import TxtEngine from "./lib/TxtEngine.js";
import * as Utils from "./Utils.js";

export default class SpriteEditor extends TxtEngine {
  constructor(canvas_dom_elem, width, height, default_bg, default_fg, default_ch) {
    super(canvas_dom_elem, width, height, default_bg, default_fg, default_ch);

    this.active_label = null;
	this.have_detected_hovering_label_this_frame = false;
	this.recent_hovering_label = null;

    this.labels = {
	  "move": this._create_touchable_label()
	};
  }	

  update(delta_time) {
	/* NOTE(Ryan): Every frame we detect the user's mouse over a 'hoverable' 
	 *             label we set this to true. 
	 *			   To correctly reset the previous 'hoverable' label's styling,
	 *			   at least one animation frame must capture the mouse not over
	 *             any other 'hoverable' label. For this to work, we assume
	 *             that in moving the mouse from one 'hoverable' label to another 
	 *			   it will first be over no 'hoverable' labels before it is over
	 *			   another one.
	 *			   As a result, don't put labels right next to each other. Leave
     *			   some padding.
	 */ 
	this.have_detected_hovering_label_this_frame = false;

    this._listen_for_keyboard_shortcuts();
    
	this.labels.forEach((label) => {
      label.update_and_render();
	});

	if (!this.have_detected_hovering_label_this_frame && 
		  this.recent_hovering_label !== null) {
	  this.recent_hovering_label.reset_hover_props(true);
	}
  }

  _listen_for_key_shortcuts() {
	if (this.input.keys["m"].is_released) {
      this.labels["move"].activate();
	} else if (this.input.keys["Control"].is_released && this.input.keys["z"].is_released) {
		
	}
    // move (m), brush (b), erase (e), undo (ctrl-z), redo (ctrl-y), load (ctrl-l), save (ctrl-s)
  }

  _create_label(x, y, static_txt, bg_color, fg_color) {
    let label = Object.create(null);
    label.x = x;
    label.y = y;
    label.static_txt = static_txt;
    label.bg_color = bg_color;
    label.fg_color = fg_color;
	label.width = static_txt.length;

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
	input_label.content_cursor_pos = -1;
	input_label.render_cursor_pos = -1;

    input_label.apply_hover = () => {
	  document.body.style.cursor = "text";
	  // lighten input_label.fg_color =
	  this.are_hovering_over_a_label = true; 
	  this.recent_hovering_label = input_label;
	};

    input_label.clear_hover = () => {
	  document.body.style.cursor = "default";
	  this.recent_hovering_label = null;
	};

    input_label.deactivate = () => {
	  document.body.style.cursor = "default";
	  input_label.is_active = false;
	};

    input_label.activate = () => {
	  document.body.style.cursor = "text";
	  this.active_label.deactivate();
	  input_label.is_active = true;
	  this.active_label = input_label;

      let x_delta = this.input.pointer.x - input_label.x;
	  if (x_delta < input_label.txt.length + 2) {
        input_label.render_cursor_pos = input_label.x + input_label.txt.length + 2;
	    input_label.content_cursor_pos = 0; 
	  } else {
	    input_label.content_cursor_pos = x_delta;
        input_label.render_cursor_pos = this.input.pointer.x;
	  }
	}

    input_label._inc_render_cursor_pos () => {
	  if (input_label.render_cursor_pos + 1 === input_label.width) {
	    input_label.render_cursor_pos = input_label.x + input_label.txt.length + 2; 	  
	  } else {
	    input_label.render_cursor_pos++;
	  }
	}

    input_label._dec_render_cursor_pos = () => {
	  if (input_label.render_cursor_pos - 1 < input_label.x + input_label.txt.length + 2) {
	    input_label.render_cursor_pos = input_label.x + input_label.width - 1;
	  } else {
	    input_label.render_cursor_pos--;
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
		  input_label._inc_render_cursor_pos();
		  input_label._inc_content_cursor_pos();
		} else if (this.pointer.keys["ArrowLeft"].is_pressed) {
		  input_label._dec_render_cursor_pos();
		  input_label._dec_content_cursor_pos();
		} else if (this.pointer.keys["Backspace"].is_pressed) {
		  input_label.content[input_label.content_cursor_pos] = " ";
		  input_label._dec_render_cursor_pos();
		  input_label._dec_content_cursor_pos();
		} else if (this.pointer.keys["Space"].is_pressed) {
		  input_label.content[input_label.content_cursor_pos] = " ";
		  input_label._inc_render_cursor_pos();
		  input_label._inc_content_cursor_pos();
		} else {
		  Object.keys(this.input.keys).forEach((key) => {
		    if (this.input.keys[key].is_pressed && key.length === 1) {
		      input_label.content[input_label.content_cursor_pos] = key;
		      input_label._inc_render_cursor_pos();
		      input_label._inc_content_cursor_pos();
		    } 
		  });
		}
	    this.render_ch(input_label.render_cursor_pos, input_label.y, " ", input_label.bg_color.darken, fg_color);
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

  }

}

}
