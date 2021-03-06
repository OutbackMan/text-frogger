import TxtEngine from "./lib/TxtEngine.js";
import * as Utils from "./Utils.js";

export default class SpriteEditor extends TxtEngine {
  constructor(canvas_dom_elem, width, height, default_bg, default_fg, default_ch) {
    super(canvas_dom_elem, width, height, default_bg, default_fg, default_ch);

    window.self = this;

    self.most_recently_touched_label = null;
	self.have_detected_a_hovered_label_this_frame = false;
	self.active_hovered_label = null;

    self.labels = {
	  "label": self._create_label(10, 10, "llabellabellabellabellabelabel", "black", "white")
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
	self.have_detected_a_hovered_label_this_frame = false;

    // this._listen_for_keyboard_shortcuts();
    self.labels["label"].update();  

	if (!self.have_detected_a_hovered_label_this_frame && 
		  self.active_hovered_label !== null) {
	  self.active_hovered_label.clear_hover_props();
	}
  }

  _listen_for_key_shortcuts() {
	if (this.input.keys["m"].is_released) {
      self.labels["move"].activate();
	} else if (this.input.keys["Control"].is_released && this.input.keys["z"].is_released) {
	  console.log("placeholder");	
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
	  this.render_str(label.x, label.y, label.static_txt, label.bg_color, label.fg_color);	
    };

	return label;
  }

  _create_var_label(x, y, static_txt, bg_color, fg_color, variable, var_width) {
    let var_label = self._create_label(x, y, static_txt, bg_color, fg_color);	  
	var_label.variable = variable;
	var_label.var_width = var_width;
	var_label.width = var_label.static_txt.length + var_width;

    var_label.update = () => {
	  this.render_str(
	    var_label.x, 
		var_label.y, 
		`${var_label.static_txt}${String(var_label).variable.substr(0, var_label.var_width)}`, 
		var_label.bg_color, 
		var_label.fg_color
	  );	
    };
  }

  _create_input_label(x, y, static_txt, bg_color, fg_color, input_width) {
    let input_label = this._create_label(x, y, static_txt, bg_color, fg_color);	  
	input_label.width = input_label.static_txt.length + input_width;
	input_label.input_width = input_width;
	input_label.content = new Array(input_width).fill(" ");
	input_label.has_been_touched = false;
	input_label.content_cursor_pos = -1;
	input_label.render_cursor_pos = -1;

    input_label.apply_hover_props = () => {
	  this.have_detected_a_hovered_label_this_frame = true; 
	  this.active_hovered_label = input_label;

	  document.body.style.cursor = "text";
	  input_label.fg_color = Utils.lighten(input_label.fg_color, 0.3);
	};

    input_label.clear_hover_props = () => {
	  this.active_hovered_label = null;

	  document.body.style.cursor = "default";
	  input_label.fg_color = Utils.darken(input_label.fg_color, 0.3);
	};

    input_label.apply_touched_props = () => {
	  this.most_recently_touched_label.clear_touched_props();
	  input_label.has_been_touched = true;
	  this.most_recently_touched_label = input_label;

	  document.body.style.cursor = "text";

      let x_delta = this.input.pointer.x - input_label.x;
	  if (x_delta < input_label.static_txt.length) {
        input_label.render_cursor_pos = input_label.x + input_label.static_txt.length; 
	    input_label.content_cursor_pos = 0; 
	  } else {
	    input_label.content_cursor_pos = x_delta;
        input_label.render_cursor_pos = this.input.pointer.x;
	  }

	  input_label.fg_color = Utils.darken(input_label.fg_color, 0.3);
	}

    input_label.clear_touched_props = () => {
	  input_label.has_been_touched = false;

	  document.body.style.cursor = "default";
	  input_label.fg_color = Utils.lighten(input_label.fg_color, 0.3);
	};

    input_label._inc_render_cursor_pos = () => {
	  if (input_label.render_cursor_pos + 1 === input_label.width) {
	    input_label.render_cursor_pos = input_label.x + input_label.static_txt.length; 	  
	  } else {
	    input_label.render_cursor_pos++;
	  }
	}

    input_label._dec_render_cursor_pos = () => {
	  if (input_label.render_cursor_pos - 1 < input_label.x + input_label.txt.length) {
	    input_label.render_cursor_pos = input_label.x + input_label.width - 1;
	  } else {
	    input_label.render_cursor_pos--;
	  }
	}

    input_label.update = () => {
	  if (!input_label.has_been_touched) {
	    if (this._are_hovering_over_label(input_label)) {
		  input_label.apply_hover_props();
		}
		if (this._has_touched_label(input_label)) {
		  input_label.apply_touched_props();
		}
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
	  }

	  this.render_str(
	    input_label.x, 
		input_label.y, 
		`${input_label.static_txt}${input_label.content}`,
		input_label.bg_color, 
		input_label.fg_color
	  );	

	  if (input_label.has_been_touched) {
	    this.render_ch(input_label.render_cursor_pos, input_label.y, " ", Utils.darken(input_label.bg_color, 0.3), input_label.fg_color);
	  }
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
	input_label.content = new Array(max_width);

    variable_label.update = () => {
	  this.render_str(x, y, txt, bg_color, fg_color);	
    };
  }

  _are_hovering_over_label(label) {
    return (this.input.pointer.x >= label.x && this.input.pointer.x < label.width &&
	         this.input.pointer.y === label.y);
  }

  _have_touched_label(label) {
    return (this.input.pointer.has_touched && this._are_hovering_over_label(label));
  }

}
